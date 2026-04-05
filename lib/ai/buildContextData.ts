import { getAllItems } from '@/lib/tax-data/utils'

/**
 * 절세 항목 ID로 AI 프롬프트용 컨텍스트 데이터 생성
 * 유튜브 스크립트 + 블로그 글 생성에서 공통 사용
 */
export function buildContextData(itemId?: string): string {
  if (!itemId) return ''

  const item = getAllItems().find(i => i.id === itemId)
  if (!item) return ''

  return `
### 절세 항목 기본 정보
- 항목명: ${item.name}
- 설명: ${item.fullDescription}
- 적용 세율/공제율: ${item.applicableRate || 'N/A'}
- 최대 절세 금액: ${item.maxSavingAmount ? `${(item.maxSavingAmount / 10000).toLocaleString()}만원` : item.maxDeductionAmount ? `공제한도 ${(item.maxDeductionAmount / 10000).toLocaleString()}만원` : 'N/A'}
- 적용 요건: ${item.requirements.map(r => `${r.description}${r.critical ? ' (필수)' : ''}`).join(', ')}
- 법령 근거: ${item.legalBasis.map(l => `${l.law} ${l.article} (시행일: ${l.effectiveDate}${l.expiryDate ? `, 일몰: ${l.expiryDate}` : ''})`).join(', ')}
- 실행 단계: ${item.steps.join(' -> ')}
${item.exclusions ? `- 적용 제외: ${item.exclusions.join(', ')}` : ''}
${item.warnings ? `- 주의사항: ${item.warnings.join(', ')}` : ''}
${item.commonMistakes ? `- 흔한 실수: ${item.commonMistakes.join(', ')}` : ''}
${item.contentHook ? `- 콘텐츠 훅: ${item.contentHook.hook}` : ''}
${item.postManagement ? `\n### 사후관리 (${item.postManagement.period}년)\n${item.postManagement.requirements.map(r => `- ${r.item}: ${r.standard}`).join('\n')}` : ''}
${item.legalTexts?.length ? `\n### 법령 원문\n${item.legalTexts.map(lt => `[${lt.lawName} ${lt.articleNumber}]\n${lt.keyProvisions.map(p => `  - ${p}`).join('\n')}`).join('\n\n')}` : ''}
${item.practicalCases?.length ? `\n### 실무 사례\n${item.practicalCases.map(c => `[${c.title}]\n${c.situation}\n${c.calculation}\n${c.result}`).join('\n\n')}` : ''}
${item.faqs?.length ? `\n### FAQ\n${item.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}` : ''}
`
}

/**
 * 관련 항목의 다음 콘텐츠 추천
 */
export function buildRelatedTopics(itemId?: string): string {
  if (!itemId) return ''
  const item = getAllItems().find(i => i.id === itemId)
  if (!item?.relatedItems) return ''

  const related = item.relatedItems
    .map(rid => getAllItems().find(i => i.id === rid))
    .filter(Boolean)
    .slice(0, 3)
    .map(r => `- ${r!.name}: ${r!.shortDescription}`)
    .join('\n')

  return related ? `\n\n## 관련 콘텐츠 추천\n${related}` : ''
}
