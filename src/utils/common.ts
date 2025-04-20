export const buildStorageUrl = (path?: string | null) => {
  const appUrl = process.env.NEXT_PUBLIC_STORAGE_URL
  if (!path) return appUrl
  const url = new URL(path, appUrl)
  return url.toString()
}
