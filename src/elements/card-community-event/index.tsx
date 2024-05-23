import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilledIcon from '@/assets/icons/bookmark-sm-filled'
import HeartFilledIcon from '@/assets/icons/heart-filled'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  Box,
  CardActionArea,
  IconButton,
  Chip as MChip,
  ChipProps as MChipProps,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
import { useState } from 'react'
export type ChipProps = MChipProps & {
  type?: string
}
const Chip = styled(MChip)<ChipProps>(({ theme, type }) => ({
  backgroundColor:
    type === 'error' ? theme.palette.main.danger : type === 'warning' ? '#FC7900' : theme.palette.main.primary,
  padding: '1px 5px 2px 5px',
  color: theme.palette.main.white,
  borderRadius: '2px',
  fontSize: convertToRem(12),
  '.MuiChip-label': {
    padding: 0
  },
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  }
}))
export default function CardCommunityEvent() {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const [bookmark, setBookmark] = useState(false)
  const toggleBookmark = () => {
    setBookmark((prev) => !prev)
  }

  return (
    <Card
      sx={{
        maxWidth: convertToRem(264),
        height: '100%',
        maxHeight: convertToRem(480),
        minHeight: convertToRem(480),
        width: md ? '100%' : convertToRem(264),
        backgroundColor: theme.palette.main.white,
        borderRadius: convertToRem(16),
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <Box
        display={'flex'}
        alignItems='center'
        justifyContent={'space-between'}
        zIndex={2}
        component='div'
        sx={{
          width: '100%',
          height: convertToRem(368),
          position: 'relative'
        }}
      >
        <Box position={'absolute'} zIndex={3} top={16} left={16}>
          <MChip size='medium' label='D-12' sx={{ backgroundColor: theme.palette.main.gray80 }} />
        </Box>
        <Box position={'absolute'} zIndex={3} top={12} right={16}>
          <IconButton
            sx={{
              backgroundColor: theme.palette.main.gray80,
              '&:hover': {
                backgroundColor: theme.palette.main.gray70
              }
            }}
            onClick={toggleBookmark}
          >
            <Bookmark stroke={bookmark ? theme.palette.main.point : theme.palette.main.white} />
          </IconButton>
        </Box>
        <Box
          display={'flex'}
          alignItems='center'
          justifyContent={'space-between'}
          zIndex={2}
          component='div'
          sx={{
            width: '100%',
            height: convertToRem(368),
            position: 'relative'
          }}
        >
          <Image
            src='/images/test-img.png'
            width={100}
            height={192}
            style={{
              objectFit: 'contain',
              width: '100%',
              position: 'relative',
              height: 'unset !important'
            }}
            alt='test'
            priority={true}
          />
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} zIndex={2} px={2} mt={2}>
        <Typography cate='caption_1' color={theme.palette.main.gray50}>
          지원사업
        </Typography>
        <Typography
          cate='body_3_semibold'
          color={theme.palette.main.gray90}
          zIndex={2}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
        >
          사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼
        </Typography>
      </Box>

      <Box
        display={'flex'}
        alignItems='center'
        justifyContent={'space-between'}
        width={'100%'}
        zIndex={2}
        mt={2}
        px={2}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Typography cate='caption_2' color={theme.palette.main.gray50} mr={1}>
            1일전
          </Typography>
          <BookmarkFilledIcon />
          <Typography cate='caption_2' color={theme.palette.main.gray50} mr={1}>
            12
          </Typography>
          <HeartFilledIcon />
          <Typography cate='caption_2' color={theme.palette.main.gray50}>
            4,100
          </Typography>
        </Box>
      </Box>
      <CardActionArea
        onClick={() => {}}
        sx={{
          maxWidth: 264,
          zIndex: 1,
          height: '100%',
          maxHeight: convertToRem(480),
          minHeight: convertToRem(480),
          width: md ? '100%' : convertToRem(264),
          backgroundColor: theme.palette.main.white,
          padding: convertToRem(16),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'absolute'
        }}
      ></CardActionArea>
    </Card>
  )
}
