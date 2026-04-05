import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordByEmailAndPhone } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { email, phone } = body as { email?: string; phone?: string }

  if (!email || !phone) {
    return NextResponse.json(
      { error: '이메일과 핸드폰 번호를 모두 입력해주세요.' },
      { status: 400 }
    )
  }

  const tempPassword = resetPasswordByEmailAndPhone(email.trim().toLowerCase(), phone)

  if (!tempPassword) {
    return NextResponse.json(
      { error: '이메일 또는 핸드폰 번호가 일치하지 않습니다.' },
      { status: 404 }
    )
  }

  return NextResponse.json({ tempPassword })
}
