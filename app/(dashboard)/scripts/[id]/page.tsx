'use client'
// Design Ref: §2 Directory Structure — 스크립트 상세/편집 페이지

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Script } from '@/types/script'

export default function ScriptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [script, setScript] = useState<Script | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchScript = useCallback(async () => {
    try {
      const res = await fetch(`/api/scripts/${id}`)
      if (!res.ok) {
        if (res.status === 404) router.push('/scripts')
        return
      }
      const data: Script = await res.json()
      setScript(data)
      setEditedTitle(data.title)
      setEditedContent(data.scriptContent)
    } catch {
      setError('스크립트를 불러올 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    fetchScript()
  }, [fetchScript])

  const handleSave = async () => {
    if (!script) return
    setIsSaving(true)
    setSaved(false)
    try {
      const res = await fetch(`/api/scripts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTitle,
          scriptContent: editedContent,
        }),
      })
      if (!res.ok) throw new Error('저장 실패')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  // Design Ref: §11.2 debounce 2초 auto-save
  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      handleSave()
    }, 2000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = async () => {
    const text = [editedTitle, '', editedContent, '', script?.hashtags.join(' ')].join('\n')
    await navigator.clipboard.writeText(text)
  }

  const handleDownload = () => {
    const title = editedTitle || script?.title || '스크립트'
    const text = [
      `# ${title}`,
      '',
      editedContent,
      '',
      '## 해시태그',
      script?.hashtags.join(' ') ?? '',
    ].join('\n')
    const blob = new Blob([text], { type: 'text/markdown; charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.slice(0, 30)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">불러오는 중...</p>
      </div>
    )
  }

  if (!script) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/scripts" className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2">
            <span>←</span>
            <span className="text-sm">목록으로</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ⬇ MD
            </button>
            <button
              onClick={handleCopy}
              className="text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              📋 복사
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              {isSaving ? '저장 중...' : saved ? '✅ 저장됨' : '저장'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 제목 편집 */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            제목
          </label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full text-xl font-bold text-gray-900 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none pb-2 bg-transparent"
          />
        </div>

        {/* 메타 정보 */}
        <div className="flex gap-3 text-xs text-gray-400">
          <span>주제: {script.topic}</span>
          <span>·</span>
          <span>{new Date(script.createdAt).toLocaleDateString('ko-KR')}</span>
        </div>

        {/* 썸네일 아이디어 */}
        {script.thumbnailIdeas.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">🖼 썸네일 아이디어</h3>
            <div className="space-y-1.5">
              {script.thumbnailIdeas.map((idea, i) => (
                <div key={i} className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  💡 {idea}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 스크립트 편집 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">📝 스크립트</label>
            <span className="text-xs text-gray-400">편집 후 2초 자동 저장</span>
          </div>
          <textarea
            value={editedContent}
            onChange={(e) => { setEditedContent(e.target.value); triggerAutoSave() }}
            rows={20}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />
        </div>

        {/* 해시태그 */}
        {script.hashtags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2"># 해시태그</h3>
            <div className="flex flex-wrap gap-1.5">
              {script.hashtags.map((tag, i) => (
                <span
                  key={i}
                  onClick={() => navigator.clipboard.writeText(tag)}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
