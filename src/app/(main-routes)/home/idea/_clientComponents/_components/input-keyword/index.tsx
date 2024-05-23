import DirectPlusIcon from '@/assets/icons/idea/direct-plus'
import InputItem from '@/form/input'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  disabled?: boolean
  handleAddManualIdea: VoidFunction
  name: TName
}

export default function InputKeyword<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  disabled,
  name,
  handleAddManualIdea
}: Props<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <InputItem
      sxInput={{
        '& .MuiInputBase-input': {
          padding: remConvert('16px 8px 16px 4px')
        },
        '& .MuiInputBase-root': {
          padding: remConvert('16px 8px 16px 4px'),
          height: 32,
          width: 100,
          backgroundColor: home.alpha_blue_10,
          borderRadius: remConvert('300px'),
          fontSize: remConvert('14px'),

          '& > fieldset': {
            height: remConvert('38px'),
            borderRadius: remConvert('300px'),
            borderColor: home.blue500,
            fontSize: remConvert('14px'),
            fontWeight: 'bold',
            lineHeight: '150%'
          },
          '&.Mui-readOnly': {
            backgroundColor: home.alpha_blue_10,
            opacity: 0.5,
            color: home.gray100
          }
        }
      }}
      control={control}
      maxLength={30}
      disabled={disabled}
      name={name}
      textFieldProps={{
        placeholder: dict.common_deck_direct_input,
        onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
          if (event.key === 'Enter') {
            handleAddManualIdea()
          }
        },
        InputProps: {
          startAdornment: (
            <IconButton
              disabled={disabled}
              onClick={handleAddManualIdea}
              sx={{ width: 24, height: 24, padding: 0, opacity: disabled ? 0.5 : 1 }}
            >
              <DirectPlusIcon svgProps={{ width: 24, height: 24 }} />
            </IconButton>
          )
        },
        InputLabelProps: {
          style: {
            fontSize: '14px',
            lineHeight: '150%'
          }
        }
      }}
    />
  )
}
