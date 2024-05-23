'use client'
import { Divider, Orange400Chip, Typography } from '@/elements'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'

type SupportProjectCardProps = {
  category: string
  organizationName: string
  title: string
  startTime: string
  endTime: string
  deadline: string
  url: string
  target: string
  targetAge: string
  targetComAge: string
}

const SupportProjectCard = ({
  category,
  title,
  startTime,
  endTime,
  deadline,
  url,
  organizationName,
  target,
  targetAge,
  targetComAge
}: SupportProjectCardProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Link href={url} target='_blank' rel='noopener noreferrer'>
      <Box
        sx={{ width: { xs: '100%', md: 'auto' }, textAlign: 'left' }}
        gap={2.5}
        position={'relative'}
        p={3}
        bgcolor={'main_grey.gray800'}
        borderRadius={4}
      >
        {mdMatches ? (
          <>
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'column'} gap={2}>
              <Orange400Chip label={deadline} />
              <Box display={'flex'} gap={1}>
                <Typography cate='sub_title_20' plainColor='sub.teal600'>
                  {category}
                </Typography>
                <Divider cate='vertical' sx={{ bgcolor: 'sub.teal600' }} />
                <Typography cate='sub_title_20' plainColor='sub.teal600'>
                  {organizationName}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
              <Box display={'flex'} gap={1}>
                <Typography cate='sub_title_20' plainColor='sub.teal600'>
                  {category}
                </Typography>
                <Divider cate='vertical' sx={{ bgcolor: 'sub.teal600' }} />
                <Typography cate='sub_title_20' plainColor='sub.teal600'>
                  {organizationName}
                </Typography>
              </Box>
              <Orange400Chip label={deadline} />
            </Box>
          </>
        )}
        <Typography mt={1} cate='title_50' plainColor='main_grey.gray100'>
          {title}
        </Typography>
        <Typography mt={1} cate='body_30' plainColor='main_grey.gray100'>
          {target}
          <br />
          {targetAge}
          <br />
          {targetComAge}
          <br />
        </Typography>
        <Box
          mt={2}
          gap={1}
          display={'flex'}
          sx={{
            flexDirection: {
              md: 'row',
              xs: 'column'
            }
          }}
        >
          <Box p={'2px 6px'} borderRadius={'5px'} width={'fit-content'} bgcolor={'main_grey.gray700'}>
            <Typography cate='body_20' plainColor='main_grey.gray200'>
              {startTime}
            </Typography>
          </Box>
          <Box p={'2px 6px'} borderRadius={'5px'} width={'fit-content'} bgcolor={'main_grey.gray700'}>
            <Typography cate='body_20' plainColor='main_grey.gray200'>
              {endTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default SupportProjectCard
