'use client'
import Box from '@mui/material/Box'
import styles from '../../step_02/step_02.module.scss'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { SxProps } from '@mui/material'
import TitleFactor from '../title-factor'
import { useTheme } from '@mui/material'

type TTypeFactor = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat'
type TFactorBoxProps = {
  title: string
  subTitle: string
  data: any
  type: TTypeFactor
  direction?: 'row' | 'column'
  sx: SxProps
}
const FactorBox = ({ title, subTitle, data, type, direction = 'row', sx }: TFactorBoxProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      className={styles['factor-box']}
      sx={{ border: `1px solid ${home.gray200}`, display: 'flex', flexDirection: 'column', alignItems: 'start', ...sx }}
    >
      <TitleFactor title={title} subTitle={subTitle} type={type} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
          gap: convertToRem(10),
          marginTop: convertToRem(32),
          flexWrap: 'wrap'
        }}
      >
        {data?.map((x: any, index: any) => (
          <Box key={index} className={styles['item-factor']}>
            <Typography cate='body_3_semibold' plainColor='home.gray50'>
              {x}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default FactorBox
