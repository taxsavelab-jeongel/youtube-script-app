'use client'
// Design Ref: §2 Directory Structure — 내 스크립트 목록 페이지
// Plan SC: SC-04(목록 조회)

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ScriptCard from '@/components/ScriptCard'
import { useScriptStore } from '@/store/scriptStore'

export default function ScriptsPage() {
  const router = useRouter()
  const { scripts, isLoading, fetchScripts, deleteScript } = useScriptStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchScripts()
  }, [fetchScripts])

  const handleDelete = async (id: string) => {
    if (!confirm('스크립트를 삭제하시겠습니까?')) return
    setDeletingId(id)
    try {
      await deleteScript(id)
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = scripts.filter(
    (s) =>
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/generate"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ←
            </Link>
            <span className="font-bold text-gray-900">내 스크립트</span>
            {scripts.length > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {scripts.length}개
              </span>
            )}
          </div>
          <Link
            href="/generate"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            + 새 스크립트
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 검색 */}
        {scripts.length > 3 && (
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목 또는 주제로 검색..."
              className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* 로딩 */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="text-center">
              <div className="text-3xl mb-3 animate-spin">⏳</div>
              <p className="text-sm">불러오는 중...</p>
            </div>
          </div>
        )}

        {/* 빈 상태 */}
        {!isLoading && scripts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              아직 저장된 스크립트가 없습니다
            </h3>
            <p className="text-sm mb-6">첫 번째 스크립트를 생성해보세요!</p>
            <Link
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              스크립트 생성하기
            </Link>
          </div>
        )}

        {/* 검색 결과 없음 */}
        {!isLoading && scripts.length > 0 && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>
              &apos;{searchQuery}&apos;에 대한 검색 결과가 없습니다.
            </p>
          </div>
        )}

        {/* 스크립트 그리드 */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((script) => (
              <ScriptCard
                key={script.id}
                script={script}
                onEdit={(id) => router.push(`/scripts/${id}`)}
                onDelete={handleDelete}
                isDeleting={deletingId === script.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
