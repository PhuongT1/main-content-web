'use client'
import { FormControlLabel, Grid, Radio, RadioGroup, Stack, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { PrimaryTextarea } from '@/elements'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { AlertProps } from '@/components/dialog'
import InputItem from '@/form/input'
import {
  OPTION_REPORT_FEEDBACK,
  ReportFeedbackYup,
  TReportFeedbackForm
} from '@/app/(main-routes)/project-home/_modules/domain/entities/feedback-project'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'

const ModalReportFeedBack: FC<AlertProps> = ({ onSubmit, ...rest }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<any>({
    resolver: yupResolver(ReportFeedbackYup),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  return (
    <ModalNotification
      title={dict.project_home_select_reason_reporting}
      description={
        <Stack gap={remConvert('10px')}>
          <InputItem
            name='category'
            control={control}
            sxBox={{
              background: home.gray300,
              borderRadius: remConvert('10px'),
              padding: remConvert('20px')
            }}
            renderInput={({ field }) => (
              <RadioGroup key={`${field.value}`} value={field.value} row>
                <Grid container>
                  {OPTION_REPORT_FEEDBACK.map((item, index) => (
                    <Grid key={index} item xs={6}>
                      <FormControlLabel
                        value={item.value}
                        onChange={() => field.onChange(item.value)}
                        control={<Radio />}
                        label={item.lable}
                        sx={{ flex: 1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          />
          <InputItem
            name='content'
            control={control}
            showErrorMessage
            label={dict.project_home_title}
            maxLength={120}
            renderInput={({ field, fieldState: { error } }) => (
              <PrimaryTextarea
                {...field}
                onChange={(e) => {
                  if (e.target.value.length > 120) return
                  field.onChange(e)
                }}
                value={field.value || ''}
                maxLength={120}
                placeholder={dict.text_write_a_reason}
                sx={{
                  background: home.gray300,
                  width: '100%',
                  boxShadow: 'unset !important'
                }}
              />
            )}
          />
        </Stack>
      }
      sxTitle={{
        borderBottom: `1px solid ${home.gray200}`,
        marginInline: '-32px',
        padding: '0 32px 32px',
        marginTop: 0
      }}
      sxDescription={{ margin: 0, paddingBlock: remConvert('20px'), marginBottom: remConvert('-32px') }}
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      sxButtonSubmit={{
        pointerEvents: isValid ? 'auto' : 'none',
        backgroundColor: isValid ? home.blue500 : home.gray100
      }}
      {...rest}
    />
  )
}
export default ModalReportFeedBack
