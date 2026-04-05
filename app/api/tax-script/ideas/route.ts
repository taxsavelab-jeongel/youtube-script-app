import { NextResponse } from 'next/server'
import { getContentIdeas } from '@/lib/tax-data/utils'

export async function GET() {
  const items = getContentIdeas()
  const ideas = items.map(item => ({
    id: item.id,
    name: item.name,
    contentHook: item.contentHook,
    category: item.category,
    subcategory: item.subcategory,
    impactLevel: item.impactLevel,
    targetAudience: item.targetAudience,
    verificationStatus: item.verification?.status || 'unverified',
    verifiedDate: item.verification?.verifiedDate || null,
    hasLegalTexts: (item.legalTexts?.length || 0) > 0,
    legalBasisCount: item.legalBasis?.length || 0,
    legalSourceUrl: item.legalTexts?.[0]?.sourceUrl || item.legalBasis?.[0]?.url || null,
    legalSourceName: item.legalTexts?.[0] ? `${item.legalTexts[0].lawName} ${item.legalTexts[0].articleNumber}` : item.legalBasis?.[0] ? `${item.legalBasis[0].law} ${item.legalBasis[0].article}` : null,
  }))

  return NextResponse.json({ ideas, total: ideas.length })
}
