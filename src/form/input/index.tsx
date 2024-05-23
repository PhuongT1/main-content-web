import { convertToRem } from '@/utils/convert-to-rem'
import { Box, IconButton, InputLabel, TextField as MTextField, useTheme } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { InputItemProps, RADIUS_TEXTFIELD } from './input.type'
import SearchIcon from '@/assets/icons/search'
import { DeleteIcon } from '@/assets/icons'

function InputItem<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  label,
  subLabel,
  showErrorMessage,
  textFieldProps,
  sxBox,
  sxInput,
  sxLabel,
  sxSubLabel,
  maxLength,
  regex,
  onChangeInput,
  onBlur,
  error,
  renderInput,
  onClickDelete,
  onClickBtnSearch,
  ...controllerProp
}: InputItemProps<TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()
  const inputMaxLength = maxLength || textFieldProps?.inputProps?.maxLength
  const inputSearch = textFieldProps?.type === 'search'

  return (
    <Box sx={{ ...sxBox }}>
      {label && (
        <InputLabel htmlFor={name} sx={{ mb: '10px', color: home.gray50, fontWeight: 600, ...sxLabel }}>
          {textFieldProps?.required && <span style={{ color: home.mint500 }}>* </span>}
          {label}
        </InputLabel>
      )}
      {subLabel && <InputLabel sx={{ mb: '8px', fontWeight: 400, ...sxSubLabel }}>{subLabel}</InputLabel>}
      <Controller
        {...controllerProp}
        name={name}
        render={({ field, fieldState, formState }) => (
          <>
            {renderInput ? (
              renderInput({ field, fieldState, formState })
            ) : (
              <MTextField
                {...field}
                onBlur={() => {
                  field.onBlur()
                  onBlur?.()
                }}
                onChange={(e) => {
                  if (inputMaxLength && e.target.value.length > inputMaxLength) {
                    return
                  }
                  if (regex && e.target.value && !regex.test(e.target.value)) {
                    return
                  }

                  field.onChange(e)
                  onChangeInput?.(e.target.value)
                }}
                {...textFieldProps}
                type={textFieldProps?.type}
                value={field.value ?? ''}
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
                  ...textFieldProps?.inputProps
                }}
                InputProps={{
                  startAdornment: inputSearch && (
                    <IconButton
                      className='Icon-search'
                      disableRipple={!onClickBtnSearch}
                      sx={{
                        pointerEvents: onClickBtnSearch ? 'all' : 'none'
                      }}
                      onClick={() => {
                        onClickBtnSearch?.(field.value)
                      }}
                    >
                      <SearchIcon pathProps={{ stroke: home.gray100 }} />
                    </IconButton>
                  ),
                  endAdornment: inputSearch && (
                    <IconButton
                      className={[!!field.value && 'Show-icon', 'Icon-delete'].join(' ')}
                      onClick={() => {
                        if (onClickDelete) {
                          return onClickDelete(field.value)
                        }
                        field.onChange('')
                      }}
                    >
                      <DeleteIcon rectProps={{ fill: home.gray400 }} pathProps={{ stroke: home.gray50 }} />
                    </IconButton>
                  ),
                  className: `${[inputSearch && 'InputBase-search'].join(' ')}`,
                  ...textFieldProps?.InputProps
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    padding: convertToRem(6),
                    maxHeight:
                      textFieldProps?.inputProps?.multiline && textFieldProps.inputProps.rows
                        ? convertToRem(56 * textFieldProps.inputProps.rows)
                        : convertToRem(56),
                    backgroundColor: home.gray300,
                    borderRadius: convertToRem(RADIUS_TEXTFIELD),
                    '& > fieldset': {
                      borderRadius: convertToRem(RADIUS_TEXTFIELD),
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
                    },
                    '&.InputBase-search': {
                      '.MuiInputBase-input': {
                        paddingLeft: 0
                      },
                      '.Icon-search': {
                        padding: 0
                      },
                      '.Icon-delete': {
                        opacity: 0,
                        pointerEvents: 'none',
                        '&.Show-icon': {
                          opacity: 1,
                          pointerEvents: 'all'
                        }
                      }
                    }
                  },
                  ...sxInput
                }}
                error={error ? error : !!fieldState.error}
                helperText={
                  fieldState.error?.message?.trim() && showErrorMessage
                    ? fieldState.error?.message
                    : textFieldProps?.helperText
                }
              />
            )}
          </>
        )}
      />
    </Box>
  )
}

export default InputItem
