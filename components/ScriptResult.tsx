'use client'
// Design Ref: §3.2 ScriptResult — 스트리밍 결과 표시 컴포넌트
// Plan SC: SC-01(결과 표시), SC-05(모바일 반응형)

import { useRef, useEffect, useState } from 'react'
import StreamingText from './StreamingText'
import type { Script } from '@/types/script'

interface ScriptResultProps {
  titles: string[]
  thumbnailIdeas: string[]
  scriptContent: string
  hashtags: string[]
  isStreaming: boolean
  onSave?: (selectedTitle: string) => void
  isSaving?: boolean
  savedScript?: Script | null
}

export default function ScriptResult({
  titles,
  thumbnailIdeas,
  scriptContent,
  hashtags,
  isStreaming,
  onSave,
  isSaving = false,
  savedScript = null,
}: ScriptResultProps) {
  const [selectedTitle, setSelectedTitle] = useState<string>('')
  const [editableScript, setEditableScript] = useState(scriptContent)
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const scriptRef = useRef<HTMLDivElement>(null)

  // 스트리밍 완료 후 스크립트 내용 편집 가능하게 동기화
  useEffect(() => {
    if (!isStreaming) {
      setEditableScript(scriptContent)
    }
  }, [isStreaming, scriptContent])

  // 새 제목이 들어오면 첫 번째 자동 선택
  useEffect(() => {
    if (titles.length > 0 && !selectedTitle) {
      setSelectedTitle(titles[0])
    }
  }, [titles, selectedTitle])

  // 스크롤을 최신 스트리밍 위치로 자동 이동
  useEffect(() => {
    if (isStreaming && scriptRef.current) {
      scriptRef.current.scrollTop = scriptRef.current.scrollHeight
    }
  }, [scriptContent, isStreaming])

  const hasContent = titles.length > 0 || scriptContent.length > 0

  const handleCopy = async () => {
    const text = [
      selectedTitle || titles[0] || '',
      '',
      editableScript || scriptContent,
      '',
      hashtags.join(' '),
    ].join('\n')
    await navigator.clipboard.writeText(text)
    setCopyState('copied')
    setTimeout(() => setCopyState('idle'), 2000)
  }

  const handleDownload = () => {
    const title = selectedTitle || titles[0] || '스크립트'
    const text = [
      `# ${title}`,
      '',
      editableScript || scriptContent,
      '',
      '## 해시태그',
      hashtags.join(' '),
    ].join('\n')
    const blob = new Blob([text], { type: 'text/markdown; charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.slice(0, 30)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!hasContent && !isStreaming) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-400">
          <div className="text-5xl mb-4">🎬</div>
          <p className="text-sm leading-relaxed">
            주제를 입력하고 생성하면
            <br />
            스크립트가 여기에 나타납니다
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">

      {/* 제목 후보 */}
      {titles.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <span>📌</span> 제목 후보
            <span className="text-xs font-normal text-gray-400">(클릭하여 선택)</span>
          </h3>
          <div className="space-y-2">
            {titles.map((title, i) => (
              <button
                key={i}
                onClick={() => setSelectedTitle(title)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition-all ${
                  selectedTitle === title
                    ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-gray-400 mr-2 font-normal">{i + 1}.</span>
                {title}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 썸네일 아이디어 */}
      {thumbnailIdeas.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <span>🖼</span> 썸네일 텍스트 아이디어
          </h3>
          <div className="space-y-1.5">
            {thumbnailIdeas.map((idea, i) => (
              <div
                key={i}
                className="flex items-start gap-2 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800"
              >
                <span className="text-amber-400 mt-0.5">💡</span>
                <span>{idea}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 스크립트 본문 */}
      {(scriptContent.length > 0 || isStreaming) && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <span>📝</span> 스크립트
            {isStreaming && (
              <span className="text-xs font-normal text-blue-500 animate-pulse">
                생성 중...
              </span>
            )}
          </h3>

          {isStreaming ? (
            // 스트리밍 중: 읽기 전용 + 커서
            <div
              ref={scriptRef}
              className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed border border-gray-100"
            >
              <StreamingText
                text={scriptContent}
                isStreaming={isStreaming}
              />
            </div>
          ) : (
            // 완료 후: 인라인 편집 가능
            <textarea
              value={editableScript}
              onChange={(e) => setEditableScript(e.target.value)}
              rows={12}
              className="w-full bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              placeholder="스크립트 내용을 편집할 수 있습니다..."
            />
          )}
        </section>
      )}

      {/* 해시태그 */}
      {hashtags.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <span>#</span> 해시태그
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs cursor-pointer transition-colors"
                onClick={() => navigator.clipboard.writeText(tag)}
                title="클릭하여 복사"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">태그를 클릭하면 복사됩니다</p>
        </section>
      )}

      {/* 액션 버튼 */}
      {!isStreaming && hasContent && (
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          {/* 저장 버튼 (로그인 시) */}
          {onSave && (
            <button
              onClick={() => onSave(selectedTitle || titles[0] || '')}
              disabled={isSaving || !!savedScript}
              className="flex-1 text-sm py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {isSaving ? '저장 중...' : savedScript ? '✅ 저장됨' : '💾 저장'}
            </button>
          )}

          {/* 복사 */}
          <button
            onClick={handleCopy}
            className="flex-1 text-sm py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
          >
            {copyState === 'copied' ? '✅ 복사됨!' : '📋 전체 복사'}
          </button>

          {/* 다운로드 */}
          <button
            onClick={handleDownload}
            className="flex-1 text-sm py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
          >
            ⬇ MD 다운로드
          </button>
        </div>
      )}
    </div>
  )
}
