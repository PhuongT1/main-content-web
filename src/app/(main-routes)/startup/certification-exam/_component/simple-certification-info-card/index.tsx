import CardBox from '@/components/cards/card-box'
import { Typography } from '@/elements'
import { CertificateExam } from '@/types/certification.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, CircularProgress, Stack } from '@mui/material'
import Image from 'next/image'

type SimpleCertificationInformationProps = {
  info: CertificateExam | undefined
}

const SimpleCertificationInformation = ({ info }: SimpleCertificationInformationProps) => {
  return (
    <CardBox sx={{ backgroundColor: 'main_grey.gray800', borderRadius: convertToRem(16) }} gap={3}>
      {info ? (
        <Stack gap={3}>
          <Typography cate='title_50' plainColor='main_grey.gray100'>
            주문 정보
          </Typography>
          <Stack direction={{ md: 'row', sm: 'column' }} gap={3}>
            <Box
              height={{ md: 120, sm: 162 }}
              width={{ md: 214, sm: '100%' }}
              position={'relative'}
              sx={{
                borderRadius: convertToRem(10),
                overflow: 'hidden'
              }}
            >
              <Image
                style={{
                  objectFit: 'cover'
                }}
                fill
                src={info.thumbnail.url}
                alt={`certification-exam-${0}`}
              />
            </Box>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography cate='sub_title_20' plainColor='sub.teal400'>
                  {info.typeFormat}
                </Typography>
                <Typography cate='title_40' plainColor='main_grey.gray100'>
                  {info.name}
                </Typography>
              </Stack>
              {info.hasTextbook && (
                <Stack direction={'row'} gap={1}>
                  <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
                    교구
                  </Typography>
                  <Typography cate='body_30' plainColor='main_grey.gray100'>
                    {info.textbookName}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress color='primary' />
        </Stack>
      )}
    </CardBox>
  )
}

export default SimpleCertificationInformation
