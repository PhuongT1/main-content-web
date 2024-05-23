'use client'
import { RequireChildren } from '@/types/types.type'
import { CircularProgress, IconButton as MIconButton, IconButtonProps as MIconButtonProps } from '@mui/material'
import { MouseEvent } from 'react'

const sizes = new Map([
  ['default', {}],
  ['fit', { height: 'fit-content', width: 'fit-content', borderRadius: 99999 }],
  ['full', { height: '100%', width: '100%', borderRadius: 0 }],
  ['md', { height: 48, width: 48, justifyContent: 'center', alignItems: 'center', gap: 0.5 }],
  ['p8', { p: 1 }],
  ['p4', { p: 0.5 }]
])

type ButtonSize = 'fit' | 'full' | 'md' | 'default' | 'p8' | 'p4'

type IconButtonProps = {
  active?: boolean
  action?: (e?: MouseEvent<HTMLButtonElement>) => void
  btnSize?: ButtonSize
  isLoading?: boolean
} & RequireChildren &
  MIconButtonProps
const IconButton = ({ sx, active, children, action, onClick, isLoading = false, ...rest }: IconButtonProps) => {
  const activeSx = active ? { borderColor: 'main_primary.blue300', bgcolor: 'main_primary.colors_overlay_blue' } : {}

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    } else if (action) {
      action?.()
    }
  }

  return (
    <MIconButton
      sx={{
        p: 0,
        ...sx,
        ...activeSx
      }}
      onClick={handleOnClick}
      {...rest}
    >
      {isLoading ? <CircularProgress color='primary' /> : children}
    </MIconButton>
  )
}

const IconButtonSizes = ({ sx, btnSize = 'default', ...rest }: IconButtonProps) => {
  const sizeSx = sizes.get(btnSize)
  return <IconButton sx={{ ...sizeSx, ...sx }} {...rest} />
}

const SecondaryIconButton = ({ sx, active, ...rest }: IconButtonProps) => {
  return (
    <IconButtonSizes
      sx={{
        borderRadius: 2,
        border: '1px solid',
        bgcolor: active ? 'rgba(45, 104, 254, 0.10)' : 'inherit',
        borderColor: active ? 'main_primary.blue500' : 'main_grey.gray500',
        ...sx
      }}
      {...rest}
    />
  )
}

const GraySolidIconButton = ({ sx, ...rest }: IconButtonProps) => {
  return (
    <IconButtonSizes
      sx={{
        bgcolor: 'main_grey.gray700',
        ...sx
      }}
      {...rest}
    />
  )
}

const RoundedSolidIconButton = ({ sx, ...rest }: IconButtonProps) => {
  return (
    <IconButtonSizes
      sx={{
        color: 'main_grey.gray700',
        backgroundColor: 'main_grey.gray700',
        borderRadius: '1000px',
        ...sx
      }}
      {...rest}
    />
  )
}

const WhiteRoundIconButton = ({ sx, ...rest }: IconButtonProps) => {
  return (
    <IconButtonSizes
      sx={{
        color: 'main.white',
        backgroundColor: 'main.white',
        borderRadius: '1000px',
        display: 'flex',
        ...sx
      }}
      {...rest}
    />
  )
}

const OutlinedIconButton = ({ sx, ...rest }: IconButtonProps) => {
  return (
    <IconButtonSizes
      sx={{
        color: 'transparent',
        backgroundColor: 'transparent',
        borderRadius: '1000px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'main.white',
        ...sx
      }}
      {...rest}
    />
  )
}

export {
  GraySolidIconButton,
  IconButton,
  IconButtonSizes,
  OutlinedIconButton,
  RoundedSolidIconButton,
  SecondaryIconButton,
  WhiteRoundIconButton
}
