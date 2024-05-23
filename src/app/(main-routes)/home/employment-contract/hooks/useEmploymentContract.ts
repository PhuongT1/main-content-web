import { employmentContractDeckActive } from '@/atoms/home/employment-contract';
import { getActiveStep, postSteps } from '@/services/deck.service';
import { StepList, StepProject } from '@/types/deck.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useRecoilValue } from 'recoil';
import { QUERY_KEY, SUBMIT_FORM_DATA } from '../utils/constants';


export const useGetData = <T>(projectId: number) => {
  const deckActive = useRecoilValue(employmentContractDeckActive) 

  const param = {
    deckId: deckActive.deckId || 0,
    stepId: deckActive.stepId || 0,
    projectId
  }

  const data = useQuery({
    queryKey: ['employment-contract-data', param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
  })
  
  return data
}

export const usePostData =  <T>(projectId: number) => {
  const stepQueryInfo: {
    data: StepList<T>[] | undefined
  } = useQuery({
    queryKey: QUERY_KEY
  })
 
  const { mutate, ...rest } = useMutation({
      mutationFn: postSteps<T>,
      onSuccess: () => {},
      onError: () => {
        enqueueSnackbar('데이터 제출 실패.', { variant: 'error' })
      },
      retry: 0
    })
  
    const mutation = (data: T) => {
      const deckActive = stepQueryInfo.data ? stepQueryInfo.data[0] : undefined

      if(!deckActive || !deckActive.id || !deckActive.deckId) return;

      const param = {
        deckId: (deckActive?.deckId),
        stepId: (deckActive?.id),
        projectId: Number(projectId)
      }

      mutate({
        ...param,
        status: 'FINISHED',
        data,
        playTime: 0,
        deletedStepActivitiesIds: []
      })
    }

  return { rest, mutation };
};
