'use client'
import { useEffect } from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { useExplorerProjectContext } from './_modules/utils'
import { PROJECT_PATHS_ENUM } from './_modules/domain'

const MyProject = dynamic(() => import('./_modules/presenters/pages/my-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const MyProjectPage = ({ params, searchParams }: { params: { slug: string }; searchParams: SearchParams }) => {
  const { setPageType } = useExplorerProjectContext()
  const queryClient = new QueryClient()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.MY_PROJECT)
  }, [])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProject />
    </HydrationBoundary>
  )
}

export default MyProjectPage
