import { create } from 'zustand'

interface MaterialStore {
  selectedMaterial: number | null
  setSelectedMaterial: (material_id: number) => void
}

const useMaterialStore = create<MaterialStore>((set) => ({
  selectedMaterial: null,
  setSelectedMaterial: (material_id: number) => set({ selectedMaterial: material_id })
}))

export default useMaterialStore
