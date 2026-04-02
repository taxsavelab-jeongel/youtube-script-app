import { NextRequest } from 'next/server'
import { getAllItems } from '@/lib/tax-data/utils'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { topic, itemId } = await request.json()

    if (!topic?.trim()) {
      return new Response(JSON.stringify({ error: '주제를 입력해주세요.' }), { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API 키가 설정되지 않았습니다.' }), { status: 500 })
    }

    // 관련 절세 항목 데이터 가져오기
    let contextData = ''
    if (itemId) {
      const item = getAllItems().find(i => i.id === itemId)
      if (item) {
        contextData = `
[절세 항목 데이터]
- 항목명: ${item.name}
- 설명: ${item.fullDescription}
- 적용 세율/공제율: ${item.applicableRate || 'N/A'}
- 최대 절세 금액: ${item.maxSavingAmount ? `${(item.maxSavingAmount / 10000).toLocaleString()}만원` : item.maxDeductionAmount ? `공제한도 ${(item.maxDeductionAmount / 10000).toLocaleString()}만원` : 'N/A'}
- 적용 요건: ${item.requirements.map(r => r.description).join(', ')}
- 법령 근거: ${item.legalBasis.map(l => `${l.law} ${l.article}`).join(', ')}
- 실행 단계: ${item.steps.join(' → ')}
${item.warnings ? `- 주의사항: ${item.warnings.join(', ')}` : ''}
${item.commonMistakes ? `- 흔한 실수: ${item.commonMistakes.join(', ')}` : ''}
${item.contentHook ? `- 콘텐츠 훅: ${item.contentHook.hook}` : ''}
${item.postManagement ? `- 사후관리: ${item.postManagement.period}년간 ${item.postManagement.requirements.map(r => r.item).join(', ')} 유지 필요` : ''}
`
      }
    }

    const systemPrompt = `당신은 대한민국 세무 전문 유튜브 콘텐츠 작가입니다.
2026년 최신 세법 기준으로 정확한 정보를 전달하는 유튜브 영상 스크립트를 작성합니다.

스크립트 작성 규칙:
1. 형식: [인트로] → [본론 1~3] → [실전 팁] → [아웃트로] 구조
2. 톤: 친근하면서도 전문적, 쉬운 설명 (비유 활용)
3. 길이: 10~15분 분량 (약 3,000~4,000자)
4. 필수 포함:
   - 시청자 관심을 끄는 강력한 오프닝 (숫자, 질문, 충격적 사실)
   - 구체적 숫자와 계산 예시
   - 법령 근거 간단 언급
   - "반드시 세무사 상담을 받으세요" 면책 조항
   - 영상 마지막에 구독/좋아요 유도
5. 금지:
   - 탈세 조장 또는 극단적 절세법 소개
   - 검증되지 않은 정보
   - 특정 세무사/회계사 추천
6. SEO: 제목, 설명란 문구, 해시태그 5개도 함께 제공
7. 중요 - 2026년 현행법 기준 필수 확인사항:
   - 가업상속공제·가업승계 증여세 과세특례 사후관리 기간은 5년 (2023.1.1 시행, 구법 7년·10년 아님)
   - 고용유지 요건: 5년 통산 정규직 수·총급여액 90% 이상 (구법 매년 80% 아님)
   - 자산처분 제한: 40% 이상 처분 금지 (구법 20% 아님)
   - 증여세 과세특례 대표이사 취임: 3년 내 (구법 5년 아님)
   - 법인세율: 모든 구간 1%p 인상 (2억 이하 10%, 2~200억 21% 등)
   - 자녀 상속공제: 1인당 5억원 (구법 5천만원의 10배)
   - 구법 정보를 절대 사용하지 마세요. 틀린 세법 정보는 시청자에게 치명적입니다.

${contextData ? `\n아래 절세 항목 데이터를 참고하여 정확한 정보를 포함하세요:\n${contextData}` : ''}`

    const userMessage = `다음 주제로 유튜브 절세 콘텐츠 스크립트를 작성해주세요:\n\n주제: ${topic}\n\n다음 형식으로 작성:\n1. 📌 영상 제목 (3가지 후보)\n2. 📝 영상 설명란 문구\n3. 🎬 스크립트 전문\n4. #️⃣ 해시태그 5개`

    // 기존 앱과 동일한 방식으로 직접 fetch 스트리밍
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4096,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    if (!apiRes.ok) {
      const err = await apiRes.json().catch(() => ({}))
      console.error('Anthropic API error:', err)
      return new Response(JSON.stringify({ error: err?.error?.message || `API 오류 ${apiRes.status}` }), { status: 500 })
    }

    const encoder = new TextEncoder()
    const apiReader = apiRes.body!.getReader()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await apiReader.read()
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
                  const outData = `data: ${JSON.stringify({ type: 'chunk', content: event.delta.text })}\n\n`
                  controller.enqueue(encoder.encode(outData))
                }
              } catch {
                // JSON 파싱 오류 무시
              }
            }
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          const errData = `data: ${JSON.stringify({ type: 'error', message: '스크립트 생성 중 오류가 발생했습니다.' })}\n\n`
          controller.enqueue(encoder.encode(errData))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Tax script route error:', error)
    return new Response(JSON.stringify({ error: '요청 처리 중 오류가 발생했습니다.' }), { status: 500 })
  }
}
