import { Typography, Upload } from '@/elements'
import { Alert, Box, InputLabel, MenuItem, useTheme } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
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
import InputItem from '@/form/input'
import { SKILLSETS } from '@/constants/culture/culture.constant'
import WarningAppend from '../../warning-append'
import { useLanguage } from '@/hooks/use-language'

const Skillsets = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.skillsets) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.skillsets) {
      setValue('skillsets', cultureForms.skillsets?.skillsets)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    skillsets: yup
      .array(
        yup.object().shape({
          type: yup.string().required(''),
          details1: yup.string().required(''),
          details2: yup.string().required(''),
          details3: yup.string().required('')
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      skillsets: cultureForms.skillsets?.skillsets || [{ type: '', details1: '', details2: '', details3: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'skillsets'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, skillsets: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      skillsets: [{ type: '', details1: '', details2: '', details3: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.skillsets
    setCultureForms(data)
  }

  return (
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
        {dict.skillsets}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Typography cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
                {dict.skillsets_form_number} 0{index + 1}
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

            <SelectItem
              control={control}
              textFieldProps={{ required: true, placeholder: dict.skillsets_type_placeholder }}
              label={dict.skillsets_type}
              name={`skillsets.${index}.type`}
              disabled={currentFormState === 'completed'}
            >
              {SKILLSETS.map((value: string, index: number) => {
                return (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                )
              })}
            </SelectItem>

            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.skillsets_details1}
              name={`skillsets.${index}.details1`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.skillsets_details1_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />

            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.skillsets_details2}
              name={`skillsets.${index}.details2`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.skillsets_details2_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />

            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.skillsets_details3}
              name={`skillsets.${index}.details3`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.skillsets_details3_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />
          </Box>
        ))}

        {fields.length < 3 && currentFormState !== 'completed' && (
          <Box>
            <Box textAlign={'center'}>
              <ButtonItem
                onClick={() => append({ type: '', details1: '', details2: '', details3: '' })}
                disableRipple
                sx={{
                  color: home.blue500,
                  background: home.alpha_blue_10,
                  border: `1px solid ${home.blue500}`,
                  height: '46px'
                }}
                startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
              >
                {dict.skillsets_addMore}
              </ButtonItem>
            </Box>

            <WarningAppend text={dict.skillsets_WarningAppend} />
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
  )
}

export default Skillsets
