'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { TargetAudience } from '@/types/tax-database'

type Step = 'profile' | 'result'

interface UserProfile {
  type: TargetAudience
  age: number
  annualIncome: number
  homeCount: number
  children: number
  isNewlywed: boolean
  hasRecentBirth: boolean
  monthlyRent: number
  pensionSavings: number
  irpContribution: number
  businessYears: number
  corporateValue: number
  hasSuccessionPlan: boolean
  parentBusinessYears: number
  parentAge: number
}

const DEFAULT_PROFILE: UserProfile = {
  type: 'employee',
  age: 35,
  annualIncome: 50_000_000,
  homeCount: 0,
  children: 0,
  isNewlywed: false,
  hasRecentBirth: false,
  monthlyRent: 0,
  pensionSavings: 0,
  irpContribution: 0,
  businessYears: 0,
  corporateValue: 0,
  hasSuccessionPlan: false,
  parentBusinessYears: 0,
  parentAge: 0,
}

const TARGET_OPTIONS = [
  { value: 'employee', label: '직장인', icon: '💼' },
  { value: 'freelancer', label: '프리랜서', icon: '💻' },
  { value: 'sole_proprietor', label: '개인사업자', icon: '🏪' },
  { value: 'corporation', label: '법인 대표', icon: '🏢' },
  { value: 'investor', label: '투자자', icon: '📈' },
  { value: 'business_owner', label: '기업 오너 (승계)', icon: '👔' },
]

interface Recommendation {
  id: string
  name: string
  shortDescription: string
  impactLevel: string
  estimatedSaving: number
  applicableRate: string
  steps: string[]
  contentHook?: { title: string }
  warnings?: string[]
  category?: string
  subcategory?: string
}

interface SimulationResult {
  recommendations: Recommendation[]
  totalEstimatedSaving: number
  disclaimer?: string
  dataVersion?: string
  lastVerified?: string
}

export default function TaxSimulatorPage() {
  const [step, setStep] = useState<Step>('profile')
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [results, setResults] = useState<Recommendation[]>([])
  const [totalSaving, setTotalSaving] = useState(0)
  const [disclaimer, setDisclaimer] = useState('')
  const [dataVersion, setDataVersion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')
    try {
      const res = await fetch('/api/tax-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (!res.ok) throw new Error('분석 실패')
      const data: SimulationResult = await res.json()
      setResults(data.recommendations)
      setTotalSaving(data.totalEstimatedSaving)
      setDisclaimer(data.disclaimer || '')
      setDataVersion(data.dataVersion || '')
      setStep('result')
    } catch {
      setError('절세 분석 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const showBusinessFields = ['sole_proprietor', 'corporation', 'business_owner'].includes(profile.type)
  const showSuccessionFields = profile.type === 'business_owner'

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-bold text-gray-900">AI 절세 시뮬레이터</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/generate" className="text-sm text-gray-600 hover:text-blue-600">스크립트 생성</Link>
            <Link href="/tax-script" className="text-sm text-gray-600 hover:text-blue-600">절세 콘텐츠</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {step === 'profile' ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">나의 절세 전략 찾기</h1>
              <p className="text-gray-500 mt-2">프로필을 입력하면 AI가 맞춤 절세 전략을 추천합니다</p>
            </div>

            {/* 대상자 유형 선택 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <label className="block text-sm font-semibold text-gray-700 mb-3">나는 누구인가요?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TARGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleChange('type', opt.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      profile.type === opt.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="text-sm font-medium mt-1">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
              <h2 className="font-semibold text-gray-800">기본 정보</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">나이</label>
                  <input type="number" value={profile.age} onChange={e => handleChange('age', +e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">연간 소득 (만원)</label>
                  <input type="number" value={profile.annualIncome / 10000}
                    onChange={e => handleChange('annualIncome', +e.target.value * 10000)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">보유 주택 수</label>
                  <input type="number" value={profile.homeCount} onChange={e => handleChange('homeCount', +e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" min={0} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">자녀 수</label>
                  <input type="number" value={profile.children} onChange={e => handleChange('children', +e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" min={0} />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={profile.isNewlywed} onChange={e => handleChange('isNewlywed', e.target.checked)}
                    className="rounded" />
                  신혼부부 (2024~2026 혼인신고)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={profile.hasRecentBirth} onChange={e => handleChange('hasRecentBirth', e.target.checked)}
                    className="rounded" />
                  최근 출산
                </label>
              </div>
            </div>

            {/* 절세 수단 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
              <h2 className="font-semibold text-gray-800">현재 활용 중인 절세 수단</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">월세 (원/월)</label>
                  <input type="number" value={profile.monthlyRent} onChange={e => handleChange('monthlyRent', +e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">연금저축 연 납입 (만원)</label>
                  <input type="number" value={profile.pensionSavings / 10000}
                    onChange={e => handleChange('pensionSavings', +e.target.value * 10000)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">IRP 연 납입 (만원)</label>
                  <input type="number" value={profile.irpContribution / 10000}
                    onChange={e => handleChange('irpContribution', +e.target.value * 10000)}
                    className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            </div>

            {/* 사업자/법인/승계 관련 */}
            {showBusinessFields && (
              <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
                <h2 className="font-semibold text-gray-800">사업/법인 정보</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">사업 영위 기간 (년)</label>
                    <input type="number" value={profile.businessYears} onChange={e => handleChange('businessYears', +e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">기업 가치 (억원)</label>
                    <input type="number" value={profile.corporateValue / 100_000_000}
                      onChange={e => handleChange('corporateValue', +e.target.value * 100_000_000)}
                      className="w-full border rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>

                {showSuccessionFields && (
                  <>
                    <label className="flex items-center gap-2 text-sm mt-2">
                      <input type="checkbox" checked={profile.hasSuccessionPlan}
                        onChange={e => handleChange('hasSuccessionPlan', e.target.checked)} className="rounded" />
                      가업승계 계획 있음
                    </label>
                    {profile.hasSuccessionPlan && (
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">부모(증여자) 나이</label>
                          <input type="number" value={profile.parentAge}
                            onChange={e => handleChange('parentAge', +e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">부모 경영 기간 (년)</label>
                          <input type="number" value={profile.parentBusinessYears}
                            onChange={e => handleChange('parentBusinessYears', +e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? '분석 중...' : '나의 절세 전략 분석하기'}
            </button>
          </div>
        ) : (
          /* 결과 화면 */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">맞춤 절세 전략 결과</h1>
              <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
                <p className="text-sm opacity-80">예상 총 절세 가능 금액</p>
                <p className="text-4xl font-bold mt-1">
                  {totalSaving >= 100_000_000
                    ? `${(totalSaving / 100_000_000).toFixed(1)}억원`
                    : `${(totalSaving / 10_000).toLocaleString()}만원`}
                </p>
                <p className="text-xs opacity-70 mt-2">* 실제 절세 금액은 세무사 상담을 통해 확정하세요</p>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        item.impactLevel === 'very_high' ? 'bg-red-100 text-red-700' :
                        item.impactLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.shortDescription}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {item.estimatedSaving >= 100_000_000
                          ? `~${(item.estimatedSaving / 100_000_000).toFixed(0)}억`
                          : `~${(item.estimatedSaving / 10_000).toLocaleString()}만원`}
                      </p>
                      <p className="text-xs text-gray-400">{item.applicableRate}</p>
                    </div>
                  </div>

                  {/* 실행 체크리스트 */}
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-semibold text-gray-500 mb-2">실행 체크리스트</p>
                    <ul className="space-y-1">
                      {item.steps.slice(0, 3).map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-4 h-4 border rounded flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.warnings && item.warnings.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-700">⚠️ {item.warnings[0]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('profile')}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">
                다시 분석하기
              </button>
              <Link href="/tax-script"
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 text-center">
                이 주제로 유튜브 스크립트 만들기
              </Link>
            </div>

            {/* 법령 근거 및 면책 */}
            <div className="bg-gray-100 rounded-xl p-4 space-y-2">
              {dataVersion && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                  데이터 버전: {dataVersion} | 2026년 현행 세법 기준
                </p>
              )}
              <p className="text-xs text-gray-500">
                {disclaimer || '* 본 결과는 정보 제공 목적이며, 법적 효력이 없습니다. 반드시 세무사 상담을 받으세요.'}
              </p>
              <p className="text-xs text-gray-400">
                근거 법령: 소득세법, 법인세법, 상속세 및 증여세법, 조세특례제한법 등 | 세율·한도는 코드 기반 계산 (AI 추정 아님)
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
