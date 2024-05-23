'use client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { useEffect } from 'react'
import { useExplorerProjectContext } from '../_modules/utils'
import { PROJECT_PATHS_ENUM } from '../_modules/domain'

const CreateProject = dynamic(() => import('../_modules/presenters/pages/create-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const CreateProjectPage = ({ params, searchParams }: { params: { slug: string }; searchParams: SearchParams }) => {
  const { setPageType } = useExplorerProjectContext()
  const queryClient = new QueryClient()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.CREATE_PROJECT)
  }, [])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateProject />
    </HydrationBoundary>
  )
}

export default CreateProjectPage
