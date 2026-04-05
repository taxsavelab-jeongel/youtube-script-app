// 회원 프로필 추가 정보 저장 (bkend.ai user_profiles 테이블)
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

export interface UserProfile {
  userId: string
  phone: string
  company: string
  job: string
}

/** 회원가입 시 추가 프로필 저장 */
export async function createProfile(
  profile: UserProfile,
  token: string
): Promise<void> {
  const res = await fetch(`${BASE}/tables/user_profiles/rows`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      user_id: profile.userId,
      phone: profile.phone,
      company: profile.company,
      job: profile.job,
    }),
  })
  if (!res.ok) {
    throw new Error('프로필 저장에 실패했습니다.')
  }
}
