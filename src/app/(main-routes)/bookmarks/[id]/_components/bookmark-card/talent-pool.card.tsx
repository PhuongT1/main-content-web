import { TestImage } from '@/assets/images'
import { SecondaryButton, Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'

const TalentPoolCard = () => {
  const haveDate = true
  return (
    <Box
      display={'flex'}
      p={2}
      width={696}
      flexDirection={'column'}
      gap={2}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
    >
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box display={'flex'} gap={2}>
          <Box sx={{ height: 64, width: 64 }}>
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
          <Box>
            <Box display={'flex'} gap={0.5} alignItems={'center'}>
              <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                윤희연
              </Typography>
              {haveDate && (
                <Typography cate='sub_title_20' plainColor='sub.teal400'>
                  4년 2개월
                </Typography>
              )}
              <Typography cate='sub_title_20' plainColor='main_grey.gray200'>
                메인콘텐츠 마케터
              </Typography>
            </Box>
            <Box mt={1.25} display={'flex'} gap={0.5}>
              <SecondaryButton active fitContent sx={{ borderRadius: '99px !important', px: 2, py: 0.5 }}>
                <Typography cate='body_20' plainColor='main_primary.blue300'>
                  GTQ 포토샵 1급
                </Typography>
              </SecondaryButton>
              <SecondaryButton active fitContent sx={{ borderRadius: '99px !important', px: 2, py: 0.5 }}>
                <Typography cate='body_20' plainColor='main_primary.blue300'>
                  GTQ 포토샵 1급
                </Typography>
              </SecondaryButton>
              <SecondaryButton active fitContent sx={{ borderRadius: '99px !important', px: 2, py: 0.5 }}>
                <Typography cate='body_20' plainColor='main_primary.blue300'>
                  GTQ 포토샵 1급
                </Typography>
              </SecondaryButton>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          py={0.625}
          px={1.5}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'99px'}
          border={'1px solid'}
          borderColor={'sub.teal600'}
          bgcolor={'main_primary.colors_overlay_blue'}
          alignSelf={'flex-start'}
        >
          <Typography cate='caption_20' plainColor='sub.teal600'>
            경력
          </Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        p={2}
        flexDirection={'column'}
        gap={1}
        alignSelf={'stretch'}
        borderRadius={2}
        bgcolor={'main_grey.gray700'}
      >
        <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
          주요 프로젝트
        </Typography>
        <Typography component={'ul'} pl={2.25}>
          <Typography cate='body_20' plainColor='main_grey.gray300' component={'li'}>
            글로벌 게임플랫폼 개발 운영 - React, JavaScript 개발 프로젝트
          </Typography>
          <Typography cate='body_20' plainColor='main_grey.gray300' component={'li'}>
            글로벌 게임플랫폼 개발 운영 - React, JavaScript 개발 프로젝트
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default TalentPoolCard
