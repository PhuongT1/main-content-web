import { Typography } from '@/elements'
import useToggle from '@/hooks/use-toggle'
import { EMAIL_DOMAIN, ROLE_TEAMBUILDING } from '@/mock/teambuilding/data'
import { Box, Grid, MenuItem, Stack, useTheme } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'

import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import ErrorMessage from '@/form/ErrorMessage'
import InputItem from '@/form/input'
import { UploadAvatar } from '@/form/upload'
import { TFormValuesStepOnceAndSecond, TProfilePersonItem } from '@/types/teambuilding/index.type'
import { MAXLENGTH_VALIDATE } from '../utils/validate'
import CardWrapper from './card-list/card-wrapper'
import SelectItem from '@/form/select'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import SelectInput from '@/form/select/select-input'
import Alert from '@/elements/alert'
import { requestIdleCallbackCustom } from '@/utils/events'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'
import { Home } from '@mui/icons-material'

function ProfilePersonItem({
  index,
  greetingList,
  role,
  markText,
  handleRemoveProfileItem,
  formProps
}: TProfilePersonItem<TFormValuesStepOnceAndSecond>) {
  const { dict, lang } = useLanguage()
  const theme = useTheme()
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = formProps

  const inputRef = useRef<HTMLInputElement>()

  const [message, setMessageError] = useState<string>('')
  const [toggleDisabledManualField, , setValueToggle] = useToggle()
  const onClickManualDomainEmail = (mode: boolean) => {
    setValueToggle(mode)
    setValue(`data.${index}.isEmailRequired`, true)
    if (!mode) {
      setValue(`data.${index}.manualDomain`, '')
      setValue(`data.${index}.isManualDomain`, false)
    }
    if (mode) {
      setValue(`data.${index}.domain`, '')
      setValue(`data.${index}.isManualDomain`, true)
      requestIdleCallbackCustom(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      })
    }
  }

  const roleList = useMemo(() => {
    return ROLE_TEAMBUILDING.filter((item) => item.type === role)
  }, [])

  useEffect(() => {
    const email = getValues(`data.${index}.domain`)
    setValue(`data.${index}.manualDomain`, email)
  }, [watch(`data.${index}.domain`)])

  return (
    <BoxLayoutOulined
      header={
        <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} width='100%'>
          <Typography cate='title_50' color={theme.palette.home.gray50}>
            {markText} {index + 1}
          </Typography>
          {index > 0 ? (
            <Box
              onClick={() => handleRemoveProfileItem(index)}
              sx={{
                flexShrink: 0,
                borderColor: theme.palette.home.gray300,
                color: theme.palette.home.gray0,
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            >
              <ClearBoxIcon
                svgProps={{ width: 36, height: 36 }}
                pathProps={{ stroke: theme.palette.home.gray0 }}
                rectProps={{ fill: theme.palette.home.gray300 }}
              />
            </Box>
          ) : null}
        </Box>
      }
      style={{ marginBottom: '20px', backgroundColor: 'transparent' }}
    >
      <Box flexWrap={'wrap'} display='flex' justifyContent='space-between' gap={'20px'} width='100%'>
        <Box
          display='flex'
          height={300}
          justifyContent='space-between'
          alignItems='start'
          gap={2}
          flexShrink={0}
          width={240}
        >
          <UploadAvatar formProps={formProps} name={`data.${index}.path`} />
        </Box>
        <Grid flex={1} alignItems='end' container spacing={2}>
          <Grid item xs={12} xl={2.5}>
            <InputItem
              maxLength={MAXLENGTH_VALIDATE.NAME}
              control={control}
              textFieldProps={{
                required: true,
                placeholder: dict.common_name,
                inputProps: { maxLength: MAXLENGTH_VALIDATE.NAME }
              }}
              label={dict.common_name}
              name={`data.${index}.name`}
            />
          </Grid>
          <Grid item xs={12} xl={1.5}>
            <SelectItem
              control={control}
              textFieldProps={{ required: true, placeholder: dict.common_select }}
              label={dict.common_age}
              sxLabel={{ color: theme.palette.home.gray50 }}
              name={`data.${index}.age`}
            >
              {Array.from({ length: 99 }, (_, i) => i + 1).map((val: number) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </SelectItem>
          </Grid>
          <Grid item xs={12} sm={6} xl={2.5}>
            <InputItem
              control={control}
              maxLength={MAXLENGTH_VALIDATE.EMAIL}
              onChangeInput={(val = '') => {
                if (val.match(/^[a-z0-9]+$/i)) {
                  setValue(`data.${index}.email`, val)
                } else {
                  setValue(`data.${index}.email`, '')
                }
              }}
              textFieldProps={{
                placeholder: dict.id
              }}
              label={dict.common_email}
              name={`data.${index}.email`}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <Box display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
              <Typography color='main.gray30' cate='title_50'>
                @
              </Typography>

              <InputItem
                control={control}
                maxLength={MAXLENGTH_VALIDATE.MANUALDOMAIN}
                textFieldProps={{
                  inputRef,
                  placeholder: dict.common_email,

                  inputProps: { maxLength: MAXLENGTH_VALIDATE.MANUALDOMAIN }
                }}
                disabled={!toggleDisabledManualField && getValues(`data.${index}.domain`) !== dict.direct_input}
                name={`data.${index}.manualDomain`}
              />
            </Box>
          </Grid>
          <Grid item xs={12} xl={2.5}>
            <SelectItem
              control={control}
              textFieldProps={{
                placeholder: dict.common_select
              }}
              label=''
              name={`data.${index}.domain`}
            >
              <MenuItem onClick={() => onClickManualDomainEmail(true)} value={dict.direct_input}>
                {dict.direct_input}
              </MenuItem>
              {EMAIL_DOMAIN.map((val) => (
                <MenuItem
                  onClick={() => {
                    onClickManualDomainEmail(false)
                  }}
                  key={val.id}
                  value={val.name}
                >
                  {val.name}
                </MenuItem>
              ))}
            </SelectItem>
          </Grid>
          <Grid item xs={12} xl={3}>
            <SelectInput
              inputProps={{
                placeholder: dict.direct_input,
                inputProps: {
                  maxLength: MAXLENGTH_VALIDATE.ROLE
                }
              }}
              control={control}
              textFieldProps={{
                required: true,
                placeholder: dict.common_select
              }}
              menus={{
                options: roleList,
                value: 'id',
                label: 'name'
              }}
              label={dict.common_role}
              sxLabel={{ color: theme.palette.home.gray50 }}
              name={`data.${index}.role`}
            />
          </Grid>
          <Grid item xs={12} xl={9}>
            <SelectInput
              inputProps={{
                placeholder: dict.direct_input,
                inputProps: {
                  maxLength: MAXLENGTH_VALIDATE.DESCRIPTION
                }
              }}
              control={control}
              textFieldProps={{
                required: true,
                placeholder: dict.common_select
              }}
              menus={{
                options: greetingList,
                value: 'id',
                label: 'title'
              }}
              label={dict.teambuilding_intro}
              sxLabel={{ color: theme.palette.home.gray50 }}
              name={`data.${index}.description`}
            />
          </Grid>
          <Grid alignItems='end' item xs={12}>
            <CardWrapper
              dict={dict}
              formProps={formProps}
              message={message}
              setMessageError={setMessageError}
              index={index}
            />
          </Grid>
        </Grid>
      </Box>
      <Box width={1} mt={'20px'}>
        <Stack spacing={'10px'}>
          <ErrorMessage message={message} />
          <ErrorMessage
            errors={errors}
            name='data'
            render={({ messages }) => {
              if (Object.keys((messages?.[index] as any) ?? []).includes('manualDomain')) {
                return (
                  <Alert color='error' severity='error' variant='outlined'>
                    {dict.invalid_email_format}
                  </Alert>
                )
              }
            }}
          />
        </Stack>
      </Box>
    </BoxLayoutOulined>
  )
}

export default ProfilePersonItem
