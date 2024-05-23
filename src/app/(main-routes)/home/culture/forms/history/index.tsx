import { Typography } from '@/elements'
import { Alert, Box, MenuItem, useTheme } from '@mui/material'
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
import PlusIcon from '@/assets/icons/plus'
import DatePicker from '@/libs/datepicker/DatePicker'
import moment from 'moment'
import SelectItem from '@/form/select'
import { generateYearMonthArray } from '@/utils/culture'
import WarningAppend from '../../warning-append'

const History = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.history) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.history) {
      setValue('history', cultureForms.history)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    history: yup
      .array(
        yup.object().shape({
          date: yup.string().required(''),
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
      history: cultureForms.history || [{ date: moment().format('YYYY.MM'), details: '' }]
    }
  })

  const { control, handleSubmit, reset, setValue, getValues } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'history'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)

    data.history = data.history.sort((left: any, right: any) => {
      return moment(right.date).diff(moment(left.date))
    })

    setCultureForms({ ...cultureForms, history: data.history })
    setCurrentFormState('completed')
  }
  const onDeleteForm = () => {
    toggleShowDialog()
    reset({ history: [{ date: moment().format('YYYY.MM'), details: '' }] })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.history
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
        우리 회사의 중요한 순간들과 발전 과정에 대한 역사를 알려주세요.
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
                연혁 0{index + 1}
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

            {/* <DatePicker
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
            /> */}

            <SelectItem
              control={control}
              textFieldProps={{ required: true, placeholder: '연도 선택' }}
              label='연도 선택'
              name={`history.${index}.date`}
              disabled={currentFormState === 'completed'}
            >
              {generateYearMonthArray(1990).map((value: string, index: number) => {
                return (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                )
              })}
            </SelectItem>

            <TextareaItem
              multiLine={3}
              disabled={currentFormState === 'completed'}
              control={control}
              label='세부 내용'
              name={`history.${index}.details`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: '세부 내용을 입력하세요.',
                rows: 1.84,
                multiline: true,
                inputProps: {
                  maxLength: 80
                }
              }}
            />
          </Box>
        ))}

        {fields.length < 10 && currentFormState !== 'completed' && (
          <Box>
            <Box textAlign={'center'}>
              <ButtonItem
                onClick={() => append({ date: moment().format('YYYY-MM-DD'), details: '' })}
                disableRipple
                sx={{
                  color: home.blue500,
                  background: home.alpha_blue_10,
                  border: `1px solid ${home.blue500}`,
                  height: '46px'
                }}
                startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
              >
                연혁 추가
              </ButtonItem>
            </Box>

            <WarningAppend text='연혁은 최대 10개까지 추가 가능합니다.' />
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

export default History
