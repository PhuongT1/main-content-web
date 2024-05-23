import { ReactNode } from 'react'
import { RadioGroup, SxProps } from '@mui/material'
import { Controller, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form'

interface RadioGroupItemProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  children: ReactNode
  sx?: SxProps
  onChangeInput?: (value: string) => void
}

function RadioGroupItem<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  children,
  sx,
  onChangeInput,
  ...controllerProp
}: RadioGroupItemProps<TFieldValues, TName>) {
  return (
    <Controller
      {...controllerProp}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error
        return (
          <RadioGroup
            {...field}
            value={field.value ?? ''}
            sx={{ ...(sx || {}), ...(hasError && { className: 'error-class' }) }}
            onChange={onChangeInput ? (event) => onChangeInput(event.target.value) : field.onChange}
          >
            {children}
          </RadioGroup>
        )
      }}
    />
  )
}

export default RadioGroupItem
