'use client'

import { useEffect, useState } from 'react'

type ApprovalStatus = 'pending' | 'approved' | 'rejected'

interface User {
  id: string
  email: string
  phone?: string
  company?: string
  job?: string
  approvalStatus: ApprovalStatus
  createdAt: string
}

const STATUS_LABEL: Record<ApprovalStatus, string> = {
  pending: '대기 중',
  approved: '승인됨',
  rejected: '거절됨',
}

const STATUS_COLOR: Record<ApprovalStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<ApprovalStatus | 'all'>('all')

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || '사용자 목록을 불러올 수 없습니다.')
        return
      }
      const data = await res.json()
      setUsers(data.users)
    } catch {
      setError('서버에 연결할 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleStatusChange = async (userId: string, status: ApprovalStatus) => {
    setUpdating(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || '처리에 실패했습니다.')
        return
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, approvalStatus: status } : u))
      )
    } catch {
      alert('서버에 연결할 수 없습니다.')
    } finally {
      setUpdating(null)
    }
  }

  const filteredUsers = filter === 'all' ? users : users.filter((u) => u.approvalStatus === filter)
  const pendingCount = users.filter((u) => u.approvalStatus === 'pending').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
            <p className="text-sm text-gray-500 mt-1">
              가입 신청자를 검토하고 승인 또는 거절하세요
            </p>
          </div>
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              대기 {pendingCount}명
            </span>
          )}
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 border-b border-gray-200">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                filter === f
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'all' ? '전체' : STATUS_LABEL[f]}
              <span className="ml-1.5 text-xs text-gray-400">
                ({f === 'all' ? users.length : users.filter((u) => u.approvalStatus === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* 상태 */}
        {loading && (
          <div className="text-center py-12 text-gray-400">불러오는 중...</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 사용자 목록 */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">
            해당하는 사용자가 없습니다
          </div>
        )}

        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 truncate">{user.email}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[user.approvalStatus]}`}
                    >
                      {STATUS_LABEL[user.approvalStatus]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    {user.company && <span>🏢 {user.company}</span>}
                    {user.job && <span>💼 {user.job}</span>}
                    {user.phone && <span>📱 {user.phone}</span>}
                  </div>
                  <p className="text-xs text-gray-400">
                    가입 신청: {new Date(user.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2 shrink-0">
                  {user.approvalStatus !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(user.id, 'approved')}
                      disabled={updating === user.id}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {updating === user.id ? '처리 중...' : '승인'}
                    </button>
                  )}
                  {user.approvalStatus !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(user.id, 'rejected')}
                      disabled={updating === user.id}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {updating === user.id ? '처리 중...' : '거절'}
                    </button>
                  )}
                  {user.approvalStatus !== 'pending' && (
                    <button
                      onClick={() => handleStatusChange(user.id, 'pending')}
                      disabled={updating === user.id}
                      className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      대기로
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
