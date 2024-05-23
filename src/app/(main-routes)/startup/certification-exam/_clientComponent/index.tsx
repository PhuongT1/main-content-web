'use client'
import { getCertificateExamList } from '@/actions/apis/certification.action'
import { PaginationList } from '@/components'
import { GhostBorderButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, useMediaQuery } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CertificateCard from '../_component/certification-card'

const CertificationList = () => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = new URLSearchParams(useSearchParams())
  const mdDown = useMediaQuery('(max-width: 768px)')
  const [page, setPage] = useState<number>(parseInt(searchParams.get('page') || '1'))

  const { data, isFetching } = useQuery({
    queryKey: ['certification-exam', { page }],
    queryFn: () => getCertificateExamList({ page, limit: 16 }),
    select: (data) => {
      return data.data
    },
    placeholderData: keepPreviousData
  })

  const redirectMyCertificate = () => {
    router.replace('/certificate-management?type=my-test')
  }

  const handlePageChange = (page: number) => {
    if (page !== 0) {
      searchParams.set('page', page.toString())
    } else {
      if (!!searchParams.get('page')) {
        searchParams.delete('page')
      }
    }
    const search = searchParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${path}${query}`)
  }

  useEffect(() => {
    setPage(parseInt(searchParams.get('page') || '1'))
  }, [searchParams])

  return (
    <Stack gap={{ md: 3, sm: 2 }}>
      <Stack
        direction={{ md: 'row', sm: 'column' }}
        justifyContent={'space-between'}
        alignItems={{ md: 'center', sm: 'flex-start' }}
        gap={3}
      >
        <Typography cate={mdDown ? 'title_50' : 'title_70'}>취득가능 자격증</Typography>
        <GhostBorderButton
          btnSize='md-np'
          fullWidth={mdDown}
          sx={{
            borderColor: 'main_grey.gray500',
            paddingX: convertToRem(24),
            borderRadius: convertToRem(8)
          }}
          onClick={redirectMyCertificate}
        >
          <Typography cate='button_30' plainColor='main_grey.gray200'>
            나의 시험
          </Typography>
        </GhostBorderButton>
      </Stack>
      <PaginationList
        itemWidth={336}
        gap={24}
        responsiveListProps={{ minBreakpoints: { md: [304, 24] } }}
        curPage={page}
        totalPage={data?.metaData.totalPages}
        onPageChange={(page) => handlePageChange(page)}
        isEmpty={data?.result.length === 0}
        emptyTxt='발급받은 자격증이 없습니다.'
        isLoading={isFetching}
      >
        {data?.result.map((item: any, index: number) => {
          return <CertificateCard key={index} certificate={item} />
        })}
      </PaginationList>
    </Stack>
  )
}

export default CertificationList
