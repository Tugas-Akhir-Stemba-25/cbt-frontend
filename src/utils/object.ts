export const extractSortedObject = <T extends Record<string, any>>(obj: T): string[] => {
  return Object.entries(obj) // 🔥 Langsung dapat [key, value]
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Urutkan berdasarkan key
    .map(([_, value]) => value) // Ambil hanya nilai
    .filter((p) => p)
}
