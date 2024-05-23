'use client'
import TrashIcon from '@/assets/icons/trash'
import { Divider, Orange400Chip, OutlineBlue300Chip, RoundedSolidIconButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useLoading } from '@/hooks/use-loading'
import { res2ui } from '@/utils/date'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TrashAlert } from '../dialog'

type MyApplicationCardProps = {
  teamThumbnail: string
  teamSlogan: string
  teamIntroduction: string
  recruitRole: string
  recruitSkills: string[]
  recruitDescription: string
  fromDate: string
  toDate: string
  recruitNumber: number
  showIsHiring: boolean
  ondelete: () => void
}

const MyApplicationCard = ({
  teamThumbnail,
  teamSlogan,
  teamIntroduction,
  recruitRole,
  recruitSkills,
  recruitDescription,
  recruitNumber,
  fromDate,
  toDate,
  showIsHiring,
  ondelete
}: MyApplicationCardProps) => {
  const { open, onClose, onOpen } = useDialog()
  const { loading, showLoading, hideLoading } = useLoading(false)
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box padding={3} borderRadius={4} bgcolor={'main_grey.gray800'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box
          display={'flex'}
          gap={2}
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row'
            }
          }}
        >
          <Box sx={{ height: 90, width: 90 }} flexShrink={0}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8
              }}
              height={90}
              width={90}
              src={teamThumbnail}
              alt={`book-mark-${0}`}
            />
          </Box>
          <Box>
            <Typography cate='sub_title_40' plainColor='main_grey.gray100'>
              {teamSlogan}
            </Typography>
            <Typography cate='body_20' plainColor='main_grey.gray100' mt={2}>
              {teamIntroduction}
            </Typography>
          </Box>
        </Box>
        <Box width={30} height={30} flexShrink={0}>
          <RoundedSolidIconButton isLoading={loading} action={onOpen} btnSize='full'>
            <TrashIcon svgProps={{ width: 16, height: 16, viewBox: '0 0 24 24' }} />
          </RoundedSolidIconButton>
        </Box>
      </Box>
      <Divider
        sx={{
          my: 3,
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      />
      <Box
        sx={{
          mt: {
            xs: 3,
            md: 0
          }
        }}
        display={'flex'}
        gap={2}
        flexDirection={'column'}
        py={2}
        px={3}
        borderRadius={4}
        bgcolor={'main_grey.gray700'}
      >
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box
            display={'flex'}
            gap={2}
            alignItems={'center'}
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
              {recruitRole}
            </Typography>
            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
              {recruitSkills.map((i) => (
                <OutlineBlue300Chip label={i} key={i} />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              mb: {
                xs: 'auto',
                md: 0
              }
            }}
          >
            {showIsHiring && <Orange400Chip label='모집중' />}
          </Box>
        </Box>
        <Typography cate='body_30' plainColor='main_grey.gray300'>
          {recruitDescription}
        </Typography>
        <Typography cate='body_20' plainColor='main_grey.gray100'>
          {res2ui(fromDate)} ~ {res2ui(toDate)} / {recruitNumber}명 모집
        </Typography>
      </Box>
      <TrashAlert
        onSubmit={async () => {
          onClose()
          showLoading()
          const data = await ondelete()
          hideLoading()
          router.refresh()
          return data
        }}
        onCancel={onClose}
        title={'신청 정보를 목록에서 삭제하시겠습니까？'}
        submitTxt='확인'
        cancelTxt='취소'
        open={open}
      />
    </Box>
  )
}

export default MyApplicationCard
