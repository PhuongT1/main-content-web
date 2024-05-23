import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSearch = (defaultParams: any) => {
  const [searchParams, setSearchParams] = useState<any>(defaultParams)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()

  const handleChange = (newValue: number | string, key: string) => {
    if (key !== 'page') {
      setSearchParams((p: any) => ({ ...p, [key]: newValue, page: 1 }))
    }
    setSearchParams((p: any) => ({ ...p, [key]: newValue }))
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue) {
      key !== 'page' && newQuery.set('page', '1')
      newQuery.set(key, newValue + '')
    } else {
      newQuery.delete(key)
    }

    router.push(`${pathName}?${newQuery}`)
  }

  return { queryData, searchParams, handleChange, setSearchParams }
}
