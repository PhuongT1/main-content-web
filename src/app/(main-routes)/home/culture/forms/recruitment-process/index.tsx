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
import { RECRUIMENT_PROCESS } from '@/constants/culture/culture.constant'
import WarningAppend from '../../warning-append'
import SelectInput from '@/form/select/select-input'
import { useLanguage } from '@/hooks/use-language'

const RecruimentProcess = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(
    _.isEmpty(cultureForms.recruitment_process) ? 'wip' : 'completed'
  )
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.recruitment_process) {
      setValue('recruitment_process', cultureForms.recruitment_process?.recruitment_process)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    recruitment_process: yup
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
      recruitment_process: cultureForms.recruitment_process?.recruitment_process || [{ type: '', details: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue, getValues } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'recruitment_process'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, recruitment_process: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      recruitment_process: [{ type: '', details: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.recruitment_process
    setCultureForms(data)
  }

  const onChangeManual = (name: string, value: string) => {
    const index = name.slice('recruitment_process'.length + 1, 'recruitment_process'.length + 2)
    const data = _.cloneDeep(getValues('recruitment_process'))

    const found = RECRUIMENT_PROCESS.find((element: any) => element.name === value)

    if (found) {
      data[index] = { ...data[index], details: found?.details, type: value }
    } else {
      data[index] = { ...data[index], details: '', type: value }
    }

    setValue('recruitment_process', data)
  }

  const onCheckReadOnly = (index: number) => {
    const data = _.cloneDeep(getValues('recruitment_process'))
    return RECRUIMENT_PROCESS.some((item: any) => item.name === data[index].type)
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
          {dict.recruitment_process}
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
                  {dict.recruitment_process_form_number} 0{index + 1}
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
                  placeholder: dict.recruitment_process_type_placeholder
                }}
                menus={{
                  options: RECRUIMENT_PROCESS,
                  value: 'name',
                  label: 'name'
                }}
                label={dict.recruitment_process_type}
                name={`recruitment_process.${index}.type`}
              />

              <TextareaItem
                multiLine={2}
                disabled={currentFormState === 'completed'}
                control={control}
                label={dict.recruitment_process_details}
                name={`recruitment_process.${index}.details`}
                sxInput={{
                  '.MuiOutlinedInput-input': {
                    '&.MuiInputBase-input': {
                      padding: '16px 0 16px 16px'
                    }
                  }
                }}
                textFieldProps={{
                  required: true,
                  placeholder: dict.recruitment_process_details_placeholder,
                  rows: 1.84,
                  multiline: true,
                  inputProps: {
                    maxLength: 50,
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
                  {dict.recruitment_process_addMore}
                </ButtonItem>
              </Box>

              <WarningAppend text={dict.recruitment_process_WarningAppend} />
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

export default RecruimentProcess
