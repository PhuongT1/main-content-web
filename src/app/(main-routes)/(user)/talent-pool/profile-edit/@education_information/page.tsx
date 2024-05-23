'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, Stack, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  PrimaryCheckbox,
  ResponsiveList,
  SecondaryButton,
  Select,
  SolidInput,
  Typography
} from '@/elements'
import { DropdownNestedAddressMenuItem } from '@/app/(main-routes)/(user)/talent-pool/_components/NestedAddressMenuItem'
import { GRADUATE_TYPE, SCHOOL_TYPE } from '@/utils/constants'
import { DropdownMenuItem } from '@/elements/nested-menu-item/nested-menu-item'
import DatePickerSelect from '@/app/(main-routes)/(user)/talent-pool/_components/DatePickerSelect'
import moment from 'moment/moment'
import { convertToRem } from '@/utils/convert-to-rem'
import { useRecoilState, useRecoilValue } from 'recoil'
import { profileAtom, submitProfileAtom } from '@/app/(main-routes)/(user)/talent-pool/profile-atom'
import { useForm } from 'react-hook-form'
import { SchoolForm } from '@/types/pool.type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import EducationCard from '@/components/cards/education.card'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

const StyledBottomDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    height: 'auto',
    margin: 8,
    borderRadius: 16,
    backgroundColor: theme.palette.main_grey.gray700,
    backgroundImage: 'none',
    minHeight: convertToRem(460)
  }
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.main_grey.gray700
}))

const defaultValues: SchoolForm = {
  schoolName: '',
  schoolType: '',
  graduationType: '',
  majors: '',
  startDateAt: '',
  endDateAt: '',
  isCurrentlyStudying: false
}

const schema = yup.object({
  schoolName: yup.string().required(),
  schoolType: yup.string().required(),
  graduationType: yup.string().required(),
  majors: yup.string().required(),
  startDateAt: yup.string().required(),
  endDateAt: yup.string().required(),
  isCurrentlyStudying: yup.boolean().required()
})

const EducationInformationEdit = () => {
  const theme = useTheme()
  const datePickerRef = useRef<any>(null)
  const [schoolOpen, setSchoolOpen] = useState<boolean>(false)
  const talentProfile = useRecoilValue(profileAtom)
  const [editProfile, setEditProfile] = useRecoilState(submitProfileAtom)
  const [bottomMenuOpen, setBottomMenuOpen] = React.useState<boolean>(false)

  const mdDown = useMediaQuery('(max-width: 768px)')

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const isCurrentlyStudying = form.watch('isCurrentlyStudying')
  const schoolType = form.watch('schoolType')
  const graduationType = form.watch('graduationType')

  const onDateChange = (start: Date, end: Date) => {
    const startDate = moment(start).format('YYYY-MM-DD')
    const endDate = moment(end).format('YYYY-MM-DD')
    form.setValue('startDateAt', startDate)
    form.setValue('endDateAt', endDate)
  }

  const handleCloseBottomMenu = () => {
    setBottomMenuOpen(false)
  }

  const handleAddSchool = (data: SchoolForm) => {
    let list: SchoolForm[] = []
    if (editProfile && editProfile.schools?.length !== 0) {
      list = [...editProfile.schools]
    }

    list.unshift(data)
    setEditProfile({ ...editProfile, schools: list })

    datePickerRef.current.resetDatePicker()
    form.reset()
  }

  const deleteSchool = (index: number) => {
    let exp = [...editProfile.schools]
    exp.splice(index, 1)
    setEditProfile({ ...editProfile, schools: exp })
  }

  useEffect(() => {
    if (talentProfile && talentProfile.schools?.length > 0) {
      setEditProfile({ ...editProfile, schools: talentProfile.schools })
    }
  }, [talentProfile])

  return (
    <>
      <Stack gap={4}>
        <Stack gap={2}>
          <Typography cate={'title_50'}>
            학력 정보
            <Typography component={'span'} plainColor={'sub.error_red'} cate={'title_50'}>
              *
            </Typography>
          </Typography>
          <Stack direction={{ md: 'row', sm: 'column' }} justifyContent={'space-evenly'} gap={{ md: 3, sm: 2 }}>
            <Stack width={'100%'} gap={1}>
              <Typography cate={'body_30'}>학교/졸업형태</Typography>
              <Select
                placeholder='학교 형태 및 졸업 여부를 선택해 주세요.'
                displayEmpty
                fullWidth
                MenuProps={{ autoFocus: false }}
                open={schoolOpen}
                onOpen={() => {
                  if (mdDown) {
                    setBottomMenuOpen(true)
                  } else {
                    setSchoolOpen(true)
                  }
                }}
                onClose={(event: any) => {
                  setSchoolOpen(false)
                }}
                renderValue={(value) => {
                  return schoolType !== '' && graduationType !== '' ? (
                    <Typography cate='body_30'>
                      {schoolType}/{graduationType}
                    </Typography>
                  ) : (
                    <Typography cate='body_30' color={theme.palette.main_grey.gray300}>
                      학교 형태 및 졸업 여부를 선택해 주세요.
                    </Typography>
                  )
                }}
              >
                {SCHOOL_TYPE.map((item, index) => (
                  <DropdownNestedAddressMenuItem
                    key={index}
                    rightAnchore={true}
                    label={
                      <Typography cate='caption_1' color='main.white'>
                        {item}
                      </Typography>
                    }
                    onClick={() => {
                      setSchoolOpen(true)
                    }}
                    parentMenuOpen={schoolOpen}
                  >
                    {GRADUATE_TYPE.length > 0 && (
                      <>
                        {GRADUATE_TYPE.map((type: string, typeIdx: number) => (
                          <DropdownMenuItem
                            key={typeIdx}
                            onClick={() => {
                              form.setValue('schoolType', item)
                              form.setValue('graduationType', type)
                              setSchoolOpen(false)
                            }}
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownNestedAddressMenuItem>
                ))}
              </Select>
            </Stack>
            <Form {...form}>
              <Stack width={'100%'} gap={1}>
                <Typography cate={'body_30'}>학교명</Typography>
                <FormField
                  control={form.control}
                  name='schoolName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl mt={0}>
                        <SolidInput
                          inputProps={{
                            maxLength: 30
                          }}
                          fullWidth
                          inputSize={'md'}
                          placeholder='학교 이름을 입력해 주세요. (ex. 슘페터 대학교)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Stack>
              <Stack width={'100%'} gap={1}>
                <Typography cate={'body_30'}>전공</Typography>
                <FormField
                  control={form.control}
                  name='majors'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl mt={0}>
                        <SolidInput
                          fullWidth
                          inputProps={{
                            maxLength: 30
                          }}
                          inputSize={'md'}
                          placeholder='전공을 입력해 주세요. (ex. 국문학과)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Stack>
            </Form>
            <Stack width={'100%'} gap={1}>
              <Typography cate={'body_30'}>재학기간</Typography>
              <DatePickerSelect
                ref={datePickerRef}
                type='year'
                currentlyWorking={isCurrentlyStudying}
                onSelectDate={onDateChange}
                currentlyWorkingPlaceholder='재학 중'
                placeholder='재학기간 선택'
              />
            </Stack>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'}>
              <PrimaryCheckbox
                onClick={() => {
                  form.setValue('isCurrentlyStudying', !isCurrentlyStudying)
                }}
                checked={isCurrentlyStudying}
              />
              <Typography cate='body_30'>재학 중입니다.</Typography>
            </Stack>
            <SecondaryButton
              btnSize='sm-np'
              sx={{
                borderRadius: convertToRem(1000) + ' !important',
                borderColor: 'main_primary.blue300',
                bgcolor: 'main_primary.colors_overlay_blue'
              }}
              onClick={form.handleSubmit(handleAddSchool)}
            >
              <Typography cate={'body_30'}>학력 추가</Typography>
            </SecondaryButton>
          </Stack>
        </Stack>
        {editProfile && editProfile.schools?.length > 0 ? (
          <Box width={'100%'}>
            <ResponsiveList minGap={[696, 24]} minBreakpoints={{ md: [320, 16] }}>
              {editProfile.schools &&
                editProfile.schools.map((val, index) => (
                  <EducationCard
                    sx={{
                      backgroundColor: theme.palette.main_grey.gray800
                    }}
                    key={index}
                    education={val}
                    onDelete={() => deleteSchool(index)}
                  />
                ))}
            </ResponsiveList>
          </Box>
        ) : null}
      </Stack>
      <StyledBottomDrawer
        anchor='bottom'
        open={bottomMenuOpen}
        onClose={handleCloseBottomMenu}
        onOpen={handleCloseBottomMenu}
        disableSwipeToOpen
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            height: convertToRem(56)
          }}
        >
          <Typography cate={'sub_title_30'}>학교 형태 및 졸업여부를 선택해주세요.</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            borderTop: '1px solid',
            borderColor: 'main_grey.gray800'
          }}
        >
          <Grid container height={'100%'}>
            <Grid
              item
              xs={6}
              sx={{
                borderRight: '1px solid',
                borderColor: 'main_grey.gray800',
                height: '100%'
              }}
            >
              {SCHOOL_TYPE.map((item: string, index: number) => (
                <MenuItem
                  key={index}
                  selected={schoolType === item}
                  onClick={() => {
                    form.setValue('schoolType', item)
                  }}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'main_grey.gray800'
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Grid>
            <Grid item xs={6}>
              {!!GRADUATE_TYPE ? (
                GRADUATE_TYPE.map((type: any, index: number) => (
                  <MenuItem
                    key={index}
                    selected={graduationType === type}
                    onClick={() => {
                      form.setValue('graduationType', type)
                      handleCloseBottomMenu()
                    }}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'main_grey.gray800'
                    }}
                  >
                    {type}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </StyledBox>
      </StyledBottomDrawer>
    </>
  )
}

export default EducationInformationEdit
