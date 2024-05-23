import { getSwot } from '@/services/swot.service'
import { useQuery } from '@tanstack/react-query'

export const useSwot = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [`swot-${id}`, id],
    queryFn: () => getSwot({ swotCategoryId: id, limit: 50 })
  })
  return { data: data?.data?.result, isLoading }
}
