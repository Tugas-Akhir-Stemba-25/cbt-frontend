import { create } from 'zustand'

interface ActiveQuestionStore {
  activeQuestion: { id: number; no: number } | null
  setActiveQuestion: (id: number, num: number) => void
}

const useActiveQuestionStore = create<ActiveQuestionStore>((set) => ({
  activeQuestion: null,
  setActiveQuestion: (id: number, num: number) => set({ activeQuestion: { id, no: num } })
}))

export default useActiveQuestionStore
