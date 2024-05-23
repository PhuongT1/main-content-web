import { getCertificateExamList } from '@/actions/apis/certification.action'
import { Banner, PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { BANNER_TYPE } from '@/types/banner.type'
import { Stack } from '@mui/material'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

type CertificationExamParams = {
  page: number
}

const CertificationList = dynamic(() => import('./_clientComponent'), { loading: () => <LoadingComponent open /> })

const CertificationPage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: CertificationExamParams
}) => {
  const queryClient = new QueryClient()

  const page = searchParams.page ? Number(searchParams.page) : 1

  await queryClient.prefetchQuery({
    queryKey: ['certification-exam', { page }],
    queryFn: () => getCertificateExamList({ page, limit: 10 })
  })

  return (
    <HydrationBoundary>
      <Stack gap={{ md: 6, sm: 3 }}>
        <PageTitle>자격시험</PageTitle>
        <Banner type={BANNER_TYPE.CERTIFICATION} />
        <CertificationList />
      </Stack>
    </HydrationBoundary>
  )
}

export default CertificationPage
