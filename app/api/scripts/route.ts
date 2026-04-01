// Design Ref: §4.2 GET /api/scripts, §4.3 POST /api/scripts
// Plan SC: SC-03(저장), SC-04(목록 조회)
import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth/session'
import { listScripts, createScript } from '@/lib/db/scriptRepo'

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request)
  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const token = request.cookies.get('auth_token')!.value
  try {
    const result = await listScripts(token)
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '서버 오류' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser(request)
  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const token = request.cookies.get('auth_token')!.value
  const body = await request.json()

  if (!body.title || !body.scriptContent) {
    return NextResponse.json(
      { error: '제목과 스크립트 내용이 필요합니다.' },
      { status: 400 }
    )
  }

  try {
    const result = await createScript(body, user.id, token)
    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '저장 실패' },
      { status: 500 }
    )
  }
}
