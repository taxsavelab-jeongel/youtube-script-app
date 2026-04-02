import { NextResponse } from 'next/server'
import { getAllItems } from '@/lib/tax-data/utils'

export async function GET() {
  const items = getAllItems().map(item => ({
    id: item.id,
    name: item.name,
    shortDescription: item.shortDescription,
    fullDescription: item.fullDescription,
    category: item.category,
    subcategory: item.subcategory,
    applicableRate: item.applicableRate || '',
    legalBasis: item.legalBasis,
    requirements: item.requirements,
    postManagement: item.postManagement,
    warnings: item.warnings,
    lastUpdated: item.lastUpdated,
    version: item.version,
  }))

  return NextResponse.json({ items, total: items.length })
}
