import { convertToRem } from '@/utils/convert-to-rem'
import { Box, LinearProgress, LinearProgressProps, SxProps, useTheme } from '@mui/material'
import { Typography } from '..'
import { blue_dark_home, color_blue, color_green, color_purple } from '@/themes/system-palette'
import { ReactNode } from 'react'

export type ICustomProgressBar = LinearProgressProps & {
  progressColor?: string
  label?: string | ReactNode
  width?: number
  rawValue?: number
  columnIndex?: number
  itemIndex?: number
  sxBox?: SxProps
}

const COLOR_LIST = [
  blue_dark_home.blue800,
  blue_dark_home.blue600,
  color_blue[40],
  color_blue[70],
  color_purple[10],
  color_purple[30],
  color_purple[20],
  color_green[30],
  color_green[20],
  color_green[10]
]

const CustomProgressBar = ({
  progressColor,
  label,
  width,
  rawValue,
  columnIndex,
  itemIndex,
  sxBox,
  ...rest
}: ICustomProgressBar) => {
  const theme = useTheme()
  return (
    <Box sx={{ position: 'relative', width: '100%', ...sxBox }}>
      <LinearProgress
        sx={{
          width: '100%',
          height: width || convertToRem(48),
          borderRadius: 1,
          backgroundColor: theme.palette.main_grey.gray700,
          '& .MuiLinearProgress-bar': {
            backgroundColor: progressColor
              ? progressColor
              : itemIndex !== undefined
              ? `${COLOR_LIST[itemIndex]}`
              : theme.palette.main_primary.blue500,
            borderRadius: 1
          }
        }}
        variant='determinate'
        {...rest}
      />
      {label && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: '25%',
            width: '100%',
            paddingX: '16px'
          }}
        >
          <Typography
            cate='sub_title_30'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {label}
          </Typography>
          <Typography cate='sub_title_30'>{rawValue}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default CustomProgressBar
