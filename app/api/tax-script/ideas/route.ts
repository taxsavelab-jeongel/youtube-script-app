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
  }))

  return NextResponse.json({ ideas, total: ideas.length })
}
