import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import ErrorMessage from '@/form/ErrorMessage'
import { useLanguage } from '@/hooks/use-language'
import { CaculationModeEnum } from '@/types/idea.type'
import React from 'react'
import { useRecoilValue } from 'recoil'

function ErrorMethod() {
  const { dict } = useLanguage()
  const currentMode = useRecoilValue(modeCalculationIdeaSelector)
  const isAllCompleted = Object.values(currentMode).filter((mode) => mode === CaculationModeEnum.PREVIEW).length > 3

  if (isAllCompleted) {
    return null
  }
  return <ErrorMessage message={dict.idea_choose_keyword_msg} />
}

export default ErrorMethod

