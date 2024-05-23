import { Typography, Upload } from '@/elements'
import InputItem from '@/form/input'
import { Box, useTheme } from '@mui/material'
import { ValidationMode, useForm } from 'react-hook-form'
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
import TextareaItem from '@/form/textarea'
import Tabs from '@/elements/tabs'
import Tab from '@/elements/tab'
import styles from './business-model.module.scss'
import Image from 'next/image'
import { Content1, Content2, Content3 } from '@/assets/images/culture'
import { useLanguage } from '@/hooks/use-language'

const BusinessModel = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [tabActive, setTabActive] = useState<string>(cultureForms.business_model?.type || '')
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.business_model) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  const defaultValues = {
    type: cultureForms.business_model?.type || '',
    enterprise: cultureForms.business_model?.enterprise || '',
    customer: cultureForms.business_model?.customer || '',
    details: cultureForms.business_model?.details || '',
    provider: cultureForms.business_model?.provider || ''
  }

  const schema = yup
    .object({
      type: yup.string().required(),
      enterprise: yup.string().required(),
      customer: yup.string().required(),
      details: yup.string().required(),
      provider: yup.string()
    })
    .required()

  const formOptions: any = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }

  const { handleSubmit, control, reset, setValue, getValues } = useForm(formOptions)

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)

    setCultureForms({ ...cultureForms, business_model: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({ type: '', enterprise: '', customer: '', details: '', provider: '' })
    setCurrentFormState('wip')
    setTabActive('')

    const data = { ...cultureForms }
    delete data.business_model
    setCultureForms(data)
  }

  const handleCategoryChange = (event: any, newValue: string) => {
    setValue('type', newValue)
    setTabActive(newValue)
  }
  return (
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
        {dict.business_model}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'16px'} component={'form'}>
        <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
          {currentFormState !== 'completed' && (
            <Tabs
              className={styles.tabscustom}
              onChange={handleCategoryChange}
              style={{
                margin: '0',
                padding: '0',
                height: 'auto',
                minHeight: '40px',
                maxHeight: '40px',
                gap: '12px'
              }}
              value={tabActive}
              variant='fullWidth'
              indicatorColor='secondary'
              textColor='inherit'
            >
              <Tab
                value={'일반'}
                label={dict.business_model_common}
                style={{ height: '40px', marginRight: '12px', fontWeight: '600' }}
              />
              <Tab
                value={'중계'}
                label={dict.business_model_relay}
                style={{ height: '40px', marginRight: '12px', fontWeight: '600' }}
              />
              <Tab
                value={'플랫폼'}
                label={dict.business_model_platform}
                style={{ height: '40px', marginRight: '12px', fontWeight: '600' }}
              />
            </Tabs>
          )}

          {!!tabActive && (
            <Box
              sx={{
                width: '100%',
                padding: '24px 42px',
                textAlign: 'center',
                border: `2px solid ${home.blue500}`,
                borderRadius: '10px',
                backgroundColor: '#3C82F91A'
              }}
            >
              {tabActive === '일반' && (
                <Image src={Content1} width={204} height={52} style={{ width: '100%' }} alt='' />
              )}
              {tabActive === '중계' && (
                <Image src={Content2} width={203} height={157} style={{ width: '100%' }} alt='' />
              )}
              {tabActive === '플랫폼' && (
                <Image src={Content3} width={137} height={122} style={{ width: '100%' }} alt='' />
              )}
            </Box>
          )}
        </Box>

        <InputItem
          disabled={currentFormState === 'completed'}
          control={control}
          label={dict.business_model_enterprise}
          name='enterprise'
          sxInput={{
            '.MuiOutlinedInput-input': {
              '&.MuiInputBase-input': {
                padding: '16px 0 16px 16px'
              }
            }
          }}
          textFieldProps={{
            required: true,
            placeholder: dict.business_model_enterprise_placeholder,
            inputProps: {
              maxLength: 15
            }
          }}
        />

        <InputItem
          disabled={currentFormState === 'completed'}
          control={control}
          label={dict.business_model_customer}
          name='customer'
          sxInput={{
            '.MuiOutlinedInput-input': {
              '&.MuiInputBase-input': {
                padding: '16px 0 16px 16px'
              }
            }
          }}
          textFieldProps={{
            required: true,
            placeholder: dict.business_model_customer_placeholder,
            inputProps: {
              maxLength: 15
            }
          }}
        />

        {tabActive !== '일반' && (
          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.business_model_provider}
            name='provider'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.business_model_provider_placeholder,
              inputProps: {
                maxLength: 15
              }
            }}
          />
        )}

        <TextareaItem
          multiLine={2}
          disabled={currentFormState === 'completed'}
          control={control}
          label={dict.business_model_details}
          name={`details`}
          sxInput={{
            '.MuiOutlinedInput-input': {
              '&.MuiInputBase-input': {
                padding: '16px 0 16px 16px'
              }
            }
          }}
          textFieldProps={{
            required: true,
            placeholder: dict.business_model_details_placeholder,
            rows: 1.84,
            multiline: true,
            inputProps: {
              maxLength: 75
            }
          }}
        />
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
  )
}

export default BusinessModel
