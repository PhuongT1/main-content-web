export type SelectedList<T> = {
  selectedList: T[]
  key: keyof T
  label: any
  render?: (item: T) => React.ReactNode | React.ReactElement
}

export type ListValue = number | string
