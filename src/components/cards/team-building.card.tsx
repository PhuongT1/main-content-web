'use client'
import { TestImage } from '@/assets/images'
import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import FavoriteBottom from '../favorite-bottom'

const TeamBuildingCard = () => {
  return (
    <Box
      display={'flex'}
      p={2}
      width={336}
      flexDirection={'column'}
      gap={3}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
    >
      <Box sx={{ height: 88, width: 88 }}>
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
        <Typography cate='body_20' plainColor='sub.teal400'>
          메인콘텐츠
        </Typography>
        <Typography cate='sub_title_30' plainColor='main_grey.gray100' mt={1}>
          데이터 기반 프로그램 코파운블록체인 기반 가상화폐 DeFi(탈중앙화 금융..더 모집
        </Typography>
        <Typography cate='body_20' plainColor='main_grey.gray300' mt={1}>
          코드블라썸이 추구하는 병원 간병 시장의 혁신을 일으킬 수 있는 서비스를 기획하실 수 있는 분을 모집 중...
        </Typography>
        <Box display={'flex'} gap={1}>
          <Typography cate='sub_title_20' plainColor='main_primary.blue300' mt={0.5}>
            메인콘텐츠
          </Typography>
          <Typography cate='body_20' plainColor='main_primary.blue300' mt={0.5}>
            : 1명 모집
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Typography cate='sub_title_20' plainColor='main_primary.blue300' mt={0.5}>
            메인콘텐츠
          </Typography>
          <Typography cate='body_20' plainColor='main_primary.blue300' mt={0.5}>
            : 1명 모집
          </Typography>
        </Box>
      </Box>
      <FavoriteBottom />
    </Box>
  )
}

export default TeamBuildingCard
