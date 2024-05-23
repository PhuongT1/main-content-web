import Typography from '@/elements/typography'
import Box from '@mui/material/Box'
import { convertToRem } from '@/utils/styles'
import { useTheme } from '@mui/material'

type TipCardProps = {
  title: string
  contents: Array<string>
}

const TipCard = ({ title, contents }: TipCardProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        padding: convertToRem(24),
        borderRadius: convertToRem(8),
        border: `1px solid ${theme.palette.main_grey.gray600}`
      }}
    >
      <Typography cate='sub_title_30' plainColor='main.grayf7' sx={{ marginBottom: convertToRem(8) }}>
        {title}
      </Typography>
      <Box component='ul' sx={{ marginLeft: convertToRem(24) }}>
        {contents.map((item, index) => (
          <Box component='li' key={index}>
            <Typography cate='body_20' plainColor='main_grey.gray200'>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default TipCard
