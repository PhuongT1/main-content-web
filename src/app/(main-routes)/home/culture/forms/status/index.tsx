import { Typography, Upload } from '@/elements'
import { Alert, Box, InputLabel, MenuItem, useTheme } from '@mui/material'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useEffect, useRef, useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import SelectItem from '@/form/select'
import PlusIcon from '@/assets/icons/plus'
import InputItem from '@/form/input'
import { STATUS } from '@/constants/culture/culture.constant'
import DatePicker from '@/libs/datepicker/DatePicker'
import moment from 'moment'
import SelectInput from '@/form/select/select-input'

const Status = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.status) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.status) {
      setValue('status', cultureForms.status)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    status: yup
      .array(
        yup.object().shape({
          type: yup.string().required(),
          company: yup.string().required(),
          amount: yup.number().required(),
          date: yup.string().required()
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      status: cultureForms.status || [{ type: '', company: '', amount: '', date: moment().format('YYYY-MM-DD') }]
    }
  })
  const { control, handleSubmit, reset, setValue, getValues } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'status'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, status: data.status })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      status: [{ type: '', company: '', amount: '', date: moment().format('YYYY-MM-DD') }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.status

    setCultureForms(data)
  }

  const onDateChange = (date: any, index: number) => {
    const data = [...getValues('status')]
    data[index].date = moment(date).format('YYYY-MM-DD')
    setValue('status', data)
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
          우리의 투자 현황과 투자자 정보를 공유합니다.
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          {fields.map((item: any, index: number) => {
            return (
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
                    투자단계 0{index + 1}
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

                {/* <SelectItem
                control={control}
                textFieldProps={{ required: true, placeholder: '투자 단계 선택' }}
                label='투자 단계'
                name={`status.${index}.type`}
                disabled={currentFormState === 'completed'}
              >
                {STATUS.map((value: string, index: number) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  )
                })}
              </SelectItem> */}

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
                    placeholder: '투자 단계 선택'
                  }}
                  menus={{
                    options: STATUS,
                    value: 'name',
                    label: 'name'
                  }}
                  label='투자 단계'
                  name={`status.${index}.type`}
                />

                <InputItem
                  disabled={currentFormState === 'completed'}
                  control={control}
                  label='투자사'
                  name={`status.${index}.company`}
                  sxInput={{
                    '.MuiOutlinedInput-input': {
                      '&.MuiInputBase-input': {
                        padding: '16px 0 16px 16px'
                      }
                    }
                  }}
                  textFieldProps={{
                    required: true,
                    placeholder: '투자사명을 입력하세요.',
                    inputProps: {
                      maxLength: 20
                    }
                  }}
                />

                <InputItem
                  disabled={currentFormState === 'completed'}
                  control={control}
                  label='투자유치 금액 (억원)'
                  name={`status.${index}.amount`}
                  sxInput={{
                    '.MuiOutlinedInput-input': {
                      '&.MuiInputBase-input': {
                        padding: '16px 0 16px 16px'
                      }
                    }
                  }}
                  textFieldProps={{
                    required: true,
                    type: 'number',
                    placeholder: '금액 입력',
                    inputProps: {
                      maxLength: 15
                    }
                  }}
                />

                <DatePicker
                  disabled={currentFormState === 'completed'}
                  value={item.date}
                  labelProps={{
                    label: '일자 선택'
                  }}
                  style={{
                    color: home.gray50,
                    width: '100%',
                    height: '56px',
                    borderRadius: '10px',
                    border: `1px solid ${home.gray200}`
                  }}
                  onDateChange={(date: Date) => {
                    onDateChange(date, index)
                  }}
                />
              </Box>
            )
          })}

          {fields.length < 4 && currentFormState !== 'completed' && (
            <Box>
              <Box textAlign={'center'}>
                <ButtonItem
                  onClick={() => append({ type: '', company: '', amount: '', date: moment().format('YYYY-MM-DD') })}
                  disableRipple
                  sx={{
                    color: home.blue500,
                    background: home.alpha_blue_10,
                    border: `1px solid ${home.blue500}`,
                    height: '46px'
                  }}
                  startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
                >
                  투자단계 추가
                </ButtonItem>
              </Box>
              <Alert sx={{ marginTop: '24px', marginBottom: '24px', background: '#EA39391A' }} severity='error'>
                투자단계는 최대 4개까지 추가 가능합니다.
              </Alert>
              <Alert sx={{ background: '#EA39391A' }} severity='error'>
                투투자유치 금액은 숫자만 입력가능합니다.
              </Alert>
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

export default Status
