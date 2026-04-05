// 프로필 저장 — session.ts의 updateUserProfile로 위임
import { updateUserProfile } from '@/lib/auth/session'

export interface UserProfile {
  userId: string
  phone: string
  company: string
  job: string
}

/** 회원가입 시 추가 프로필 저장 */
export async function createProfile(
  profile: UserProfile,
  _token: string
): Promise<void> {
  updateUserProfile(profile.userId, {
    phone: profile.phone,
    company: profile.company,
    job: profile.job,
  })
}
