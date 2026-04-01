// Design Ref: §6.1 Script Generator — Claude 스트리밍 + 구조화 파싱
// Plan SC: SC-01(생성 성공률 95%+), SC-02(첫 토큰 3초 이내)
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, buildUserPrompt } from './prompts'
import type { GenerateParams, GenerateStreamEvent } from '@/types/script'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

type ParseState = 'idle' | 'titles' | 'thumbnails' | 'script' | 'hashtags'

/**
 * Claude API를 호출하여 스트리밍 이벤트를 생성합니다.
 * SSE(Server-Sent Events) 형식으로 클라이언트에 전달됩니다.
 */
export async function* generateScriptStream(
  params: GenerateParams
): AsyncGenerator<GenerateStreamEvent> {
  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: buildSystemPrompt(params),
    messages: [{ role: 'user', content: buildUserPrompt(params) }],
  })

  let buffer = ''
  let state: ParseState = 'idle'
  let titleBuffer = ''
  let thumbnailBuffer = ''

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      buffer += event.delta.text

      // 섹션 전환 감지 및 파싱
      const { newState, events, remaining } = parseBuffer(
        buffer,
        state,
        titleBuffer,
        thumbnailBuffer
      )

      state = newState.state
      titleBuffer = newState.titleBuffer
      thumbnailBuffer = newState.thumbnailBuffer
      buffer = remaining

      for (const evt of events) {
        yield evt
      }
    }
  }

  // 버퍼에 남은 내용 처리
  if (buffer.trim()) {
    if (state === 'script') {
      yield { type: 'script', chunk: buffer }
    } else if (state === 'hashtags') {
      const tags = parseHashtags(buffer + titleBuffer)
      if (tags.length > 0) {
        yield { type: 'hashtags', tags }
      }
    }
  }

  // 사용량 정보
  const finalMessage = await stream.finalMessage()
  yield {
    type: 'done',
    usage: {
      inputTokens: finalMessage.usage.input_tokens,
      outputTokens: finalMessage.usage.output_tokens,
    },
  }
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

  // [TITLES] 섹션 시작 감지
  if (state === 'idle' && buffer.includes('[TITLES]')) {
    const idx = buffer.indexOf('[TITLES]') + '[TITLES]'.length
    remaining = buffer.slice(idx)
    state = 'titles'
    titleBuffer = ''
  }

  // [THUMBNAILS] 섹션 전환
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

  // [SCRIPT] 섹션 전환
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

  // [HASHTAGS] 섹션 전환
  if (state === 'script' && buffer.includes('[HASHTAGS]')) {
    const scriptChunk = buffer.slice(0, buffer.indexOf('[HASHTAGS]'))
    if (scriptChunk.trim()) {
      events.push({ type: 'script', chunk: scriptChunk })
    }

    const idx = buffer.indexOf('[HASHTAGS]') + '[HASHTAGS]'.length
    remaining = buffer.slice(idx)
    state = 'hashtags'
  } else if (state === 'script' && !buffer.includes('[HASHTAGS]')) {
    // 스크립트 청크를 스트리밍으로 전달 (1줄 이상 쌓이면 방출)
    const lines = buffer.split('\n')
    if (lines.length > 2) {
      const toEmit = lines.slice(0, -1).join('\n')
      remaining = lines[lines.length - 1]
      if (toEmit.trim()) {
        events.push({ type: 'script', chunk: toEmit + '\n' })
      }
    }
  }

  // 해시태그 파싱 (줄 완성 시)
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
