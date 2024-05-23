'use client'
import { BookMarkIcon } from '@/assets/icons'
import { TestImage } from '@/assets/images'
import { PrimaryButton, SecondaryButton, SecondaryIconButton, Typography } from '@/elements'
import { formatCurrency } from '@/utils/string'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'

const SupportProjectCard = () => {
  const theme = useTheme()
  const bookmarkSvgColor = theme.palette.main_primary.blue500
  return (
    <Box
      display={'flex'}
      p={2}
      width={366}
      flexDirection={'column'}
      gap={2}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
    >
      <Box height={304}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 8
          }}
          src={TestImage}
          alt={`book-mark-${0}`}
        />
      </Box>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography cate='body_30' plainColor='sub.teal600'>
            양성과정
          </Typography>
          <Box
            display={'flex'}
            py={0.625}
            px={1.5}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'99px'}
            border={'1px solid'}
            borderColor={'sub.orange600'}
            bgcolor={'sub.pink100'}
          >
            <Typography cate='caption_20' plainColor='sub.orange600'>
              D-1
            </Typography>
          </Box>
        </Box>
        <Box mt={1}>
          <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
            ChatGPT를 활용한 업무 효율성을 높이고 싶다면?
          </Typography>
        </Box>
        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
          <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
            {formatCurrency(600000)}
          </Typography>
          <Typography cate='sub_title_30' plainColor='main_grey.gray200'>
            12/30
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={1}>
        <SecondaryButton active btnSize='sm'>
          <Typography cate='button_30' plainColor='main_grey.gray100'>
            자세히보기
          </Typography>
        </SecondaryButton>
        <PrimaryButton btnSize='sm'>
          <Typography cate='button_30' plainColor='main_grey.gray100'>
            신청하기
          </Typography>
        </PrimaryButton>
        <SecondaryIconButton active btnSize='md'>
          <BookMarkIcon pathProps={{ fill: bookmarkSvgColor, stroke: bookmarkSvgColor }} />
        </SecondaryIconButton>
      </Box>
    </Box>
  )
}

export default SupportProjectCard
