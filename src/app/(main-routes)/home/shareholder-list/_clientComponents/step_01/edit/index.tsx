import { Grid, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './edit.module.scss'
import React from 'react'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useForm, useFormContext } from 'react-hook-form'
import { DATE_FORMAT, STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { useCustomerPostData } from '../../hooks/use-shareholder-list'
import { ModalReset } from '@/components/dialog/modal-deck'
import SectionTitle from '@/components/home/section-title'
import InputItem from '@/form/input'
import DatePicker from '@/libs/datepicker/DatePicker'
import { BasicInformation } from '@/types/shareholder-list.type'
import moment from 'moment'
import SelectItem from '@/form/select'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'

const HEAD_OFFICE_LOCATION = [
  '서울특별시',
  '경기도',
  '인천광역시',
  '강원도',
  '대전광역시',
  '세종특별자치시',
  '충청북도',
  '충청남도',
  '부산광역시',
  '대구광역시',
  '울산광역시',
  '경상북도',
  '경상남도',
  '광주광역시',
  '전라북도',
  '전라남도',
  '제주특별자치도'
]

const Step1Edit = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useFormContext<BasicInformation>()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = form

  const { mutation } = useCustomerPostData<BasicInformation>(STEP.STEP_ONE)

  const handleCompleteStep = async (data: BasicInformation) => mutation(data)

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    setToggleShowDialog(false)
    // reset(DEFAULT_TARGET_CUSTOMER)
  }

  return (
    <Box
      component={'form'}
      sx={{ marginTop: convertToRem(52) }}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompleteStep)}
    >
      <SectionTitle title='회사 정보' subtitle='주주명부를 발행할 회사의 기본 정보를 입력해주세요.' />
      <Grid container display='flex' wrap='wrap' spacing={remConvert('12px')} alignItems='stretch'>
        <Grid item xs={3} md={3}>
          <SelectItem
            control={control}
            textFieldProps={{
              placeholder: '선택',
              required: true
            }}
            label='상호명 유형'
            menus={{
              options: [
                {
                  label: '주식회사 (회사명)',
                  value: '주식회사 (회사명)'
                },
                {
                  label: '(회사명) 주식회사',
                  value: '(회사명) 주식회사'
                }
              ],
              label: 'label',
              value: 'value'
            }}
            name='type'
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InputItem
            maxLength={30}
            control={control}
            textFieldProps={{
              placeholder: '회사명 입력',
              required: true
            }}
            label='상호명'
            name='businessNname'
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InputItem
            maxLength={20}
            control={control}
            textFieldProps={{
              placeholder: '대표자명 입력',
              required: true
            }}
            label='대표자명'
            name='representativeName'
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InputItem
            name='date'
            control={control}
            label='회사 설립(예정)일'
            renderInput={({ field }) => (
              <DatePicker
                {...field}
                labelProps={{
                  label: ''
                }}
                placeholder='회사 설립(예정)일'
                onDateChange={(date: Date) => {
                  setValue(field.name, moment(date).format(DATE_FORMAT.DASH_REV), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  })
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <SelectItem
            control={control}
            textFieldProps={{
              placeholder: '본점 소재지',
              required: true
            }}
            label='상호명 유형'
            menus={{
              options: HEAD_OFFICE_LOCATION.map((item) => ({ label: item, value: item })),
              label: 'label',
              value: 'value'
            }}
            name='officeLocation'
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <InputItem
            maxLength={100}
            control={control}
            textFieldProps={{
              placeholder: '회사명 입력',
              required: true
            }}
            label='상세 주소'
            name='detailedAddress'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputItem
            maxLength={20}
            control={control}
            textFieldProps={{
              placeholder: '회사 연락처 입력'
            }}
            label='회사 연락처'
            name='contactInformation'
          />
        </Grid>
      </Grid>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_active}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={!isValid} />
      </Stack>
    </Box>
  )
}

export default Step1Edit
