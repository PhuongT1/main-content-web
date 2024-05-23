'use client'
import React, { memo, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { UseFieldArrayProps, useFieldArray, useFormContext } from 'react-hook-form'
import { MoreButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import { dropdownCategory } from './customer-profile-data'
import { TipCategory, TipPainCategory } from './tip-content-goal'
import { CustomerProfile } from '@/types/customer-service.type'
import { DeleteIcon } from '@/assets/icons'
import { errorMax3Message } from '@/constants/customer-service.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { TooltipTitle } from '@/components/home/tooltip-item'

export interface GoalProps extends UseFieldArrayProps<CustomerProfile, 'achievementGoalList' | 'painPointList'> {
  nameGoal: keyof Pick<CustomerProfile, 'goal' | 'painPointGoal'>
  sectionTitle?: React.ReactNode
  dropdown?: string[]
  placeholder?: string
  placeholderInput?: string
}

const AddAchievementGoal = ({
  name: nameFieldArray,
  nameGoal,
  sectionTitle,
  dropdown,
  placeholder,
  placeholderInput
}: GoalProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [isErrorMax, setErrorMax] = useState<Boolean>(false)
  const [isChange, setChange] = useState<Boolean>(false)

  const {
    control,
    watch,
    resetField,
    formState: { errors }
  } = useFormContext<CustomerProfile>()

  const goal = watch(nameGoal)
  const { append, remove, fields } = useFieldArray({
    control,
    name: nameFieldArray
  })

  useEffect(() => {
    const subscription = watch((_valueForm, { name }) => {
      if (!name) return
      if (
        (name.indexOf('Point') > -1 && nameFieldArray === 'painPointList') ||
        (name.indexOf('Point') === -1 && nameFieldArray === 'achievementGoalList')
      ) {
        return setChange(true) // Set have should show Error
      }
      setChange(false)
    })
    return () => subscription.unsubscribe()
  }, [watch, nameFieldArray])

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 3000)
  }

  const isDisable = () => {
    return !goal?.selectCategory || !goal?.inputGoal
  }

  return (
    <>
      {sectionTitle}
      <Stack display={'flex'} justifyContent={'center'} gap={remConvert('20px')}>
        <Stack gap={remConvert('20px')} display={'flex'} flexDirection={'row'}>
          <SelectItem
            sxBox={{ width: remConvert('280px') }}
            control={control}
            menus={{ options: dropdown ?? dropdownCategory }}
            textFieldProps={{ placeholder: placeholder ?? '목표 카테고리 선택' }}
            name={`${nameGoal}.selectCategory`}
          />
          <InputItem
            name={`${nameGoal}.inputGoal`}
            control={control}
            showErrorMessage
            maxLength={50}
            sxBox={{ flex: '1 0 0' }}
            textFieldProps={{
              placeholder: placeholderInput ?? '타깃고객이 겪고 있는 불편한 점을 작성하세요. (50자 이내)'
            }}
          />
          <MoreButton
            sx={{
              padding: remConvert('16px 18px'),
              minWidth: remConvert('120px'),
              border: `1px solid ${home.gray200}`
            }}
            svgComponentProps={{
              pathProps: {
                stroke: isDisable() ? home.gray200 : home.gray50
              }
            }}
            disabled={isDisable()}
            onClick={() => {
              if (fields.length > 4) {
                return overQuantity()
              }
              if (!goal?.selectCategory || !goal?.inputGoal) return
              append(goal)
              resetField(nameGoal, {
                defaultValue: {
                  selectCategory: '',
                  inputGoal: ''
                }
              })
            }}
          >
            추가
          </MoreButton>
        </Stack>
        {fields && (
          <Grid container display='flex' wrap='wrap' spacing={remConvert('20px')} alignItems='stretch'>
            {fields.map((item, index) => (
              <Grid item xs={12} key={item.id} alignItems='center' display={'flex'}>
                <Box
                  sx={{
                    wordBreak: 'break-word',
                    bgcolor: home.gray400,
                    borderRadius: remConvert('10px'),
                    padding: remConvert('10px 20px'),
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box
                    component={'div'}
                    display={'inline-flex'}
                    alignItems={'center'}
                    columnGap={remConvert('12px')}
                    width={'-webkit-fill-available'}
                  >
                    <Typography
                      bgcolor={home.blue500}
                      padding={remConvert('4px 10px')}
                      borderRadius={remConvert('6px')}
                      fontWeight={600}
                    >
                      {item.selectCategory}
                    </Typography>
                    <TooltipTitle title={item.inputGoal} />
                  </Box>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon pathProps={{ d: 'M16.5 8L8.5 16M8.5 8L16.5 16', stroke: home.gray0 }} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {(isErrorMax || (isChange && errors[nameFieldArray]?.message)) && (
          <ErrorMessage isHide message={errors[nameFieldArray]?.message || errorMax3Message(5)} />
        )}
      </Stack>
      {!dropdown ? <TipCategory /> : <TipPainCategory />}
    </>
  )
}

export default memo(AddAchievementGoal)
