import { useQuery } from '@tanstack/react-query'
import { getAllActiveStep } from '@/services/deck.service'
import { StepActivity, StepProject } from '@/types/deck.type'
import { DEFAULT_STEP_SLOGAN } from '@/constants/slogan.constant'
import { QUERY_KEY_ALL_STEP } from '@/constants/naming.constant'

interface IUseSloganDataIRProps {
  id: number
}

export const useSloganDataIR = <T>({ id }: IUseSloganDataIRProps) => {
  // Get all data from Slogan.
  const { data } = useQuery({
    queryKey: [QUERY_KEY_ALL_STEP, { deckId: DEFAULT_STEP_SLOGAN.deckId, projectId: id }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    staleTime: 0
  })

  // Get data from step 4.
  const indexData = Number(data?.length) - 1

  return data && (data[indexData] as StepActivity<T>)
}
