import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, getAllUsers } from '@/lib/auth/session'

export async function GET(request: NextRequest) {
  const session = await getSessionUser(request)
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session.email !== adminEmail) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 })
  }

  const users = getAllUsers()
  return NextResponse.json({ users })
}
