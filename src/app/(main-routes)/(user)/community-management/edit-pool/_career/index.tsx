'use client'
import Button from '@/elements/button'
import Checkbox from '@/elements/checkbox'
import Input from '@/elements/custom-input'
import Typography from '@/elements/typography'
import { IExperience } from '@/types/pool.type'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CareerItem from '../../../talent-pool/_components/CareerItem'
import DatePickerSelect from '../../../talent-pool/_components/DatePickerSelect'

interface IExperienceForm extends IExperience {
  listId: number
}

const CareerSection = forwardRef(({ defaultValue }: any, ref) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const datePickerRef = useRef<any>()

  const [companyName, setCompanyName] = useState<string>('')
  const [undertaking, setUndertaking] = useState<string>('')
  const [startDateAt, setStartDateAt] = useState<string>('')
  const [endDateAt, setEndDateAt] = useState<string>('')
  const [careerList, setCareerList] = useState<IExperienceForm[]>([])
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState<boolean>(false)

  useEffect(() => {
    if (careerList.length === 0) {
      let newList: IExperienceForm[] = []
      defaultValue.forEach((i: IExperienceForm) => {
        let newItem = { ...i, listId: newList.length }
        newList.push(newItem)
      })
      setCareerList(newList)
    }
  }, [defaultValue])

  const submitCreate = () => {
    if (validate()) {
      return
    }
    const newCareer = {
      listId: careerList.length,
      companyName: companyName,
      startDateAt: startDateAt,
      undertaking: undertaking,
      endDateAt: endDateAt,
      isCurrentlyWorking: isCurrentlyWorking
    }
    let newCareerList = [...careerList]
    newCareerList.push(newCareer as IExperienceForm)
    setCareerList(newCareerList)
    resetForm()
  }

  const validate = () => {
    return !companyName || !undertaking || !startDateAt || !endDateAt
  }

  const resetForm = () => {
    setCompanyName('')
    setStartDateAt('')
    setEndDateAt('')
    setUndertaking('')
    setIsCurrentlyWorking(false)
    datePickerRef?.current?.resetDatePicker()
  }

  const removeCareer = (listId: number) => {
    let newCareerList = [...careerList].filter((i) => i.listId !== listId)
    setCareerList(newCareerList)
  }

  useImperativeHandle(ref, () => ({
    getData: () => {
      let newCareer = null
      if (!validate()) {
        newCareer = {
          listId: careerList.length,
          companyName: companyName,
          undertaking: undertaking,
          startDateAt: startDateAt,
          endDateAt: endDateAt,
          isCurrentlyWorking: isCurrentlyWorking
        }
      }

      let newCareerList = [...careerList]
      if (!!newCareer) {
        newCareerList.push(newCareer as IExperienceForm)
      }
      let submitCareerList = [...newCareerList].map((i) => ({
        id: !!i.id ? i.id : undefined,
        companyName: i.companyName,
        undertaking: i.undertaking,
        startDateAt: i.startDateAt,
        endDateAt: i.endDateAt,
        isCurrentlyWorking: i.isCurrentlyWorking
      }))
      resetForm()
      return submitCareerList
    }
  }))
  return (
    <Box mt={6}>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='subtitle_1_semibold' mb={2}>
        소속/경력
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12}>
          <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
            소속명
          </Typography>
          <Input
            type='text'
            name='companyName'
            placeholder='소속명을 입력해주세요 (ex.슘페터)'
            label='companyName'
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
            담당부서
          </Typography>
          <Input
            type='text'
            name='undertaking'
            value={undertaking}
            onChange={(e) => {
              setUndertaking(e.target.value)
            }}
            placeholder='담당부서를 입력해주세요 (ex. 메모리반도체)'
            label='undertaking'
            fullWidth
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
            근무기간
          </Typography>
          <DatePickerSelect
            ref={datePickerRef}
            type='year'
            currentlyWorking={isCurrentlyWorking}
            onSelectDate={(start: Date, end: Date) => {
              setStartDateAt(moment(start).format('YYYY-MM-DD'))
              setEndDateAt(moment(end).format('YYYY-MM-DD'))
            }}
          />
        </Grid>
      </Grid>
      <Box display='flex' width='100%' justifyContent={'flex-start'} mt={2}>
        <Checkbox
          label='재직 중 입니다.'
          checked={isCurrentlyWorking}
          onChange={() => {
            setIsCurrentlyWorking((prev) => !prev)
          }}
        />
      </Box>
      <Box display='flex' width='100%' justifyContent={'flex-end'} mt={2} mb={4}>
        <Button
          onClick={submitCreate}
          customTitle={<Typography cate='caption_1_semibold'>소속/경력 추가</Typography>}
          cate={'outlined'}
          customSize={'sm'}
          customType={'active'}
          sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
          rounded
        />
      </Box>
      {careerList.length > 0 && (
        <Grid container spacing={1}>
          {careerList.map((item) => {
            return (
              <Grid item xs={12} key={item.listId}>
                <CareerItem
                  title={`${item.companyName} / ${item.undertaking}${item.isCurrentlyWorking ? ' / 재직중' : ''}`}
                  period={`${moment(item.startDateAt, 'YYYY-MM-DD').format('YYYY.MM')} ~ ${
                    item.isCurrentlyWorking ? '재직중' : moment(item.endDateAt, 'YYYY-MM-DD').format('YYYY.MM')
                  }`}
                  onClose={() => {
                    removeCareer(item.listId)
                  }}
                />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
})

// CareerSection.displayName = 'CareerSection'
export default CareerSection
