import { Typography, Upload } from '@/elements'
import { Alert, Box, InputLabel, MenuItem, useTheme } from '@mui/material'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import TextareaItem from '@/form/textarea'
import SelectItem from '@/form/select'
import PlusIcon from '@/assets/icons/plus'
import { RANK_AND_SYSTEM } from '@/constants/culture/culture.constant'
import WarningAppend from '../../warning-append'
import SelectInput from '@/form/select/select-input'
import { useLanguage } from '@/hooks/use-language'

const RankAndSystem = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(
    _.isEmpty(cultureForms.rank_and_system) ? 'wip' : 'completed'
  )
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.rank_and_system) {
      setValue('rank_and_system', cultureForms.rank_and_system?.rank_and_system)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    rank_and_system: yup
      .array(
        yup.object().shape({
          type: yup.string().required(''),
          details: yup.string().required('')
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      rank_and_system: cultureForms.rank_and_system?.rank_and_system || [{ type: '', details: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue, getValues } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'rank_and_system'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, rank_and_system: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      rank_and_system: [{ type: '', details: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.rank_and_system
    setCultureForms(data)
  }

  const onChangeManual = (name: string, value: string) => {
    const index = name.slice('rank_and_system'.length + 1, 'rank_and_system'.length + 2)
    const data = _.cloneDeep(getValues('rank_and_system'))

    const found = RANK_AND_SYSTEM.find((element: any) => element.name === value)

    if (found) {
      data[index] = { ...data[index], details: found?.details, type: value }
    } else {
      data[index] = { ...data[index], details: '', type: value }
    }

    setValue('rank_and_system', data)
  }

  const onCheckReadOnly = (index: number) => {
    const data = _.cloneDeep(getValues('rank_and_system'))
    return RANK_AND_SYSTEM.some((item: any) => item.name === data[index].type)
  }

  return (
    <FormProvider {...form}>
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
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
          {dict.rank_and_system}
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          {fields.map((item: any, index: number) => (
            <Box
              key={item.id}
              width={'100%'}
              borderTop={index > 0 ? `1px solid ${home.gray200}` : ''}
              paddingTop={index > 0 ? '16px' : ''}
              sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Typography cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
                  {dict.rank_and_system_form_number} 0{index + 1}
                </Typography>

                {index > 0 && currentFormState !== 'completed' && (
                  <Typography
                    onClick={() => remove(index)}
                    cate='sub_title_20'
                    sx={{ color: home.gray100, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {dict.delete_form}
                  </Typography>
                )}
              </Box>

              <SelectInput
                onChangeManual={onChangeManual}
                disabled={currentFormState === 'completed'}
                inputProps={{
                  placeholder: dict.rank_and_system_type_input,
                  inputProps: {
                    maxLength: 15
                  }
                }}
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: dict.rank_and_system_type_placeholder
                }}
                menus={{
                  options: RANK_AND_SYSTEM,
                  value: 'name',
                  label: 'name'
                }}
                label={dict.rank_and_system_type}
                name={`rank_and_system.${index}.type`}
              />

              <TextareaItem
                multiLine={3}
                disabled={currentFormState === 'completed'}
                control={control}
                label={dict.rank_and_system_details}
                name={`rank_and_system.${index}.details`}
                sxInput={{
                  '.MuiOutlinedInput-input': {
                    '&.MuiInputBase-input': {
                      padding: '16px 0 16px 16px'
                    }
                  }
                }}
                textFieldProps={{
                  required: true,
                  placeholder: dict.rank_and_system_details_placeholder,
                  rows: 1.84,
                  multiline: true,
                  inputProps: {
                    maxLength: 80,
                    readOnly: onCheckReadOnly(index)
                  }
                }}
              />
            </Box>
          ))}

          {fields.length < 5 && currentFormState !== 'completed' && (
            <Box>
              <Box textAlign={'center'}>
                <ButtonItem
                  onClick={() => append({ type: '', details: '' })}
                  disableRipple
                  sx={{
                    color: home.blue500,
                    background: home.alpha_blue_10,
                    border: `1px solid ${home.blue500}`,
                    height: '46px'
                  }}
                  startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
                >
                  {dict.rank_and_system_addMore}
                </ButtonItem>
              </Box>

              <WarningAppend text={dict.rank_and_system_WarningAppend} />
            </Box>
          )}

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

export default RankAndSystem
