'use client'
import { PageTitle } from '@/components'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import { Stack, useMediaQuery } from '@mui/material'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

enum CATEGORY_TYPE {
  HISTORY = 'history',
  CONTACTS = 'contacts'
}

const CategoryData = [
  {
    label: '내 이력',
    value: CATEGORY_TYPE.HISTORY
  },
  {
    label: 'Contacts',
    value: CATEGORY_TYPE.CONTACTS
  }
]

type TalentLayoutProps = {
  history: ReactNode
  contacts: ReactNode
  children: ReactNode
}

const TalentLayout = ({ history, contacts, children }: TalentLayoutProps) => {
  const path = usePathname()
  const [categoryValue, setCategory] = useState<CATEGORY_TYPE>(CATEGORY_TYPE.HISTORY)
  const mdDown = useMediaQuery('(max-width: 768px)')

  const handleCategoryChange = (_: any, newValue: CATEGORY_TYPE) => {
    setCategory(newValue)
  }

  return path === '/talent-pool' ? (
    <Stack direction={'column'} justifyContent={'flex-start'}>
      <PageTitle>인재풀 관리</PageTitle>
      <Tabs value={categoryValue} onChange={handleCategoryChange} variant='standard'>
        {CategoryData.map((item, index) => (
          <Tab key={index} value={item.value} label={item.label} />
        ))}
      </Tabs>
      {categoryValue === CATEGORY_TYPE.HISTORY ? history : contacts}
    </Stack>
  ) : (
    <>{children}</>
  )
}

export default TalentLayout
