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
import SelectItem from '@/form/select'
import PlusIcon from '@/assets/icons/plus'
import InputItem from '@/form/input'
import { PARTNERS } from '@/constants/culture/culture.constant'
import WarningAppend from '../../warning-append'
import SelectInput from '@/form/select/select-input'

const Partners = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.partners) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.partners) {
      setValue('partners', cultureForms.partners)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    partners: yup
      .array(
        yup.object().shape({
          type: yup.string().required(''),
          name: yup.string().required(''),
          keyword1: yup.string().required(''),
          keyword2: yup.string().required('')
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      partners: cultureForms.partners?.partners || [{ type: '', name: '', keyword1: '', keyword2: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'partners'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, partners: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({ partners: [{ type: '', name: '', keyword1: '', keyword2: '' }] })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.partners
    setCultureForms(data)
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
          우리와 협력 중인 주요 파트너와 관계를 소개해주세요.
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
                  파트너 0{index + 1}
                </Typography>

                {index > 0 && currentFormState !== 'completed' && (
                  <Typography
                    onClick={() => remove(index)}
                    cate='sub_title_20'
                    sx={{ color: home.gray100, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    삭제하기
                  </Typography>
                )}
              </Box>

              <SelectInput
                disabled={currentFormState === 'completed'}
                inputProps={{
                  placeholder: '직접 입력',
                  inputProps: {
                    maxLength: 20
                  }
                }}
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: '협력 분야 선택'
                }}
                menus={{
                  options: PARTNERS,
                  value: 'name',
                  label: 'name'
                }}
                label='협력 분야'
                name={`partners.${index}.type`}
              />

              <InputItem
                disabled={currentFormState === 'completed'}
                control={control}
                label='파트너명'
                name={`partners.${index}.name`}
                sxInput={{
                  '.MuiOutlinedInput-input': {
                    '&.MuiInputBase-input': {
                      padding: '16px 0 16px 16px'
                    }
                  }
                }}
                textFieldProps={{
                  required: true,
                  placeholder: '파트너명을 입력하세요.',
                  inputProps: {
                    maxLength: 20
                  }
                }}
              />

              <Box sx={{ display: 'flex', gap: '20px' }}>
                <InputItem
                  disabled={currentFormState === 'completed'}
                  control={control}
                  label='협력 키워드'
                  name={`partners.${index}.keyword1`}
                  sxInput={{
                    '.MuiOutlinedInput-input': {
                      '&.MuiInputBase-input': {
                        padding: '16px 0 16px 16px'
                      }
                    }
                  }}
                  textFieldProps={{
                    required: true,
                    placeholder: '키워드 입력',
                    inputProps: {
                      maxLength: 10
                    }
                  }}
                />

                <InputItem
                  disabled={currentFormState === 'completed'}
                  control={control}
                  label='협력 키워드'
                  name={`partners.${index}.keyword2`}
                  sxInput={{
                    '.MuiOutlinedInput-input': {
                      '&.MuiInputBase-input': {
                        padding: '16px 0 16px 16px'
                      }
                    }
                  }}
                  textFieldProps={{
                    required: true,
                    placeholder: '키워드 입력',
                    inputProps: {
                      maxLength: 10
                    }
                  }}
                />
              </Box>
            </Box>
          ))}

          {fields.length < 4 && currentFormState !== 'completed' && (
            <Box>
              <Box textAlign={'center'}>
                <ButtonItem
                  onClick={() => append({ type: '', name: '', keyword1: '', keyword2: '' })}
                  disableRipple
                  sx={{
                    color: home.blue500,
                    background: home.alpha_blue_10,
                    border: `1px solid ${home.blue500}`,
                    height: '46px'
                  }}
                  startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
                >
                  파트너 추가
                </ButtonItem>
              </Box>

              <WarningAppend text='파트너는 최대 4개까지 추가 가능합니다.' />
            </Box>
          )}

          {currentFormState === 'completed' ? (
            <Box
              component={'div'}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
            >
              <EditButton onClick={() => setCurrentFormState('wip')} title={'수정하기'} style={{ width: '100%' }} />
              <DeleteButton onClick={toggleShowDialog} title='삭제하기' style={{ width: '100%' }} />
            </Box>
          ) : (
            <ButtonItem
              sx={{
                color: home.gray500,
                backgroundColor: home.blue500,
                height: '48px',
                '&:hover': {
                  bgcolor: 'main_primary.blue300'
                }
              }}
              variant='contained'
              type='submit'
            >
              컬쳐덱에 추가
            </ButtonItem>
          )}
        </Box>
        <DeleteDeck
          title='작성한 데이터가 삭제됩니다.'
          description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'
          submitTxt='삭제하기'
          cancelTxt='닫기'
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => onDeleteForm()}
        />{' '}
      </Box>
    </FormProvider>
  )
}

export default Partners
