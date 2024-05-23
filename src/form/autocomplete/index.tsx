import {
  useFormContext,
  Controller,
  UseFormReturn,
  Control,
  UseFormSetValue,
  FieldValues,
  FieldPath
} from 'react-hook-form'
// @mui
import TextField from '@mui/material/TextField'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  Autocomplete as MAutocomplete,
  AutocompleteProps,
  Box,
  InputLabel,
  AutocompleteFreeSoloValueMapping
} from '@mui/material'
import { ListValue, TAutocompleteProps } from './autocomplete.type'
import React from 'react'

// ----------------------------------------------------------------------

const RADIUS_TEXTFIELD = 10

export default function Autocomplete<
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  label,
  required,
  helperText,
  menus,
  textFieldProps,
  formProps,
  autoCompleteProps,
  ...controllerProps
}: Omit<TAutocompleteProps<T, TFieldValues, TName, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { name } = controllerProps

  return (
    <Box>
      <InputLabel htmlFor={name} sx={{ mb: '10px' }}>
        {required && <span style={{ color: '#44BDBD' }}>* </span>}
        {label}
      </InputLabel>
      <Controller
        {...controllerProps}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <MAutocomplete
            {...field}
            fullWidth
            options={menus?.options.map((option: T) => option?.[menus.label] as TFieldValues)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error ? error?.message : helperText}
                sx={{
                  '& .MuiInputBase-root': {
                    color: '#fff',
                    backgroundColor: 'main.gray70',
                    borderRadius: `${RADIUS_TEXTFIELD}px`,
                    '& > fieldset': {
                      borderRadius: `${RADIUS_TEXTFIELD}px`
                    }
                  },
                  '& .MuiAutocomplete-root': {
                    padding: '8px'
                  }
                }}
                inputProps={{
                  ...params.inputProps,
                  style: { color: '#fff', fontSize: convertToRem(16), fontWeight: 'normal', lineHeight: 'normal' }
                }}
                {...textFieldProps}
              />
            )}
            {...autoCompleteProps}
          />
        )}
      />
    </Box>
  )
}
