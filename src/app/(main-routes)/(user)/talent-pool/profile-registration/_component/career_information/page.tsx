'use client'

import {
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  PrimaryCheckbox,
  ResponsiveList,
  SecondaryButton,
  SolidInput,
  Typography
} from '@/elements'
import { ActiveChip } from '@/elements/v2/chip'
import { ExperienceForm } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack, useMediaQuery } from '@mui/material'
import moment from 'moment'
import { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import DatePickerSelect from '../../../_components/DatePickerSelect'
import CareerCardCreate from '../../../_components/career-card-create'
import { submitProfileAtom } from '../../../profile-atom'

export interface CareerInformationRef {
  fresher: boolean
  validateCareer: Function
}

const CareerInformation = forwardRef((_, ref: ForwardedRef<CareerInformationRef>) => {
  const mdDown = useMediaQuery('(max-width: 768px)')
  const [isNew, setIsNew] = useState<boolean>(false)
  const datePickerRef = useRef<any>(null)
  const [talentProfile, setTalentProfile] = useRecoilState(submitProfileAtom)

  useImperativeHandle(ref, () => ({
    fresher: isNew,
    validateCareer: () => form.trigger()
  }))

  const schema = yup.object({
    companyName: yup.string().required(''),
    undertaking: yup.string().required(''),
    startDateAt: yup.string().required(''),
    endDateAt: yup.string().required(''),
    isCurrentlyWorking: yup.boolean().required()
  })

  const defaultValues = {
    companyName: '',
    undertaking: '',
    startDateAt: '',
    endDateAt: '',
    isCurrentlyWorking: false
  }

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const currentWorking = form.watch('isCurrentlyWorking')

  const onDateChange = (start: Date, end: Date) => {
    const startDate = moment(start).format('YYYY-MM-DD')
    const endDate = moment(end).format('YYYY-MM-DD')
    form.setValue('startDateAt', startDate)
    form.setValue('endDateAt', endDate)
  }

  const onAddCareerExp = (data: ExperienceForm) => {
    let list: ExperienceForm[] = []
    if (talentProfile && talentProfile.experiences?.length !== 0) {
      list = [...(talentProfile.experiences as [])]
    }

    list.unshift(data)
    setTalentProfile({ ...talentProfile, experiences: list })

    datePickerRef.current.resetDatePicker()
    form.reset()
  }

  const deleteCareerExp = (index: number) => {
    let exp = [...(talentProfile.experiences as [])]
    exp.splice(index, 1)
    setTalentProfile({ ...talentProfile, experiences: exp })
  }

  return (
    <Stack width={'100%'} direction={'column'} alignItems={'center'} gap={{ md: 6, sm: 5 }}>
      <Stack direction={'column'} alignItems={'center'} gap={2}>
        <Typography cate='sub_title_20' plainColor='main_primary.blue500'>
          Step 3
        </Typography>
        <Typography
          cate={mdDown ? 'title_70' : 'title_80'}
          sx={{ width: { md: '100%', sm: '68dvw' } }}
          textAlign={'center'}
        >
          나의 경력 정보를 입력해 주세요.
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={2}>
        <ActiveChip
          active={isNew}
          label={'신입'}
          clickable
          sx={{
            minWidth: convertToRem(85)
          }}
          onClick={() => {
            setIsNew(true)
            form.control._disableForm(true)
          }}
        />
        <ActiveChip
          active={!isNew}
          label={'경력'}
          clickable
          sx={{
            minWidth: convertToRem(85)
          }}
          onClick={() => {
            setIsNew(false)
            setTalentProfile({ ...talentProfile, experiences: [] })
            form.control._disableForm(false)
          }}
        />
      </Stack>
      <Stack direction={'column'} gap={2} width={{ md: convertToRem(1056), sm: '100%' }}>
        <Form {...form}>
          <Stack direction={{ md: 'row', sm: 'column' }} gap={3}>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem
                  style={{
                    flex: 1
                  }}
                >
                  <FormLabel>
                    <Typography
                      cate='body_30'
                      sx={{
                        opacity: isNew ? 0.3 : 1
                      }}
                    >
                      소속명
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <SolidInput
                      fullWidth
                      inputSize='md'
                      placeholder='소속명을 입력해주세요 (ex.슘페터)'
                      sx={{
                        opacity: isNew ? 0.3 : 1
                      }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='undertaking'
              render={({ field }) => (
                <FormItem
                  style={{
                    flex: 1
                  }}
                >
                  <FormLabel>
                    <Typography
                      cate='body_30'
                      sx={{
                        opacity: isNew ? 0.3 : 1
                      }}
                    >
                      담당부서
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <SolidInput
                      fullWidth
                      inputSize='md'
                      placeholder='담당부서를 입력해주세요 (ex. 메모리반도체)'
                      sx={{
                        opacity: isNew ? 0.3 : 1
                      }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Stack
              direction={'column'}
              alignItems={'flex-start'}
              gap={1}
              sx={{
                flex: 1
              }}
            >
              <Typography
                cate='body_30'
                sx={{
                  opacity: isNew ? 0.3 : 1
                }}
              >
                담당부서
              </Typography>
              <DatePickerSelect
                ref={datePickerRef}
                disabled={isNew}
                type='year'
                currentlyWorking={currentWorking}
                onSelectDate={onDateChange}
                style={{
                  opacity: isNew ? 0.3 : 1,
                  borderColor: isNew ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
                }}
              />
            </Stack>
          </Stack>
        </Form>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems={'center'}>
            <PrimaryCheckbox
              onClick={() => {
                form.setValue('isCurrentlyWorking', !currentWorking)
              }}
              disabled={isNew}
              checked={currentWorking}
            />
            <Typography
              cate='body_30'
              sx={{
                opacity: isNew ? 0.3 : 1
              }}
            >
              재직 중 입니다.
            </Typography>
          </Stack>
          <SecondaryButton
            btnSize='sm-np'
            disabled={isNew}
            sx={{
              borderRadius: convertToRem(1000) + ' !important',
              borderColor: 'main_primary.blue300',
              bgcolor: 'main_primary.colors_overlay_blue',
              opacity: isNew ? 0.3 : 1
            }}
            onClick={form.handleSubmit(onAddCareerExp)}
          >
            <Typography cate={mdDown ? 'button_20' : 'body_30'}>소속/경력 추가</Typography>
          </SecondaryButton>
        </Stack>
      </Stack>
      {talentProfile && (talentProfile.experiences as []).length > 0 ? (
        <Box width={{ md: convertToRem(1056), sm: '100%' }}>
          <ResponsiveList minGap={[516, 24]} minBreakpoints={{ md: [320, 16] }}>
            {talentProfile.experiences &&
              talentProfile.experiences.map((val, index) => (
                <CareerCardCreate
                  key={index}
                  data={val}
                  onDelete={() => {
                    deleteCareerExp(index)
                  }}
                />
              ))}
          </ResponsiveList>
        </Box>
      ) : null}
      <Divider
        sx={{
          width: { md: convertToRem(1056), sm: '100%' }
        }}
      />
    </Stack>
  )
})

export default CareerInformation
