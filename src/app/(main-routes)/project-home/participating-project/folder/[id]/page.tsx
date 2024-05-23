'use client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { useEffect } from 'react'
import { PROJECT_PATHS_ENUM } from '../../../_modules/domain'
import { useExplorerProjectContext } from '../../../_modules/utils'

const FolderDetailLevel = dynamic(() => import('../../../_modules/presenters/pages/folder-detail-level'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const FolderDetailLevelPage = ({ params, searchParams }: { params: { id: string }; searchParams: SearchParams }) => {
  const queryClient = new QueryClient()
  const { id } = params
  const { setPageType } = useExplorerProjectContext()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_FOLDER)
  }, [])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderDetailLevel id={id} />
    </HydrationBoundary>
  )
}

export default FolderDetailLevelPage
