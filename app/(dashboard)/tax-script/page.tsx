'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ContentIdea {
  id: string
  name: string
  contentHook: {
    title: string
    hook: string
    targetKeyword: string
    estimatedViews: string
  }
  category: string
  subcategory: string
  impactLevel: string
  targetAudience: string[]
}

export default function TaxScriptPage() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [customTopic, setCustomTopic] = useState('')
  const [script, setScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false)
  const [filter, setFilter] = useState('all')
  const abortRef = useRef<AbortController | null>(null)

  const loadIdeas = async () => {
    setIsLoadingIdeas(true)
    try {
      const res = await fetch('/api/tax-script/ideas')
      const data = await res.json()
      setIdeas(data.ideas)
    } catch {
      // ignore
    } finally {
      setIsLoadingIdeas(false)
    }
  }

  const generateScript = async (topic: string, itemId?: string) => {
    setIsGenerating(true)
    setScript('')
    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/tax-script/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, itemId }),
        signal: abortRef.current.signal,
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          try {
            const event = JSON.parse(line.slice(6))
            if (event.type === 'chunk') setScript(prev => prev + event.content)
            if (event.type === 'done') setIsGenerating(false)
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setScript('스크립트 생성 중 오류가 발생했습니다.')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStop = () => {
    abortRef.current?.abort()
    setIsGenerating(false)
  }

  const filteredIdeas = filter === 'all' ? ideas : ideas.filter(i => i.category === filter)
  const viewsEmoji = (v: string) => v === 'high' ? '🔥' : v === 'medium' ? '📈' : '📊'

  // 첫 로딩 시 아이디어 불러오기
  if (ideas.length === 0 && !isLoadingIdeas) {
    loadIdeas()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="font-bold text-gray-900">절세 유튜브 스크립트 생성기</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/tax-simulator" className="text-sm text-gray-600 hover:text-blue-600">절세 시뮬레이터</Link>
            <Link href="/generate" className="text-sm text-gray-600 hover:text-blue-600">일반 스크립트</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 왼쪽: 콘텐츠 아이디어 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">콘텐츠 아이디어</h2>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="all">전체</option>
                <option value="income">소득세/연말정산</option>
                <option value="corporate">법인세</option>
                <option value="capital_gains">양도소득세</option>
                <option value="inheritance">상속세</option>
                <option value="gift">증여세</option>
                <option value="vat">부가가치세</option>
              </select>
            </div>

            {/* 커스텀 주제 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <label className="block text-sm font-semibold text-gray-700 mb-2">직접 주제 입력</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTopic}
                  onChange={e => setCustomTopic(e.target.value)}
                  placeholder="예: 2026년 연말정산 꿀팁 5가지"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => { setSelectedIdea(null); generateScript(customTopic) }}
                  disabled={!customTopic.trim() || isGenerating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  생성
                </button>
              </div>
            </div>

            {/* 추천 아이디어 목록 */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {isLoadingIdeas ? (
                <div className="text-center py-8 text-gray-400">아이디어 로딩 중...</div>
              ) : (
                filteredIdeas.map(idea => (
                  <button
                    key={idea.id}
                    onClick={() => {
                      setSelectedIdea(idea)
                      generateScript(idea.contentHook.title, idea.id)
                    }}
                    disabled={isGenerating}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedIdea?.id === idea.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {viewsEmoji(idea.contentHook.estimatedViews)} {idea.contentHook.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{idea.contentHook.hook}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                            {idea.subcategory}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 rounded-full text-blue-600">
                            SEO: {idea.contentHook.targetKeyword}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* 오른쪽: 생성된 스크립트 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {isGenerating ? '스크립트 생성 중...' : '생성된 스크립트'}
              </h2>
              {isGenerating && (
                <button onClick={handleStop} className="text-sm text-red-500 hover:text-red-700">중단</button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border min-h-[600px] p-6">
              {script ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                    {script}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  왼쪽에서 콘텐츠 아이디어를 선택하거나 주제를 입력하세요
                </div>
              )}
            </div>

            {script && !isGenerating && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(script)}
                  className="flex-1 border border-gray-300 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  📋 복사하기
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([script], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `script-${Date.now()}.txt`
                    a.click()
                  }}
                  className="flex-1 border border-gray-300 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  💾 다운로드
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
