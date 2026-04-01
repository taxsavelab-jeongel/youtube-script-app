// Design Ref: §4.4 PUT /api/scripts/[id], §4.5 DELETE /api/scripts/[id]
import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth/session'
import { getScript, updateScript, deleteScript } from '@/lib/db/scriptRepo'

interface Params { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const user = await getSessionUser(request)
  if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })

  const { id } = await params
  const token = request.cookies.get('auth_token')!.value
  const script = await getScript(id, token)

  if (!script) return NextResponse.json({ error: '스크립트를 찾을 수 없습니다.' }, { status: 404 })
  if (script.userId !== user.id) return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })

  return NextResponse.json(script)
}

export async function PUT(request: NextRequest, { params }: Params) {
  const user = await getSessionUser(request)
  if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })

  const { id } = await params
  const token = request.cookies.get('auth_token')!.value

  // 소유권 확인
  const existing = await getScript(id, token)
  if (!existing) return NextResponse.json({ error: '스크립트를 찾을 수 없습니다.' }, { status: 404 })
  if (existing.userId !== user.id) return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })

  const body = await request.json()
  try {
    await updateScript(id, body, token)
    return NextResponse.json({ updatedAt: new Date().toISOString() })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '수정 실패' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const user = await getSessionUser(request)
  if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })

  const { id } = await params
  const token = request.cookies.get('auth_token')!.value

  // 소유권 확인
  const existing = await getScript(id, token)
  if (!existing) return NextResponse.json({ error: '스크립트를 찾을 수 없습니다.' }, { status: 404 })
  if (existing.userId !== user.id) return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })

  try {
    await deleteScript(id, token)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '삭제 실패' },
      { status: 500 }
    )
  }
}
