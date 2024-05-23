'use client'
import LoadingComponent from '@/components/loading'
import { PageParams } from '@/types/types.type'
import { isNumber } from '@/utils/types'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const BusinessModel = dynamic(() => import('.'), {
  loading: () => <LoadingComponent open />,
  ssr: false
})

const BusinessModelPage = ({ params: { projectId } }: PageParams<{ projectId: string }>) => {
  const queryClient = new QueryClient()
  const router = useRouter()

  useEffect(() => {
    if (!isNumber(projectId)) {
      router.back()
    }
  }, [projectId])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BusinessModel projectId={+projectId} />
    </HydrationBoundary>
  )
}

export default BusinessModelPage
