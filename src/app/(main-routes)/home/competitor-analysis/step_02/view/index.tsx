import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { Box, Stack, Divider, Grid } from '@mui/material'
import useToggle from '@/hooks/use-toggle'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { IFormValuesStepTwo, ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { dataCompanyAnalyzingStep1 } from '@/atoms/home/competitor-analysis'
import { STEP } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionAutoFillItems } from '@/utils/styles'
import { EditButton } from '@/components/home/button'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import CardCharacteristicsEdit from './../../_components/card_characteristics_edit'
import styles from './../../style.module.scss'

function Step_02_View() {
  const [activeCard, setActiveCard] = useState({ 1: -1, 2: -1 })
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [dataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [showDialog, toggleShowDialog] = useToggle()

  const form = useFormContext<IFormValuesStepTwo>()
  const { watch } = form
  const selectedCompetitorsCharacteristics = watch(`data`) || []

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_TWO)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box marginBottom={convertToRem(60)}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          타깃고객 분석
        </Box>
        <Box sx={{ ...optionAutoFillItems({ minWidth: 168, maxColumn: 5, mediaQuery: 1400 }) }}>
          {[dataStep1?.myCompany, ...(dataStep1?.selectedCompetitors || [])]?.map((competitor, index) => (
            <Box key={index} onClick={() => setActiveCard((prev) => ({ ...prev, 1: index }))}>
              <CardCharacteristicsEdit
                competitor={competitor as ICompetitiveCompaniesResponse}
                item={[
                  selectedCompetitorsCharacteristics?.[index]?.age,
                  selectedCompetitorsCharacteristics?.[index]?.gender,
                  selectedCompetitorsCharacteristics?.[index]?.job
                ]}
                isHighlight={Boolean(index === 0)}
                activeCard={activeCard[1] === index}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box marginBottom={convertToRem(60)}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          차별화특성 분석
        </Box>
        <Box sx={{ ...optionAutoFillItems({ minWidth: 168, maxColumn: 5, mediaQuery: 1400 }) }}>
          {[dataStep1?.myCompany, ...(dataStep1?.selectedCompetitors || [])]?.map((competitor, index) => (
            <Box key={index} onClick={() => setActiveCard((prev) => ({ ...prev, 2: index }))}>
              <CardCharacteristicsEdit
                competitor={competitor as ICompetitiveCompaniesResponse}
                item={selectedCompetitorsCharacteristics?.[index]?.differentCharacteristics?.map((item) => item?.name)}
                isHighlight={Boolean(index === 0)}
                activeCard={activeCard[2] === index}
                subTitle={'차별화특성'}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>

      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step_02_View
