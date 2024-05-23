import ModifyIcon from '@/assets/icons/modify'
import { SanitizationHtml } from '@/components'
import { Typography } from '@/elements'
import { OutlinedIconButton } from '@/elements/v2/icon-button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Popover, SxProps, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { editPressRelease } from '../../press-release.atom'
import EditTextComponent from './edit-component'

interface EditableTextProps {
  sx?: SxProps
  onSave: (newTitle: string) => void
  textSx?: SxProps
  children: string
}

const EditableText = ({ sx, onSave, textSx, children }: EditableTextProps) => {
  const ref = useRef<HTMLElement>()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const enableEdit = useRecoilValue(editPressRelease)

  const theme = useTheme()
  // const [isEdit] = useRecoilState(editCardNews)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onBeforeSave = (newTitle: string) => {
    onSave(newTitle)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box component='div' ref={ref} sx={{ ...sx }}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        marginThreshold={20}
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
            minWidth: convertToRem('648px'),
            maxWidth: '100%'
          }
        }}
      >
        <Box width={'100%'} padding={'16px'}>
          <EditTextComponent initialValue={children} onSave={onBeforeSave} />
        </Box>
      </Popover>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        position={'relative'}
        plainColor='main.black'
        sx={{ ...textSx }}
      >
        <SanitizationHtml sx={{ width: '100%' }}>{children ? children.replace(/\n/g, '<br/>') : ''}</SanitizationHtml>
        {enableEdit && (
          <OutlinedIconButton
            sx={{
              position: 'absolute',
              top: convertToRem(-8),
              left: '102%',
              transform: 'translateX(-100%)',
              zIndex: 9,
              maxHeight: 36,
              padding: '5px',
              width: 'auto',
              minWidth: 0,
              backgroundColor: `${theme.palette.home.alpha_darkpurple_60}`,
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: `${theme.palette.home.alpha_darkgray_80}`,
                borderColor: `${theme.palette.home.alpha_darkgray_80}`
              }
            }}
            btnSize='p4'
            onClick={handleClick}
          >
            <ModifyIcon
              pathProps={{ stroke: theme.palette.main.white }}
              svgProps={{
                width: 14,
                height: 13
              }}
            />
          </OutlinedIconButton>
        )}
      </Typography>
    </Box>
  )
}

export default EditableText
