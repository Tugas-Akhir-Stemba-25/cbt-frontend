import { create } from 'zustand'

interface MajorStore {
  selectedMajor: number | null
  setSelectedMajor: (major: number) => void
}

const useMajorStore = create<MajorStore>((set) => ({
  selectedMajor: null,
  setSelectedMajor: (major: number) => set({ selectedMajor: major })
}))

export default useMajorStore
