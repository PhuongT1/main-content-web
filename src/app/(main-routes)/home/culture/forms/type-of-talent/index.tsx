import { Typography } from '@/elements'
import { Alert, Box, MenuItem, useTheme } from '@mui/material'
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
import { TYPE_OF_TALENT } from '@/constants/culture/culture.constant'
import WarningAppend from '../../warning-append'
import SelectInput from '@/form/select/select-input'
import { useLanguage } from '@/hooks/use-language'

const TypeOfTalent = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.type_of_talent) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.type_of_talent) {
      setValue('type_of_talent', cultureForms.type_of_talent?.type_of_talent)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    type_of_talent: yup
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
      type_of_talent: cultureForms.type_of_talent?.type_of_talent || [{ type: '', details: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue, getValues } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'type_of_talent'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, type_of_talent: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      type_of_talent: [{ type: '', details: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.type_of_talent
    setCultureForms(data)
  }

  const onChangeManual = (name: string, value: string) => {
    const index = name.slice('type_of_talent'.length + 1, 'type_of_talent'.length + 2)
    const data = _.cloneDeep(getValues('type_of_talent'))

    const found = TYPE_OF_TALENT.find((element: any) => element.name === value)

    if (found) {
      data[index] = { ...data[index], details: found?.details, type: value }
    } else {
      data[index] = { ...data[index], details: '', type: value }
    }

    setValue('type_of_talent', data)
  }

  const onCheckReadOnly = (index: number) => {
    const data = _.cloneDeep(getValues('type_of_talent'))
    return TYPE_OF_TALENT.some((item: any) => item.name === data[index].type)
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
          {dict.type_of_talent}
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
                  {dict.type_of_talent_form_number} 0{index + 1}
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
                  placeholder: dict.direct_input,
                  inputProps: {
                    maxLength: 15
                  }
                }}
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: dict.type_of_talent_type_placeholder
                }}
                menus={{
                  options: TYPE_OF_TALENT,
                  value: 'id',
                  label: 'name'
                }}
                label={dict.type_of_talent_type}
                name={`type_of_talent.${index}.type`}
              />

              <TextareaItem
                multiLine={3}
                disabled={currentFormState === 'completed'}
                control={control}
                label={dict.type_of_talent_details}
                name={`type_of_talent.${index}.details`}
                sxInput={{
                  '.MuiOutlinedInput-input': {
                    '&.MuiInputBase-input': {
                      padding: '16px 0 16px 16px'
                    }
                  }
                }}
                textFieldProps={{
                  required: true,
                  placeholder: dict.type_of_talent_details_placeholder,
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

          {fields.length < 3 && currentFormState !== 'completed' && (
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
                  {dict.type_of_talent_addMore}
                </ButtonItem>
              </Box>

              <WarningAppend text={dict.type_of_talent_WarningAppend} />
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

export default TypeOfTalent
