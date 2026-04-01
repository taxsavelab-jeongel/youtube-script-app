// Design Ref: §5 State Management — Zustand 전역 상태
import { create } from 'zustand'
import type { GenerateParams, Script, SaveScriptData } from '@/types/script'

interface ScriptState {
  // 생성 폼 상태
  formParams: GenerateParams | null

  // 스트리밍 상태
  isGenerating: boolean
  streamingScript: string
  generatedTitles: string[]
  generatedThumbnails: string[]
  generatedHashtags: string[]
  error: string | null

  // 저장된 스크립트 목록
  scripts: Script[]
  isLoading: boolean

  // Generation actions
  setFormParams: (params: GenerateParams) => void
  startGeneration: () => void
  appendScriptChunk: (chunk: string) => void
  addTitle: (title: string) => void
  addThumbnail: (idea: string) => void
  setHashtags: (tags: string[]) => void
  finishGeneration: () => void
  setError: (error: string) => void
  resetGeneration: () => void

  // Script CRUD actions
  fetchScripts: () => Promise<void>
  saveScript: (data: SaveScriptData) => Promise<string>
  updateScript: (id: string, data: Partial<Script>) => Promise<void>
  deleteScript: (id: string) => Promise<void>
}

export const useScriptStore = create<ScriptState>((set, get) => ({
  formParams: null,
  isGenerating: false,
  streamingScript: '',
  generatedTitles: [],
  generatedThumbnails: [],
  generatedHashtags: [],
  error: null,
  scripts: [],
  isLoading: false,

  setFormParams: (params) => set({ formParams: params }),

  startGeneration: () =>
    set({
      isGenerating: true,
      streamingScript: '',
      generatedTitles: [],
      generatedThumbnails: [],
      generatedHashtags: [],
      error: null,
    }),

  appendScriptChunk: (chunk) =>
    set((state) => ({ streamingScript: state.streamingScript + chunk })),

  addTitle: (title) =>
    set((state) => ({ generatedTitles: [...state.generatedTitles, title] })),

  addThumbnail: (idea) =>
    set((state) => ({
      generatedThumbnails: [...state.generatedThumbnails, idea],
    })),

  setHashtags: (tags) => set({ generatedHashtags: tags }),

  finishGeneration: () => set({ isGenerating: false }),

  setError: (error) => set({ error, isGenerating: false }),

  resetGeneration: () =>
    set({
      isGenerating: false,
      streamingScript: '',
      generatedTitles: [],
      generatedThumbnails: [],
      generatedHashtags: [],
      error: null,
    }),

  fetchScripts: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/scripts')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ scripts: data.scripts, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  saveScript: async (data) => {
    const res = await fetch('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to save script')
    const result = await res.json()
    await get().fetchScripts()
    return result.id
  },

  updateScript: async (id, data) => {
    const res = await fetch(`/api/scripts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update script')
    await get().fetchScripts()
  },

  deleteScript: async (id) => {
    const res = await fetch(`/api/scripts/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete script')
    set((state) => ({ scripts: state.scripts.filter((s) => s.id !== id) }))
  },
}))
