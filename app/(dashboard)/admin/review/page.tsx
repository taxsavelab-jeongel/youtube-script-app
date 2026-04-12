'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ReviewItem {
  id: string
  name: string
  shortDescription: string
  category: string
  subcategory: string
  fullDescription: string
  applicableRate: string
  legalBasis: { law: string; article: string }[]
  requirements: { description: string }[]
  postManagement?: { period: number; requirements: { item: string; standard: string }[] }
  warnings?: string[]
  lastUpdated: string
  version: string
  // 감수 상태
  reviewStatus?: 'pending' | 'approved' | 'rejected' | 'needs_update'
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'needs_update'

export default function AdminReviewPage() {
  const [items, setItems] = useState<ReviewItem[]>([])
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null)
  const [reviewNote, setReviewNote] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [reviews, setReviews] = useState<Record<string, { status: string; by: string; at: string; note: string }>>({})

  useEffect(() => {
    fetch('/api/admin/review')
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(() => {})

    // 로컬스토리지에서 기존 리뷰 불러오기
    const saved = localStorage.getItem('tax_reviews')
    if (saved) setReviews(JSON.parse(saved))

    const savedName = localStorage.getItem('reviewer_name')
    if (savedName) setReviewerName(savedName)
  }, [])

  const saveReview = (itemId: string, status: 'approved' | 'rejected' | 'needs_update') => {
    if (!reviewerName.trim()) {
      alert('감수자 이름을 입력해주세요')
      return
    }

    const updated = {
      ...reviews,
      [itemId]: {
        status,
        by: reviewerName,
        at: new Date().toISOString(),
        note: reviewNote,
      },
    }
    setReviews(updated)
    localStorage.setItem('tax_reviews', JSON.stringify(updated))
    localStorage.setItem('reviewer_name', reviewerName)
    setReviewNote('')
    setSelectedItem(null)
  }

  const getStatus = (id: string) => reviews[id]?.status || 'pending'

  const filteredItems = items.filter(item => {
    const statusMatch = filter === 'all' || getStatus(item.id) === filter
    const catMatch = categoryFilter === 'all' || item.category === categoryFilter
    return statusMatch && catMatch
  })

  const stats = {
    total: items.length,
    approved: items.filter(i => getStatus(i.id) === 'approved').length,
    rejected: items.filter(i => getStatus(i.id) === 'rejected').length,
    needs_update: items.filter(i => getStatus(i.id) === 'needs_update').length,
    pending: items.filter(i => getStatus(i.id) === 'pending').length,
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">승인</span>
      case 'rejected': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">반려</span>
      case 'needs_update': return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">수정필요</span>
      default: return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">미검토</span>
    }
  }

  const exportReview = () => {
    const report = items.map(item => ({
      id: item.id,
      name: item.name,
      category: `${item.category}/${item.subcategory}`,
      status: getStatus(item.id),
      reviewer: reviews[item.id]?.by || '-',
      reviewDate: reviews[item.id]?.at ? new Date(reviews[item.id].at).toLocaleDateString('ko-KR') : '-',
      note: reviews[item.id]?.note || '-',
    }))

    const csv = [
      'ID,항목명,카테고리,상태,감수자,감수일,비고',
      ...report.map(r => `${r.id},"${r.name}",${r.category},${r.status},${r.reviewer},${r.reviewDate},"${r.note}"`)
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `세무감수현황_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="font-bold text-gray-900">세무사 감수 관리</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">홈</Link>
            <Link href="/tax-simulator" className="text-sm text-gray-600 hover:text-blue-600">시뮬레이터</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 감수자 정보 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">감수자:</label>
          <input
            type="text"
            value={reviewerName}
            onChange={e => setReviewerName(e.target.value)}
            placeholder="세무사 이름 입력"
            className="border rounded-lg px-3 py-1.5 text-sm w-48"
          />
          <div className="ml-auto flex gap-2">
            <button
              onClick={async () => {
                if (!confirm('AI가 전체 항목을 자동 감수합니다. 기존 검토 결과가 덮어씌워집니다. 계속할까요?')) return
                try {
                  const res = await fetch('/api/admin/auto-review')
                  const data = await res.json()
                  setReviews(data.reviews)
                  localStorage.setItem('tax_reviews', JSON.stringify(data.reviews))
                  localStorage.setItem('reviewer_name', 'AI 자동감수')
                  setReviewerName('AI 자동감수')
                  alert(`감수 완료! 승인 ${data.summary.approved}건 / 수정필요 ${data.summary.needsUpdate}건 / 반려 ${data.summary.rejected}건 (승인율 ${data.summary.approvedRate}%)`)
                } catch { alert('감수 중 오류가 발생했습니다.') }
              }}
              className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🤖 AI 일괄 감수
            </button>
            <button
              onClick={() => {
                if (!confirm('모든 항목을 승인 처리합니다. 계속할까요?')) return
                const saved = localStorage.getItem('tax_reviews')
                const existing = saved ? JSON.parse(saved) : {}
                const allApproved = items.reduce((acc, item) => ({
                  ...acc,
                  [item.id]: {
                    ...existing[item.id],
                    status: 'approved',
                    by: reviewerName || '일괄승인',
                    at: new Date().toISOString(),
                    note: existing[item.id]?.note || '',
                  },
                }), {} as Record<string, { status: string; by: string; at: string; note: string }>)
                localStorage.setItem('tax_reviews', JSON.stringify(allApproved))
                window.location.reload()
              }}
              className="text-sm px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ✅ 전체 승인
            </button>
            <button onClick={exportReview} className="text-sm px-4 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
              CSV 내보내기
            </button>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { label: '전체', count: stats.total, color: 'bg-gray-100 text-gray-800', key: 'all' as FilterStatus },
            { label: '미검토', count: stats.pending, color: 'bg-gray-100 text-gray-600', key: 'pending' as FilterStatus },
            { label: '승인', count: stats.approved, color: 'bg-green-100 text-green-700', key: 'approved' as FilterStatus },
            { label: '수정필요', count: stats.needs_update, color: 'bg-yellow-100 text-yellow-700', key: 'needs_update' as FilterStatus },
            { label: '반려', count: stats.rejected, color: 'bg-red-100 text-red-700', key: 'rejected' as FilterStatus },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`p-3 rounded-xl text-center transition-all ${filter === s.key ? 'ring-2 ring-blue-500' : ''} ${s.color}`}
            >
              <div className="text-2xl font-bold">{s.count}</div>
              <div className="text-xs mt-1">{s.label}</div>
            </button>
          ))}
        </div>

        {/* 진행률 바 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>감수 진행률</span>
            <span>{stats.total > 0 ? Math.round((stats.total - stats.pending) / stats.total * 100) : 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${stats.total > 0 ? (stats.total - stats.pending) / stats.total * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 항목 목록 */}
          <div className="lg:col-span-1 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 w-full"
              >
                <option value="all">전체 카테고리</option>
                <option value="income">소득세</option>
                <option value="corporate">법인세</option>
                <option value="vat">부가가치세</option>
                <option value="capital_gains">양도소득세</option>
                <option value="inheritance">상속세</option>
                <option value="gift">증여세</option>
                <option value="comprehensive_property">종부세</option>
                <option value="acquisition">취득세</option>
              </select>
            </div>

            <div className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setReviewNote(reviews[item.id]?.note || '') }}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                    selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate flex-1">{item.name}</span>
                    {statusBadge(getStatus(item.id))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">{item.subcategory}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 상세 & 감수 */}
          <div className="lg:col-span-2">
            {selectedItem ? (
              <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedItem.name}</h2>
                    <p className="text-sm text-gray-500">{selectedItem.category} &gt; {selectedItem.subcategory}</p>
                  </div>
                  {statusBadge(getStatus(selectedItem.id))}
                </div>

                <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
                  <p className="font-medium mb-1">설명</p>
                  <p>{selectedItem.fullDescription}</p>
                </div>

                {selectedItem.applicableRate && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">적용 세율/공제율: </span>
                    <span className="text-blue-600 font-semibold">{selectedItem.applicableRate}</span>
                  </div>
                )}

                <div className="text-sm">
                  <p className="font-medium text-gray-700 mb-1">법령 근거</p>
                  {selectedItem.legalBasis.map((l, i) => (
                    <p key={i} className="text-gray-600">{l.law} {l.article}</p>
                  ))}
                </div>

                <div className="text-sm">
                  <p className="font-medium text-gray-700 mb-1">적용 요건</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedItem.requirements.map((r, i) => (
                      <li key={i}>{r.description}</li>
                    ))}
                  </ul>
                </div>

                {selectedItem.postManagement && (
                  <div className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-medium text-yellow-800 mb-1">사후관리 ({selectedItem.postManagement.period}년)</p>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1">
                      {selectedItem.postManagement.requirements.map((r, i) => (
                        <li key={i}><strong>{r.item}</strong>: {r.standard}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.warnings && (
                  <div className="text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-medium text-red-800 mb-1">주의사항</p>
                    <ul className="list-disc list-inside text-red-700 space-y-1">
                      {selectedItem.warnings.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                )}

                <div className="text-xs text-gray-400">
                  데이터 버전: {selectedItem.version} | 최종 업데이트: {selectedItem.lastUpdated}
                </div>

                {/* 감수 입력 */}
                <div className="border-t pt-4 space-y-3">
                  <p className="font-semibold text-gray-800">세무사 감수</p>

                  {reviews[selectedItem.id] && (
                    <div className="text-sm bg-blue-50 rounded-lg p-3">
                      <p>감수자: <strong>{reviews[selectedItem.id].by}</strong></p>
                      <p>감수일: {new Date(reviews[selectedItem.id].at).toLocaleDateString('ko-KR')}</p>
                      {reviews[selectedItem.id].note && <p>의견: {reviews[selectedItem.id].note}</p>}
                    </div>
                  )}

                  <textarea
                    value={reviewNote}
                    onChange={e => setReviewNote(e.target.value)}
                    placeholder="감수 의견, 수정 사항, 오류 내용 등을 기재해주세요"
                    className="w-full border rounded-lg px-3 py-2 text-sm h-24 resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveReview(selectedItem.id, 'approved')}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      승인 (정확함)
                    </button>
                    <button
                      onClick={() => saveReview(selectedItem.id, 'needs_update')}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-yellow-600"
                    >
                      수정 필요
                    </button>
                    <button
                      onClick={() => saveReview(selectedItem.id, 'rejected')}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                      반려 (부정확)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
                왼쪽에서 항목을 선택하여 감수를 진행하세요
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
