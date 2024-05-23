'use client'

import { Typography } from '@/elements'
import { BorderStyles } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { getBorderStyles } from '@/utils/styles'
import { Chip as MChip, ChipProps as MChipProps, SxProps } from '@mui/material'
import { ReactNode } from 'react'

type ChipProps = {
  borderStyle?: BorderStyles
  active?: boolean
  activeStyle?: SxProps
  fullWidth?: boolean
  label?: ReactNode
} & Omit<MChipProps, 'label'>

const Chip = ({ ...rest }: ChipProps) => {
  return <MChip {...rest} />
}

const BaseChip = ({
  sx,
  label,
  borderStyle = 'pill',
  active = false,
  activeStyle,
  fullWidth = false,
  ...rest
}: ChipProps) => {
  const borderValue = getBorderStyles(borderStyle)
  const sxSyle = { ...sx, ...(active && activeStyle) }

  return (
    <Chip
      label={
        typeof label === 'string' ? (
          <Typography cate='sub_title_10' plainColor='main_grey.gray100'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 1,
        bgcolor: 'main_grey.gray800',
        borderRadius: borderValue,
        '& span': {
          p: 0,
          ...(fullWidth && {
            width: '100%'
          })
        },
        ...sxSyle
      }}
      {...rest}
    />
  )
}

const ActiveChip = ({
  sx,
  label,
  clickable,
  active = true,
  chipHeight,
  ...rest
}: ChipProps & {
  active?: boolean
  chipHeight?: number
}) => {
  return (
    <Chip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='button_20' plainColor='main_grey.gray100'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        height: chipHeight ? convertToRem(chipHeight) : convertToRem(44),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: 1,
        py: 1,
        borderRadius: 99,
        border: '1px solid',
        borderColor: active ? 'main_primary.blue500' : 'main_primary.blue300',
        bgcolor: active ? 'main_primary.blue500' : 'main_primary.colors_overlay_blue',
        '&:hover': clickable
          ? {
              bgcolor: 'main_primary.blue300'
            }
          : undefined,
        '& .MuiChip-label': {
          padding: 0 + ' !important'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const SecondaryActiveChip = ({
  sx,
  label,
  clickable,
  padding = true,
  chipHeight,
  ...rest
}: ChipProps & { padding?: boolean; chipHeight?: number }) => {
  return (
    <Chip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='caption_10' plainColor='main_grey.gray100'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        height: chipHeight ? convertToRem(chipHeight) : convertToRem(27),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: padding ? 1 : 0,
        py: padding ? 1 : 0,
        borderRadius: 99,
        border: '1px solid',
        borderColor: 'main_primary.blue300',
        bgcolor: 'main_primary.colors_overlay_blue',
        '&:hover': clickable
          ? {
              bgcolor: 'main_primary.blue500'
            }
          : undefined,
        '& .MuiChip-label': {
          padding: 0 + ' !important'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const SecondaryOutlinedChip = ({
  sx,
  label,
  clickable,
  padding = true,
  chipHeight,
  active,
  ...rest
}: ChipProps & { padding?: boolean; chipHeight?: number }) => {
  return (
    <Chip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='caption_10' plainColor='main_grey.gray100'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        height: chipHeight ? convertToRem(chipHeight) : convertToRem(27),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: padding ? 1 : 0,
        py: padding ? 1 : 0,
        borderRadius: 99,
        border: '1px solid',
        borderColor: active ? 'main_primary.blue300' : 'main_grey.gray500',
        bgcolor: active ? 'main_primary.colors_overlay_blue' : 'transparent',
        '&:hover': clickable
          ? {
              bgcolor: 'main_primary.colors_overlay_blue',
              borderColor: 'main_primary.blue300'
            }
          : undefined,
        '& .MuiChip-label': {
          padding: 0 + ' !important'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const OutlineBlue300Chip = ({
  sx,
  label,
  clickable,
  active = true,
  chipHeight,
  ...rest
}: ChipProps & {
  active?: boolean
  chipHeight?: number
}) => {
  return (
    <BaseChip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='caption_10' plainColor='main_primary.blue300'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        height: 'fit-content',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 1,
        borderRadius: 99,
        border: '1px solid',
        borderColor: 'main_primary.blue300',
        bgcolor: 'transparent',
        ...sx
      }}
      {...rest}
    />
  )
}

const Orange400Chip = ({
  sx,
  label,
  clickable,
  active = true,
  chipHeight,
  ...rest
}: ChipProps & {
  active?: boolean
  chipHeight?: number
}) => {
  return (
    <BaseChip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='caption_20' plainColor='sub.orange600'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        height: 'fit-content',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        px: '12px',
        py: '5px',
        border: '1px solid',
        width: '61px',
        bgcolor: '#241915',
        borderColor: '#EC4A0A',
        borderRadius: '1000px',
        ...sx
      }}
      {...rest}
    />
  )
}

const Gray700Chip = ({
  sx,
  label,
  chipHeight,
  padding = true,
  ...rest
}: ChipProps & { padding?: boolean; chipHeight?: number }) => {
  return (
    <Chip
      label={
        ['string', 'number'].includes(typeof label) ? (
          <Typography cate='sub_title_10' plainColor='main_grey.gray300'>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      sx={{
        py: padding ? 1 : 0,
        px: padding ? 2 : 0,
        height: chipHeight ? convertToRem(chipHeight) : convertToRem(27),
        borderRadius: '99px',
        border: '1px solid',
        borderColor: 'main_grey.gray700',
        bgcolor: 'main_grey.gray700',
        span: {
          px: 0
        },
        ...sx
      }}
      {...rest}
    />
  )
}

export {
  ActiveChip,
  BaseChip,
  Chip,
  Gray700Chip,
  Orange400Chip,
  OutlineBlue300Chip,
  SecondaryActiveChip,
  SecondaryOutlinedChip
}
