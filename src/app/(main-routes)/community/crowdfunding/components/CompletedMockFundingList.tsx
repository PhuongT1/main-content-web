'use client'

import { type JSX, useState } from 'react'
import { getCompletedMockFundingList } from '@/actions/apis/simulation-funding.action'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@/elements'
import PaginationList from '../../../../../components/pagination-list'
import { CrowdfundingCard } from '@/app/(main-routes)/community/crowdfunding/components/CrowdfundingCard'
import { Box, BoxProps } from '@mui/material'
import { CROWDFUNDING_STATUS_RECRUITMENT } from '@/types/crowdfunding.type'

interface CompletedMockFundingListProps extends BoxProps {}

export function CompletedMockFundingList(props: CompletedMockFundingListProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['crowdfunding-completed-mock-funding', currentPage],
    queryFn: () => getCompletedMockFundingList({ page: currentPage })
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Box {...props}>
      <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
        완료된 모의 편딩
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
        emptyTxt='종료된 펀딩이 없습니다.'
      >
        {data?.result.map((crowdfunding) => (
          <CrowdfundingCard
            statusRecruitment={CROWDFUNDING_STATUS_RECRUITMENT.FINISH}
            key={crowdfunding.uuid}
            crowdfunding={crowdfunding}
          />
        ))}
      </PaginationList>
    </Box>
  )
}
