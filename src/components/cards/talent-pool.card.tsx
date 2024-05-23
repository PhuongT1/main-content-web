import { OutlineBlue300Chip, Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'

type TalentPoolCardProps = {
  profileImage: string
  name: string
  totalExperiences: number | string
  skillsAndCertificate: string[]
  applicationField: string
  introduction: string
}

const TalentPoolCard = ({
  profileImage,
  name,
  totalExperiences,
  skillsAndCertificate,
  applicationField,
  introduction
}: TalentPoolCardProps) => {
  const haveDate = true
  return (
    <Box display={'flex'} p={2} flexDirection={'column'} gap={2} borderRadius={2} bgcolor={'main_grey.gray800'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          alignItems: {
            xs: 'flex-start',
            md: 'center'
          },
          gap: {
            xs: 2,
            md: 0
          }
        }}
      >
        <Box display={'flex'} gap={2}>
          <Box sx={{ height: 64, width: 64 }}>
            <Image
              width={64}
              height={64}
              style={{
                objectFit: 'cover',
                borderRadius: 99
              }}
              src={profileImage}
              alt={`book-mark-${0}`}
            />
          </Box>
          <Box>
            <Box
              display={'flex'}
              gap={0.5}
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                alignItems: {
                  xs: 'flex-start',
                  md: 'center'
                }
              }}
            >
              <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                {name}
              </Typography>
              {haveDate && (
                <Typography cate='sub_title_20' plainColor='sub.teal400'>
                  {totalExperiences}년
                </Typography>
              )}
              {/* <Typography cate='sub_title_20' plainColor='main_grey.gray200'>
                메인콘텐츠 마케터
              </Typography> */}
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex'
                }
              }}
              mt={1.25}
              display={'flex'}
              gap={0.5}
            >
              {skillsAndCertificate.map((i, idx) => (
                <OutlineBlue300Chip key={idx} label={i} />
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none'
            }
          }}
          mt={1.25}
          display={'flex'}
          gap={0.5}
          flexWrap={'wrap'}
        >
          {skillsAndCertificate.map((i, idx) => (
            <OutlineBlue300Chip key={idx} label={i} />
          ))}
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            alignItems: {
              xs: 'flex-start',
              md: 'center'
            }
          }}
        >
          <Typography cate='body_10' plainColor='main_grey.gray200'>
            신청분야
          </Typography>
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
              {applicationField}
            </Typography>
          </Box>
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
          {introduction}
        </Typography>
        {/* <Typography component={'ul'} pl={2.25}>
          <Typography cate='body_20' plainColor='main_grey.gray300' component={'li'}>
            글로벌 게임플랫폼 개발 운영 - React, JavaScript 개발 프로젝트
          </Typography>
          <Typography cate='body_20' plainColor='main_grey.gray300' component={'li'}>
            글로벌 게임플랫폼 개발 운영 - React, JavaScript 개발 프로젝트
          </Typography>
        </Typography> */}
      </Box>
    </Box>
  )
}

export default TalentPoolCard
