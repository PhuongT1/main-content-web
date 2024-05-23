import React, { useEffect, useRef } from 'react'
import { Box, Collapse, CollapseProps, Alert as MAlert, SxProps, useTheme } from '@mui/material'
import { TAlert } from './alert.type'
import InfoIcon from '@/assets/icons/alert/info'
import { sendEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'

function Alert({
  children,
  isOpen = true,
  timeout = 3000,
  isHide,
  collapseProps,
  setIsError,
  ...rest
}: TAlert & {
  timeout?: number
  collapseProps?: CollapseProps
  isOpen?: boolean
  isHide?: boolean
  setIsError?: (value: any) => void
}) {
  const {
    palette: { home }
  } = useTheme()
  const [open, setOpen] = React.useState(false)
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const customStyle: SxProps = {
    width: '100%',
    '&.MuiAlert-outlinedError': {
      padding: '8px 16px',
      border: 'unset',
      backgroundColor: home.alpha_red_10,
      color: home.gray50
    },
    '& .MuiAlert-message': {
      lineHeight: 'normal',
      fontWeight: 'normal'
    },
    '&.MuiAlert-root': {
      borderWidth: '1px'
    },
    borderRadius: '8px'
  }

  useEffect(() => {
    if (children) {
      setOpen(true)
      ref.current = setTimeout(() => {
        setOpen(false)
        sendEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, {})
        setIsError?.(false)
      }, timeout)
    }

    return () => {
      if (ref.current) {
        clearTimeout(ref.current)
      }
    }
  }, [children])

  const { palette } = useTheme()

  return (
    <>
      {children && (
        <Collapse
          sx={{
            width: '100%',
            display: !open && isHide ? 'none' : 'block',
            visibility: isHide ? 'visible' : undefined
          }}
          in={open && isOpen}
          {...collapseProps}
        >
          <MAlert
            icon={
              <Box sx={{ visibility: 'visible' }}>
                <InfoIcon />
              </Box>
            }
            {...rest}
            sx={{ ...customStyle, ...rest.sx, background: palette.home.alpha_red_10 }}
          >
            {children}
          </MAlert>
        </Collapse>
      )}
    </>
  )
}

export default Alert
