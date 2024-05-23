import { activeStepSelector, completeStepSelector, expandStepSelector } from "@/atoms/home/stepper"
import { dataDeckActive } from "@/atoms/home/strength-analysis"
import { DEFAULT_STEP_SA } from "@/constants/strength-analysis.constant"
import { getActiveStep, postSteps } from "@/services/deck.service"
import { StepProject } from "@/types/deck.type"
import { TTypesSA } from "@/types/strength-analysis.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRecoilState, useRecoilValue } from "recoil"

export const useSAData = <T>(stepId: number, queryKey: string) => {
  const deckActive = useRecoilValue(dataDeckActive)

  const param = {
    deckId: Number(deckActive[stepId]?.deckId || 0),
    stepId: Number(deckActive[stepId]?.id || 0),
    projectId: DEFAULT_STEP_SA.projectId
  }

  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    staleTime: 0
  })
  return data
}

export const useSAPostData = <T>(stepActive: number) => {
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const deckActive = useRecoilValue(dataDeckActive)
  const removeID = deckActive.filter((_item, index) => index > stepActive)

  const param = {
    deckId: Number(deckActive[stepActive]?.deckId),
    stepId: Number(deckActive[stepActive]?.id),
    projectId: DEFAULT_STEP_SA.projectId
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: postSteps<T>,
    onSuccess: (data, variables) => {
        setCompleteStep((pre) => {
          if (!pre.includes(stepActive)) {
            return [...pre, stepActive]
          }
          return pre
        })
        setActiveStep((pre) => pre + 1)
        stepActive === deckActive.length - 1 && setExpandStep((pre) => [...pre, stepActive])
      }
  })

  const mutation = (data: T) => {
    mutate({
      ...param,
      status: 'FINISHED',
      data,
      playTime: 0,
      deletedStepActivitiesIds: removeID.map((item) => item.id)
    })
  }

  return {
    ...rest,
    mutation,
  }
}
export const checkItemSelectedIndex = (
  item: TTypesSA,
  list: TTypesSA[][]
): number => {
 if(!item || !list) return -1
  const index = list.findIndex((it: TTypesSA[]) => {
    return it?.map((x : TTypesSA) => x.strengthType).includes(item.strengthType)
  })
  return index
}