
import { getActiveStep, postSteps } from '@/services/deck.service'
import { StepProject } from '@/types/deck.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { dataDeckActive } from '@/atoms/home/card-news'

export const useGetData = <T>(projectId: number) => {
  const deckActive = useRecoilValue(dataDeckActive) as { deckId: number; stepId: number; }
  const param = {
    deckId: Number(deckActive?.deckId || 0),
    stepId: Number(deckActive?.stepId || 0),
    projectId,
  }

  const data = useQuery({
    queryKey: ['card-news-data', param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
  })
  return data
}

export const usePostData = <T>(projectId: number) => {
  const deckActive = useRecoilValue(dataDeckActive) as { deckId: number; stepId: number; }
 
  const { mutate, ...rest } = useMutation({
    mutationFn: postSteps<T>,
    onSuccess: () => {},
  })

  const mutation = (data: T) => {
    const param = {
      deckId: Number(deckActive?.deckId),
      stepId: Number(deckActive?.stepId),
      projectId,
    }
    mutate({
      ...param,
      status: 'FINISHED',
      data,
      playTime: 0,
      deletedStepActivitiesIds: []
    })
  }

  return {
    ...rest,
    mutation
  }
}
