// Design Ref: §4.1 POST /api/generate — SSE 스트리밍 엔드포인트
// Plan SC: SC-01(성공률 95%+), SC-02(첫 토큰 3초 이내)
import { NextRequest, NextResponse } from 'next/server'
import { generateScriptStream } from '@/lib/ai/scriptGenerator'
import { checkRateLimit, incrementUsage } from '@/lib/auth/rateLimit'
import type { GenerateParams } from '@/types/script'

export const runtime = 'nodejs'
export const maxDuration = 60 // 60초 타임아웃

export async function POST(request: NextRequest) {
  try {
    // 요청 파싱 및 유효성 검사
    const body = await request.json()
    const { topic, channelStyle, videoLength, targetAudience, referenceChannel } =
      body as GenerateParams

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: '주제를 입력해주세요.' },
        { status: 400 }
      )
    }

    if (topic.length > 200) {
      return NextResponse.json(
        { error: '주제는 200자 이내로 입력해주세요.' },
        { status: 400 }
      )
    }

    // 인증 토큰 확인 (없으면 비회원 1회 체험)
    const token = request.cookies.get('auth_token')?.value
    const userId = token ? extractUserIdFromToken(token) : null

    // Rate limit 확인 (로그인 사용자만)
    if (userId) {
      const { allowed, remaining } = await checkRateLimit(userId)
      if (!allowed) {
        return NextResponse.json(
          {
            error: '일일 생성 한도(10회)를 초과했습니다. 내일 다시 이용해주세요.',
            code: 'RATE_LIMIT',
          },
          { status: 429 }
        )
      }
    }

    const params: GenerateParams = {
      topic: topic.trim(),
      channelStyle: channelStyle || 'education',
      videoLength: videoLength || 'normal',
      targetAudience: targetAudience || 'general',
      referenceChannel,
    }

    // SSE 스트림 응답 생성
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of generateScriptStream(params)) {
            const data = `data: ${JSON.stringify(event)}\n\n`
            controller.enqueue(encoder.encode(data))
          }

          // 사용량 증가 (생성 성공 시)
          if (userId) {
            await incrementUsage(userId)
          }

          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          const errEvent = {
            type: 'error',
            code: 'GENERATION_FAILED',
            message:
              error instanceof Error
                ? `${error.name}: ${error.message}`
                : '스크립트 생성 중 오류가 발생했습니다.',
          }
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no', // Nginx 버퍼링 비활성화
      },
    })
  } catch (error) {
    console.error('Generate route error:', error)
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

/**
 * JWT에서 userId 추출 (M4에서 bkend.ai 검증으로 교체)
 */
function extractUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    return payload.sub || payload.userId || null
  } catch {
    return null
  }
}
