'use client'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { Typography } from '@/elements'
import { Box, useMediaQuery } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MyCertificateList from './_clientComponent/my-certificate-list'
import MyTestList from './_clientComponent/my-test-list'

const DATA_TAB = [
  {
    label: '나의 시험',
    value: 'my-test'
  },
  {
    label: '자격증 목록',
    value: 'my-certificate'
  }
]

const CertificateManagementPage = () => {
  const [tab, setTab] = useState('my-test')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const isMobile = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    setTab(queryData.get('type') || 'my-test')
  }, [queryData])

  return (
    <Box>
      <Typography cate={isMobile ? 'title_60' : 'title_80'} plainColor='main.grayf7'>
        자격증 관리
      </Typography>
      <Box mt={isMobile ? 2 : 6} mb={isMobile ? 3 : 6}>
        <FilledTabStack
          value={tab}
          onChange={(_e, value: string) => {
            let newQuery = new URLSearchParams(Array.from(queryData.entries()))
            newQuery.delete('listType')
            newQuery.delete('page')
            if (value) {
              newQuery.set('type', value)
            } else {
              newQuery.delete('type')
            }

            router.push(`${pathName}?${newQuery}`)
          }}
          variant='scrollable'
          aria-label='scrollable force tabs example'
        >
          {DATA_TAB?.map((item: any) => (
            <FillTabItem key={item.value} value={item.value} label={item.label} />
          ))}
        </FilledTabStack>
      </Box>
      {tab === 'my-test' ? <MyTestList /> : <MyCertificateList />}
    </Box>
  )
}

export default CertificateManagementPage
