import { api } from '@/lib/axios'

export const exportResultTest = async (testId: number) => {
  const response = await api.get(`/tests/${testId}/results/export`, {
    responseType: 'blob'
  })

  const blob = new Blob([response.data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  const fileName = `test-results-${formattedTime}.csv`

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
