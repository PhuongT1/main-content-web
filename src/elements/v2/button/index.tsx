'use client'
import { Typography } from '@/elements'
import { TypographyProps } from '@/elements/typography/typography.type'
import { TypoCategoriesType } from '@/themes/get-design-tokens'
import { BorderStyles } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { getBorderStyles } from '@/utils/styles'
import { CircularProgress, Button as MButton, ButtonProps as MButtonProps, SxProps } from '@mui/material'
import Link from 'next/link'
import { MouseEvent } from 'react'

const sizes = new Map([
  ['default', {}],
  ['sm', { height: 48, py: 2.25, px: 2 }],
  ['xs', { height: 44, py: '13px', px: 2.25 }],
  ['md', { height: 56, py: 1.5, px: 3 }],
  ['md-np', { width: 'fit-content', height: 56, px: 0.25, py: 0 }],
  ['xs-np', { width: 'fit-content', height: 44, px: 0.25, py: 0 }],
  ['xxs-np', { width: 'fit-content', height: 36, px: 0.25, py: 0 }],
  ['sm-np', { width: 'fit-content', height: 48, px: convertToRem(24), py: 0 }],
  ['full', { height: '100%', py: 1.5, px: 3 }],
  ['full-full', { height: '100%', width: '100%', py: 1.5, px: 3 }],
  ['fit-no-padding', { height: 'fit-content', width: 'fit-content', py: 0, px: 0, borderRadius: 99 }],
  //Design Foundation
  ['designed-xs', { py: '9px', px: 2, width: 'fit-content', height: 'fit-content' }],
  ['designed-sm', { py: '13px', px: 3, width: 'fit-content', height: 'fit-content' }],
  ['designed-md', { py: 2.25, px: 3, width: 'fit-content', height: 'fit-content' }],
  ['designed-lg', { py: '21px', px: 3, width: 'fit-content', height: 'fit-content' }]
])

type DesignedButtonSize = 'designed-xs' | 'designed-sm' | 'designed-md' | 'designed-lg'

type ButtonBorder = 'rounded-6' | 'rounded-8' | 'pill'

type ButtonSize =
  | 'sm'
  | 'xs'
  | 'md'
  | 'md-np'
  | 'sm-np'
  | 'xs-np'
  | 'xxs-np'
  | 'full'
  | 'fit-no-padding'
  | 'full-full'
  | ('default' | DesignedButtonSize)

export type ButtonProps = {
  action?: (e?: MouseEvent<HTMLButtonElement>) => void
  fullWidth?: boolean
  fullHeight?: boolean
  fitContent?: boolean
  btnSize?: ButtonSize
  isLoading?: boolean
  typographyProps?: TypographyProps
  btnBorder?: BorderStyles
  link?: string
} & MButtonProps

const Button = ({
  children,
  action,
  sx,
  fullWidth,
  disabled,
  fitContent,
  onClick,
  fullHeight,
  isLoading = false,
  btnBorder = 'rounded-6',
  ...rest
}: ButtonProps) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    } else if (action) {
      action?.()
    }
  }

  const borderValue = getBorderStyles(btnBorder)

  return (
    <MButton
      disableRipple
      disabled={disabled}
      sx={{
        display: 'flex',
        width: 238,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5,
        borderRadius: borderValue,
        '&:hover': {
          bgcolor: 'none'
        },
        ...sx,
        ...(fullWidth && {
          width: '100%'
        }),
        ...(fitContent && {
          width: 'fit-content'
        }),
        ...(fullHeight && {
          height: '100%'
        })
      }}
      onClick={handleOnClick}
      {...rest}
    >
      {isLoading ? <CircularProgress color='primary' /> : children}
    </MButton>
  )
}

const ButtonSizes = ({ sx, btnSize = 'default', children, typographyProps, link, ...rest }: ButtonProps) => {
  const sizeSx = sizes.get(btnSize)

  const getTxtStyles = (size: DesignedButtonSize): TypoCategoriesType => {
    switch (size) {
      case 'designed-xs':
        return 'button_10'
      case 'designed-sm':
        return 'button_20'
      case 'designed-md':
        return 'button_30'
      case 'designed-lg':
        return 'button_40'
      default:
        return 'button_10'
    }
  }

  return (
    <Button sx={{ ...sizeSx, ...sx }} {...rest}>
      {typeof children === 'string' ? (
        link ? (
          <Link prefetch href={link}>
            <Typography cate={getTxtStyles(btnSize as DesignedButtonSize)} {...typographyProps}>
              {children}
            </Typography>
          </Link>
        ) : (
          <Typography cate={getTxtStyles(btnSize as DesignedButtonSize)} {...typographyProps}>
            {children}
          </Typography>
        )
      ) : (
        children
      )}
    </Button>
  )
}

const PrimaryButton = ({ sx, disabled, outlined = false, ...rest }: ButtonProps & { outlined?: boolean }) => {
  const disabledSx = disabled
    ? {
        bgcolor: 'main_grey.gray200',
        color: 'main_grey.gray50',
        borderColor: 'main_grey.gray200'
      }
    : {}
  return (
    <ButtonSizes
      sx={{
        bgcolor: outlined ? 'main_primary.blue900' : 'main_primary.blue500',
        border: '1px solid',
        borderColor: outlined ? 'main_primary.blue300' : 'main_primary.blue500',
        '&:hover': {
          bgcolor: outlined ? 'main_primary.blue900' : 'main_primary.blue500'
        },
        '&.Mui-disabled': {
          bgcolor: 'main_primary.colors_overlay_blue',
          ...disabledSx
        },
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const SecondaryButton = ({ sx, active, disabled, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      typographyProps={{ plainColor: disabled ? 'button.secondary.disabled.label' : 'button.secondary.label' }}
      sx={{
        border: '1px solid',
        borderColor: active ? 'main_primary.blue500' : 'main_grey.gray500',
        bgcolor: disabled ? 'inherit' : active ? 'rgba(45, 104, 254, 0.10)' : 'inherit',
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const OutlineBlue300Button = ({ sx, active, disabled, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      sx={{
        border: '1px solid',
        borderColor: 'main_primary.blue300',
        bgcolor: disabled ? 'inherit' : 'rgba(45, 104, 254, 0.10)',
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const GrayButton = ({ sx, active, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      btnSize={'md'}
      sx={{
        bgcolor: active ? 'main_primary.blue500' : 'main_grey.gray500',
        '&:hover': {
          bgcolor: active ? 'main_primary.blue300' : 'main_grey.gray400'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const SecondaryGrayButton = ({ sx, active, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      sx={{
        bgcolor: active ? 'main_primary.blue500' : 'main.gray_light',
        '&:hover': {
          bgcolor: 'main_grey.gray100'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const GhostButton = ({ sx, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      btnSize={'xs'}
      sx={{
        bgcolor: 'transparent',
        ...sx
      }}
      {...rest}
    />
  )
}

const GhostBorderButton = ({ sx, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      btnSize={'xs'}
      sx={{
        bgcolor: 'transparent',
        border: '1px solid',
        borderColor: 'main_grey.gray500',
        ...sx
      }}
      {...rest}
    />
  )
}

const RoundedButton = ({ sx, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      btnSize={'xs'}
      sx={{
        bgcolor: 'main_grey.gray700',
        color: 'main_grey.gray700',
        '&:hover': {
          bgcolor: 'main_grey.gray700'
        },
        borderRadius: convertToRem(1000) + ' !important',
        ...sx
      }}
      {...rest}
    />
  )
}

const TextButton = ({ sx, ...rest }: ButtonProps & { active?: boolean }) => {
  return (
    <ButtonSizes
      variant='text'
      sx={{
        bgcolor: 'transparent',
        '&:hover': {
          bgcolor: 'transparent',
          boxShadow: 'none'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

//Design Foundation
const DesignedPrimaryButton = ({ sx, disabled, ...rest }: ButtonProps) => {
  return (
    <ButtonSizes
      typographyProps={{
        plainColor: disabled ? 'button.primary.disabled.label' : 'button.primary.label'
      }}
      sx={{
        border: 1,
        borderStyle: 'none',
        borderColor: 'button.primary.bg',
        bgcolor: 'button.primary.bg',
        '&:hover': {
          bgcolor: 'button.primary.bg'
        },
        '&.Mui-disabled': {
          borderStyle: 'none',
          borderColor: 'button.primary.disabled.bg',
          bgcolor: 'button.primary.disabled.bg'
        },
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const DesignedSecondaryButton = ({ sx, disabled, ...rest }: ButtonProps) => {
  return (
    <ButtonSizes
      typographyProps={{ plainColor: disabled ? 'button.secondary.disabled.label' : 'button.secondary.label' }}
      sx={{
        border: '1px solid',
        borderColor: 'button.secondary.border',
        bgcolor: 'button.secondary.bg',
        '&.Mui-disabled': {
          borderColor: 'button.secondary.disabled.border',
          bgcolor: 'transparent'
        },
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const DesignedTransparentButton = ({ sx, disabled, ...rest }: ButtonProps) => {
  return (
    <ButtonSizes
      typographyProps={{ plainColor: disabled ? 'button.transparent.disabled.label' : 'button.transparent.label' }}
      sx={{
        bgcolor: 'transparent',
        '&.Mui-disabled': {
          bgcolor: 'transparent'
        },
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

const DesignedLinkButton = ({ sx, disabled, ...rest }: ButtonProps) => {
  return (
    <ButtonSizes
      typographyProps={{ plainColor: disabled ? 'button.link.disabled.label' : 'button.link.label' }}
      sx={{
        bgcolor: 'transparent',
        '&.Mui-disabled': {
          bgcolor: 'transparent'
        },
        ...sx
      }}
      disabled={disabled}
      {...rest}
    />
  )
}

type TSizeButton = 'small' | 'medium' | 'large'

type TButtonBaseProp = Omit<MButtonProps, 'size' | 'hidden'> & { size: TSizeButton; hidden?: boolean }

const ButtonBase = ({ size, hidden, ...rest }: TButtonBaseProp) => {
  const { sx, ...props } = rest
  const commonCss: SxProps = {
    display: !hidden ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    maxHeight: 56,
    fontSize: convertToRem(16),
    fontStyle: 'normal',
    fontWeight: 'semi-bold',
    lineHeight: 'normal',
    borderRadius: '8px'
  }
  switch (size) {
    case 'small':
      return (
        <MButton
          {...props}
          sx={{
            ...commonCss,
            width: '80px',
            padding: '10px',

            ...sx
          }}
        />
      )
    case 'medium':
      return (
        <MButton
          {...props}
          sx={{
            ...commonCss,

            width: '120px',
            padding: '18px 16px',
            ...sx
          }}
        />
      )
    case 'large':
      return (
        <MButton
          {...props}
          sx={{
            ...commonCss,

            width: '160px',
            padding: '18px 16px',
            ...sx
          }}
        />
      )
    default:
      return <MButton sx={{ commonCss, ...sx }} {...props} />
  }
}

export {
  Button,
  ButtonBase,
  DesignedLinkButton,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  DesignedTransparentButton,
  GhostBorderButton,
  GhostButton,
  GrayButton,
  OutlineBlue300Button,
  PrimaryButton,
  RoundedButton,
  SecondaryButton,
  SecondaryGrayButton,
  TextButton
}
