'use client'

import { type JSX, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOngoingMockFundingList } from '@/actions/apis/simulation-funding.action'
import { Box, BoxProps } from '@mui/material'
import { Typography } from '@/elements'
import PaginationList from '../../../../../components/pagination-list'
import { useSearchParams } from 'next/navigation'
import { CrowdfundingCard } from '@/app/(main-routes)/community/crowdfunding/components/CrowdfundingCard'

interface OngoingMockFundingListProps extends BoxProps {
  page?: number
}

export function OngoingMockFundingList({ page = 1, ...props }: OngoingMockFundingListProps): JSX.Element {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(page)
  const { data } = useQuery({
    queryKey: ['crowdfunding-ongoing-mock-funding', currentPage],
    queryFn: () => getOngoingMockFundingList({ page: currentPage })
  })

  // ref: https://nextjs.org/blog/next-14-1#windowhistorypushstate-and-windowhistoryreplacestate
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)

    // update the URL with the new page
    const params = new URLSearchParams(searchParams.toString())

    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }

    window.history.pushState({}, '', `?${params.toString()}`)
  }

  return (
    <Box {...props}>
      <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
        진행 중인 모의 펀딩
      </Typography>
      <PaginationList
        containerSx={{ mt: 3 }}
        itemWidth={336}
        gap={24}
        isEmpty={!(data?.result && data.result.length > 0)}
        responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
        curPage={currentPage}
        totalPage={data?.metaData?.totalPages || 0}
        onPageChange={handlePageChange}
        emptyTxt='현재 진행중인 펀딩이 없습니다.'
      >
        {data?.result.map((crowdfunding) => (
          <CrowdfundingCard key={crowdfunding.uuid} crowdfunding={crowdfunding} />
        ))}
      </PaginationList>
    </Box>
  )
}
