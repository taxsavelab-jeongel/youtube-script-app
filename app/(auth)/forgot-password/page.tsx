'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setTempPassword(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? '오류가 발생했습니다.')
      } else {
        setTempPassword(data.tempPassword)
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
          <p className="text-sm text-gray-500 mt-1">
            가입 시 등록한 이메일과 핸드폰 번호를 입력하세요
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          {tempPassword ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-800 font-medium mb-2">임시 비밀번호가 발급되었습니다</p>
                <p className="text-2xl font-bold tracking-widest text-green-900 bg-green-100 rounded-lg py-3 px-4">
                  {tempPassword}
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center">
                이 비밀번호로 로그인 후 즉시 변경해주세요.
              </p>
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
              >
                로그인하러 가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="가입 시 사용한 이메일"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  핸드폰 번호
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
              >
                {loading ? '확인 중...' : '임시 비밀번호 발급'}
              </button>

              <Link
                href="/login"
                className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1"
              >
                로그인으로 돌아가기
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
