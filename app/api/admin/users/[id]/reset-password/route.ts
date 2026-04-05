import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, resetUserPassword } from '@/lib/auth/session'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser(request)
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session.email !== adminEmail) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 })
  }

  const { id } = await params
  const tempPassword = resetUserPassword(id)
  if (!tempPassword) {
    return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
  }

  return NextResponse.json({ tempPassword })
}
