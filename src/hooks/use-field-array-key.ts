import { FieldPath, FieldValues, useFieldArray } from 'react-hook-form'

function useFieldArrayKeys<TFieldValues>(name: string) {
  const { fields } = useFieldArray({
    name
  })

  const fieldKeys: TFieldValues[] = fields.map((field, index) => {
    const keys = Object.keys(field)
    if (keys.length <= 0 || fields.length <= 0) return []
    let list: any = {}
    keys.forEach((key) => {
      list[key] = `${name}.${index}.${key}`
    })
    return list
  })

  return fieldKeys
}
export default useFieldArrayKeys
