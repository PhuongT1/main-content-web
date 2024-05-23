import { Box, SxProps, Theme, Tooltip, TooltipProps, Zoom, useTheme } from '@mui/material'
import React, { CSSProperties } from 'react'
import { remConvert } from '@/utils/convert-to-rem'

export type TooltipItemProps = TooltipProps & {
  sxTooltip?: CSSProperties
}

export type TooltipTitleProps = Partial<TooltipItemProps> & { sxBox?: SxProps<Theme>; sxBoxWrapper?: SxProps<Theme> }

const TooltipItem = ({ followCursor = true, children, PopperProps, sxTooltip, ...rest }: TooltipItemProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Tooltip
      TransitionComponent={Zoom}
      PopperProps={{
        ...PopperProps,
        sx: {
          '.MuiTooltip-tooltip': {
            backgroundColor: home.gray100,
            color: home.gray600,
            fontSize: remConvert('14px'),
            padding: remConvert('10px 16px'),
            border: `1px solid ${home.gray200}`,
            boxShadow: `${remConvert('0px 4px 10px 0px')} ${home.alpha_gray_50}`,
            lineHeight: '150%',
            ...sxTooltip
          },
          ...PopperProps?.sx
        }
      }}
      followCursor={followCursor}
      {...rest}
    >
      {children}
    </Tooltip>
  )
}

const TooltipTitle = ({ title, children, sxBox, sxBoxWrapper, ...rest }: TooltipTitleProps) => {
  return (
    <Box component={'div'} flex={'1 0 0'} sx={{ ...sxBoxWrapper }}>
      <TooltipItem title={title} {...rest}>
        <Box
          component={'div'}
          sx={{
            display: '-webkit-inline-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 1,
            ...sxBox
          }}
        >
          {children ?? title}
        </Box>
      </TooltipItem>
    </Box>
  )
}

export { TooltipItem, TooltipTitle }
