'use client'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useFieldArray, useForm } from 'react-hook-form'
import styles from './step_03.module.scss'
import React, { useEffect, useState } from 'react'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { Form, Typography } from '@/elements'
import DividerItem from '../_clientComponents/divider-item'
import HocStepSwot, { propStepComponent } from '../_clientComponents/hoc-step-swot'
import { convertToRem } from '@/utils/convert-to-rem'
import ViewStrategy from './_clientComponents/view-strategy'
import { Swot_Step2_Type, Swot_Step3_Type } from '@/types/swot.type'
import useToggle from '@/hooks/use-toggle'
import { Alert as AlertDialog } from '@/components/dialog'
import { cancelTxt, subTitleReset, submitTxt, titleReset } from '@/constants/naming.constant'
import { useQuery } from '@tanstack/react-query'
import { getActiveStep } from '@/services/deck.service'
import { StepProject } from '@/types/deck.type'
import ConnectBox from './_clientComponents/connect-box'
import { useRecoilState } from 'recoil'
import { LinesAtom } from '../swot-atom'
import { useLanguage } from '@/hooks/use-language'

export function removeDuplicateById(arr: any) {
  const uniqueDataMap = new Map(arr?.map((item: any) => [item.id, item]))
  return Array.from(uniqueDataMap.values())
}

const Step_03_Swot: React.FC<propStepComponent<Swot_Step3_Type, Swot_Step2_Type>> = ({
  isView,
  data,
  prewStep,
  onFinish,
  showEdit,
  isLoadingCurrent,
  isLoadingPrev
}) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useForm<Swot_Step3_Type>({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const { dict } = useLanguage()

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isValid }
  } = form

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { strengthAndOpportunity, strengthAndThreat, weaknessAndOpportunity, weaknessAndThreat } = prewStep?.data || {}

  const expansionOfMarketShare = useFieldArray({
    control,
    name: 'expansionOfMarketShare'
  })

  const improveCustomerSatisfaction = useFieldArray({
    control,
    name: 'improveCustomerSatisfaction'
  })

  const sustainableGrowth = useFieldArray({
    control,
    name: 'sustainableGrowth'
  })

  useEffect(() => {
    if (data?.data) form.reset(data.data, { keepDefaultValues: true })
  }, [data?.data])

  const { data: firstStep } = useQuery({
    queryKey: [
      'get-data-swot',
      {
        deckId: 8,
        stepId: 22,
        projectId: 8
      }
    ],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<any>(param),
    staleTime: 0
  }) as any

  const { brandName, idea, opportunityArray, strengthArray, threatArray, weaknessArray } = firstStep?.data || {}

  const [lines, setLines] = useRecoilState(LinesAtom)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize((prevSize) => ({
        width: window.innerWidth,
        height: window.innerHeight
      }))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio)

  useEffect(() => {
    const handleZoom = () => {
      setZoomLevel(window.devicePixelRatio)
    }

    window.addEventListener('resize', handleZoom)

    return () => {
      window.removeEventListener('resize', handleZoom)
    }
  }, [])

  useEffect(() => {
    setLines((pr: any) => [...pr])
  }, [windowSize, zoomLevel])

  const [mainDomLength, setMainDomLength] = useState(0)

  useEffect(() => {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      const handleDomChange = () => {
        const totalMainDomLength = mainElement.querySelectorAll('*').length
        setMainDomLength(totalMainDomLength)
      }

      mainElement.addEventListener('DOMSubtreeModified', handleDomChange)

      return () => {
        mainElement.removeEventListener('DOMSubtreeModified', handleDomChange)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setLines((p: any) => [...p])
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setLines((p: any) => [...p])
  }, [mainDomLength])

  // console.log("strengthAndOpportunity", strengthAndOpportunity)

  return (
    <Form {...form}>
      <Box component='form' className={[styles.form_slogan].join(' ')} onSubmit={handleSubmit(onFinish)}>
        <DividerItem isView={isView} sx={{ marginBottom: convertToRem(60), borderColor: `${home.gray200}` }} />
        <Box component={'div'}>
          <Box component={'div'} className={`${styles.layer_title}`}>
            <Box component={'h2'} sx={{ color: home.gray50 }}>
              {dict.swot_strategy_matching}
            </Box>
          </Box>
          {!isView && (
            <Typography cate='body_3' sx={{ marginTop: convertToRem(10) }} plainColor='home.gray100'>
              {dict.swot_strategy_matching_des}
            </Typography>
          )}
        </Box>
        {!isView ? (
          <ConnectBox
            strengthAndOpportunity={strengthAndOpportunity}
            strengthAndThreat={strengthAndThreat}
            weaknessAndOpportunity={weaknessAndOpportunity}
            weaknessAndThreat={weaknessAndThreat}
            expansionOfMarketShare={expansionOfMarketShare}
            improveCustomerSatisfaction={improveCustomerSatisfaction}
            sustainableGrowth={sustainableGrowth}
            form={form}
            isLoading={isLoadingCurrent || isLoadingPrev}
            // lines={lines}
            // setLines={setLines}
          />
        ) : (
          <ViewStrategy
            brandName={brandName}
            opportunityArray={opportunityArray}
            strengthArray={strengthArray}
            threatArray={threatArray}
            weaknessArray={weaknessArray}
            idea={idea}
            arrOne={removeDuplicateById(watch('expansionOfMarketShare'))}
            arrTwo={removeDuplicateById(watch('improveCustomerSatisfaction'))}
            arrThree={removeDuplicateById(watch('sustainableGrowth'))}
          />
        )}
        <Stack flexDirection={'row'} className={styles.btn_active} sx={{ marginTop: convertToRem(60) }}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} disabled={lines.length === 0} />
              <SubmitButton disabled={!isValid || lines.length === 0} type='submit' />
              <AlertDialog
                description={subTitleReset}
                title={titleReset}
                cancelTxt={cancelTxt}
                submitTxt={submitTxt}
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  reset()
                  setLines([])
                  setToggleShowDialog(false)
                }}
              />
            </>
          ) : (
            <EditButton onClick={() => showEdit()} />
          )}
        </Stack>
      </Box>
    </Form>
  )
}
export default HocStepSwot<any, Swot_Step2_Type>(Step_03_Swot, {
  currentStep: 2
})
