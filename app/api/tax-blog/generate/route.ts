import { NextRequest } from 'next/server'
import { buildContextData, buildRelatedTopics } from '@/lib/ai/buildContextData'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { topic, itemId, blogLength = 'medium', tone = 'professional' } = await request.json()

    if (!topic?.trim()) {
      return new Response(JSON.stringify({ error: '주제를 입력해주세요.' }), { status: 400 })
    }

    const apiKey = process.env.APP_ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API 키가 설정되지 않았습니다.' }), { status: 500 })
    }

    const contextData = buildContextData(itemId)
    const relatedTopics = buildRelatedTopics(itemId)

    // Unsplash 이미지 5개 검색
    const imageKeywords = topic.replace(/[^가-힣a-zA-Z0-9 ]/g, '').split(' ').slice(0, 3).join(' ')
    let imageSection = ''
    try {
      const unsplashKey = process.env.UNSPLASH_ACCESS_KEY
      if (unsplashKey) {
        const searchTerms = ['business tax korea', 'corporate office', 'financial planning', 'calculator money', 'business meeting']
        const images: string[] = []
        for (const term of searchTerms) {
          const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=1&orientation=landscape`, {
            headers: { Authorization: `Client-ID ${unsplashKey}` },
          })
          if (res.ok) {
            const data = await res.json()
            if (data.results?.[0]) {
              const img = data.results[0]
              images.push(`[이미지: ${img.alt_description || term}]\nURL: ${img.urls.regular}\n출처: Unsplash / ${img.user.name}`)
            }
          }
        }
        if (images.length > 0) {
          imageSection = `\n\n아래 이미지 5개를 본문 중간중간에 자연스럽게 배치하세요. 각 소제목 아래에 1개씩 넣으세요.\n\n${images.join('\n\n')}`
        }
      }
      // Unsplash 키가 없으면 무료 이미지 URL 직접 생성
      if (!imageSection) {
        const fallbackImages = [
          { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', desc: '세금 계산과 절세 전략', credit: 'Unsplash' },
          { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', desc: '비즈니스 미팅과 컨설팅', credit: 'Unsplash' },
          { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', desc: '재무 데이터 분석', credit: 'Unsplash' },
          { url: 'https://images.unsplash.com/photo-1507679799987-c73b1a7a8e10?w=800', desc: '사업 성장과 투자', credit: 'Unsplash' },
          { url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800', desc: '기업 경영과 의사결정', credit: 'Unsplash' },
        ]
        imageSection = `\n\n아래 이미지 5개를 본문 중간중간에 자연스럽게 배치하세요. 각 소제목 아래에 1개씩 넣어주세요. 이미지 삽입 형식은 반드시 아래 형식을 사용하세요:\n[이미지]\nURL: 이미지주소\n설명: 이미지설명\n\n${fallbackImages.map((img, i) => `[이미지 ${i + 1}]\nURL: ${img.url}\n설명: ${img.desc}\n출처: ${img.credit}`).join('\n\n')}`
      }
    } catch {
      // 이미지 검색 실패 시 무시
    }

    const lengthGuide = blogLength === 'short' ? '1,500자 내외 (3분 읽기)' : blogLength === 'long' ? '5,000자 이상 (10분 읽기, 심층 분석)' : '3,000자 내외 (5분 읽기)'
    const toneGuide = tone === 'casual' ? '친근하고 대화하듯 (블로그 느낌)' : '전문적이면서 신뢰감 있게 (컨설팅 보고서 느낌)'

    const systemPrompt = `당신은 대한민국 중소기업 대표님을 위한 절세 전문 블로그 작가입니다.
정엘 가업승계연구소 스타일의 전문 블로그 글을 작성합니다.

★★★ 출력 형식 절대 규칙 ★★★
- 마크다운 문법 절대 사용 금지: #, ##, **, *, \`, --- 등 마크다운 기호를 쓰지 마세요
- 순수 텍스트(Plain Text)로만 작성하세요
- 제목/소제목은 대괄호로 구분: [제목], [소제목], [메타 디스크립션]
- 강조는 따옴표로: "이 부분이 핵심입니다"
- 구분선은 빈 줄 하나로 처리
- 번호 매기기는 1. 2. 3. 형태로 (-, * 사용 금지)
- 표는 텍스트로: "급여: 40% / 배당: 34.8% / 퇴직금: 20%"

말투 가이드 (정엘 스타일)
- 호칭: "대표님" (절대 "여러분" 사용 금지)
- 톤: ${toneGuide}
- 구어체 존칭: "~하셔야 됩니다", "~거든요", "~이에요"
- 경험담: "실제로 컨설팅했던 사례인데요"
- 위험 경고: "솔직히 말씀드리면 이건 좀 위험할 수 있어요"

## 최우선 원칙: 데이터 기반만 허용
- 제공된 절세 데이터만 사용
- 데이터에 없는 세율/금액/기한은 "세무사 확인 필요"로 안내
- 모든 숫자에 법령 근거 명시

## 블로그 글 구조

### 1. 제목 (SEO 최적화)
- 구체적 숫자 포함 (예: "법인돈 10억, 세금 6.7%만 내는 방법")
- 50자 이내, 핵심 키워드 앞쪽 배치

### 2. 메타 디스크립션
- 120자 이내, 검색결과에 표시될 요약

### 3. 본문 (${lengthGuide})

#### 도입부
- 대표님의 고민에 공감하는 문장으로 시작
- "회사는 돈이 많은데 대표님은 돈이 없다" 패턴
- 핵심 결론 미리 제시 (리버스 피라미드)

#### 핵심 내용 (H2 소제목 3~5개)
- 각 소제목에 숫자/세율 포함
- 세율 비교표 (마크다운 테이블) 반드시 포함
- 법령 근거 인라인 표기 (예: "소득세법 제55조에 따르면")
- 계산 예시 포함 (구체적 금액)

#### 실무 사례
- "실제 컨설팅 사례" 형태
- 전후 비교 (절세 전 vs 후)

#### 주의사항
- "다만, 이것만은 주의하셔야 합니다"
- warnings 데이터 활용
- 세무조사 리스크 언급

#### 마무리 + CTA
- 핵심 요약 3줄
- "전문가 상담을 받으시기 바랍니다"
- 관련 글 추천 (relatedTopics)

### 4. SEO 태그
- 키워드 5개
- 카테고리 제안

## 절대 금지
- 제공 데이터에 없는 세율/금액
- 탈세 조장
- 특정 세무사/회계사 추천
- 단정적 표현 ("~됩니다" → "~하실 수 있습니다")

## 면책
- 글 마지막에 반드시: "본 글은 2026년 현행 세법 기준 정보 제공 목적이며, 개별 상황에 따라 다를 수 있습니다. 반드시 세무사 상담을 받으세요."

${contextData ? `\n[제공된 절세 데이터]\n${contextData}` : '\n관련 절세 데이터가 없습니다. 일반적인 정보만 다루고, 구체적 수치는 "세무사 확인 필요"로 안내하세요.'}
${imageSection}
${relatedTopics}`

    const userMessage = `다음 주제로 절세 전문 블로그 글을 작성해주세요.

주제: ${topic}
글 길이: ${lengthGuide}

출력 형식 (마크다운 기호 사용 금지, 순수 텍스트만):

[제목]
(SEO 최적화, 숫자 포함, 50자 이내)

[메타 디스크립션]
(120자 이내, 검색 결과에 표시될 요약)

[태그]
(블로그 태그 10개를 쉼표로 구분. 예: 법인세, 절세전략, 가업승계, 세무조사, ...)
(네이버 블로그, 티스토리, 워드프레스에서 바로 복사하여 붙여넣을 수 있는 형태)

[본문]
(소제목은 대괄호로 구분, 세율 비교표, 법령 근거, 실무 사례, 주의사항, CTA 포함)
(이미지 삽입 위치에 제공된 이미지 URL 배치)

[SEO 키워드]
(검색 유입용 핵심 키워드 5개, 쉼표 구분)

[관련 글 추천]
(다음에 읽을 만한 주제 3개)`

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
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'chunk', content: event.delta.text })}\n\n`))
                }
              } catch {}
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
          controller.close()
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: '블로그 생성 중 오류가 발생했습니다.' })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: '요청 처리 중 오류가 발생했습니다.' }), { status: 500 })
  }
}
