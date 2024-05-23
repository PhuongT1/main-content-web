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
import SelectItem from '@/form/select'
import PlusIcon from '@/assets/icons/plus'
import InputItem from '@/form/input'
import { SALES } from '@/constants/culture/culture.constant'
import { generateYearArray } from '@/utils/culture'
import moment from 'moment'
import WarningAppend from '../../warning-append'

const Sales = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.sales) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.sales) {
      setValue('sales', cultureForms.sales)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    sales: yup
      .array(
        yup.object().shape({
          type: yup.string().required(),
          amount: yup.number().required(),
          monetary: yup.string().required()
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      sales: cultureForms.sales || [{ type: '', amount: '', monetary: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'sales'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)

    data.sales = data.sales.sort((left: any, right: any) => {
      return moment(left.type).diff(moment(right.type))
    })
    setCultureForms({ ...cultureForms, sales: data.sales })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      sales: [{ type: '', amount: '', monetary: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.sales
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
        우리의 매출액 변동과 추이를 시각적으로 확인하세요.
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
                매출 0{index + 1}
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

            <SelectItem
              control={control}
              textFieldProps={{ required: true, placeholder: '연도 선택' }}
              label='연도 선택'
              name={`sales.${index}.type`}
              disabled={currentFormState === 'completed'}
            >
              {generateYearArray(1900).map((value: number, index: number) => {
                return (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                )
              })}
            </SelectItem>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <InputItem
                disabled={currentFormState === 'completed'}
                control={control}
                label='매출금액'
                name={`sales.${index}.amount`}
                sxInput={{
                  '.MuiOutlinedInput-input': {
                    '&.MuiInputBase-input': {
                      padding: '16px 0 16px 16px'
                    }
                  }
                }}
                textFieldProps={{
                  required: true,
                  placeholder: '매출금액',
                  type: 'number',
                  inputProps: {
                    maxLength: 10
                  }
                }}
              />

              <SelectItem
                control={control}
                textFieldProps={{ required: true, placeholder: '원' }}
                label='원'
                name={`sales.${index}.monetary`}
                disabled={currentFormState === 'completed'}
              >
                <MenuItem value={'원'}>원</MenuItem>
                <MenuItem value={'달러'}>달러</MenuItem>
              </SelectItem>
            </Box>
          </Box>
        ))}

        {fields.length < 5 && currentFormState !== 'completed' && (
          <Box>
            <Box textAlign={'center'}>
              <ButtonItem
                onClick={() => append({ type: '', amount: '', monetary: '' })}
                disableRipple
                sx={{
                  color: home.blue500,
                  background: home.alpha_blue_10,
                  border: `1px solid ${home.blue500}`,
                  height: '46px'
                }}
                startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
              >
                매출 추가
              </ButtonItem>
            </Box>

            <WarningAppend text='매출은 최대 5개까지 추가 가능합니다.' />
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
  )
}

export default Sales
