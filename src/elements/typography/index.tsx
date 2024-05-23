'use client'
import { Typography as MTypography, SxProps, useMediaQuery, useTheme } from '@mui/material'
import { TypographyProps } from './typography.type'

const Typography = ({
  children,
  component = 'p',
  cate,
  sx = {},
  // className = '',
  color,
  plainColor = 'main_grey.gray100',
  breakpoints,
  lines,
  ...rest
}: TypographyProps) => {
  const theme = useTheme()
  const smMatches = useMediaQuery(theme.breakpoints.down('sm'))
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const lgMatches = useMediaQuery(theme.breakpoints.down('lg'))

  const commonSx: SxProps = {
    textWrap: 'pretty',
    ...(color && {
      color: color as any
    }),
    ...(lines && {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: `${lines}`,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis'
    })
  }

  const getCate = () => {
    if (breakpoints) {
      if (smMatches) {
        return breakpoints?.sm || breakpoints?.md || cate
      } else if (mdMatches) {
        return breakpoints?.md || cate
      } else if (lgMatches) {
        return breakpoints?.lg || breakpoints?.md || cate
      }
    }
    return cate
  }

  return (
    <MTypography
      sx={{ ...commonSx, ...sx }}
      color={plainColor}
      component={component}
      {...rest}
      variant={getCate() as never}
    >
      {children}
    </MTypography>
  )
}

export default Typography
