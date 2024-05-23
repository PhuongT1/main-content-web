'use client'

// mui
import { Box, Grid, MenuItem, useTheme } from '@mui/material'

// form

// data
import { UseFormReturn } from 'react-hook-form'

import FormProvider from '@/form/FormProvider'
import useToggle from '@/hooks/use-toggle'

import InputItem from '@/form/input'
import SelectInput from '@/form/select/select-input'
import { UploadAvatar } from '@/form/upload'
import styles from '../step_03.module.scss'

import DatePicker from '@/libs/datepicker/DatePicker'

import { getStep } from '@/atoms/home/teambuilding'
import { Alert as AlertDialog } from '@/components/dialog'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { LANG, STEP } from '@/constants/common.constant'
import { useStepApi } from '@/hooks/use-step-api'
import { useUploadImageApi } from '@/hooks/use-upload-image-api'
import { GREETING_INTRO_STEP3, TItem } from '@/mock/teambuilding/data'
import { StatusStep } from '@/types/step.type'
import { TOrganizationItem } from '@/types/teambuilding/index.type'
import { sendEvent } from '@/utils/events'
import { useRecoilValue } from 'recoil'
import { TeambuldingEnumId } from '../..'
import { MAXLENGTH_VALIDATE } from '../../../utils/validate'
import BenefitSection from '../benefit'
import EnvironmentSection from '../environment'
import OrganizationSection from '../organization'
import { isEmpty } from '@/utils/object'
import { defaultValuesStep03 } from '..'
import { useLanguage } from '@/hooks/use-language'
import RefreshIcon from '@/assets/icons/refresh'
import CheckedboxIcon from '@/assets/icons/checkbox/check'

export type TFormValues = {
  path: File | any
  name: string
  date: Date | string
  content: string
  contents: string
  organization: TOrganizationItem[]
  workingEnv: TItem[]
  welBenefits: TItem[]
} & any

type TStep03EditProps = {
  form: UseFormReturn<TFormValues>
}
function Step_03_Edit({ form }: TStep03EditProps) {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step03, deckId: TeambuldingEnumId.DeckId })
  )

  const { mCreate } = useStepApi({})
  const { mUploadImage } = useUploadImageApi()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const {
    control,
    setValue,
    getValues,
    reset,

    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = form

  const onSubmit = handleSubmit(async (values: TFormValues) => {
    const { titleEn, titleKr } = GREETING_INTRO_STEP3.find((x) => x.id === Number(values?.content)) || {
      titleEn: '',
      titleKr: ''
    }
    const newPayload = { ...values, content: titleKr || values?.content, contentEn: titleEn || values?.contentEn }

    if (values.path instanceof File) {
      const { data } = await mUploadImage.mutateAsync({ file: values.path, folder: 'team-building', type: 'PROJECT' })
      newPayload.path = data.url
    }

    // save step

    const data = await mCreate.mutateAsync({
      data: newPayload,
      playTime: 0,
      status: StatusStep.FINISHED,
      projectId: 0,
      deckId: TeambuldingEnumId.DeckId,
      stepId: step.id,
      currentStep: STEP.STEP_THREE,
      deletedStepActivitiesIds: []
    })
  })

  const handleReset = async () => {
    reset(defaultValuesStep03, { keepDefaultValues: false })
    setToggleShowDialog(false)

    sendEvent('RESET_TBUIDLING_ST3', {})
  }

  return (
    <FormProvider methods={form} onSubmit={onSubmit}>
      <Box>
        <SectionTitle title={dict.teambuilding_3_title} subtitle={dict.teambuilding_3_sub_title} />
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%'>
          <BoxLayoutOulined style={{ backgroundColor: 'transparent' }}>
            <Box component={'div'} className={styles.basic_info_box}>
              <Box component={'div'} className={styles.box_avatar}>
                <UploadAvatar formProps={form} name={`path`} />
              </Box>
              <Grid flex={1} container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <InputItem
                    control={control}
                    name='name'
                    textFieldProps={{ placeholder: dict.teambuilding_company_name, required: true }}
                    label={dict.teambuilding_company_name}
                  />
                </Grid>
                <Grid display={'flex'} alignItems={'end'} item xs={12} lg={6}>
                  <DatePicker
                    value={getValues('date')}
                    labelProps={{
                      label: dict.teambuilding_establishment_date,
                      required: true
                    }}
                    onDateChange={(date: Date) => {
                      setValue('date', date)
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SelectInput
                    inputProps={{
                      placeholder: dict.direct_input,
                      inputProps: {
                        maxLength: MAXLENGTH_VALIDATE.INTRO_GROUP
                      }
                    }}
                    control={control}
                    textFieldProps={{
                      required: true,
                      placeholder: dict.common_select
                    }}
                    menus={{
                      options: GREETING_INTRO_STEP3,
                      value: 'id',
                      label: 'title'
                    }}
                    label={dict.teambuilding_company_intro}
                    sxLabel={{ color: home.gray50 }}
                    name={`content`}
                  ></SelectInput>
                </Grid>
              </Grid>
            </Box>
          </BoxLayoutOulined>
          <AlertDialog
            onSubmit={handleReset}
            description={dict.dialog_delete_description}
            title={dict.dialog_delete_title}
            open={showDialog}
            onCancel={toggleShowDialog}
          />

          <OrganizationSection formProps={form} />
          <EnvironmentSection formProps={form} />
          <BenefitSection formProps={form} />
          <Box display='flex' justifyContent='center' alignItems='center' gap={'20px'} mt={'60px'} width='100%'>
            <RefreshButton
              onClick={toggleShowDialog}
              sx={{
                backgroundColor: home.gray300,
                color: home.gray50
              }}
              startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
            />
            <SubmitButton
              disabled={isSubmitting || !isEmpty(errors) || !isValid}
              type='submit'
              sx={{
                backgroundColor: home.blue500,
                color: home.gray500
              }}
              startIcon={<CheckedboxIcon width={20} height={20} stroke={home.gray500} />}
            />
          </Box>
        </Box>
      </Box>
    </FormProvider>
  )
}

export default Step_03_Edit
