import { Typography } from '@/elements'
import { useTheme } from '@mui/material'
import LockIcon from '@/assets/icons/lock'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'
import { useLanguage } from '@/hooks/use-language'

const WrapLockIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(32),
  height: convertToRem(32),
  backgroundColor: theme.palette.main.white,
  borderRadius: '50%'
}))

const LockOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: convertToRem(6),
  width: '100%',
  height: '100%',
  background: 'rgba(25, 26, 28, 0.60)',
  backdropFilter: 'blur(1px)',
  borderRadius: convertToRem(10)
}))

interface ILockCard {
  label?: string
}

export const LockCard = ({ label }: ILockCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()

  return (
    <LockOverlay>
      <WrapLockIcon>
        <LockIcon />
      </WrapLockIcon>
      <Typography cate='body_2_semibold' color={palette.main.white}>
        {label || dict.project_home_premium_only}
      </Typography>
    </LockOverlay>
  )
}
