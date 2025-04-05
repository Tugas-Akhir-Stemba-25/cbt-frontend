// stores/useWorkAnswerStore.ts
import { create } from 'zustand'

import { WorkAnswer } from '@/types/work/work'

type WorkAnswerStore = {
  workAnswers: WorkAnswer[] | null
  setWorkAnswers: (value: WorkAnswer[] | null) => void
  editWorkAnswer: (value: WorkAnswer, question_id: number) => void
}

export const useWorkAnswerStore = create<WorkAnswerStore>((set, get) => ({
  workAnswers: null,

  setWorkAnswers: (value) => set({ workAnswers: value }),

  editWorkAnswer: (value, question_id) => {
    const current = get().workAnswers

    // Kalau belum ada data sama sekali
    if (!current) {
      return
    }

    // Cek apakah question_id sudah ada sebelumnya
    const existingIndex = current.findIndex((ans) => ans.test_question_id === question_id)

    let updatedAnswers

    if (existingIndex !== -1) {
      // Sudah ada → update
      updatedAnswers = [...current]
      updatedAnswers[existingIndex] = {
        ...updatedAnswers[existingIndex],
        ...value
      }
      set({ workAnswers: updatedAnswers })
    }
  }
}))
