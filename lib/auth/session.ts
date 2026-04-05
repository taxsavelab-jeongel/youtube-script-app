// 자체 인증 시스템 — bkend.ai 의존 없음
// JWT: Node.js 내장 crypto (HMAC-SHA256)
// 유저 저장: /tmp/users.json (Vercel 임시) + 환경변수 ADMIN_EMAIL/ADMIN_PASSWORD (영구)
import { createHmac, randomUUID, scryptSync, timingSafeEqual } from 'crypto'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import type { NextRequest } from 'next/server'

export interface SessionUser {
  id: string
  email: string
}

interface StoredUser {
  id: string
  email: string
  passwordHash: string // "salt:hash" 형식
  phone?: string
  company?: string
  job?: string
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'please-set-JWT_SECRET-in-env'
const USERS_FILE = '/tmp/youtube-script-users.json'

// ── 비밀번호 유틸 ──────────────────────────────────────────
function hashPassword(password: string): string {
  const salt = randomUUID()
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function checkPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':')
    const buf = scryptSync(password, salt, 64)
    return timingSafeEqual(buf, Buffer.from(hash, 'hex'))
  } catch {
    return false
  }
}

// ── 유저 파일 I/O ──────────────────────────────────────────
function loadUsers(): StoredUser[] {
  try {
    if (existsSync(USERS_FILE)) {
      return JSON.parse(readFileSync(USERS_FILE, 'utf-8')) as StoredUser[]
    }
  } catch {
    // 파일 없음 또는 파싱 실패 → 빈 배열
  }
  return []
}

function saveUsers(users: StoredUser[]): void {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

// ── JWT 유틸 ──────────────────────────────────────────────
function createToken(user: SessionUser): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(
    JSON.stringify({ sub: user.id, email: user.email, iat: now, exp: now + 7 * 24 * 3600 })
  ).toString('base64url')
  const sig = createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${sig}`
}

function verifyTokenSync(token: string): SessionUser | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, payload, sig] = parts
    const expected = createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url')
    // 타이밍 공격 방어
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      sub: string; email: string; exp: number
    }
    if (data.exp < Date.now() / 1000) return null
    return { id: data.sub, email: data.email }
  } catch {
    return null
  }
}

// ── Public API ─────────────────────────────────────────────

/** Request 쿠키 / Authorization 헤더에서 세션 유저 추출 */
export async function getSessionUser(
  request: NextRequest | Request
): Promise<SessionUser | null> {
  let token: string | null = null
  if ('cookies' in request && typeof (request as NextRequest).cookies?.get === 'function') {
    token = (request as NextRequest).cookies.get('auth_token')?.value ?? null
  }
  if (!token) {
    const auth = request.headers.get('Authorization')
    if (auth?.startsWith('Bearer ')) token = auth.slice(7)
  }
  if (!token) return null
  return verifyTokenSync(token)
}

/** 로그인 */
export async function signIn(
  email: string,
  password: string
): Promise<{ token: string; user: SessionUser } | { error: string }> {
  // 1) 환경변수 관리자 계정 (Vercel 재배포 후에도 항상 유효)
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
    const user: SessionUser = { id: 'admin', email: adminEmail }
    return { token: createToken(user), user }
  }

  // 2) 파일 기반 일반 유저
  const users = loadUsers()
  const found = users.find((u) => u.email === email)
  if (!found || !checkPassword(password, found.passwordHash)) {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }
  const user: SessionUser = { id: found.id, email: found.email }
  return { token: createToken(user), user }
}

/** 회원가입 */
export async function signUp(
  email: string,
  password: string,
  _name?: string
): Promise<{ token: string; user: SessionUser } | { error: string }> {
  // 관리자 이메일은 가입 불가 (환경변수로만 관리)
  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail && email === adminEmail) {
    return { error: '이미 사용 중인 이메일입니다.' }
  }

  const users = loadUsers()
  if (users.find((u) => u.email === email)) {
    return { error: '이미 사용 중인 이메일입니다.' }
  }

  const newUser: StoredUser = {
    id: randomUUID(),
    email,
    passwordHash: hashPassword(password),
  }
  users.push(newUser)
  saveUsers(users)

  const user: SessionUser = { id: newUser.id, email: newUser.email }
  return { token: createToken(user), user }
}

/** profileRepo에서 유저 프로필 업데이트용 */
export function updateUserProfile(
  userId: string,
  profile: { phone?: string; company?: string; job?: string }
): void {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...profile }
    saveUsers(users)
  }
}
