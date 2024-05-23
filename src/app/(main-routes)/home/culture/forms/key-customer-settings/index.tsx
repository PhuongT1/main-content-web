import { Typography, Upload } from '@/elements'
import InputItem from '@/form/input'
import { Box, MenuItem, useTheme } from '@mui/material'
import { FormProvider, ValidationMode, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import SelectItem from '@/form/select'
import {
  CUSTOMER_SETTINGS_AGE,
  CUSTOMER_SETTINGS_BUSINESS,
  CUSTOMER_SETTINGS_FURNITURE,
  CUSTOMER_SETTINGS_INCOME,
  CUSTOMER_SETTINGS_JOB,
  CUSTOMER_SETTINGS_REGION
} from '@/constants/culture/culture.constant'
import TextareaItem from '@/form/textarea'
import SelectInput from '@/form/select/select-input'
import { useLanguage } from '@/hooks/use-language'

const KeyCustomerSettings = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(
    _.isEmpty(cultureForms.key_customer_settings) ? 'wip' : 'completed'
  )
  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    gender: cultureForms.key_customer_settings?.gender || '',
    age: cultureForms.key_customer_settings?.age || '',
    region: cultureForms.key_customer_settings?.region || '',
    furniture: cultureForms.key_customer_settings?.furniture || '',
    job: cultureForms.key_customer_settings?.job || '',
    income: cultureForms.key_customer_settings?.income || '',
    business_main: cultureForms.key_customer_settings?.business_main || '',
    target_main: cultureForms.key_customer_settings?.target_main || '',
    details_main: cultureForms.key_customer_settings?.details_main || '',
    business_second: cultureForms.key_customer_settings?.business_second || '',
    target_second: cultureForms.key_customer_settings?.target_second || '',
    details_second: cultureForms.key_customer_settings?.details_second || ''
  }

  const schema = yup
    .object({
      gender: yup.string().required(),
      age: yup.string().required(),
      region: yup.string().required(),
      furniture: yup.string().required(),
      job: yup.string().required(),
      income: yup.string().required(),
      business_main: yup.string().required(),
      target_main: yup.string().required(),
      details_main: yup.string().required(),
      business_second: yup.string().required(),
      target_second: yup.string().required(),
      details_second: yup.string().required()
    })
    .required()

  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode,
    reValidateMode: 'onChange',
    defaultValues: {
      gender: cultureForms.key_customer_settings?.gender || '',
      age: cultureForms.key_customer_settings?.age || '',
      region: cultureForms.key_customer_settings?.region || '',
      furniture: cultureForms.key_customer_settings?.furniture || '',
      job: cultureForms.key_customer_settings?.job || '',
      income: cultureForms.key_customer_settings?.income || '',
      business_main: cultureForms.key_customer_settings?.business_main || '',
      target_main: cultureForms.key_customer_settings?.target_main || '',
      details_main: cultureForms.key_customer_settings?.details_main || '',
      business_second: cultureForms.key_customer_settings?.business_second || '',
      target_second: cultureForms.key_customer_settings?.target_second || '',
      details_second: cultureForms.key_customer_settings?.details_second || ''
    }
  })
  const { control, handleSubmit, reset, setValue, watch, getValues } = form

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, key_customer_settings: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      gender: '',
      age: '',
      region: '',
      furniture: '',
      job: '',
      income: '',
      business_main: '',
      target_main: '',
      details_main: '',
      business_second: '',
      target_second: '',
      details_second: ''
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.key_customer_settings
    setCultureForms(data)
  }

  return (
    <FormProvider {...form}>
      <Box>
        <Typography
          cate='body_20'
          color={home.gray50}
          sx={{
            paddingTop: '10px',
            paddingBottom: '24px',
            borderBottom: `1px solid ${home.gray200}`,
            marginBottom: '24px'
          }}
        >
          {dict.key_customer_settings}
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          display={'flex'}
          flexDirection={'column'}
          gap={'24px'}
          component={'form'}
        >
          <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
            <Typography component={'span'} cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
              {dict.key_customer_settings_persona}
              <Typography component={'span'} cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
                {' '}
                ({dict.key_customer_settings_persona_sub})
              </Typography>
            </Typography>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box width={'50%'}>
                <SelectItem
                  control={control}
                  textFieldProps={{ required: true, placeholder: dict.key_customer_settings_gender_placeholder }}
                  label={dict.key_customer_settings_gender}
                  name={`gender`}
                  disabled={currentFormState === 'completed'}
                >
                  <MenuItem value='남자'>남자</MenuItem>
                  <MenuItem value='여자'>여자</MenuItem>
                </SelectItem>
              </Box>

              <Box width={'50%'}>
                <SelectItem
                  control={control}
                  textFieldProps={{ required: true, placeholder: dict.key_customer_settings_age_placeholder }}
                  label={dict.key_customer_settings_age}
                  name={`age`}
                  disabled={currentFormState === 'completed'}
                >
                  {CUSTOMER_SETTINGS_AGE.map((value: string, index: number) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    )
                  })}
                </SelectItem>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box width={'50%'}>
                <SelectItem
                  control={control}
                  textFieldProps={{ required: true, placeholder: dict.key_customer_settings_region_placeholder }}
                  label={dict.key_customer_settings_region}
                  name={`region`}
                  disabled={currentFormState === 'completed'}
                >
                  {CUSTOMER_SETTINGS_REGION.map((value: string, index: number) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    )
                  })}
                </SelectItem>
              </Box>

              <Box width={'50%'}>
                <SelectInput
                  disabled={currentFormState === 'completed'}
                  inputProps={{
                    placeholder: dict.key_customer_settings_furniture_input,
                    inputProps: {
                      maxLength: 15
                    }
                  }}
                  control={control}
                  textFieldProps={{
                    required: true,
                    placeholder: dict.key_customer_settings_furniture_placeholder
                  }}
                  menus={{
                    options: CUSTOMER_SETTINGS_FURNITURE,
                    value: 'name',
                    label: 'name'
                  }}
                  label={dict.key_customer_settings_furniture}
                  name={`furniture`}
                />
              </Box>
            </Box>

            <Box>
              <SelectInput
                disabled={currentFormState === 'completed'}
                inputProps={{
                  placeholder: dict.key_customer_settings_job_input,
                  inputProps: {
                    maxLength: 15
                  }
                }}
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: dict.key_customer_settings_job_placeholder
                }}
                menus={{
                  options: CUSTOMER_SETTINGS_JOB,
                  value: 'name',
                  label: 'name'
                }}
                label={dict.key_customer_settings_job}
                name={`job`}
              />
            </Box>

            <Box>
              <SelectInput
                disabled={currentFormState === 'completed'}
                inputProps={{
                  placeholder: dict.key_customer_settings_income_input,
                  inputProps: {
                    maxLength: 15
                  }
                }}
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: dict.key_customer_settings_income_placeholder
                }}
                menus={{
                  options: CUSTOMER_SETTINGS_INCOME,
                  value: 'name',
                  label: 'name'
                }}
                label={dict.key_customer_settings_income}
                name={`income`}
              />
            </Box>
          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
            <Typography component={'span'} cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
              {dict.key_customer_settings_main}
              <Typography component={'span'} cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
                {' '}
                ({dict.key_customer_settings_main_sub})
              </Typography>
            </Typography>

            <SelectInput
              disabled={currentFormState === 'completed'}
              inputProps={{
                placeholder: dict.key_customer_settings_business_main_input,
                inputProps: {
                  maxLength: 15
                }
              }}
              control={control}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_business_main_placeholder
              }}
              menus={{
                options: CUSTOMER_SETTINGS_BUSINESS,
                value: 'name',
                label: 'name'
              }}
              label={dict.key_customer_settings_business_main}
              name={`business_main`}
            />

            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.key_customer_settings_target_main}
              name='target_main'
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_target_main_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />
            <TextareaItem
              multiLine={2}
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.key_customer_settings_details_main}
              name='details_main'
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_target_main_placeholder,
                rows: 1.84,
                multiline: true,
                inputProps: {
                  maxLength: 50
                }
              }}
            />
          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
            <Typography component={'span'} cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
              {dict.key_customer_settings_second}
              <Typography component={'span'} cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
                {' '}
                ({dict.key_customer_settings_second_sub})
              </Typography>
            </Typography>

            <SelectInput
              disabled={currentFormState === 'completed'}
              inputProps={{
                placeholder: dict.key_customer_settings_business_second_input,
                inputProps: {
                  maxLength: 15
                }
              }}
              control={control}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_business_second_placeholder
              }}
              menus={{
                options: CUSTOMER_SETTINGS_BUSINESS,
                value: 'name',
                label: 'name'
              }}
              label={dict.key_customer_settings_business_second}
              name={`business_second`}
            />
            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.key_customer_settings_target_second}
              name='target_second'
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_target_second_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />
            <TextareaItem
              multiLine={2}
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.key_customer_settings_details_second}
              name='details_second'
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.key_customer_settings_details_second_placeholder,
                rows: 1.84,
                multiline: true,
                inputProps: {
                  maxLength: 50
                }
              }}
            />
          </Box>

          {currentFormState === 'completed' ? (
            <Box
              component={'div'}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
            >
              <EditButton
                onClick={() => setCurrentFormState('wip')}
                title={dict.culture_edit}
                style={{ width: '100%' }}
              />
              <DeleteButton onClick={toggleShowDialog} title={dict.culture_delete} style={{ width: '100%' }} />
            </Box>
          ) : (
            <ButtonItem
              sx={{
                height: '48px',
                color: home.gray500,
                backgroundColor: home.blue500,
                '&:hover': {
                  bgcolor: 'main_primary.blue300'
                }
              }}
              variant='contained'
              type='submit'
            >
              {dict.culture_submit}
            </ButtonItem>
          )}
        </Box>
        <DeleteDeck
          title={dict.delete_deck_title}
          description={dict.delete_deck_description}
          submitTxt={dict.delete_deck_submitTxt}
          cancelTxt={dict.delete_deck_cancelTxt}
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => onDeleteForm()}
        />
      </Box>
    </FormProvider>
  )
}

export default KeyCustomerSettings
