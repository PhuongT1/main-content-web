import { FormControlLabel, FormGroup, Checkbox, FormHelperText } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { IMultiCheckboxProps } from '@/form/checkbox/checkbox.type'
import { useEffect, useState } from 'react'

function CheckboxGroupItem<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  row,
  label,
  list,
  sxFormGroup,
  helperText,
  showMessageError,
  defaultValue,
  ...controllerProps
}: IMultiCheckboxProps<T, TFieldValues, TName>) {
  const [selected, setSelected] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (defaultValue) {
      const selectedItems: { [key: number]: string } = {}
      list.options?.forEach((option: any, index: number) => {
        if (defaultValue.includes(option.value)) {
          selectedItems[index] = option.value
        }
      })
      setSelected(selectedItems)
    }
  }, [JSON.stringify(defaultValue)])

  const createValue = (e: any, key: string, index: number) => {
    const isChecked = e.target.checked

    const cloneItems = { ...selected }
    isChecked ? (cloneItems[index] = key) : delete cloneItems[index]
    return cloneItems
  }

  return (
    <Controller
      {...controllerProps}
      render={(props) => {
        const {
          field,
          fieldState: { error }
        } = props
        return (
          <FormGroup sx={sxFormGroup}>
            {list?.options?.map((option: any, index) => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={option.label}
                  value={option.value}
                  key={option.value}
                  checked={selected[index] === option.value}
                  onChange={(newVal) => {
                    const newSelected = createValue(newVal, option.value, index)
                    field.onChange(Object.values(newSelected))
                    setSelected(newSelected)
                  }}
                />
              )
            })}
            {(!!error || helperText) && showMessageError && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </FormGroup>
        )
      }}
    />
  )
}

export default CheckboxGroupItem
