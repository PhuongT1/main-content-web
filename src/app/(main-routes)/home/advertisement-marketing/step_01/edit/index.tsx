'use client'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { convertToRem } from '@/utils/convert-to-rem'
import CardInfo from '../../_components/card_info'
import GoogleTrending from '../../_components/google_trending'
import InputWrapper from '@/components/input-wrapper'
import Title from '@/components/title'
import { ModalReset } from '@/components/dialog/modal-deck'
import { MAX_LENGTH } from '@/constants/advertisement-marketing.constant'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { useAdvertisementMarketingPostData } from '../../use-advertisement-marketing'
import { DATA_QUESTION_INFO_TRENDING } from './../../data'
import MarketingGoals from './../_marketing-goals'
import styles from './../../style.module.scss'

function Step_01_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesMarketingGoals>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, control, formState, watch, trigger } = form
  const selectedGoals = watch('selectedGoals')

  const { mutation } = useAdvertisementMarketingPostData<IFormValuesMarketingGoals>(STEP.STEP_ONE, {
    keyListRefetchQuery: ['data-advertisement-marketing']
  })

  // =====
  useEffect(() => {
    // only trigger when user edit
    if (selectedGoals?.length > 0) {
      trigger()
    }
  }, [])

  const handleResetForm = () => {
    const defaultValue = { title: '', idea: '', selectedGoals: [] }
    reset(defaultValue)
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesMarketingGoals) => {
    mutation(data)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <InputWrapper
        title='사업 아이디어'
        subTitle='사업 아이디어를 간략하게 정리해보세요.'
        items={[
          {
            name: 'title',
            label: '타이틀',
            column: 3,
            placeholder: '브랜드명 입력',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.TITLE } }
          },
          {
            name: 'idea',
            label: '아이디어',
            column: 9,
            placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.IDEA } }
          }
        ]}
        sxWrapper={{
          '.MuiInputBase-root': { height: convertToRem(56) },
          '.MuiInputBase-input': { padding: convertToRem(10) }
        }}
      />

      <Box sx={{ marginTop: convertToRem(60), 'svg > path': { fill: palette.home.gray200 } }}>
        <Title label='트렌드 분석' subLabel='추천 질문을 참고하여 제품 및 서비스 트렌드 분석을 진행해보세요.' />
        <Box display='flex' gap={convertToRem(12)} marginBottom={convertToRem(20)}>
          {DATA_QUESTION_INFO_TRENDING.map((question, index) => (
            <CardInfo key={index} icon={<question.icon />} title={question.title} />
          ))}
        </Box>

        <GoogleTrending />
      </Box>

      <Box sx={{ marginTop: convertToRem(60) }}>
        <Title
          subLabel='기업의 비전과 전략에 기반하여 달성하고자 하는 목표를 선택해보세요.'
          label={
            <>
              <Box component={'h2'} sx={{ color: palette.home.gray50 }}>
                마케팅 목표
              </Box>
              <Box component={'h4'} sx={{ color: palette.home.mint500, fontWeight: 600, marginLeft: 1 }}>
                (최대 {MAX_LENGTH.GOALS}개 선택)
              </Box>
            </>
          }
        />
        <MarketingGoals form={form} />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton
          type='submit'
          disabled={formState.isSubmitting || !(formState.isValid && selectedGoals?.length > 0)}
        />
      </Stack>
    </Box>
  )
}

export default Step_01_Edit
