'use client'

import Link from 'next/link'

export default function ForgotPasswordPage() {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_CONTACT_EMAIL || '관리자'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
          <p className="text-sm text-gray-500 mt-1">
            관리자에게 비밀번호 초기화를 요청하세요
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium mb-1">비밀번호 초기화 방법</p>
            <p className="text-sm text-blue-700">
              현재 이메일 발송 기능이 지원되지 않습니다.
              <br />
              관리자에게 직접 연락하면 임시 비밀번호를 발급해 드립니다.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">요청 방법:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>가입 시 사용한 이메일 주소를 알려주세요</li>
              <li>관리자가 임시 비밀번호를 발급합니다</li>
              <li>임시 비밀번호로 로그인 후 변경하세요</li>
            </ol>
          </div>

          {adminEmail !== '관리자' && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">관리자 연락처</p>
              <a
                href={`mailto:${adminEmail}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {adminEmail}
              </a>
            </div>
          )}

          <Link
            href="/login"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
