'use client'
import { REPORT_CATEGORY, REPORT_CATEGORY_LABEL, REPORT_TYPE } from '@/constants/report.constant'
import { PrimaryPillRadio, PrimaryTextarea, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { useLanguage } from '@/hooks/use-language'
import { report } from '@/services/report.service'
import { generateLabelFromMap } from '@/utils/array'
import { Box, DialogTitle, FormControlLabel, Grid, RadioGroup } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type ReportDialogContentProps = {
  onClose: () => void
  id: number
}

const reportRadioData = generateLabelFromMap(REPORT_CATEGORY_LABEL)

const ReportDialogContent = ({ onClose, id }: ReportDialogContentProps) => {
  const { dict } = useLanguage()
  const [category, setCategory] = useState<REPORT_CATEGORY>()
  const [reason, setReason] = useState('')

  const sendReportAct = useMutation({
    mutationFn: report
  })

  const isDisableSendBtn = !category

  const onSend = async () => {
    if (reason && category) {
      const result = await sendReportAct.mutateAsync({
        type: REPORT_TYPE.MENTORING_REVIEW,
        reason,
        category: [+category],
        id
      })
      if (result?.data?.id) {
        onClose()
      }
    }
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <DialogTitle>
        <Typography cate='title_70' plainColor='popup.general.title'>
          신고 사유를 선택해주세요.
        </Typography>
      </DialogTitle>
      <Box>
        <RadioGroup
          onChange={(e) => setCategory(e.target.value as unknown as REPORT_CATEGORY)}
          defaultValue={category || ''}
          name='radio-buttons-group'
        >
          <Grid ml={1.5} container rowSpacing={2}>
            {reportRadioData.map(({ value, label }) => (
              <Grid item xs={6} key={value}>
                <FormControlLabel value={value} control={<PrimaryPillRadio label={label} />} label='' />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Box mt={3} display={'flex'} gap={1} flexDirection={'column'}>
          <Typography cate='body_20' plainColor='popup.general.title'>
            신고 사유 작성(선택)
          </Typography>
          <PrimaryTextarea
            sx={{
              width: '100%'
            }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={dict.text_write_a_reason}
          />
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Box
          display={'flex'}
          gap={1}
          width={{
            md: 'fit-content',
            xs: '100%'
          }}
        >
          <SecondaryGrayButton
            onClick={onClose}
            sx={{
              bgcolor: 'popup.button_neutral_bg',
              width: {
                md: 120,
                xs: '100%'
              }
            }}
          >
            <Typography cate='button_30' plainColor='main_grey.gray400'>
              취소
            </Typography>
          </SecondaryGrayButton>
          <DesignedPrimaryButton
            disabled={isDisableSendBtn}
            onClick={onSend}
            sx={{
              width: {
                md: 120,
                xs: '100%'
              }
            }}
            btnSize={'designed-sm'}
          >
            신고하기
          </DesignedPrimaryButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportDialogContent
