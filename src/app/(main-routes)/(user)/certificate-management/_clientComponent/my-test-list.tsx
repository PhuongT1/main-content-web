'use client'
import { PaginationList } from '@/components'
import { getMyTest } from '@/services/certificate.service'
import { convertToRem } from '@/utils/styles'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import CardMyTest from '../_components/card-my-test'
import { useSearch } from '../_hooks/use-search'
import { COURSE_TYPE } from '@/constants/certificate.constant'

const MyTestList = () => {
  const { searchParams, handleChange, queryData, setSearchParams } = useSearch({ page: 1 })

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['my-test-list', searchParams],
    queryFn: () => getMyTest({ page: searchParams.page }),
    staleTime: 0
  })

  const { metaData, result } = data?.data || {}

  useEffect(() => {
    setSearchParams((p: any) => ({
      ...p,
      page: parseInt(queryData.get('page') || '1')
    }))
  }, [queryData])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: convertToRem(48) }}>
      <PaginationList
        itemWidth={336}
        gap={24}
        responsiveListProps={{ minBreakpoints: { md: [304, 24] } }}
        curPage={searchParams.page}
        totalPage={metaData?.totalPages}
        onPageChange={(page) => handleChange(page, 'page')}
        emptyTxt='시험 내역이 없습니다.'
        isEmpty={result?.length === 0}
      >
        {result?.map((item: any, index: number) => {
          const { course, statusRecruitmentFormat } = item || {}
          return (
            <CardMyTest
              id={item.id}
              key={index}
              thumbnail={course?.thumbnail?.url}
              name={course?.name}
              result={statusRecruitmentFormat}
              type={course?.type === COURSE_TYPE.TEST ? '자격시험' : '교육+자격시험'}
            />
          )
        })}
      </PaginationList>
    </Box>
  )
}

export default MyTestList
