'use strict'

import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import { ValidationMode, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FC, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import * as _ from 'lodash'
import CardItem from '@/components/home/card-item'
import { POLICY } from '@/constants/culture/culture.constant'
import TextField from '@mui/material/TextField'
import PlusIcon from '@/assets/icons/culture/plus-icon'
import Image from 'next/image'
import { IconDefault } from '@/assets/images/culture'
import InputItem from '@/form/input'

export interface Props {
  policy: any
  onValueChange: (data: any) => void
  formState: string
  ref: any
}

const Policy: FC<Props> = forwardRef(({ policy, onValueChange, formState }, ref) => {
  const [checkboxSelected, setCheckboxSelected] = useState<any>(policy?.policy || [])
  const [directInput, setDirectInput] = useState<string>('')
  const [policyOptions, setpolicyOptions] = useState<any>(POLICY)

  useImperativeHandle(ref, () => ({
    onDeleteForm() {
      reset()
      setCheckboxSelected([])
      setpolicyOptions(POLICY)
      setDirectInput('')
    }
  }))

  useEffect(() => {
    const res = checkboxSelected.filter((item: any) => !policyOptions.includes(item))
    if (res.length) {
      setpolicyOptions(res.concat(policyOptions))
    }
  }, [])

  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    policy: policy?.policy || [],
    title: policy?.title || ''
  }

  const schema = yup
    .object({
      policy: yup.array().min(1).required(),
      title: yup.string().required()
    })
    .required()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  } as any

  const { handleSubmit, control, reset, setValue, getValues, watch } = useForm(formOptions)

  useEffect(() => {
    setCheckboxSelected(getValues('policy'))
  }, [watch('policy')])

  const onSubmit = async (dataSubmit: any) => {}

  const onSelectItem = (value: string) => {
    let policy: any = getValues('policy')
    const find: any = policy.find((item: string) => value === item)
    if (!!find) {
      policy = policy.filter((item: any) => item !== value)
    } else {
      if (policy.length < 3) {
        policy.unshift(value)
      }
    }
    setValue('policy', policy)
    onValueChange(getValues())
  }

  const onAddItem = () => {
    if (!!directInput && !policyOptions.includes(directInput)) {
      setpolicyOptions([directInput].concat(policyOptions))
    }
  }

  return (
    <Box>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'24px'} component={'form'}>
        <InputItem
          onBlur={() => onValueChange(getValues())}
          disabled={formState === 'completed'}
          control={control}
          label='지원정책 타이틀'
          name={`title`}
          sxInput={{
            '.MuiOutlinedInput-input': {
              '&.MuiInputBase-input': {
                padding: '16px 0 16px 16px'
              }
            }
          }}
          textFieldProps={{
            required: true,
            placeholder: '타이틀을 입력하세요.',
            inputProps: {
              maxLength: 20
            }
          }}
        />
        <Box>
          <Box marginBottom={'8px'}>
            <Typography component={'span'} cate='sub_title_30' sx={{ color: home.gray50, fontWeight: 600 }}>
              지원 유형
              <Typography component={'span'} cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
                {' '}
                (최대 5개 선택)
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              height: 'auto',
              maxHeight: '360px',
              overflow: 'scroll',
              backgroundColor: home.gray400,
              borderRadius: '10px',
              padding: '8px 8px 1px 8px'
            }}
          >
            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
              {formState !== 'completed' && (
                <CardItem
                  sxCard={{ backgroundColor: home.gray300 }}
                  isActive={false}
                  cardItem={{
                    title: (
                      <Box
                        sx={{
                          display: 'flex',
                          width: '100%',
                          alignItems: 'center',
                          gap: '14px'
                        }}
                      >
                        <Box onClick={() => (formState === 'completed' ? null : onAddItem())}>
                          <PlusIcon />
                        </Box>
                        <TextField
                          disabled={formState === 'completed'}
                          value={directInput}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDirectInput(event.target.value)
                          }}
                          fullWidth
                          placeholder='직접 입력'
                          variant='standard'
                          inputProps={{ maxLength: 7 }}
                        />
                      </Box>
                    )
                  }}
                />
              )}

              {formState === 'completed'
                ? getValues('policy').map((value: string, index: number) => {
                    return (
                      <CardItem
                        key={index}
                        sxCard={{ backgroundColor: home.gray300, height: 'auto' }}
                        onClick={() => (formState === 'completed' ? null : onSelectItem(value))}
                        icon='checked'
                        isActive={checkboxSelected.includes(value)}
                        cardItem={{
                          title: (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Image src={IconDefault} width={24} height={24} alt='' />
                              <Typography cate='sub_title_30' fontWeight={600} color={home.gray50}>
                                {value}
                              </Typography>
                            </Box>
                          )
                        }}
                      />
                    )
                  })
                : policyOptions.map((value: string, index: number) => {
                    return (
                      <CardItem
                        key={index}
                        sxCard={{ backgroundColor: home.gray300, height: 'auto' }}
                        onClick={() => (formState === 'completed' ? null : onSelectItem(value))}
                        icon='checked'
                        isActive={checkboxSelected.includes(value)}
                        cardItem={{
                          title: (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Image src={IconDefault} width={24} height={24} alt='' />
                              <Typography cate='sub_title_30' fontWeight={600} color={home.gray50}>
                                {value}
                              </Typography>
                            </Box>
                          )
                        }}
                      />
                    )
                  })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

export default Policy
