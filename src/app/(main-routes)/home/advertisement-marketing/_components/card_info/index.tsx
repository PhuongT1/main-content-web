import { Box, Typography, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'

type TCardInfoProps = {
  title?: string
  subTitle?: string
  icon?: React.ReactNode
}
function CardInfo({ title, subTitle, icon }: TCardInfoProps) {
  const { palette } = useTheme()
  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
      flex={1}
      gap={convertToRem(15)}
      sx={{
        padding: `${convertToRem(32)} ${convertToRem(44)}`,
        backgroundColor: palette.home.gray400,
        borderRadius: convertToRem(10),
        minHeight: convertToRem(180)
      }}
    >
      {icon}
      <Box textAlign={'center'}>
        <Typography color={palette.home.gray50} lineHeight={convertToRem(24)} fontWeight={600} whiteSpace={'pre-line'}>
          {title}
        </Typography>
        <Typography color={palette.home.gray100}>{subTitle}</Typography>
      </Box>
    </Box>
  )
}

export default CardInfo
