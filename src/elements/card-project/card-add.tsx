import PlusLgIcon from '@/assets/icons/plus-lg'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { CardActionArea, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card'

export default function ActionAreaCard() {
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
        borderRadius: convertToRem(16)
      }}
    >
      <CardActionArea
        sx={{
          maxWidth: 456,
          padding: convertToRem(16),
          height: '100%',
          maxHeight: convertToRem(248),
          minHeight: xs ? convertToRem(182) : convertToRem(248),
          width: md ? '100%' : convertToRem(456),
          backgroundColor: theme.palette.main.gray80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <PlusLgIcon />
        <Typography cate='body_2' color={theme.palette.main.gray10} mt={5}>
          새 프로젝트 시작하기
        </Typography>
      </CardActionArea>
    </Card>
  )
}
