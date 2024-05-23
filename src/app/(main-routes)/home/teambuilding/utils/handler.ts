import {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
  useFieldArray,
  useFormContext
} from 'react-hook-form'

function handleFieldArray<
  T extends { id: number | string },
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(form: UseFormReturn<TFieldValues>, name: TName, callback?: VoidFunction) {
  const { setValue, watch } = form

  const list = watch(name)

  const onRemoveItem = (item: T) => {
    if (typeof item === 'string') {
      const environmentFiltered: PathValue<TFieldValues, TName> = list.filter((o: T) => o !== item)
      setValue(name, environmentFiltered)
    } else {
      const environmentFiltered: PathValue<TFieldValues, TName> = list.filter((o: T) => o.id !== item.id)
      setValue(name, environmentFiltered)
    }
    callback?.()
  }

  const onInsertItem = (item: T) => {
    setValue(name, [...list, item] as PathValue<TFieldValues, TName>)
  }
  return { onRemoveItem, list, onInsertItem }
}

export { handleFieldArray }

export function useHandleFieldArray<TFieldValues extends FieldValues, TName extends FieldArrayPath<TFieldValues>>(
  name: TName
) {
  const { control } = useFormContext<TFieldValues>()
  const fieldForm = useFieldArray<TFieldValues, FieldArrayPath<TFieldValues>, '_id'>({
    control,
    keyName: '_id',
    name
  })

  const onRemoveItem = (item: any) => {
    if (!item) return
    const currentIindex = fieldForm.fields.findIndex((field: any) => field.id === item.id)
    if (currentIindex !== -1) {
      fieldForm.remove(currentIindex)
    }
  }
  return { ...fieldForm, onRemoveItem }
}
