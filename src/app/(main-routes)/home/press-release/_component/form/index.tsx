import { FormStatus, formInputs } from '@/app/(main-routes)/home/card-news/utils/common'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import FormDivider from '@/components/form-divider'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DATE_FORMAT } from '@/constants/common.constant'
import { PRESS_RELEASE_TYPES } from '@/constants/press-release.constant'
import { PrimaryButton, Typography } from '@/elements'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import DatePicker from '@/libs/datepicker/DatePicker'
import { IPressReleaseGroup, IPressReleaseGroups, IPressReleaseInput } from '@/types/press-release/press-release.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Add } from '@mui/icons-material'
import { Grid, Stack, useTheme } from '@mui/material'
import moment from 'moment'
import { useEffect } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { PressReleaseValidateSchema } from '../utils/common'
import styles from './form.module.scss'

interface FormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  formGroup: IPressReleaseGroups | undefined
  type: string
  formStatus?: FormStatus
  initValues?: object
  isLoading?: boolean
}

const getValidateSchema = (type: string) => {
  switch (type) {
    case PRESS_RELEASE_TYPES.DEVELOPMENT:
      return PressReleaseValidateSchema.development
    case PRESS_RELEASE_TYPES.ANNOUNCEMENT:
      return PressReleaseValidateSchema.announcement
    case PRESS_RELEASE_TYPES.SOCIAL_VALUE_CREATION:
      return PressReleaseValidateSchema.socialValueCreation
    case PRESS_RELEASE_TYPES.PERFORMANCE:
      return PressReleaseValidateSchema.performance
    case PRESS_RELEASE_TYPES.AWARDS_AND_CERTIFICATIONS:
      return PressReleaseValidateSchema.awardsAndCertifications
    case PRESS_RELEASE_TYPES.BUSINESS_PLAINNING:
      return PressReleaseValidateSchema.businessPlanning
    case PRESS_RELEASE_TYPES.ORDERS:
      return PressReleaseValidateSchema.orders
    case PRESS_RELEASE_TYPES.PEOPLE_NEWS:
      return PressReleaseValidateSchema.peopleNews
    case PRESS_RELEASE_TYPES.FOUNDING:
      return PressReleaseValidateSchema.founding
    case PRESS_RELEASE_TYPES.POLICIES_AND_PROPOSALS:
      return PressReleaseValidateSchema.policiesAndProposals
    case PRESS_RELEASE_TYPES.NEW_PRODUCT_LAUNCH:
      return PressReleaseValidateSchema.newProductLaunch
    case PRESS_RELEASE_TYPES.RECRUITMENT:
      return PressReleaseValidateSchema.recruitment
    case PRESS_RELEASE_TYPES.RESEARCH:
      return PressReleaseValidateSchema.researchAndInvestigation
    case PRESS_RELEASE_TYPES.INVESTMENT_ACTIVITIES:
      return PressReleaseValidateSchema.investmentActivities
    case PRESS_RELEASE_TYPES.EVENT:
      return PressReleaseValidateSchema.event
    case PRESS_RELEASE_TYPES.PERSONNEL:
      return PressReleaseValidateSchema.personnel
    case PRESS_RELEASE_TYPES.MERGERS_AND_ACQUISITIONS:
      return PressReleaseValidateSchema.mergersAndAcquisitions
    case PRESS_RELEASE_TYPES.EXHIBITION_EVENT:
      return PressReleaseValidateSchema.exhibitionEvent
    case PRESS_RELEASE_TYPES.SALES_PROMOTION:
      return PressReleaseValidateSchema.salesPromotion
    case PRESS_RELEASE_TYPES.PARTNERSHIP:
      return PressReleaseValidateSchema.partnership
  }
}
const PressReleaseForm = ({ onSubmit, onCancel, formGroup, type, initValues, isLoading }: FormProps) => {
  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(getValidateSchema(type) as any)
  })

  const {
    control,
    formState: { isDirty, isValid },
    getValues,
    reset
  } = form
  const formState = useFormState({ control: control })

  useEffect(() => {
    if (initValues) {
      reset({ ...initValues })
    }
  }, [initValues])

  const {
    palette: { home }
  } = useTheme()

  const handleSubmit = () => {
    const data = getValues()
    // console.log('PressReleaseForm', data)
    onSubmit({ ...data, type, id: data.id ? data.id : new Date().getTime() })
  }

  useEffect(() => {
    reset()
  }, [type])

  useEffect(() => {
    if (form) form.setValue('distributionDate', moment().format(DATE_FORMAT.DASH_REV))
  }, [])

  if (!formGroup) return null

  return (
    <CompleteFormAccordion
      status={FormStatus.inprogress}
      title={formGroup.title}
      subTitle={formGroup.description}
      expanded
      allowCancel
      onCancel={onCancel}
    >
      <Stack component={'form'} gap={3}>
        <TipItemHorizontal content={formGroup.tip} />
        <Stack gap={2}>
          {formGroup.groups.map((group: IPressReleaseGroup, index) => (
            <>
              <Stack gap={2} component={'div'} key={group.title}>
                <Typography cate='button_30' plainColor='home.mint500' className={styles.group_title}>
                  {group.title}
                </Typography>
                <Grid container rowGap={2} columnSpacing={2.5}>
                  {group.fields.map((field: IPressReleaseInput) => (
                    <Grid item md={field.column} xs={12} key={field.name}>
                      {field.type === 'input' && (
                        <InputItem
                          name={field.name}
                          label={
                            <>
                              {!field.inputProps?.required && (
                                <Typography component={'span'} sx={{ color: home.mint500 }}>
                                  &gt;&nbsp;&nbsp;
                                </Typography>
                              )}
                              {field.label}
                            </>
                          }
                          subLabel={field.subLabel}
                          control={control}
                          textFieldProps={{
                            inputProps: { ...field.inputProps }
                          }}
                          sxLabel={{ fontSize: remConvert('16px'), marginBottom: '8px' }}
                          sxSubLabel={{
                            color: home.gray100,
                            fontSize: remConvert('12px'),
                            marginTop: 0,
                            textOverflow: 'initial',
                            overflow: 'initial',
                            whiteSpace: 'initial'
                          }}
                        />
                      )}
                      {field.type === 'textarea' && (
                        <TextareaItem
                          name={field.name}
                          label={
                            <>
                              {!field.inputProps?.required && (
                                <Typography component={'span'} sx={{ color: home.mint500 }}>
                                  &gt;&nbsp;&nbsp;
                                </Typography>
                              )}
                              {field.label}
                            </>
                          }
                          subLabel={field.subLabel}
                          control={control}
                          textFieldProps={{
                            inputProps: { ...field.inputProps }
                          }}
                          sxLabel={{ fontSize: remConvert('16px'), marginBottom: '2px' }}
                          sxSubLabel={{
                            color: home.gray100,
                            fontSize: remConvert('12px'),
                            marginTop: 0,
                            textOverflow: 'initial',
                            overflow: 'initial',
                            whiteSpace: 'initial'
                          }}
                        />
                      )}
                      {field.type === 'date' && (
                        <InputItem
                          name={field.name}
                          control={control}
                          required={true}
                          textFieldProps={{ required: true }}
                          renderInput={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DatePicker
                              value={value}
                              defaultValue={moment().format(DATE_FORMAT.DASH_REV)}
                              labelProps={{
                                label: field.label,
                                ...field.inputProps
                              }}
                              containerSx={{
                                border: '1px solid'
                              }}
                              onDateChange={(date: Date) => {
                                onChange(moment(date).format(DATE_FORMAT.DASH_REV))
                              }}
                            />
                          )}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              {index < formInputs.groups.length - 1 && <FormDivider sx={{ marginY: convertToRem(8) }} />}
            </>
          ))}
        </Stack>
        <PrimaryButton
          btnSize='md'
          fullWidth
          onClick={handleSubmit}
          disabled={!formState.isValid}
          sx={{
            opacity: !formState.isValid ? 0.5 : 1,
            '&.Mui-disabled': {
              bgcolor: 'main_primary.blue500',
              borderColor: 'main_primary.blue500'
            }
          }}
          isLoading={isLoading}
          startIcon={isLoading ? undefined : <Add sx={{ color: 'home.gray500' }} />}
        >
          <Typography cate='title_40' plainColor={'home.gray500'}>
            보도자료 생성하기
          </Typography>
        </PrimaryButton>
      </Stack>
    </CompleteFormAccordion>
  )
}

export default PressReleaseForm
