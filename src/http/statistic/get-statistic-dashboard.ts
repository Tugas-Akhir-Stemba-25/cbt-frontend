import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export const useDashboardStatistic = () => {
  return useQuery({
    queryKey: ['statistic-dashboard'],
    queryFn: async () => {
      const res = await api.get('/statistic/dashboard')
      return res.data.data?.[0]
    }
  })
}
