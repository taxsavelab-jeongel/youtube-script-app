'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface VerifyCheck {
  field: string
  appValue: string
  legalValue?: string
  match: boolean
  note?: string
}

interface VerifyResult {
  itemId: string
  itemName: string
  status: 'verified' | 'mismatch' | 'unverified' | 'api_unavailable'
  checks: VerifyCheck[]
  verifiedAt: string
}

interface VerifySummary {
  total: number
  verified: number
  mismatch: number
  unverified: number
  verifiedRate: number
}

export default function AdminVerifyPage() {
  const [summary, setSummary] = useState<VerifySummary | null>(null)
  const [results, setResults] = useState<VerifyResult[]>([])
  const [hasApiKey, setHasApiKey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'verified' | 'mismatch' | 'unverified'>('all')

  useEffect(() => {
    fetch('/api/admin/verify')
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary)
        setResults(data.results)
        setHasApiKey(data.hasApiKey)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? results : results.filter(r => r.status === filter)

  const statusConfig = {
    verified: { label: '검증 완료', color: 'bg-green-100 text-green-700', icon: '✅' },
    mismatch: { label: '불일치', color: 'bg-red-100 text-red-700', icon: '❌' },
    unverified: { label: '미검증', color: 'bg-yellow-100 text-yellow-700', icon: '⚠️' },
    api_unavailable: { label: 'API 미연결', color: 'bg-gray-100 text-gray-700', icon: '🔌' },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">검증 데이터 로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="font-bold text-gray-900">세법 데이터 검증 대시보드</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/review" className="text-sm text-gray-600 hover:text-blue-600">세무사 감수</Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">홈</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* 요약 카드 */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
              <p className="text-3xl font-bold text-gray-900">{summary.total}</p>
              <p className="text-sm text-gray-500">전체 항목</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
              <p className="text-3xl font-bold text-green-600">{summary.verified}</p>
              <p className="text-sm text-gray-500">검증 완료</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
              <p className="text-3xl font-bold text-red-600">{summary.mismatch}</p>
              <p className="text-sm text-gray-500">불일치</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
              <p className="text-3xl font-bold text-yellow-600">{summary.unverified}</p>
              <p className="text-sm text-gray-500">미검증</p>
            </div>
          </div>
        )}

        {/* 신뢰도 게이지 */}
        {summary && (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-900">데이터 신뢰도</h2>
              <span className={`text-2xl font-bold ${
                summary.verifiedRate >= 80 ? 'text-green-600' :
                summary.verifiedRate >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>{summary.verifiedRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  summary.verifiedRate >= 80 ? 'bg-green-500' :
                  summary.verifiedRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${summary.verifiedRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              법령 원문(legalTexts) 등록 + 교차 검증 완료 항목 비율
            </p>
          </div>
        )}

        {/* API 연동 상태 */}
        <div className={`rounded-xl p-4 border ${hasApiKey ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center gap-2">
            <span>{hasApiKey ? '🟢' : '🟡'}</span>
            <span className="font-medium text-sm">
              {hasApiKey
                ? '법제처 Open API 연동됨 — 실시간 법령 대조 가능'
                : '법제처 Open API 미연동 — 자체 검증만 가능'}
            </span>
          </div>
          {!hasApiKey && (
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <p>실시간 법령 검증을 위해 API 키를 설정하세요:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li><a href="https://open.law.go.kr" target="_blank" className="text-blue-600 underline">open.law.go.kr</a> 회원가입</li>
                <li>Open API 활용신청 (1~2일 승인)</li>
                <li>OC 인증키 발급</li>
                <li><code className="bg-gray-200 px-1 rounded">.env.local</code>에 <code className="bg-gray-200 px-1 rounded">LEGAL_API_OC=발급받은키</code> 추가</li>
              </ol>
            </div>
          )}
        </div>

        {/* 필터 */}
        <div className="flex gap-2">
          {(['all', 'verified', 'mismatch', 'unverified'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-gray-900 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? '전체' : statusConfig[f].label}
              {f !== 'all' && ` (${results.filter(r => r.status === f).length})`}
            </button>
          ))}
        </div>

        {/* 검증 결과 목록 */}
        <div className="space-y-3">
          {filtered.map(r => {
            const cfg = statusConfig[r.status]
            return (
              <div key={r.itemId} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{cfg.icon}</span>
                    <h3 className="font-medium text-gray-900">{r.itemName}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>

                {r.checks.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {r.checks.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span>{c.match ? '✅' : '❌'}</span>
                        <span className="text-gray-600">{c.field}:</span>
                        <span className="font-mono text-gray-800">{c.appValue}</span>
                        {c.legalValue && (
                          <>
                            <span className="text-gray-400">→</span>
                            <span className="font-mono text-gray-800">{c.legalValue}</span>
                          </>
                        )}
                        {c.note && <span className="text-gray-400">({c.note})</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-400 text-center py-4">
          검증 기준: 2026년 현행 세법 | 법제처 국가법령정보 Open API 연동
        </p>
      </main>
    </div>
  )
}
