import { convertToRem } from '@/utils/convert-to-rem'
import { TextField as MTextField, TextFieldProps, useTheme } from '@mui/material'
import { RADIUS_TEXTFIELD } from './input.type'
import { FC } from 'react'

const InputElement: FC<TextFieldProps> = ({ inputProps, sx, ...restProps }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <MTextField
      fullWidth
      required={false}
      autoComplete='off'
      inputProps={{
        style: {
          color: home.gray50,
          fontSize: convertToRem(16),
          fontWeight: 'normal',
          lineHeight: 'normal'
        },
        ...inputProps
      }}
      sx={{
        '& .MuiInputBase-root': {
          padding: '6px',
          maxHeight: inputProps?.multiline && inputProps.rows ? convertToRem(56 * inputProps.rows) : convertToRem(56),
          backgroundColor: home.gray300,
          borderRadius: `${RADIUS_TEXTFIELD}px`,
          '& > fieldset': {
            borderRadius: `${RADIUS_TEXTFIELD}px`,
            borderColor: home.gray200
          },
          '&.Mui-readOnly': {
            backgroundColor: home.gray300
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${home.blue500}`,
              borderWidth: `${convertToRem(1)}`
            }
          }
        },
        ...sx
      }}
      {...restProps}
    />
  )
}

export default InputElement
