// 파일 기반 스크립트 저장소 — bkend.ai 의존 없음
// Vercel: /tmp/youtube-script-scripts.json (인스턴스 내 유지)
import { randomUUID } from 'crypto'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import type { Script, SaveScriptData } from '@/types/script'

const SCRIPTS_FILE = '/tmp/youtube-script-scripts.json'

function loadAll(): Script[] {
  try {
    if (existsSync(SCRIPTS_FILE)) {
      return JSON.parse(readFileSync(SCRIPTS_FILE, 'utf-8')) as Script[]
    }
  } catch {
    // 파일 없음 또는 파싱 실패
  }
  return []
}

function saveAll(scripts: Script[]): void {
  writeFileSync(SCRIPTS_FILE, JSON.stringify(scripts, null, 2), 'utf-8')
}

/** 사용자의 스크립트 목록 조회 */
export async function listScripts(
  token: string
): Promise<{ scripts: Script[]; total: number }> {
  void token // 파일 기반에서는 토큰 불필요 (API Route에서 세션 검증 완료)
  const all = loadAll()
  // 최신순 정렬
  const sorted = [...all].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return { scripts: sorted, total: sorted.length }
}

/** 스크립트 단건 조회 */
export async function getScript(
  id: string,
  token: string
): Promise<Script | null> {
  void token
  const all = loadAll()
  return all.find((s) => s.id === id) ?? null
}

/** 스크립트 저장 */
export async function createScript(
  data: SaveScriptData,
  userId: string,
  token: string
): Promise<{ id: string }> {
  void token
  const now = new Date().toISOString()
  const script: Script = {
    id: randomUUID(),
    userId,
    title: data.title,
    topic: data.topic,
    channelStyle: data.channelStyle,
    videoLength: data.videoLength,
    targetAudience: data.targetAudience,
    titlesCandidates: data.titlesCandidates,
    thumbnailIdeas: data.thumbnailIdeas,
    scriptContent: data.scriptContent,
    hashtags: data.hashtags,
    createdAt: now,
    updatedAt: now,
  }
  const all = loadAll()
  all.push(script)
  saveAll(all)
  return { id: script.id }
}

/** 스크립트 수정 */
export async function updateScript(
  id: string,
  data: Partial<Script>,
  token: string
): Promise<void> {
  void token
  const all = loadAll()
  const idx = all.findIndex((s) => s.id === id)
  if (idx === -1) throw new Error('스크립트를 찾을 수 없습니다.')
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() }
  saveAll(all)
}

/** 스크립트 삭제 */
export async function deleteScript(
  id: string,
  token: string
): Promise<void> {
  void token
  const all = loadAll()
  const filtered = all.filter((s) => s.id !== id)
  if (filtered.length === all.length) throw new Error('스크립트를 찾을 수 없습니다.')
  saveAll(filtered)
}
