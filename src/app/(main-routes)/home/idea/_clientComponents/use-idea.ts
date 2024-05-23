import { dataDeckActive, filterFourIdeaSelector, filterRelatedCompanySelector, modeCalculationIdeaSelector } from '@/atoms/home/idea'
import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { DEFAULT_STEP_IDEA, MAX_IDEAS_COUNT, MAX_IDEAS_EXCEPT, MIN_IDEAS_COUNT, Method } from '@/constants/idea.constant'
import { getActiveStep, postSteps } from '@/services/deck.service'
import { StepProject } from '@/types/deck.type'
import { CaculationModeEnum, TCreateIdea, TItemKeyword, TMethod } from '@/types/idea.type'
import { useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { FieldPath, useFormContext } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IdeaProjectContext } from '.'
import { useLanguage } from '@/hooks/use-language'


export const useStepProject = (stepIndex?: number) => {
  const deckActive = useRecoilValue(dataDeckActive)
  const { projectId } = useContext(IdeaProjectContext)
  const stepDeck = {
    deckId: Number(deckActive[stepIndex || 0]?.deckId),
    stepId: Number(deckActive[stepIndex || 0]?.id)
  }
  const stepProject = {
    ...stepDeck,
    projectId
  }

  return {
    stepProject,
    stepDeck
  }
}

export const useIdeaData = <T>(stepId: number, queryKey: string) => {
  const{ stepProject: param } = useStepProject(stepId)

  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    staleTime: 0
  })
  return data
}

export const useIdeaPostData = <T>(stepActive: number) => {
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const deckActive = useRecoilValue(dataDeckActive)
  const removeID = deckActive.filter((_item, index) => index > stepActive)

  const{ stepProject: param } = useStepProject(stepActive)
 

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

  const { mutate : mutateReset, ...restReset } = useMutation({
    mutationFn: postSteps<T>,
    onSuccess: (data, variables) => {
 
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

  const reset = (data: T) => {
    mutateReset({
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
    reset
  }
}



export const useIndustrialField = () => {
  const [filterFourIdea,setFilterFourIdea] = useRecoilState(filterFourIdeaSelector)
  const [filterRelaCompany,setFilterCompany] = useRecoilState(filterRelatedCompanySelector)

  const resetFilter = () => {
    setFilterFourIdea((prev) => ({...prev, industrialField: '' }))
    setFilterCompany((prev) => ({...prev, industryId: false }))
  }

  

  return {filterFourIdea,filterRelaCompany,setFilterCompany,setFilterFourIdea,resetFilter}
}

export const useHandlePreview = (method : TMethod) => {
  const { dict } = useLanguage()
  const {getValues,setValue ,trigger ,setError,clearErrors} = useFormContext<TCreateIdea>()
  const [, setActiveMode] = useRecoilState(modeCalculationIdeaSelector)

  const { resetFilter } = useIndustrialField()


  const handlePreview = async () => {
    
    const data = getValues(method as FieldPath<TCreateIdea>)
    
    if(!data?.content) {
      setError(`${method}.content` as FieldPath<TCreateIdea>,{ type:'required' ,message: dict.idea_required })
      return
    }
    
    if([Method.minus,Method.division].includes(method as Method)){
      if(data?.keywords.length < MIN_IDEAS_COUNT){
        setError(`${method}.keywords` as FieldPath<TCreateIdea>,{ type:'min' ,message:'불필요하거나 중요하지 않은 키워드를 선택해보세요' })
        return
      }

      if(data?.keywords.length > MAX_IDEAS_COUNT){
        setError(`${method}.keywords` as FieldPath<TCreateIdea>,{ type:'max' ,message:'' })
        return
      }
    }

    if([Method.plus,Method.multiplication].includes(method as Method)){
      if(!data?.path){
        setError(`${method}.path` as FieldPath<TCreateIdea>,{ type:'required' ,message:'' })
        return
      }
    }

      setActiveMode((prev) => ({ ...prev, [method]: CaculationModeEnum.PREVIEW }))
      resetFilter()
      const completeList = getValues('completed')
      const newList = !completeList.includes(method) ? [...completeList, method] : [...completeList]
      setValue('completed', newList)
      requestIdleCallback(() => {
        clearErrors([method])
      },{timeout:3000})
    const isValid = await trigger(method as FieldPath<TCreateIdea>)
      
  }
  return {handlePreview}
}


export const useHandleKeyWords = ({ name , fieldsErrors }:{name : FieldPath<TCreateIdea> ,fieldsErrors :FieldPath<TCreateIdea>[]}) =>{
  const { dict } = useLanguage()
  const {getValues,resetField, setValue , setError, clearErrors ,watch} = useFormContext<TCreateIdea>()

  const list = watch(name)

  const handleAddManualIdea = () => {
    const manualInput = getValues('manualInput')
    if (manualInput) {
      if (list.length >= MAX_IDEAS_COUNT) {
        setError(name, { type: 'max', message: '' })
        return false
      }

      const isCheckExistIdea = list.find((item:TItemKeyword) => item.content === manualInput)

      if(isCheckExistIdea) return

      setValue(name, [...list, { id: manualInput, content: manualInput, isSelected: false }])
      resetField('manualInput')
      clearErrors(fieldsErrors)
      return true
    }
    return false
  }

  const handleClickChip = (chip: TItemKeyword) => {
    if (!chip) return false
    const indexOfItem = list.findIndex((item: TItemKeyword) => item.id === chip.id)
      if (chip.isSelected) {
        const newList = [...list]
        newList[indexOfItem] = { ...chip, isSelected: false }
        setValue(name, newList)
        return
      }
      const countItemSelected = list.filter((keyword : TItemKeyword) => !!keyword.isSelected).length
      if (countItemSelected >= MAX_IDEAS_EXCEPT) {
        setError(name, { type: 'max', message: dict.idea_select_3_key_msg })
        setTimeout(
          () => {
            clearErrors(fieldsErrors)
          },
          3000
        )
        return
      }
        const newList = [...list]
        newList[indexOfItem] = { ...chip, isSelected: true }
        setValue(name, newList)
    
   
  }

  return {handleAddManualIdea,handleClickChip ,list}
}


export const mapOrder = (originalArray: string[], orderArray: string[]) => {
  if (!originalArray || !orderArray) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a) - orderArray.indexOf(b)
  })

  return orderedArray ?? []
}
function easeInOutSin(time: number) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2
}

 export function animate(
  property: string,
  element: any,
  to: number,
  options: {
    duration: number
    ease?: any
  },
  cb = (val: any) => {}
) {
  const {
    ease = easeInOutSin,
    duration = 300 // standard
  } = options

  let start: number | null = null
  const from = element[property]
  let cancelled = false

  const cancel = () => {
    cancelled = true
  }

  const step = (timestamp: number) => {
    if (cancelled) {
      return
    }

    if (start === null) {
      start = timestamp
    }
    const time = Math.min(1, (timestamp - start) / duration)

    element[property] = ease(time) * (to - from) + from

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null)
      })
      return
    }

    requestAnimationFrame(step)
  }

  if (from === to) {
    cb(new Error('Element already at target position'))
    return cancel
  }

  requestAnimationFrame(step)
  return cancel
}
export const useScrollTab = () => {
  const {transitions} = useTheme()
    // =================******===============

    const scroll = (scrollValue: number, { animation = true } = {}) => {
      const scrollContainerElement = document.querySelector('.MuiTabs-scroller')
      if (!scrollContainerElement) return
      if (animation) {
        animate('scrollLeft', scrollContainerElement, scrollValue, {
          duration: transitions.duration.standard
        })
      } else {
        scrollContainerElement.scrollLeft = scrollValue
      }
    }
  
    const getScrollSize = () => {
      const scrollContainerElement = document.querySelector('.MuiTabs-scroller')
      const tabListRef = document.querySelector('.MuiTabs-scroller > div')
  
      if (!scrollContainerElement || !tabListRef) return 0
  
      const containerSize = scrollContainerElement?.clientWidth ?? 0
      let totalSize = 0
      const children = Array.from(tabListRef?.children ?? [])
      for (let i = 0; i < children.length; i += 1) {
        const tab = children[i]
        if (totalSize + tab.clientWidth > containerSize) {
          // If the first item is longer than the container size, then only scroll
          // by the container size.
          if (i === 0) {
            totalSize = containerSize
          }
          break
        }
        totalSize += tab.clientWidth
      }
      return totalSize
    }
  
    const moveTabsScroll = (delta: number) => {
      const scrollButton = document.querySelector('.MuiTabs-scroller')
  
      let scrollValue = scrollButton?.scrollLeft as any
  
      scrollValue += delta * 1
      // Fix for Edge
      scrollValue *= 1
  
      scroll(scrollValue)
    }
   return {
      moveTabsScroll,
      getScrollSize
    }
    // =================******===============
}