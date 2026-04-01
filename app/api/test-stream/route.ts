import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY!

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 50,
      stream: true,
      messages: [{ role: 'user', content: 'Say hello in Korean' }],
    }),
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  const chunks: string[] = []

  for (let i = 0; i < 20; i++) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(decoder.decode(value, { stream: true }))
  }

  return NextResponse.json({ raw: chunks.join('') })
}
