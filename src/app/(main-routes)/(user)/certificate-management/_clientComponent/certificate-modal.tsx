'use client'
import { BlankUser } from '@/assets/images'
import { IconButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, DialogProps, Stack, useTheme } from '@mui/material'
import Image from 'next/image'
import { BG, CertificateIcon, DividerIcon, Sign } from '../_imgs'
import CloseDarkIcon from '@/assets/icons/dialog-icons/close-dark'

type TCertificateModalProps = {
  certificateNumber: string
  courseName: string
  thumbnail: string
  username: string
  dateOfBirth: string
  grade: number | string
  dateOfCertificate: string
  certificateBackground: string
}
const CertificateModal = ({
  certificateNumber,
  courseName,
  thumbnail,
  username,
  dateOfBirth,
  dateOfCertificate,
  grade,
  certificateBackground,
  ...props
}: TCertificateModalProps & DialogProps) => {
  const { palette } = useTheme()

  return (
    <Dialog
      {...props}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: { xs: convertToRem(452), md: convertToRem(640), sl: convertToRem(860) },
          maxWidth: { xs: convertToRem(320), md: convertToRem(460), sl: convertToRem(608) },
          backgroundImage: `url(${certificateBackground || BG.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          borderRadius: 0,
          backgroundColor: palette.main.white
        }
      }}
    >
      <IconButton sx={{ position: 'absolute', top: '5%', right: '5%', zIndex: 999 }} onClick={props.onClose as any}>
        <CloseDarkIcon />
      </IconButton>
      <DialogContent
        sx={{
          height: { xs: convertToRem(452), md: convertToRem(640), sl: convertToRem(860) },
          width: { xs: convertToRem(320), md: convertToRem(460), sl: convertToRem(608) },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            pt: { xs: convertToRem(4), md: convertToRem(20), sl: convertToRem(32) },
            pb: { xs: convertToRem(8), md: convertToRem(22), sl: convertToRem(44) }
          }}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
              marginBottom: { xs: convertToRem(16), md: convertToRem(28), sl: convertToRem(38) },
              maxWidth: { xs: convertToRem(300), md: convertToRem(360), sl: convertToRem(600) },
              width: '100%'
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: convertToRem(6), md: convertToRem(10) },
                fontWeight: 600,
                color: palette.main.gray3e,
                flex: 1
              }}
            >
              민간자격등록번호
            </Typography>
            <Box
              sx={{
                height: { xs: convertToRem(24), md: convertToRem(40), sl: convertToRem(50) },
                width: { xs: convertToRem(44), md: convertToRem(76), sl: convertToRem(88) },
                position: 'relative',
                flex: 'none'
              }}
            >
              <Image
                src={CertificateIcon.src}
                alt={'certificate'}
                fill
                style={{
                  borderRadius: convertToRem(8),
                  objectFit: 'contain'
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: { xs: convertToRem(6), md: convertToRem(10) },
                fontWeight: 600,
                color: palette.main.gray3e,
                flex: 1,
                textAlign: 'end'
              }}
            >
              {`제 ${certificateNumber} 호`}
            </Typography>
          </Box>
          <Stack
            alignItems={'center'}
            sx={{
              gap: { xs: convertToRem(10), md: convertToRem(16), sl: convertToRem(20) },
              marginBottom: { xs: convertToRem(16), md: convertToRem(28), sl: convertToRem(34) }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: convertToRem(12), md: convertToRem(16), sl: convertToRem(20) },
                lineHeight: { xs: convertToRem(20), md: convertToRem(20), sl: convertToRem(24) },
                fontWeight: 500,
                color: palette.main.gray70,
                textAlign: 'center',
                letterSpacing: '2.4px'
              }}
            >
              CERTIFICATE
            </Typography>
            <Box
              sx={{
                height: { xs: convertToRem(3.2), md: convertToRem(6.4) },
                width: { xs: convertToRem(112), md: convertToRem(182), sl: convertToRem(223) },
                position: 'relative'
              }}
            >
              <Image
                src={DividerIcon.src}
                alt={'divider'}
                fill
                style={{
                  borderRadius: convertToRem(8),
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: { xs: convertToRem(22), md: convertToRem(34), sl: convertToRem(40) },
              fontWeight: 700,
              color: palette.main.gray90,
              textAlign: 'center',
              maxWidth: { xs: convertToRem(240), md: convertToRem(320), sl: convertToRem(390) },
              lineHeight: { xs: convertToRem(32), md: convertToRem(40), sl: convertToRem(48) },
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2
            }}
          >
            {courseName}
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            flex={1}
            sx={{
              gap: { xs: convertToRem(24), md: convertToRem(40), sl: convertToRem(40) }
            }}
          >
            <Box
              sx={{
                height: { xs: convertToRem(86), md: convertToRem(112), sl: convertToRem(172) },
                width: { xs: convertToRem(72), md: convertToRem(96), sl: convertToRem(144) },
                position: 'relative'
              }}
            >
              <Image
                src={thumbnail ? thumbnail : BlankUser}
                alt={'certificate'}
                fill
                style={{
                  borderRadius: convertToRem(8),
                  objectFit: 'cover'
                }}
              />
            </Box>
            <Stack
              alignItems={'flex-start'}
              justifyContent={'center'}
              sx={{
                gap: convertToRem(4)
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                  lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
                }}
                plainColor='main.black'
              >{`제 ${certificateNumber} 호`}</Typography>
              <Typography
                sx={{
                  fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                  lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
                }}
                plainColor='main.black'
              >{`성 명 : ${username}`}</Typography>
              <Typography
                sx={{
                  fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                  lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
                }}
                plainColor='main.black'
              >{`생년월일 : ${dateOfBirth}`}</Typography>
              <Typography
                sx={{
                  fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                  lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
                }}
                plainColor='main.black'
              >{`자격등급 : ${grade}`}</Typography>
            </Stack>
          </Stack>
          <Stack
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              gap: convertToRem(4),
              maxWidth: { xs: convertToRem(300), md: convertToRem(360), sl: convertToRem(600) }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
              }}
              plainColor='main.gray3e'
            >{`메인콘텐츠가 주관하는 ${courseName} ${grade}급 교육과정을`}</Typography>
            <Typography
              sx={{
                fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
              }}
              plainColor='main.gray3e'
            >
              위 사람은 자격기본법이 정한 바에 따라
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: convertToRem(8), md: convertToRem(12), sl: convertToRem(14) },
                lineHeight: { xs: convertToRem(14), md: convertToRem(18), sl: convertToRem(21) }
              }}
              plainColor='main.gray3e'
            >
              성실히 이수하고 소정의 자격시험을 통과하였으므로 이 자격을 부여합니다.
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: { xs: convertToRem(10), md: convertToRem(14) },
              lineHeight: { xs: convertToRem(16), md: convertToRem(20) },
              marginTop: { xs: convertToRem(20), md: convertToRem(24), sl: convertToRem(45) },
              fontWeight: 600,
              textAlign: 'center'
            }}
            plainColor='main.black'
          >
            {dateOfCertificate}
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: { xs: convertToRem(20), md: convertToRem(24), sl: convertToRem(50) }
            }}
          >
            <Typography
              plainColor='main.gray3e'
              sx={{
                fontSize: { xs: convertToRem(16), md: convertToRem(20), sl: convertToRem(24) },
                fontWeight: 400,
                zIndex: 2
              }}
            >
              주식회사 메인콘텐츠
            </Typography>
            <Box
              sx={{
                right: { xs: '21%', sl: '24%' },
                width: { xs: convertToRem(36), md: convertToRem(64), sl: convertToRem(72) },
                height: { xs: convertToRem(28), md: convertToRem(40), sl: convertToRem(56) }
              }}
              position={'absolute'}
            >
              <Image
                src={Sign.src}
                alt={'sign'}
                fill
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default CertificateModal
