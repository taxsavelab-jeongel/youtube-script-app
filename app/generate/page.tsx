'use client'
// Design Ref: §2 Directory Structure — 메인 생성 페이지 (ScriptForm + ScriptResult 조합)
// Plan SC: SC-01(생성), SC-02(스트리밍), SC-05(모바일 반응형)

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ScriptForm from '@/components/ScriptForm'
import ScriptResult from '@/components/ScriptResult'
import { useScriptStore } from '@/store/scriptStore'
import type { GenerateParams, ChannelStyle, VideoLength, TargetAudience } from '@/types/script'

const DEFAULT_PARAMS: GenerateParams = {
  topic: '',
  channelStyle: 'education',
  videoLength: 'normal',
  targetAudience: 'general',
  referenceChannel: '',
}

export default function GeneratePage() {
  const {
    isGenerating,
    streamingScript,
    generatedTitles,
    generatedThumbnails,
    generatedHashtags,
    error,
    startGeneration,
    appendScriptChunk,
    addTitle,
    addThumbnail,
    setHashtags,
    finishGeneration,
    setError,
    resetGeneration,
    saveScript,
  } = useScriptStore()

  const router = useRouter()
  const [params, setParams] = useState<GenerateParams>(DEFAULT_PARAMS)
  const [isSaving, setIsSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const handleChange = (field: keyof GenerateParams, value: string) => {
    setParams((prev) => ({ ...prev, [field]: value }))
    if (field === 'topic') setSavedId(null)
  }

  const handleGenerate = async () => {
    if (!params.topic.trim() || isGenerating) return

    resetGeneration()
    setSavedId(null)
    startGeneration()

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          referenceChannel: params.referenceChannel?.trim() || undefined,
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || '생성 중 오류가 발생했습니다.')
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const event = JSON.parse(line.slice(6))
            switch (event.type) {
              case 'title':
                if (event.content) addTitle(event.content)
                break
              case 'thumbnail':
                if (event.content) addThumbnail(event.content)
                break
              case 'script':
                if (event.chunk) appendScriptChunk(event.chunk)
                break
              case 'hashtags':
                if (event.tags) setHashtags(event.tags)
                break
              case 'done':
                finishGeneration()
                break
              case 'error':
                setError(event.message || '생성 오류가 발생했습니다.')
                break
            }
          } catch {
            // 파싱 오류 무시
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('네트워크 오류가 발생했습니다.')
      } else {
        finishGeneration()
      }
    }
  }

  const handleStop = () => {
    abortRef.current?.abort()
    finishGeneration()
  }

  const handleSave = async (selectedTitle: string) => {
    if (!streamingScript) return
    setIsSaving(true)
    try {
      const id = await saveScript({
        ...params,
        title: selectedTitle || generatedTitles[0] || params.topic,
        titlesCandidates: generatedTitles,
        thumbnailIdeas: generatedThumbnails,
        scriptContent: streamingScript,
        hashtags: generatedHashtags,
      })
      setSavedId(id)
    } catch {
      setError('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="font-bold text-gray-900">YouTube 스크립트 생성기</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/scripts"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              내 스크립트
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScriptForm
            params={params}
            onChange={handleChange}
            onSubmit={handleGenerate}
            onStop={handleStop}
            isGenerating={isGenerating}
            error={error}
          />
          <ScriptResult
            titles={generatedTitles}
            thumbnailIdeas={generatedThumbnails}
            scriptContent={streamingScript}
            hashtags={generatedHashtags}
            isStreaming={isGenerating}
            onSave={handleSave}
            isSaving={isSaving}
            savedScript={savedId ? ({ id: savedId } as any) : null}
          />
        </div>
      </main>
    </div>
  )
}
