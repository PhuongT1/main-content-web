'use client'
import CloseGreyIcon from '@/assets/icons/close-grey'
import SearchIcon from '@/assets/icons/search'
import SearchFilledIcon from '@/assets/icons/search-filled'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, IconButton, InputAdornment, InputProps as MInputProps, OutlinedInput } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

export type InputSize = 'md' | 'lg'
export type InputCate = 'solid' | 'search'
export type InputStyles = {
  inputSize?: InputSize
  inputCate?: InputCate
}

export type AdditionalInputProps = Omit<MInputProps, 'error'> &
  InputStyles & {
    maxLength?: number
    error?: FieldError
    onSearch?: any
    onRemove?: any
  }

type InputProps = AdditionalInputProps

const SearchInput = ({
  sx,
  error,
  disabled,
  type,
  id,
  className,
  defaultValue,
  onSearch,
  value: outSideValue,
  onRemove,
  ...rest
}: InputProps) => {
  const theme = useTheme()

  const [focused, setFocused] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<any>()
  const searchHandle = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (Boolean(value || outSideValue) && onRemove && !focused) {
      onRemove?.()
    } else {
      onSearch()
    }
    inputRef.current?.blur()
  }

  const EndIcon = () => {
    return (
      <InputAdornment className={styles.visibility} position='end'>
        <IconButton
          className={styles.visibility_btn}
          aria-label='toggle password visibility'
          onMouseDown={searchHandle}
          sx={{
            padding: 0
          }}
        >
          {focused ? (
            <SearchFilledIcon />
          ) : Boolean(value || outSideValue) ? (
            <Box
              height={36}
              width={36}
              p={1}
              borderRadius={99}
              bgcolor={'main_grey.gray800'}
              display={'flex'}
              alignItems={'center'}
            >
              <CloseGreyIcon
                pathProps={[
                  { stroke: theme.palette.main_grey.gray300, strokeWidth: 2 },
                  { stroke: theme.palette.main_grey.gray300, strokeWidth: 2 }
                ]}
              />
            </Box>
          ) : (
            <SearchIcon />
          )}
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <OutlinedInput
      className={styles.custom_input}
      disabled={disabled}
      value={value || outSideValue}
      onFocus={() => {
        setFocused(true)
      }}
      onBlur={() => {
        setFocused(false)
      }}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onKeyDown={(event) => {
        if (event.keyCode === 13 || event.keyCode === 176) {
          onSearch()
          inputRef.current?.blur()
        }
      }}
      id={id}
      endAdornment={<EndIcon />}
      inputRef={inputRef}
      sx={{
        height: convertToRem(44),
        border: '1px solid',
        boxShadow: 'none !important',
        outline: 'none !important',
        borderRadius: '250rem',
        transition: '0.3s',
        borderColor: theme.palette.main.gray50 + ' !important',
        padding: '0 4px 0 16px',
        background: 'transparent',
        color: Boolean(value) ? theme.palette.main.gray10 : theme.palette.main.gray40,
        fieldset: {
          border: 0
        },
        '&.Mui-focused': {
          color: theme.palette.main.gray10 + ' !important'
        },
        ...sx
      }}
      {...rest}
    />
  )
}

export default SearchInput
