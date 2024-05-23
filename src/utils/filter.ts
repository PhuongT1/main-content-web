
export const getActive = (value: string[] | any) => {
  if (value?.every((x: any) => x.isActive === false)) {
    return null
  } else if (value?.some((x: any) => x.isActive && x.value === '')) {
    return []
  } else {
    const newValue = value?.filter((x: any) => x.isActive)?.map((x: any) => x.value)
    return newValue
  }
}

export const checkIsFilter = (value: any) => {
  if (Object.values(value)?.every((x: any) => x?.some((y: any) => y.isActive && y.value === ''))) {
    return false
  }
  return Object.values(value)?.some((x: any) => x?.some((y: any) => y.isActive && y.value !== ''))
}

export const resetFilter = (value: Array<any>) => {
  return value?.map((x: any) => ({ ...x, isActive: x.value === '' ? true : false }))
}
