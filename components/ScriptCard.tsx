'use client'
// Design Ref: §3.3 ScriptCard — 목록용 카드 컴포넌트

import type { Script, ChannelStyle, VideoLength } from '@/types/script'

const STYLE_LABELS: Record<ChannelStyle, string> = {
  education: '교육',
  entertainment: '엔터테인먼트',
  vlog: '브이로그',
  review: '리뷰',
  tutorial: '튜토리얼',
}

const LENGTH_LABELS: Record<VideoLength, string> = {
  shorts: 'Shorts',
  normal: '일반',
  long: '장편',
}

const STYLE_COLORS: Record<ChannelStyle, string> = {
  education: 'bg-blue-100 text-blue-700',
  entertainment: 'bg-purple-100 text-purple-700',
  vlog: 'bg-pink-100 text-pink-700',
  review: 'bg-yellow-100 text-yellow-700',
  tutorial: 'bg-green-100 text-green-700',
}

interface ScriptCardProps {
  script: Script
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isDeleting?: boolean
}

export default function ScriptCard({
  script,
  onEdit,
  onDelete,
  isDeleting = false,
}: ScriptCardProps) {
  const createdAt = new Date(script.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // 스크립트 미리보기: 첫 100자
  const preview = script.scriptContent.slice(0, 100).trim()

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* 헤더: 제목 + 배지 */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 flex-1">
          {script.title}
        </h3>
        <div className="flex gap-1.5 shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${STYLE_COLORS[script.channelStyle]}`}
          >
            {STYLE_LABELS[script.channelStyle]}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {LENGTH_LABELS[script.videoLength]}
          </span>
        </div>
      </div>

      {/* 주제 */}
      <p className="text-xs text-gray-500 mb-2">
        <span className="font-medium">주제:</span> {script.topic}
      </p>

      {/* 스크립트 미리보기 */}
      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
        {preview}
        {script.scriptContent.length > 100 ? '...' : ''}
      </p>

      {/* 해시태그 */}
      {script.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {script.hashtags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {script.hashtags.length > 4 && (
            <span className="px-1.5 py-0.5 text-gray-400 text-xs">
              +{script.hashtags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* 푸터: 날짜 + 액션 */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{createdAt}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(script.id)}
            className="text-xs px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            편집
          </button>
          <button
            onClick={() => onDelete(script.id)}
            disabled={isDeleting}
            className="text-xs px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  )
}
