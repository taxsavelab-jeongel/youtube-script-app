'use client'
// Design Ref: §3.1 ScriptForm — 5개 입력 필드 독립 컴포넌트
// Plan SC: SC-05(모바일 반응형)

import type { GenerateParams, ChannelStyle, VideoLength, TargetAudience } from '@/types/script'

const CHANNEL_STYLES: { value: ChannelStyle; label: string; emoji: string }[] = [
  { value: 'education', label: '교육/정보', emoji: '📚' },
  { value: 'entertainment', label: '엔터테인먼트', emoji: '🎭' },
  { value: 'vlog', label: '브이로그', emoji: '📷' },
  { value: 'review', label: '리뷰', emoji: '⭐' },
  { value: 'tutorial', label: '튜토리얼', emoji: '🛠' },
]

const VIDEO_LENGTHS: { value: VideoLength; label: string; desc: string }[] = [
  { value: 'shorts', label: 'Shorts', desc: '60초 이내' },
  { value: 'normal', label: '일반', desc: '5~10분' },
  { value: 'long', label: '장편', desc: '20분+' },
]

const AUDIENCES: { value: TargetAudience; label: string }[] = [
  { value: 'beginner', label: '초보자' },
  { value: 'general', label: '일반 대중' },
  { value: 'intermediate', label: '중급자' },
  { value: 'expert', label: '전문가' },
]

interface ScriptFormProps {
  params: Omit<GenerateParams, 'topic'> & { topic: string }
  onChange: (field: keyof GenerateParams, value: string) => void
  onSubmit: () => void
  onStop: () => void
  isGenerating: boolean
  error: string | null
}

export default function ScriptForm({
  params,
  onChange,
  onSubmit,
  onStop,
  isGenerating,
  error,
}: ScriptFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        영상 정보 입력
      </h2>

      {/* 주제/키워드 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          주제/키워드{' '}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={params.topic}
          onChange={(e) => onChange('topic', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) onSubmit()
          }}
          placeholder="예: 엑셀 초보자를 위한 기초 튜토리얼&#10;예: 자취방 인테리어 꿀팁 10가지"
          maxLength={200}
          rows={3}
          disabled={isGenerating}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">⌘+Enter로 빠른 생성</span>
          <span className={`text-xs ${params.topic.length >= 180 ? 'text-orange-500' : 'text-gray-400'}`}>
            {params.topic.length}/200
          </span>
        </div>
      </div>

      {/* 채널 스타일 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          채널 스타일
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {CHANNEL_STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange('channelStyle', s.value)}
              disabled={isGenerating}
              className={`flex flex-col items-center py-2 px-1 rounded-lg border text-xs font-medium transition-colors disabled:opacity-50 ${
                params.channelStyle === s.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600'
              }`}
            >
              <span className="text-lg mb-0.5">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 영상 길이 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          영상 길이
        </label>
        <div className="grid grid-cols-3 gap-2">
          {VIDEO_LENGTHS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => onChange('videoLength', l.value)}
              disabled={isGenerating}
              className={`py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${
                params.videoLength === l.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600'
              }`}
            >
              <div>{l.label}</div>
              <div className="text-xs opacity-70">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 대상 시청자 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          대상 시청자
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => onChange('targetAudience', a.value)}
              disabled={isGenerating}
              className={`py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${
                params.targetAudience === a.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* 참조 채널 / 참고 자료 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          참조 채널 / 참고 자료{' '}
          <span className="text-gray-400 font-normal">(선택)</span>
        </label>
        <textarea
          value={params.referenceChannel ?? ''}
          onChange={(e) => onChange('referenceChannel', e.target.value)}
          placeholder={"예: 정엘가업승계연구소 채널 스타일\n\n참고 자료: 2026년 기준 가업상속공제 최대 600억원, 적용 요건..."}
          disabled={isGenerating}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400 transition-colors resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          채널 톤앤매너 참조 + 최신 법령/수치를 입력하면 정확한 스크립트가 생성됩니다
        </p>
      </div>

      {/* 생성 / 중지 버튼 */}
      {isGenerating ? (
        <button
          onClick={onStop}
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span className="animate-spin text-sm">⏳</span>
          생성 중... (클릭하여 중지)
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={!params.topic.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          ✨ 스크립트 생성하기
        </button>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
