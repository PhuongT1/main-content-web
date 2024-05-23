'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { TabRounded } from '@/components/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IDataTab } from '@/types/community/educational-event.type'

const DATA_TAB: IDataTab[] = [
  {
    label: '전체',
    value: ''
  },
  {
    label: '신청',
    value: 'APPLICANT'
  },
  {
    label: '취소',
    value: 'CANCEL'
  }
]
const TabsComponents = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()
  const pathName = usePathname()

  const queryData = useSearchParams()
  const [tab, setTab] = useState<string>('')

  const handleChangeTab = (_: SyntheticEvent, value: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (value) {
      newQuery.set('type', value)
    } else {
      newQuery.delete('type')
    }
    router.push(`${pathName}?${newQuery}`)
  }

  useEffect(() => {
    setTab(queryData.get('type') || '')
  }, [queryData])

  return (
    <Box mt={isMobile ? convertToRem(24) : convertToRem(48)}>
      <TabRounded data={DATA_TAB} value={tab} handleChange={handleChangeTab} />
    </Box>
  )
}

export default TabsComponents
