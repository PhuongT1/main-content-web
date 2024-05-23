'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, RadioGroup, Stack, useTheme } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { profileAtom, submitProfileAtom } from '@/app/(main-routes)/(user)/talent-pool/profile-atom'
import { useForm } from 'react-hook-form'
import { ExperienceForm } from '@/types/pool.type'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import {
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
import DatePickerSelect from '@/app/(main-routes)/(user)/talent-pool/_components/DatePickerSelect'
import { convertToRem } from '@/utils/convert-to-rem'
import * as yup from 'yup'
import { PrimaryRadio } from '@/elements/v2/radio'
import CareerCardCreate from '@/app/(main-routes)/(user)/talent-pool/_components/career-card-create'

const defaultValues: ExperienceForm = {
  companyName: '',
  isCurrentlyWorking: false,
  undertaking: '',
  startDateAt: '',
  endDateAt: ''
}

const schema = yup.object({
  companyName: yup.string().required(),
  undertaking: yup.string().required(),
  startDateAt: yup.string().required(),
  endDateAt: yup.string().required(),
  isCurrentlyWorking: yup.boolean().required()
})

const CareerEdit = () => {
  const theme = useTheme()
  const datePickerRef = useRef<any>(null)
  const talentProfile = useRecoilValue(profileAtom)
  const [editProfile, setEditProfile] = useRecoilState(submitProfileAtom)

  const [careerStat, setCareerStat] = useState<'exp' | 'new'>('exp')

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const isCurrentlyWorking = form.watch('isCurrentlyWorking')

  const onDateChange = (start: Date, end: Date) => {
    const startDate = moment(start).format('YYYY-MM-DD')
    const endDate = moment(end).format('YYYY-MM-DD')
    form.setValue('startDateAt', startDate)
    form.setValue('endDateAt', endDate)
  }

  const onCareerStatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stats = event.target.value
    setCareerStat(stats as any)
    setEditProfile({ ...editProfile, isFresher: stats === 'new' })
  }

  const handleAddExperience = (data: ExperienceForm) => {
    let list: ExperienceForm[] = []
    if (editProfile && editProfile.experiences?.length !== 0) {
      list = [...editProfile.experiences]
    }

    list.unshift(data)
    setEditProfile({ ...editProfile, experiences: list })

    datePickerRef.current.resetDatePicker()
    form.reset()
  }

  const deleteExperience = (index: number) => {
    let exp = [...editProfile.experiences]
    exp.splice(index, 1)
    setEditProfile({ ...editProfile, experiences: exp })
  }

  useEffect(() => {
    if (talentProfile && talentProfile.experiences?.length > 0) {
      setEditProfile({ ...editProfile, experiences: talentProfile.experiences })
    }
  }, [talentProfile])

  return (
    <>
      <Stack gap={4}>
        <Stack gap={2}>
          <Typography cate={'title_50'}>경력 정보</Typography>
          <Stack direction={'row'} justifyContent={'flex-start'} gap={3}>
            <RadioGroup
              value={careerStat}
              onChange={onCareerStatChange}
              sx={{
                flexDirection: 'row',
                gap: 3
              }}
            >
              <PrimaryRadio value={'exp'} label={<Typography cate={'body_30'}>경력자</Typography>} />
              <PrimaryRadio value={'new'} label={<Typography cate={'body_30'}>신입</Typography>} />
            </RadioGroup>
          </Stack>
          <Form {...form}>
            <Stack direction={{ md: 'row', sm: 'column' }} gap={{ md: 3, sm: 2 }}>
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem
                    sx={{
                      flex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    <FormLabel>
                      <Typography
                        cate={'body_30'}
                        sx={{
                          opacity: careerStat === 'new' ? 0.3 : 1
                        }}
                      >
                        소속 회사명
                      </Typography>
                    </FormLabel>
                    <FormControl mt={0}>
                      <SolidInput
                        fullWidth
                        inputSize={'md'}
                        inputProps={{
                          maxLength: 30
                        }}
                        placeholder='회사명을 입력해 주세요. (ex. 슘페터)'
                        disabled={careerStat === 'new'}
                        sx={{
                          opacity: careerStat === 'new' ? 0.3 : 1
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
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    <FormLabel>
                      <Typography
                        cate={'body_30'}
                        sx={{
                          opacity: careerStat === 'new' ? 0.3 : 1
                        }}
                      >
                        담당부서
                      </Typography>
                    </FormLabel>
                    <FormControl mt={0}>
                      <SolidInput
                        fullWidth
                        inputSize={'md'}
                        placeholder='담당부서를 입력해 주세요. (ex. 메모리반도체)'
                        inputProps={{
                          maxLength: 30
                        }}
                        disabled={careerStat === 'new'}
                        sx={{
                          opacity: careerStat === 'new' ? 0.3 : 1
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Stack width={'100%'} gap={1} flex={1}>
                <Typography
                  cate={'body_30'}
                  sx={{
                    opacity: careerStat === 'new' ? 0.3 : 1
                  }}
                >
                  근무기간
                </Typography>
                <DatePickerSelect
                  ref={datePickerRef}
                  placeholder={'근무기간 선택'}
                  type='year'
                  currentlyWorking={isCurrentlyWorking}
                  currentlyWorkingPlaceholder={'재직 중'}
                  disabled={careerStat === 'new'}
                  onSelectDate={onDateChange}
                  style={{
                    opacity: careerStat === 'new' ? 0.3 : 1,
                    borderColor: careerStat === 'new' ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'}>
                <PrimaryCheckbox
                  onClick={() => {
                    form.setValue('isCurrentlyWorking', !isCurrentlyWorking)
                  }}
                  checked={isCurrentlyWorking}
                  disabled={careerStat === 'new'}
                  sx={{
                    opacity: careerStat === 'new' ? 0.3 : 1,
                    borderColor: careerStat === 'new' ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
                  }}
                />
                <Typography
                  cate='body_30'
                  sx={{
                    opacity: careerStat === 'new' ? 0.3 : 1
                  }}
                >
                  재직 중입니다.
                </Typography>
              </Stack>
              <SecondaryButton
                btnSize='sm-np'
                sx={{
                  borderRadius: convertToRem(1000) + ' !important',
                  borderColor: 'main_primary.blue300',
                  bgcolor: 'main_primary.colors_overlay_blue',
                  opacity: careerStat === 'new' ? 0.3 : 1
                }}
                onClick={form.handleSubmit(handleAddExperience)}
                disabled={careerStat === 'new'}
              >
                <Typography cate={'body_30'}>경력 추가</Typography>
              </SecondaryButton>
            </Stack>
          </Form>
        </Stack>
        {editProfile && editProfile.experiences?.length > 0 ? (
          <Box width={'100%'}>
            <ResponsiveList minGap={[696, 24]} minBreakpoints={{ md: [320, 16] }}>
              {editProfile.experiences &&
                editProfile.experiences.map((val, index) => (
                  <CareerCardCreate
                    sx={{
                      opacity: careerStat === 'new' ? 0.3 : 1,
                      backgroundColor: theme.palette.main_grey.gray800
                    }}
                    showUndertaking
                    key={index}
                    onDelete={() => deleteExperience(index)}
                    data={val}
                  />
                ))}
            </ResponsiveList>
          </Box>
        ) : null}
      </Stack>
    </>
  )
}

export default CareerEdit
