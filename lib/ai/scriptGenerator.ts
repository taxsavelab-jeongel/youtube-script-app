// Design Ref: §6.1 Script Generator — Claude 스트리밍 + 구조화 파싱
// Plan SC: SC-01(생성 성공률 95%+), SC-02(첫 토큰 3초 이내)
import { buildSystemPrompt, buildUserPrompt } from './prompts'
import type { GenerateParams, GenerateStreamEvent } from '@/types/script'

type ParseState = 'idle' | 'titles' | 'thumbnails' | 'script' | 'hashtags'

/**
 * Claude API를 직접 fetch 스트리밍으로 호출합니다.
 */
export async function* generateScriptStream(
  params: GenerateParams
): AsyncGenerator<GenerateStreamEvent> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY가 설정되지 않았습니다.')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-beta': 'interleaved-thinking-2025-05-14',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      stream: true,
      system: buildSystemPrompt(params),
      messages: [{ role: 'user', content: buildUserPrompt(params) }],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API 오류 ${res.status}`)
  }

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()

  let buffer = ''
  let parseState: ParseState = 'idle'
  let titleBuffer = ''
  let thumbnailBuffer = ''
  let textBuffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') continue

      try {
        const event = JSON.parse(data)
        if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
          textBuffer += event.delta.text

          const result = parseBuffer(textBuffer, parseState, titleBuffer, thumbnailBuffer)
          parseState = result.newState.state
          titleBuffer = result.newState.titleBuffer
          thumbnailBuffer = result.newState.thumbnailBuffer
          textBuffer = result.remaining

          for (const evt of result.events) {
            yield evt
          }
        }
      } catch {
        // JSON 파싱 오류 무시
      }
    }
  }

  // 버퍼 잔여 처리
  if (textBuffer.trim()) {
    if (parseState === 'script') {
      yield { type: 'script', chunk: textBuffer }
    } else if (parseState === 'hashtags') {
      const tags = parseHashtags(textBuffer + titleBuffer)
      if (tags.length > 0) yield { type: 'hashtags', tags }
    }
  }

  yield { type: 'done', usage: { inputTokens: 0, outputTokens: 0 } }
}

interface ParseResult {
  newState: { state: ParseState; titleBuffer: string; thumbnailBuffer: string }
  events: GenerateStreamEvent[]
  remaining: string
}

function parseBuffer(
  buffer: string,
  state: ParseState,
  titleBuffer: string,
  thumbnailBuffer: string
): ParseResult {
  const events: GenerateStreamEvent[] = []
  let remaining = buffer

  if (state === 'idle' && buffer.includes('[TITLES]')) {
    const idx = buffer.indexOf('[TITLES]') + '[TITLES]'.length
    remaining = buffer.slice(idx)
    state = 'titles'
    titleBuffer = ''
  }

  if (state === 'titles' && buffer.includes('[THUMBNAILS]')) {
    const titlesText = buffer.slice(0, buffer.indexOf('[THUMBNAILS]'))
    const titles = titlesText
      .replace('[TITLES]', '')
      .split('|')
      .map((t) => t.trim())
      .filter(Boolean)

    titles.forEach((title, index) => {
      events.push({ type: 'title', index, content: title })
    })

    const idx = buffer.indexOf('[THUMBNAILS]') + '[THUMBNAILS]'.length
    remaining = buffer.slice(idx)
    state = 'thumbnails'
    thumbnailBuffer = ''
  }

  if (state === 'thumbnails' && buffer.includes('[SCRIPT]')) {
    const thumbText = buffer.slice(0, buffer.indexOf('[SCRIPT]'))
    const thumbnails = (thumbnailBuffer + thumbText)
      .replace('[THUMBNAILS]', '')
      .split('|')
      .map((t) => t.trim())
      .filter(Boolean)

    thumbnails.forEach((idea, index) => {
      events.push({ type: 'thumbnail', index, content: idea })
    })

    const idx = buffer.indexOf('[SCRIPT]') + '[SCRIPT]'.length
    remaining = buffer.slice(idx)
    state = 'script'
  }

  if (state === 'script' && buffer.includes('[HASHTAGS]')) {
    const scriptChunk = buffer.slice(0, buffer.indexOf('[HASHTAGS]'))
    if (scriptChunk.trim()) events.push({ type: 'script', chunk: scriptChunk })

    const idx = buffer.indexOf('[HASHTAGS]') + '[HASHTAGS]'.length
    remaining = buffer.slice(idx)
    state = 'hashtags'
  } else if (state === 'script' && !buffer.includes('[HASHTAGS]')) {
    const lines = buffer.split('\n')
    if (lines.length > 2) {
      const toEmit = lines.slice(0, -1).join('\n')
      remaining = lines[lines.length - 1]
      if (toEmit.trim()) events.push({ type: 'script', chunk: toEmit + '\n' })
    }
  }

  if (state === 'hashtags' && buffer.includes('\n')) {
    const tags = parseHashtags(buffer.replace('[HASHTAGS]', ''))
    if (tags.length >= 5) {
      events.push({ type: 'hashtags', tags })
      remaining = ''
      state = 'idle'
    }
  }

  return {
    newState: { state, titleBuffer, thumbnailBuffer },
    events,
    remaining,
  }
}

function parseHashtags(text: string): string[] {
  return text
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.startsWith('#') && tag.length > 1)
    .slice(0, 10)
}
