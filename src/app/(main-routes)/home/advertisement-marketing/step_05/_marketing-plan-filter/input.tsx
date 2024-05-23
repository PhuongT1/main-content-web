import { CSSProperties } from 'react'
import { useTheme } from '@mui/material'
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import InputNumberWithText from '@/components/input/input-number-with-text'

interface ICustomInputWithText<T extends FieldValues> {
  form: UseFormReturn<T>
  title: string
  name: string
  unit?: string
  sxInputBase?: CSSProperties
  sxTypography?: CSSProperties
}

function CustomInputWithText<T extends FieldValues>({
  form,
  title,
  name,
  unit,
  sxInputBase,
  sxTypography
}: ICustomInputWithText<T>) {
  const { palette } = useTheme()

  // =====
  return (
    <InputNumberWithText
      placeholder=''
      unitText=''
      form={form}
      name={name}
      sxInput={{
        '.MuiInputBase-root': { height: remConvert('44px'), pointerEvents: 'none', width: remConvert('280px') },
        '.MuiInputBase-input': {
          padding: remConvert('10px'),
          paddingRight: 0,
          textAlign: 'right',
          fontWeight: '600 !important',
          ...sxInputBase
        }
      }}
      textFieldProps={{
        InputProps: {
          startAdornment: (
            <Typography
              fontWeight={600}
              color={palette.home.gray50}
              paddingLeft={remConvert('14px')}
              sx={{ whiteSpace: 'nowrap', textWrap: 'unset' }}
            >
              {title}
            </Typography>
          ),
          endAdornment: (
            <Typography
              fontWeight={600}
              color={palette.home.gray50}
              paddingTop={remConvert('2px')}
              paddingRight={remConvert('14px')}
              sx={{ whiteSpace: 'nowrap', textWrap: 'unset', ...sxTypography }}
            >
              {unit}
            </Typography>
          )
        }
      }}
    />
  )
}

export default CustomInputWithText
