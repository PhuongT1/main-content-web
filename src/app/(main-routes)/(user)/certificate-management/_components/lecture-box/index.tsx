'use client'
import { CheckRoundIcon, PlayIcon, UnCheckRoundIcon } from '@/assets/icons'
import { Card } from '@/components'
import { COURSE_EDUCATION_STATUS_RECRUITMENT } from '@/constants/certificate.constant'
import { CardBadge, Typography } from '@/elements'
import { TCourseUserEducation } from '@/types/certificate.type'
import { secondsToHours } from '@/utils/date'
import { Box, CardActionArea, useTheme } from '@mui/material'

const BADGE_BGCOLOR = {
  [COURSE_EDUCATION_STATUS_RECRUITMENT.WAITING]: {
    sx: {
      bgcolor: 'main_grey.gray700',
      border: 0
    },
    label: (
      <Typography cate='sub_title_10' plainColor='main_grey.gray1000'>
        미수강
      </Typography>
    )
  },
  [COURSE_EDUCATION_STATUS_RECRUITMENT.WATCHING]: {
    sx: {
      bgcolor: 'sub.horizon_blue700'
    },
    label: (
      <Typography cate='sub_title_10' plainColor='main_grey.gray1000'>
        수강중
      </Typography>
    )
  },
  [COURSE_EDUCATION_STATUS_RECRUITMENT.COMPLETE]: {
    sx: {
      bgcolor: 'main_primary.blue500'
    },
    label: (
      <Typography cate='sub_title_10' plainColor='main_grey.gray1000'>
        수강완료
      </Typography>
    )
  }
}

type LectureBoxProps = {
  item: TCourseUserEducation
  onClick: () => void
  disabled?: boolean
}

const LectureBox = ({ item, onClick, disabled }: LectureBoxProps) => {
  const { title, duration, statusRecruitment } = item
  const theme = useTheme()

  const uncompleteCheck = [
    COURSE_EDUCATION_STATUS_RECRUITMENT.WAITING,
    COURSE_EDUCATION_STATUS_RECRUITMENT.WATCHING
  ].includes(statusRecruitment)

  const badgeProps = BADGE_BGCOLOR[statusRecruitment]
  const { sx, ...rest } = badgeProps

  return (
    <Card sx={{ p: 0 }}>
      <CardActionArea sx={{ p: 3 }} onClick={onClick} {...{ disabled }}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={{
            md: 'center',
            xs: 'flex-start'
          }}
        >
          <Box
            flexDirection={{
              md: 'row',
              xs: 'column'
            }}
            display={'flex'}
            gap={2}
            alignItems={{
              md: 'center',
              xs: 'flex-start'
            }}
          >
            {uncompleteCheck ? <UnCheckRoundIcon /> : <CheckRoundIcon />}
            <Typography cate='sub_title_30' plainColor='main_grey.gray50'>
              {title}
            </Typography>
          </Box>
          <CardBadge
            state='NEW'
            {...rest}
            sx={{
              py: 0.25,
              px: 0.5,
              height: 18,
              span: {
                p: 0
              },
              borderRadius: 0.5,
              ...sx
            }}
          />
        </Box>
        <Box
          display={'flex'}
          gap={1}
          mt={1.25}
          ml={{
            md: 4.75,
            xs: 0
          }}
        >
          <PlayIcon />
          <Typography cate='body_10' plainColor='main_grey.gray50'>
            {secondsToHours(duration)}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default LectureBox
