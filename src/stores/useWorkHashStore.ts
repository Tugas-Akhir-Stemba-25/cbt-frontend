import { create } from 'zustand'

interface WorkHashStore {
  hash: string | null
  setHash: (hash: string) => void
}

const useWorkHashStore = create<WorkHashStore>((set) => ({
  hash: null,
  setHash: (hash: string) => set({ hash })
}))

export default useWorkHashStore
