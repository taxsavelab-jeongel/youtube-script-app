// Design Ref: §6.2 Prompt Design — 유튜브 스크립트 생성 프롬프트
import type { GenerateParams, ChannelStyle, VideoLength, TargetAudience } from '@/types/script'

const CHANNEL_STYLE_KO: Record<ChannelStyle, string> = {
  education: '교육/정보 전달',
  entertainment: '엔터테인먼트/오락',
  vlog: '브이로그/일상',
  review: '리뷰/추천',
  tutorial: '튜토리얼/하우투',
}

const VIDEO_LENGTH_KO: Record<VideoLength, string> = {
  shorts: 'YouTube Shorts (60초 이내)',
  normal: '일반 영상 (5~10분)',
  long: '장편 영상 (20분+)',
}

const AUDIENCE_KO: Record<TargetAudience, string> = {
  beginner: '입문자/초보자',
  general: '일반 대중',
  intermediate: '중급자',
  expert: '전문가/고급자',
}

export function buildSystemPrompt(params: GenerateParams): string {
  return `당신은 대한민국 최고의 유튜브 콘텐츠 전략가이자 스크립트 작가입니다.
수백만 조회수를 달성한 영상들의 공통 패턴을 분석하여 최적화된 스크립트를 작성합니다.

## 채널 정보
- 채널 스타일: ${CHANNEL_STYLE_KO[params.channelStyle]}
- 대상 시청자: ${AUDIENCE_KO[params.targetAudience]}
- 영상 길이: ${VIDEO_LENGTH_KO[params.videoLength]}
${params.referenceChannel ? `- 참조 채널 톤앤매너: ${params.referenceChannel} 채널과 유사한 스타일로 작성` : ''}

## 응답 형식 (반드시 준수)

[TITLES]
제목1|제목2|제목3

[THUMBNAILS]
썸네일텍스트1|썸네일텍스트2

[SCRIPT]
## 🎬 도입부 (후킹 - 처음 15초)
[시청자의 관심을 즉시 잡는 강력한 오프닝]

## 📖 본론
[핵심 내용 전개 - 영상 길이에 맞게 구성]

## 🎯 결론 + CTA
[핵심 요약 + 좋아요/구독 유도]

[HASHTAGS]
#태그1,#태그2,#태그3,#태그4,#태그5,#태그6,#태그7,#태그8,#태그9,#태그10

## 작성 원칙
- 제목: 클릭률(CTR) 극대화, 숫자/감정어 활용, 50자 이내
- 썸네일 텍스트: 6단어 이내, 임팩트 있게
- 스크립트: 자연스러운 구어체, ${AUDIENCE_KO[params.targetAudience]} 눈높이에 맞게
- 해시태그: 검색 최적화, 인기 태그와 니치 태그 혼합`
}

export function buildUserPrompt(params: GenerateParams): string {
  return `다음 주제로 유튜브 영상 스크립트를 작성해주세요.

**주제**: ${params.topic}

위 형식에 맞춰 제목 3개, 썸네일 텍스트 2개, 완성된 스크립트, 해시태그 10개를 작성해주세요.`
}
