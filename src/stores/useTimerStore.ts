// stores/useTimerStore.ts
import { create } from 'zustand'

type TimerStore = {
  remainingSeconds: number | null
  setRemainingSeconds: (value: number) => void
  decrement: () => void
  reset: () => void
}

export const useTimerStore = create<TimerStore>((set) => ({
  remainingSeconds: null,
  setRemainingSeconds: (value) => set({ remainingSeconds: value }),
  decrement: () =>
    set((state) => ({
      remainingSeconds: state.remainingSeconds && state.remainingSeconds > 0 ? state.remainingSeconds - 1 : 0
    })),
  reset: () => set({ remainingSeconds: null })
}))
