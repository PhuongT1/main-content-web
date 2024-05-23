'use client'
import { CheckRoundIcon } from '@/assets/icons'
import ExplanationMarkFilled from '@/assets/icons/explanation-mark-filled'
import Visibility from '@/assets/icons/visibility'
import VisibilityOff from '@/assets/icons/visibilityOff'
import CustomFormControlLabel, {
  CustomFormControlLabelProps,
  getFormControlLabelProps
} from '@/elements/custom-form-control-label'
import Typography from '@/elements/typography'
import { ContainerController } from '@/types/types.type'
import { formatPhoneNumber } from '@/utils/format-phone-number'
import { setMaxLength } from '@/utils/set-max-length'
import { phoneNumberReplaceRegex } from '@/utils/validation'
import { IconButton, InputAdornment, InputProps as MInputProps, OutlinedInput } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

export type InputSize = 'md' | 'lg'
export type InputCate = 'solid' | 'search'
export type InputStyles = {
  inputSize?: InputSize
  inputCate?: InputCate
}

export type AdditionalInputProps = Omit<MInputProps, 'error'> &
  CustomFormControlLabelProps &
  ContainerController &
  InputStyles & {
    maxLength?: number
    error?: FieldError
    isErr?: boolean
    register?: any
    helper?: string
    isDirty?: boolean
    isTouched?: boolean
    onInputChange?: Function
    isSuccess?: boolean
  }

export type InputProps = AdditionalInputProps

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = 'lg',
      inputCate = 'solid',
      sx,
      error,
      disabled,
      register,
      type,
      id,
      className,
      endAdornment,
      endAdornmentFocused,
      startAdornment,
      startAdornmentFocused,
      value,
      helper,
      isTouched,
      isDirty,
      isSuccess,
      inputProps,
      maxLength,
      onChange,
      isErr,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme()
    const { formProps, rest: restProps } = getFormControlLabelProps(rest)

    const registerObj = register
      ? register(id, {
          setValueAs: (v: any) => validate(v)
        })
      : {}

    const validate = (v: string) => {
      if (type === 'tel' || type === 'onlyNumber') {
        return formatPhoneNumber(v.replace(phoneNumberReplaceRegex, ''))
      }
      if (inputProps?.maxLength && id === 'otp') {
        return setMaxLength(v.replace(phoneNumberReplaceRegex, ''), inputProps?.maxLength)
      }
      return v
    }

    const [focused, setFocused] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
      setShowPassword((prev: boolean) => !prev)
    }

    const getType = (type: string | undefined) => {
      if (type === 'password') {
        return showPassword ? 'text' : 'password'
      }
      return type || 'text'
    }

    const dynamicClasses = `${styles.custom_input} ${styles[`size_${inputSize}`]}  ${className}`

    const getInputEffect = (appearance: InputCate) => {
      switch (appearance) {
        case 'solid':
          return {
            '&.Mui-focused': {
              borderColor: theme.palette.main.gray50 + ' !important',
              background: theme.palette.input.background.default + ' !important',
              color: theme.palette.main.gray10 + ' !important'
            },
            '&.Mui-disabled': {
              background: theme.palette.main.gray70 + ' !important',
              color: theme.palette.main.gray50 + ' !important'
            }
          }
        case 'search':
          return {
            '&.Mui-focused': {
              border: '1px solid #e61973',
              background: '#fff',
              boxShadow: '0px 0px 0px 2px rgba(230, 25, 115, 0.2)'
            },
            '&.Mui-disabled': {
              border: '1px solid #f1f2f3 !important',
              background: '#f1f2f3 !important'
            }
          }
      }
    }

    return (
      <CustomFormControlLabel name={id || ''} {...formProps}>
        <OutlinedInput
          ref={ref}
          className={dynamicClasses}
          disabled={disabled}
          onFocus={() => {
            setFocused(true)
          }}
          onBlurCapture={() => {
            setFocused(false)
          }}
          id={id}
          type={getType(type)}
          startAdornment={
            (!!startAdornment || !!startAdornmentFocused) && (
              <InputAdornment position='start'>
                {(focused || Boolean(value)) && startAdornmentFocused ? startAdornmentFocused : startAdornment}
              </InputAdornment>
            )
          }
          value={value}
          endAdornment={
            isSuccess === true ? (
              <InputAdornment className={styles.visibility} position='end'>
                <CheckRoundIcon />
              </InputAdornment>
            ) : type === 'password' ? (
              error ? (
                <InputAdornment className={styles.visibility} position='end'>
                  <ExplanationMarkFilled />
                </InputAdornment>
              ) : (
                <InputAdornment className={styles.visibility} position='end'>
                  <IconButton
                    className={styles.visibility_btn}
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <Visibility
                        stroke={focused || Boolean(value) ? theme.palette.main.gray10 : theme.palette.main.gray30}
                      />
                    ) : (
                      <VisibilityOff
                        stroke={focused || Boolean(value) ? theme.palette.main.gray10 : theme.palette.main.gray30}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            ) : (focused || Boolean(value)) && endAdornmentFocused ? (
              endAdornmentFocused
            ) : (
              endAdornment
            )
          }
          inputProps={{
            autoComplete: 'off',
            maxLength: id === 'otp' ? 6 : maxLength,
            ...inputProps
          }}
          sx={{
            ...getInputEffect(inputCate),
            borderColor: error || isErr ? theme.palette.main.danger + ' !important' : 'inherit',
            boxShadow: error || isErr ? 'none !important' : 'inherit',
            height: rest.multiline ? 'auto' : 'inherit',
            '&.MuiInputBase-root.MuiOutlinedInput-root': {
              transition: '0.3s',
              padding: '0 16px',
              background: theme.palette.input.background.default,
              color:
                focused || Boolean(value)
                  ? theme.palette.input.placeholder.icon.filled + ' !important'
                  : theme.palette.input.placeholder.icon.filled + ' !important',
              border: '1px solid ' + theme.palette.input.border.default,
              '& input::placeholder': {
                color: 'main_grey.gray300'
              }
            },
            ...sx
          }}
          onChange={(e) => {
            let val = e.target.value
            if (type === 'tel') {
              val = formatPhoneNumber(val.replace(phoneNumberReplaceRegex, '')) || ''
            }
            if (type === 'onlyNumber') {
              val = val.replace(phoneNumberReplaceRegex, '')
            }
            e.target.value = val
            onChange?.(e)
          }}
          {...restProps}
          {...registerObj}
        />

        {Boolean(error) ? (
          <Typography cate={'caption_2'} mt={1} color={theme.palette.main.danger}>
            {error?.message || ''}
          </Typography>
        ) : helper && !isTouched ? (
          <Typography cate={'caption_2'} mt={1} color={theme.palette.main.gray40}>
            {helper}
          </Typography>
        ) : null}
      </CustomFormControlLabel>
    )
  }
)

export default CustomInput
