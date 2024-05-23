'use client'

import { Box, useTheme } from '@mui/material'
import styles from './culture.module.scss'
import Button from '@mui/material/Button'
import Home from '@/assets/icons/home'
import MenuIcon from '@/assets/icons/team-building/menu'
import StepItem, { StepList } from '@/components/home/step'
import Step01 from './step_01'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StepProject } from '@/types/deck.type'
import { getAllActiveStep } from '@/services/deck.service'
import { useLanguage } from '@/hooks/use-language'

const Culture = ({ projectId }: any) => {
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const { data, isLoading } = useQuery({
    queryKey: ['data-all-step-deck', { deckId: 20, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    staleTime: 0
  })

  useEffect(() => {
    if (data?.length) {
      setCultureForms(data[0].data)
    }
  }, [data])

  const {
    palette: { home }
  } = useTheme()

  const steps: StepList[] = [
    {
      title: dict.culture_step1_title,
      subtTitle: dict.culture_step1_description,
      description: <Step01 projectId={projectId} />
    }
  ]
  const breadcrumb = [
    { icon: '' },
    { label: dict.culture_breadcrumb_label1, title: dict.culture_breadcrumb_title1 },
    { label: dict.culture_breadcrumb_label2, title: dict.culture_breadcrumb_title2 }
  ]
  return (
    <Box component={'div'} sx={{ backgroundColor: home.gray500 }}>
      <StepItem
        breadcrumb={{
          list: breadcrumb
        }}
        pageHeader={{
          title: dict.culture_page_header
        }}
        stepList={steps}
      />
    </Box>
  )
}

export default Culture
