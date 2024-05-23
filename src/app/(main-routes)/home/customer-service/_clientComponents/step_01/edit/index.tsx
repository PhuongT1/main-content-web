import { Grid, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './edit.module.scss'
import React from 'react'
import InputItem from '@/form/input'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import ProfilePersonItem from './profile-person-item'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import PersonIntroductionAI from './person-introduction-AI'
import { TipContent } from './tip-content'
import { useCustomerPostData } from '../../use-customer'
import { DEFAULT_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import SectionTitle from '@/components/home/section-title'

const Step1Edit = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useFormContext<VirtualTargetCustomer>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = form

  const { mutation } = useCustomerPostData<VirtualTargetCustomer>(STEP.STEP_ONE)

  const handleCompleteStep = async (data: VirtualTargetCustomer) => mutation(data)

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(DEFAULT_TARGET_CUSTOMER)
  }

  return (
    <Box
      component={'form'}
      sx={{ marginTop: convertToRem(52) }}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompleteStep)}
    >
      <SectionTitle title='사업 아이디어' subtitle='사업 아이디어를 간략하게 정리해보세요.' />
      <Grid container gap={remConvert('20px')} sx={{ marginBottom: convertToRem(60) }}>
        <Grid item flex={'200px 0 0'}>
          <InputItem
            showErrorMessage
            maxLength={20}
            control={control}
            label='브랜드명'
            name={'brandName'}
            textFieldProps={{
              required: true,
              placeholder: '브랜드명 입력'
            }}
          />
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            showErrorMessage
            maxLength={50}
            control={control}
            label='아이디어'
            name={'idea'}
            textFieldProps={{
              required: true,
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼'
            }}
          />
        </Grid>
      </Grid>
      <SectionTitle
        title='가상의 타깃고객 프로필'
        subtitle='고객 페르소나 분석을 위한 타깃 고객의 기본 정보를 설정합니다.'
      />
      <ProfilePersonItem markText='타깃고객 프로필' />
      <TipContent />
      <SectionTitle
        title='가상의 타깃고객 소개글'
        subtitle='프로필 정보를 바탕으로 슘페터AI가 소개글을 추천합니다. 마음에 드는 소개글을 선택한 뒤 수정해보세요.'
      />
      <PersonIntroductionAI />
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_active}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={!isValid} />
      </Stack>
    </Box>
  )
}

export default Step1Edit
