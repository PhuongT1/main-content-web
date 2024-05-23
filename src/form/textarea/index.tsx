import { Controller, FieldValues, FieldPath } from 'react-hook-form'
import { Box, InputLabel, TextField as MTextField, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { InputItemProps, RADIUS_TEXTFIELD } from './textarea.type'

function TextareaItem<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  label,
  subLabel,
  showErrorMessage,
  textFieldProps,
  sxBox,
  maxLength,
  sxInput,
  sxLabel,
  sxSubLabel,
  multiLine,
  ...controllerProp
}: InputItemProps<TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()
  const inputMaxLength = textFieldProps?.inputProps?.maxLength ?? maxLength

  return (
    <Box sx={{ ...sxBox }}>
      {label && (
        <InputLabel htmlFor={name} sx={{ mb: '10px', fontWeight: 600, ...sxLabel }}>
          {textFieldProps?.required && <span style={{ color: home.mint500 }}>* </span>}
          {label}
        </InputLabel>
      )}
      {subLabel && <InputLabel sx={{ mb: '8px', fontWeight: 400, ...sxSubLabel }}>{subLabel}</InputLabel>}
      <Controller
        {...controllerProp}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <MTextField
            {...field}
            multiline
            spellCheck={false}
            {...textFieldProps}
            value={field.value ?? ''}
            required={false}
            autoComplete='off'
            fullWidth
            inputProps={{
              style: {
                color: home.gray50,
                fontSize: convertToRem(16),
                fontWeight: 'normal',
                lineHeight: '150%'
              },
              ...textFieldProps?.inputProps
            }}
            sx={{
              '& .MuiInputBase-root': {
                padding: convertToRem(6),
                backgroundColor: home.gray300,
                borderRadius: `${RADIUS_TEXTFIELD}px`,
                '& > fieldset': {
                  borderRadius: `${RADIUS_TEXTFIELD}px`,
                  borderColor: home.gray200
                },
                '&.Mui-focused': {
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: `${home.blue500}`,
                    borderWidth: convertToRem(1)
                  }
                }
              },
              ...sxInput
            }}
            error={!!error}
            helperText={error?.message?.trim() && showErrorMessage ? error?.message : textFieldProps?.helperText}
            onChange={(e) => {
              if (inputMaxLength && e.target.value.length > inputMaxLength) {
                return
              }

              // Apply multi line max to 'number' line
              if (multiLine && multiLine > 0 && e.target.value.split(/\r\n|\r|\n/).length > multiLine) {
                return
              }
              field.onChange(e)
            }}
          />
        )}
      />
    </Box>
  )
}

export default TextareaItem
