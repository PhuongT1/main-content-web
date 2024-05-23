import { Box, Grid, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import styles from './form.module.scss'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import InputItem from '@/form/input'
import { useForm, useFormState } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { remConvert } from '@/utils/convert-to-rem'
import {
  CardNewsEvents,
  CardNewsValidateSchema,
  FormStatus,
  formInputs
} from '@/app/(main-routes)/home/card-news/utils/common'
import { ICardNewsGroup, ICardNewsGroups, ICardNewsInput } from '@/types/cardnews/index.type'
import DatePicker from '@/libs/datepicker/DatePicker'
import { AddButton, ButtonItem } from '@/components/home/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import TextareaItem from '@/form/textarea'
import { DATE_FORMAT } from '@/constants/common.constant'
import moment from 'moment'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import FormDivider from '@/components/form-divider'
import PlusIcon from '@/assets/icons/plus'
import { CardNewsContext } from '../..'
import { listenEvent } from '@/utils/events'

interface FormProps {
  formGroup: ICardNewsGroups | undefined
  type: string
  id?: string
  formStatus?: FormStatus
  initValues?: object
  canOpenCollapse?: boolean
  onSubmit: (info: any, data: any) => void
  onCancel?: () => void
}

const getValidateSchema = (type: string) => {
  switch (type) {
    case CARD_NEWS_TYPES.BRAND_PROMOTION:
      return CardNewsValidateSchema.brandPromotion
    case CARD_NEWS_TYPES.PRODUCT_AND_SERVICE_INTRODUCTION:
      return CardNewsValidateSchema.productAndServiceIntroduction
    case CARD_NEWS_TYPES.CUSTOMER_ENGAGEMENT_AND_INTERACTION:
      return CardNewsValidateSchema.customerEngagementAndInteraction
    case CARD_NEWS_TYPES.COOPORATE_UPDATE_NEWS:
      return CardNewsValidateSchema.cooporateUpdateNews
    case CARD_NEWS_TYPES.EVENT_AND_PROMOTIONS:
      return CardNewsValidateSchema.eventsAndPromotions
    case CARD_NEWS_TYPES.SHARING_INFORMATION:
      return CardNewsValidateSchema.sharingInformation
    case CARD_NEWS_TYPES.JOB_POSTING:
      return CardNewsValidateSchema.jobPosting
  }
}
const CardNewsForm: React.FC<FormProps> = ({
  id,
  formGroup,
  type,
  initValues,
  canOpenCollapse,
  onSubmit,
  onCancel
}) => {
  const form = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(getValidateSchema(type) as any),
    defaultValues: initValues
  })

  const { expandKey, setExpandKey } = useContext(CardNewsContext)

  const { control, setValue } = form
  const formState = useFormState({ control: form.control })

  const {
    palette: { home }
  } = useTheme()

  const handleSubmit = () => {
    const data = form.getValues()
    const { companyName, prodDate, serviceName, id: _, type: _type, ...res } = data
    onSubmit(
      { type, id: id || uuidv4(), ...data },
      { companyName, prodDate, serviceName, values: Object.values(res).filter((i) => !!i) }
    )
  }

  useEffect(() => {
    listenEvent(CardNewsEvents.RESET_FORM, () => {
      form.reset(initValues)
    })
  }, [])

  if (!formGroup) return null

  const handleChange = () => {
    id && canOpenCollapse && setExpandKey(id)
  }

  return (
    <CompleteFormAccordion
      status={FormStatus.inprogress}
      title={formGroup.title}
      subTitle={formGroup.subTitle}
      key={id}
      expanded={id && canOpenCollapse ? id === expandKey : true}
      onChange={handleChange}
      allowCancel={true}
      onCancel={onCancel}
    >
      <Box component={'div'}>
        <TipItemHorizontal customSX={{ marginBottom: remConvert('24px') }} content={formGroup.tip} />
        {formGroup.groups.map((group: ICardNewsGroup, index) => (
          <Box component={'div'} key={group.title}>
            <Typography className={styles.group_title} color={home.mint500}>
              {group.title}
            </Typography>
            <Grid container spacing={2}>
              {group.fields.map((field: ICardNewsInput) => (
                <Grid item xs={12} key={field.name}>
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
                        ...field.inputProps,
                        inputProps: field.inputProps
                      }}
                      sxLabel={{
                        fontSize: remConvert('16px'),
                        marginBottom: field.subLabel ? '2px' : '8px',
                        color: home.gray0
                      }}
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
                        ...field.inputProps,
                        inputProps: field.inputProps
                      }}
                      sxLabel={{
                        fontSize: remConvert('16px'),
                        marginBottom: field.subLabel ? '2px' : '8px',
                        color: home.gray0
                      }}
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
                      label={field.label}
                      sxLabel={{ color: home.gray0 }}
                      textFieldProps={{
                        ...field.inputProps,
                        inputProps: field.inputProps
                      }}
                      renderInput={({ field: inputField }) => (
                        <DatePicker
                          {...inputField}
                          labelProps={{
                            label: ''
                          }}
                          value={form.getValues(field.name)}
                          onDateChange={(date: Date) => {
                            if (field.inputProps?.readonly) return
                            setValue(field.name, moment(date).format(DATE_FORMAT.DASH_REV), {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true
                            })
                          }}
                        />
                      )}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            {index < formInputs.groups.length - 1 && <FormDivider sx={{ marginTop: '24px', marginBottom: '24px' }} />}
          </Box>
        ))}
        <ButtonItem
          startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
          sx={{
            marginTop: remConvert('24px'),
            lineHeight: remConvert('20px'),
            display: 'flex',
            height: remConvert('48px'),
            padding: remConvert('20px'),
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderColor: home.blue500,
            backgroundColor: home.blue500,
            color: home.gray500,
            minWidth: '0',
            borderRadius: remConvert('10px'),
            '&:hover': {
              backgroundColor: 'main_primary.blue300'
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              borderColor: home.blue500,
              color: home.gray500,
              backgroundColor: home.blue500
            }
          }}
          fullWidth
          onClick={handleSubmit}
          disabled={!formState.isValid}
        >
          카드뉴스 생성하기
        </ButtonItem>
      </Box>
    </CompleteFormAccordion>
  )
}

export default CardNewsForm
