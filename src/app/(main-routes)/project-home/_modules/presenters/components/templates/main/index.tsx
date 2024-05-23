import dynamic from 'next/dynamic'
import React from 'react'
import { Box, Stack } from '@mui/material'
import { RequireChildren } from '@/types/types.type'

const HeadPage = dynamic(() => import('../../organisms/head-page'), { ssr: false })

type TMainTemplate = RequireChildren & {
  showTabs?: boolean
  showActions?: boolean
  pageTitle?: string
  onKeywordChange?: (word: string) => void
  onSearchByKeyword?: (word: string) => void
}

export function MainTemplate({
  children,
  pageTitle = '프로젝트',
  showTabs,
  showActions,
  onSearchByKeyword
}: TMainTemplate) {
  return (
    <Stack flexDirection='column'>
      <HeadPage
        pageTitle={pageTitle}
        showTabs={showTabs}
        showActions={showActions}
        onSearchByKeyword={onSearchByKeyword}
      />
      <Box>{children}</Box>
    </Stack>
  )
}

export default MainTemplate
