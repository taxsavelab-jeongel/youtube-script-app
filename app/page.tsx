import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI 절세 컨설팅 & 콘텐츠 플랫폼
        </h1>
        <p className="text-gray-500">
          2026년 최신 세법 기준, AI가 맞춤 절세 전략을 추천하고 유튜브 콘텐츠를 자동 생성합니다
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/tax-simulator"
            className="block p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">💰</span>
            <h2 className="font-bold text-gray-900 mt-3">절세 시뮬레이터</h2>
            <p className="text-sm text-gray-500 mt-1">
              프로필 입력 후 AI 맞춤 절세 전략 추천
            </p>
          </Link>

          <Link
            href="/tax-script"
            className="block p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">🎬</span>
            <h2 className="font-bold text-gray-900 mt-3">절세 스크립트</h2>
            <p className="text-sm text-gray-500 mt-1">
              절세 주제 유튜브 영상 대본 자동 생성
            </p>
          </Link>

          <Link
            href="/generate"
            className="block p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">📝</span>
            <h2 className="font-bold text-gray-900 mt-3">일반 스크립트</h2>
            <p className="text-sm text-gray-500 mt-1">
              모든 주제의 유튜브 스크립트 생성
            </p>
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          * 본 서비스는 정보 제공 목적이며, 정확한 세무 상담은 세무사에게 받으세요
        </p>
      </div>
    </div>
  )
}
