// Design Ref: §8 Data Model — bkend.ai CRUD 래퍼
// Plan SC: SC-03(저장), SC-04(목록 조회)
import type { Script, SaveScriptData } from '@/types/script'

const BASE = process.env.BKEND_BASE_URL
const PROJECT_ID = process.env.NEXT_PUBLIC_BKEND_PROJECT_ID
const API_KEY = process.env.BKEND_API_KEY

function headers(token?: string) {
  return {
    'Content-Type': 'application/json',
    'X-Project-Id': PROJECT_ID ?? '',
    'X-Api-Key': API_KEY ?? '',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/** 사용자의 스크립트 목록 조회 */
export async function listScripts(
  token: string
): Promise<{ scripts: Script[]; total: number }> {
  const res = await fetch(
    `${BASE}/tables/scripts/rows?orderBy=created_at&order=desc`,
    { headers: headers(token), cache: 'no-store' }
  )
  if (!res.ok) throw new Error('스크립트 목록을 불러오지 못했습니다.')
  const data = await res.json()
  return {
    scripts: (data.rows ?? []).map(mapRow),
    total: data.total ?? 0,
  }
}

/** 스크립트 단건 조회 */
export async function getScript(
  id: string,
  token: string
): Promise<Script | null> {
  const res = await fetch(`${BASE}/tables/scripts/rows/${id}`, {
    headers: headers(token),
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('스크립트를 불러오지 못했습니다.')
  const data = await res.json()
  return mapRow(data)
}

/** 스크립트 저장 */
export async function createScript(
  data: SaveScriptData,
  userId: string,
  token: string
): Promise<{ id: string }> {
  const res = await fetch(`${BASE}/tables/scripts/rows`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      user_id: userId,
      title: data.title,
      topic: data.topic,
      channel_style: data.channelStyle,
      video_length: data.videoLength,
      target_audience: data.targetAudience,
      titles_candidates: data.titlesCandidates,
      thumbnail_ideas: data.thumbnailIdeas,
      script_content: data.scriptContent,
      hashtags: data.hashtags,
    }),
  })
  if (!res.ok) throw new Error('스크립트 저장에 실패했습니다.')
  const result = await res.json()
  return { id: result.id }
}

/** 스크립트 수정 */
export async function updateScript(
  id: string,
  data: Partial<Script>,
  token: string
): Promise<void> {
  const body: Record<string, unknown> = {}
  if (data.title !== undefined) body.title = data.title
  if (data.scriptContent !== undefined) body.script_content = data.scriptContent
  if (data.hashtags !== undefined) body.hashtags = data.hashtags

  const res = await fetch(`${BASE}/tables/scripts/rows/${id}`, {
    method: 'PATCH',
    headers: headers(token),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('스크립트 수정에 실패했습니다.')
}

/** 스크립트 삭제 */
export async function deleteScript(
  id: string,
  token: string
): Promise<void> {
  const res = await fetch(`${BASE}/tables/scripts/rows/${id}`, {
    method: 'DELETE',
    headers: headers(token),
  })
  if (!res.ok) throw new Error('스크립트 삭제에 실패했습니다.')
}

// bkend.ai snake_case → camelCase 변환
function mapRow(row: Record<string, unknown>): Script {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    title: row.title as string,
    topic: row.topic as string,
    channelStyle: row.channel_style as Script['channelStyle'],
    videoLength: row.video_length as Script['videoLength'],
    targetAudience: row.target_audience as Script['targetAudience'],
    titlesCandidates: (row.titles_candidates as string[]) ?? [],
    thumbnailIdeas: (row.thumbnail_ideas as string[]) ?? [],
    scriptContent: row.script_content as string,
    hashtags: (row.hashtags as string[]) ?? [],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}
