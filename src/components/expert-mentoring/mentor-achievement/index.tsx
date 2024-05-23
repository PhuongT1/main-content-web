'use client'
import { RocketIcon } from '@/assets/icons'
import { Divider, Typography } from '@/elements'
import { Box, SxProps, useTheme } from '@mui/material'

type MentorAchievementProps = {
  containerSx?: SxProps
  rocketSize?: 'md' | 'sm'
  totalReviews?: number
  totalApplications?: number
}

const MentorAchievement = ({
  containerSx,
  rocketSize = 'md',
  totalReviews = 0,
  totalApplications = 0
}: MentorAchievementProps) => {
  const theme = useTheme()
  const svgRocketColor = theme.palette.main_grey.gray300

  return (
    <Box sx={{ ...containerSx }} display={'flex'} gap={0.5} alignItems={'center'}>
      <RocketIcon
        rectProps={{ fill: 'none' }}
        svgProps={{
          ...(rocketSize === 'sm' && {
            height: 20,
            width: 20
          })
        }}
        pathProps={{
          stroke: svgRocketColor,
          ...(rocketSize === 'sm' && {
            d: 'M9.99967 12.5L7.49967 10M9.99967 12.5C11.1637 12.0573 12.2804 11.4989 13.333 10.8333M9.99967 12.5V16.6667C9.99967 16.6667 12.5247 16.2083 13.333 15C14.233 13.65 13.333 10.8333 13.333 10.8333M7.49967 10C7.94313 8.84952 8.50151 7.74672 9.16634 6.70833C10.1373 5.15582 11.4894 3.87754 13.0938 2.99507C14.6983 2.11261 16.5019 1.65531 18.333 1.66666C18.333 3.93333 17.683 7.91666 13.333 10.8333M7.49967 10H3.33301C3.33301 10 3.79134 7.475 4.99967 6.66666C6.34967 5.76666 9.16634 6.66666 9.16634 6.66666M3.74967 13.75C2.49967 14.8 2.08301 17.9167 2.08301 17.9167C2.08301 17.9167 5.19967 17.5 6.24967 16.25C6.84134 15.55 6.83301 14.475 6.17467 13.825C5.85076 13.5158 5.42409 13.3372 4.97653 13.3234C4.52897 13.3095 4.09207 13.4614 3.74967 13.75Z',
            height: 20,
            width: 20
          })
        }}
      />
      <Box display={'flex'} gap={1}>
        <Typography
          cate='caption_20'
          breakpoints={{
            md: 'body_20'
          }}
          plainColor='main_primary.blue300'
        >
          {totalApplications}번의 멘토링
        </Typography>
        <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500' }} />
        <Typography
          breakpoints={{
            md: 'body_20'
          }}
          cate='caption_20'
          plainColor='main_grey.gray200'
        >
          {totalReviews}개의 후기
        </Typography>
      </Box>
    </Box>
  )
}

export default MentorAchievement
