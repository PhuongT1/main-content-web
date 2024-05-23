'use client'
import { TabRounded } from '@/components/tabs'
import { Typography } from '@/elements'
import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Writing from './_clientComponent/writing'
import Answer from './_clientComponent/answer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DATA_TAB = [
  {
    label: '작성글 내역',
    value: 'writing'
  },
  {
    label: '답변 내역',
    value: 'answer'
  }
]

const StartupTalk = () => {
  const [tab, setTab] = useState('writing')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const isMobile = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    setTab(queryData.get('type') || 'writing')
  }, [queryData])

  return (
    <Box>
      <Typography mt={isMobile ? 3 : 5} cate={isMobile ? 'title_60' : 'title_80'} plainColor='main.grayf7'>
        스타트업 토크 내역
      </Typography>
      <Box mt={isMobile ? 2 : 6} mb={isMobile ? 3 : 6}>
        <TabRounded
          data={DATA_TAB}
          value={tab}
          handleChange={(_e, value: string) => {
            let newQuery = new URLSearchParams(Array.from(queryData.entries()))
            newQuery.delete('listType')
            newQuery.delete('categoryId')
            newQuery.delete('page')
            if (value) {
              newQuery.set('type', value)
            } else {
              newQuery.delete('type')
            }

            router.push(`${pathName}?${newQuery}`)
          }}
        />
      </Box>
      {tab === 'writing' ? <Writing /> : <Answer />}
    </Box>
  )
}

export default StartupTalk
