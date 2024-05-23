'use client'
import { convertToRem } from '@/utils/convert-to-rem'
import { CircularProgress, Button as MButton, useTheme } from '@mui/material'
import styles from './button-custom.module.scss'
import { ButtonProps } from './button.type'

const ButtonCustom = ({
  onClick,
  title,
  customTitle,
  cate,
  sx: customSx = {},
  customType: customType = 'default',
  customSize: customSize = 'md',
  disabled,
  isLoading,
  rounded = false,
  isNonSubmit,
  isOnFormPopup,
  ...rest
}: ButtonProps) => {
  const theme = useTheme()
  let style = ''
  if (cate === 'outlined') {
    style = styles.button_outline
  }
  if (cate === 'primary') {
    style = styles.button_standard
  }

  if (cate === 'contained') {
    style = styles.button_contained
  }

  const getButtonVariant = (variant: any) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.palette.main.primary,
          border: '1px solid ' + theme.palette.main.primary,
          color: theme.palette.main.gray10,
          ':hover': {
            backgroundColor: theme.palette.main.primary
          }
        }
      case 'outlined':
        return {
          color: customType === 'default' ? theme.palette.main.gray40 : theme.palette.main.primary_light,
          backgroundColor: customType === 'default' ? 'transparent' : theme.palette.main.button_secondary_active,
          border:
            '1px solid' + (customType === 'default' ? theme.palette.main.gray50 : theme.palette.main.primary_light)
        }
      case 'contained':
        return {
          color: customType === 'default' ? theme.palette.main.white : theme.palette.main.primary_light,
          backgroundColor:
            customType === 'default' ? theme.palette.main.gray70 : theme.palette.main.button_secondary_active,
          border:
            '1px solid' + (customType === 'default' ? theme.palette.main.gray50 : theme.palette.main.primary_light)
        }
    }
  }

  const getButtonSize = (size: any) => {
    switch (size) {
      case 'lg':
        return {
          padding: '1.31 rem 1rem',
          fontSize: '1.125rem',
          height: convertToRem(64)
        }
      case 'md':
        return {
          padding: '1.12rem 1rem',
          fontSize: '1rem',
          height: convertToRem(56)
        }

      case 'sm':
        return {
          padding: '0.81rem 0.75rem',
          fontSize: ' 0.875rem',
          height: convertToRem(44)
        }
    }
  }

  return (
    <>
      <MButton
        type={isNonSubmit ? undefined : 'submit'}
        onClick={onClick}
        sx={{
          ...getButtonVariant(cate),
          ...getButtonSize(customSize),
          borderRadius: rounded ? '250rem' : '0.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          lineHeight: '120%',
          fontFamily: 'var(--font-pretendard)',
          opacity: disabled && isOnFormPopup ? 0.4 : 1,
          '&.Mui-disabled':
            disabled && !isOnFormPopup
              ? {
                  background: theme.palette.main.gray50 + ' !important',
                  color: theme.palette.main.gray30 + ' !important',
                  border: '1px solid ' + theme.palette.main.gray50 + ' !important'
                }
              : {},
          ...customSx
        }}
        disabled={disabled || false}
        {...rest}
      >
        {isLoading ? <CircularProgress color='inherit' /> : customTitle ? customTitle : title}
      </MButton>
    </>
  )
}

export default ButtonCustom
