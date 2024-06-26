'use client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { useExplorerProjectContext } from '../../_modules/utils'
import { useEffect } from 'react'
import { PROJECT_PATHS_ENUM } from '../../_modules/domain'

const EditProject = dynamic(() => import('../../_modules/presenters/pages/edit-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const EditProjectPage = ({ params, searchParams }: { params: { id: string }; searchParams: SearchParams }) => {
  const queryClient = new QueryClient()
  const { id } = params
  const { setPageType } = useExplorerProjectContext()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.EDIT_PROJECT)
  }, [])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProject projectId={id} />
    </HydrationBoundary>
  )
}

export default EditProjectPage
