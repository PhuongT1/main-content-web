'use client'
import React, { FC, useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material'
import moment from 'moment'
import { SurveyViewType } from '@/types/survey.type'
import { ModalChildren } from '@/components/dialog/modal-deck'
import { DateRange, DateRangePicker } from '@/libs/mui-daterange-picker/src'
import { AlertProps } from '@/components/dialog'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { updateSurvey } from '@/services/survey.service'

interface Props extends AlertProps {
  onReset?: () => void
  dataSurvey: SurveyViewType
}

const ModalChagePeriod: FC<Props> = ({ dataSurvey: { id, startDate, endDate }, onReset, open, onCancel }) => {
  const {
    palette: { home }
  } = useTheme()

  const { reset, setValue, watch } = useForm<{ startDate: string; endDate: string }>({})

  useEffect(() => {
    reset({ startDate, endDate })
  }, [startDate, endDate])

  const { mutate: updatePeriod } = useMutation({
    mutationFn: ({ startDate, endDate }: { startDate: string; endDate: string }) =>
      updateSurvey(id, { startDate, endDate }),
    onSuccess: () => {
      onCancel && onCancel(), onReset && onReset()
    },
    onError(error) {
      onCancel && onCancel()
      //   console.log(error)
    }
  })

  const dataRangeDatepicker = useMemo(() => {
    const startDate = watch('startDate') || undefined
    const endDate = watch('endDate') || undefined
    return {
      startDate: startDate ? moment(startDate).toDate() : undefined,
      endDate: endDate ? moment(endDate).toDate() : undefined
    }
  }, [watch('startDate'), watch('endDate')])

  const handleChangeDate = (dateRange: DateRange) => {
    setValue('startDate', moment(dateRange.startDate).toISOString())
    setValue('endDate', moment(dateRange.endDate).toISOString())
  }

  return (
    <ModalChildren
      title={'선택'}
      open={open}
      onCancel={onCancel}
      onSubmit={() => updatePeriod(watch())}
      paperSx={{ width: 'auto', maxWidth: 'unset' }}
    >
      <DateRangePicker
        minDate={moment().startOf('day').toISOString()}
        definedRanges={[]}
        initialDateRange={dataRangeDatepicker}
        open={!!open}
        toggle={() => {}}
        onChange={handleChangeDate}
        closeOnClickOutside={false}
      />
    </ModalChildren>
  )
}

export default ModalChagePeriod
