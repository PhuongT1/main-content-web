import { Box, Popover, Typography, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import EditText from '../EditText'
import { editCardNews } from '@/atoms/home/card-news'
import { useRecoilState } from 'recoil'
import { ButtonBase } from '@/elements/v2/button'
import EditIcon from '@/assets/icons/edit'
import { remConvert } from '@/utils/convert-to-rem'
import { SanitizationHtml } from '@/components'

interface TextProps {
  text: string
  props: any
  onSave: (newTitle: string) => void
}

const Text: React.FC<TextProps> = ({ text, props, onSave }) => {
  const ref = useRef<HTMLElement>()
  const theme = useTheme()
  const [isEdit] = useRecoilState(editCardNews)
  const { className, ...resProps } = props

  const onBeforeSave = (newTitle: string) => {
    onSave(newTitle)
    handleClose()
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box component='div' ref={ref} className={className}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          minHeight: ref.current?.offsetHeight || 0 + 200,
          width: ref.current?.offsetWidth,
          '& .MuiPopover-paper': {
            minWidth: remConvert('648px'),
            maxWidth: '100%'
          }
        }}
        disableScrollLock={true}
      >
        <Box width={'100%'} padding={'16px'}>
          <EditText initialValue={text} onSave={onBeforeSave} onClose={handleClose} />
        </Box>
      </Popover>
      <Typography
        {...resProps}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        position={'relative'}
        component={'div'}
      >
        <SanitizationHtml sx={{ width: '100%' }}>{text.replace(/\n/g, '<br/>')}</SanitizationHtml>
        {isEdit && (
          <ButtonBase
            sx={{
              position: 'absolute',
              //   bottom: '0',
              top: 0,
              left: '100%',
              transform: 'translateX(-100%)',
              zIndex: 9,
              maxHeight: 36,
              padding: '5px',
              width: 'auto',
              minWidth: 0,
              color: (theme) => theme.palette.main.white,
              borderColor: 'main.white',
              backgroundColor: (theme) => `${theme.palette.home.alpha_darkpurple_60}`,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: (theme) => `${theme.palette.home.alpha_darkgray_80}`,
                borderColor: (theme) => `${theme.palette.home.alpha_darkgray_80}`
              }
            }}
            variant='outlined'
            size='medium'
            onClick={handleClick}
          >
            <EditIcon stroke={theme.palette.main.white} />
          </ButtonBase>
        )}
      </Typography>
    </Box>
  )
}

export default Text
