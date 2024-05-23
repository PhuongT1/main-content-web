import MenuIcon from '@/assets/icons/menu'
import FavCheckbox from '@/elements/fav-checkbox'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  AvatarGroupProps,
  Box,
  CardActionArea,
  IconButton,
  LinearProgress,
  Avatar as MAvatar,
  AvatarGroup as MAvatarGroup,
  Chip as MChip,
  ChipProps as MChipProps,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'

export type ChipProps = MChipProps & {
  active?: boolean
}

const Chip = styled(MChip)<ChipProps>(({ theme, active }) => ({
  backgroundColor: !!active ? theme.palette.main.primary : theme.palette.main.gray60,
  padding: '0.5rem 1rem',
  color: !!active ? theme.palette.main.white : theme.palette.main.gray60,
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  }
}))
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.main.gray60,

  '.MuiLinearProgress-barColorPrimary': {
    background: theme.palette.gradation.blue,
    borderRadius: 5
  }
  // [`& .${linearProgressClasses.bar}`]: {
  //   borderRadius: 5,
  //   backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  // },
}))

const AvatarGroup = styled(MAvatarGroup)<AvatarGroupProps>(({ theme, max }) => {
  return {
    ...[...Array(max)].reduce(
      (result, curr, index) => ({
        ...result,
        [`& > .MuiAvatar-root:nth-child(${index + 1})`]: {
          zIndex: (max || 4) - index
        }
      }),
      {}
    ),
    '.MuiAvatar-colorDefault': {
      width: convertToRem(24),
      height: convertToRem(24),
      fontSize: convertToRem(12),
      color: theme.palette.main.white,
      marginLeft: convertToRem(8)
    }
  }
})

const Avatar = styled(MAvatar)<any>(({ theme }) => ({
  width: convertToRem(24),
  height: convertToRem(24)
}))

export default function CardInProcess() {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')

  return (
    <Card
      sx={{
        maxWidth: 456,
        height: '100%',
        maxHeight: convertToRem(248),
        minHeight: xs ? convertToRem(182) : convertToRem(248),
        width: md ? '100%' : convertToRem(456),
        backgroundColor: theme.palette.main.gray80,
        borderRadius: convertToRem(16),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'100%'} zIndex={2}>
        <Chip active={true} label='진행완료' sx={{ marginTop: convertToRem(16), marginLeft: convertToRem(16) }} />
        <Box display={'flex'} mt={1} mr={1}>
          <Box p={1}>
            <FavCheckbox />
          </Box>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography
        mt={2}
        cate='body_1'
        color={theme.palette.main.white}
        zIndex={2}
        paddingX={2}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
      >
        사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼
      </Typography>
      <Typography mt={3.25} cate='caption_1' color={theme.palette.main.white} zIndex={2} paddingX={2}>
        진행도 48%
      </Typography>
      <Box zIndex={2} paddingX={2} width={'100%'} my={2}>
        <BorderLinearProgress variant='determinate' value={50} />
      </Box>
      <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'100%'} zIndex={2}>
        <Typography cate={'caption_1'} ml={2} color={theme.palette.main.point}>
          2023.06.06 생성 ㅣ DECK 12개
        </Typography>
        <Box display={'flex'} mr={2}>
          <AvatarGroup max={4}>
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
            <Avatar alt='Remy Sharp' src='/images/blank-user.png' />
          </AvatarGroup>
        </Box>
      </Box>
      <CardActionArea
        onClick={() => {}}
        sx={{
          maxWidth: 456,
          zIndex: 1,
          height: '100%',
          maxHeight: convertToRem(248),
          minHeight: xs ? convertToRem(182) : convertToRem(248),
          width: md ? '100%' : convertToRem(456),
          backgroundColor: theme.palette.main.gray80,
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
