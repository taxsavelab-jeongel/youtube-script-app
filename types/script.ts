// Design Ref: §9 TypeScript Types — 전체 앱의 타입 기반
export type ChannelStyle =
  | 'education'
  | 'entertainment'
  | 'vlog'
  | 'review'
  | 'tutorial'

export type VideoLength = 'shorts' | 'normal' | 'long'

export type TargetAudience =
  | 'beginner'
  | 'general'
  | 'intermediate'
  | 'expert'

export interface GenerateParams {
  topic: string
  channelStyle: ChannelStyle
  videoLength: VideoLength
  targetAudience: TargetAudience
  referenceChannel?: string
}

export interface Script {
  id: string
  userId: string
  title: string
  topic: string
  channelStyle: ChannelStyle
  videoLength: VideoLength
  targetAudience: TargetAudience
  titlesCandidates: string[]
  thumbnailIdeas: string[]
  scriptContent: string
  hashtags: string[]
  createdAt: string
  updatedAt: string
}

export interface SaveScriptData extends GenerateParams {
  title: string
  titlesCandidates: string[]
  thumbnailIdeas: string[]
  scriptContent: string
  hashtags: string[]
}

export interface GenerateStreamEvent {
  type: 'title' | 'thumbnail' | 'script' | 'hashtags' | 'done' | 'error'
  index?: number
  content?: string
  chunk?: string
  tags?: string[]
  usage?: { inputTokens: number; outputTokens: number }
  code?: string
  message?: string
}
