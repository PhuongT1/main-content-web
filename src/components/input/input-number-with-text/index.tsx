import { useState, KeyboardEvent, useEffect } from 'react'
import { SxProps } from '@mui/material'
import { UseFormReturn, FieldValues, Path, PathValue } from 'react-hook-form'
import InputItem from '@/form/input'
import { formatNumberWithText } from '@/utils/string'

interface IInputNumberWithText<T extends FieldValues> {
  name: string
  label?: string
  placeholder?: string
  form: UseFormReturn<T>
  unitText?: string
  sxInput?: SxProps
  maxLength?: number
  textFieldProps?: any
  handleChangeInput?: (value: string) => void
}

function InputNumberWithText<T extends FieldValues>({
  name,
  label,
  placeholder = '내용 입력',
  unitText = ' 원',
  form,
  sxInput,
  maxLength,
  textFieldProps,
  handleChangeInput
}: IInputNumberWithText<T>) {
  const [value, setValue] = useState(form.getValues(name as Path<T>) ?? '')
  const valueWatcher = form.watch(name as Path<T>)

  // =====
  const handleChange = (value: string) => {
    if (maxLength && value.length > maxLength) return
    const onlyNumbers = value?.replace(/[^0-9]/g, '')
    setValue(onlyNumbers)
  }

  const handleFocusIn = () => {
    if (!value || !valueWatcher) return
    const numericValue = parseFloat(value.replace(/\D/g, ''))
    setValue(numericValue.toString())
  }

  const handleFocusOut = () => {
    handleChangeInput && handleChangeInput(value)

    if (!value || value?.includes(',')) return
    const formattedValue = formatNumberWithText(value, unitText)
    setValue(formattedValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleFocusOut()
    }
  }

  useEffect(() => {
    if (value === form.getValues(name as Path<T>)) return
    form?.setValue(name as Path<T>, value as PathValue<T, Path<T>>)
  }, [value])

  // =====
  return (
    <InputItem
      regex={/^\d+(?:[.,]\d+)*$/} // only numbers and . , if they're between numbers
      name={name as Path<T>}
      label={label}
      control={form?.control}
      textFieldProps={{
        placeholder,
        onFocus: handleFocusIn,
        onBlur: handleFocusOut,
        onKeyDown: handleKeyDown,
        ...textFieldProps
      }}
      onChangeInput={handleChange}
      sxInput={sxInput}
      maxLength={maxLength}
    />
  )
}

export default InputNumberWithText
