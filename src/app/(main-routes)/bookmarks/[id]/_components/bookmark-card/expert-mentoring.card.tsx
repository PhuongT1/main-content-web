'use client'
import { BookMarkIcon } from '@/assets/icons'
import RocketIcon from '@/assets/icons/rocket.ico'
import { TestImage } from '@/assets/images'
import { Divider, GraySolidIconButton, Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'

const ExpertMentoringCard = () => {
  const theme = useTheme()
  const svgBookmarkColor = theme.palette.main_primary.blue500
  const svgRocketColor = theme.palette.main_grey.gray300

  return (
    <Box
      display={'flex'}
      py={3}
      px={2}
      width={336}
      flexDirection={'column'}
      gap={2}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
    >
      <Box height={160} width={160} alignSelf={'center'}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 99
          }}
          src={TestImage}
          alt={`book-mark-${0}`}
        />
      </Box>
      <Box alignSelf={'center'} textAlign={'center'}>
        <Typography cate='title_40' plainColor='sub.teal400'>
          슘페터
        </Typography>
        <Typography cate='title_60' plainColor='main_grey.gray100' mt={0.5}>
          이규원 멘토
        </Typography>
        <Typography cate='body_3' plainColor='main_grey.gray100' mt={1.5}>
          경력 10년차 창업전문 컨설턴트가 합격률 확 높이는 사업계획서 작성을 도와드립니다.
        </Typography>
        <Box mt={1.5} display={'flex'} gap={1} justifyContent={'center'}>
          <Box
            py={1}
            px={2}
            borderRadius={'99px'}
            border={'1px solid'}
            borderColor={'main_grey.gray700'}
            bgcolor={'main_grey.gray700'}
          >
            <Typography cate='sub_title_10' plainColor='main_grey.gray300'>
              경영전략
            </Typography>
          </Box>
          <Box
            py={1}
            px={2}
            borderRadius={'99px'}
            border={'1px solid'}
            borderColor={'main_grey.gray700'}
            bgcolor={'main_grey.gray700'}
          >
            <Typography cate='sub_title_10' plainColor='main_grey.gray300'>
              경영전략
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box display={'flex'} gap={0.5} alignItems={'center'}>
          <RocketIcon rectProps={{ fill: 'none' }} pathProps={{ stroke: svgRocketColor }} />
          <Box display={'flex'} gap={1}>
            <Typography cate='caption_20' plainColor='main_primary.blue300'>
              15번의 멘토링
            </Typography>
            <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500' }} />
            <Typography cate='caption_20' plainColor='main_grey.gray200'>
              10개의 후기
            </Typography>
          </Box>
        </Box>
        <Box>
          <GraySolidIconButton btnSize='p8'>
            <BookMarkIcon pathProps={{ fill: svgBookmarkColor, stroke: svgBookmarkColor }} />
          </GraySolidIconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ExpertMentoringCard
