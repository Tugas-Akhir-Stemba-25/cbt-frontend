import { create } from 'zustand'

interface ClassStore {
  selectedClass: number | null
  setSelectedClass: (class_data: number) => void
}

const useClassStore = create<ClassStore>((set) => ({
  selectedClass: null,
  setSelectedClass: (class_data: number) => set({ selectedClass: class_data })
}))

export default useClassStore
