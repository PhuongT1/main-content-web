import { Typography } from '@/elements'
import Box from '@mui/material/Box'
import { convertToRem } from '@/utils/styles'
import { SxProps } from '@mui/material/styles'
import { ReactNode } from 'react'
import GroupTitle from '../../../_clientComponents/group-title'
import { useTheme } from '@mui/material'

type TTypeFactor = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat'
type TFactorBoxProps = {
  titleOne: string
  subTitleOne: TTypeFactor
  titleTwo: string
  subTitleTwo: TTypeFactor
  content: string
  children: ReactNode
  sx?: SxProps
}

const AIBox = ({ titleOne, subTitleOne, titleTwo, subTitleTwo, content, sx, children }: TFactorBoxProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: convertToRem(20),
        border: `1px solid ${home.gray200}`,
        height: convertToRem(500),
        ...sx
      }}
    >
      <GroupTitle titleOne={titleOne} subTitleOne={subTitleOne} titleTwo={titleTwo} subTitleTwo={subTitleTwo} />
      <Typography plainColor='home.gray50' component='span' cate='body_20' sx={{ marginTop: convertToRem(5) }}>
        {content}
      </Typography>
      {children}
    </Box>
  )
}

export default AIBox
