'use client'
import { TestImage } from '@/assets/images'
import { Typography } from '@/elements'
import { Box, BoxProps } from '@mui/material'
import Image from 'next/image'
import FavoriteBottom from '../favorite-bottom'

type BookMarkCardProps = {
  type: 'oc' | 'rr' | 'cb'
} & BoxProps

const ContentBlogsBody = () => {
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography cate='sub_title_20' plainColor='sub.teal400'>
          개발/SI
        </Typography>
        <Box
          display={'flex'}
          height={20}
          py={'1px'}
          px={1}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={1}
          bgcolor={'sub.orange700'}
        >
          <Typography cate='sub_title_20' plainColor='main_grey.gray1000'>
            New
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={1} mt={0.5} alignItems={'center'}>
        <Box height={24} width={24}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 24
            }}
            src={TestImage}
            alt={`book-mark-${0}`}
          />
        </Box>
        <Typography cate='body_10' plainColor='main_grey.gray200'>
          그로스해커 / 김민성 팀장
        </Typography>
      </Box>
      <Typography mt={0.5} cate='body_40' plainColor='main_grey.gray100'>
        2023 예술분야 창업기업 지원사업 공고 – Eun
      </Typography>
    </Box>
  )
}

const OutsourcingCompanyBody = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} gap={0.5} flexDirection={'column'}>
      <Typography cate='caption_10' plainColor='sub.teal600'>
        개발/SI
      </Typography>
      <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
        메인콘텐츠
      </Typography>
      <Typography cate='body_20' plainColor='main_grey.gray300'>
        메인콘텐츠와 함께 슘페터 서비스를 만들어 나갈 인재를 찾습니다.
      </Typography>
    </Box>
  )
}

const ReferenceRoomBody = () => {
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography cate='title_40' plainColor='sub.teal600'>
          개발/SI
        </Typography>
        <Box
          display={'flex'}
          height={20}
          py={'1px'}
          px={1}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={1}
          bgcolor={'sub.orange700'}
        >
          <Typography cate='sub_title_20' plainColor='main_grey.gray1000'>
            프리미엄
          </Typography>
        </Box>
      </Box>
      <Typography mt={1.25} cate='title_40' plainColor='main_grey.gray100'>
        딜리버리티(DeliveryT) 예비창업자 패키지 합격 서류 (2019년 version)
      </Typography>
    </Box>
  )
}

const BookMarkCard = ({ type, ...rest }: BookMarkCardProps) => {
  return (
    <Box
      display={'flex'}
      p={2}
      flexDirection={'column'}
      gap={2}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
      {...rest}
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
        {type === 'oc' && <OutsourcingCompanyBody />}
        {type === 'rr' && <ReferenceRoomBody />}
        {type === 'cb' && <ContentBlogsBody />}
      </Box>
      <FavoriteBottom />
    </Box>
  )
}

export default BookMarkCard
