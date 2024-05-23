'use client'

import { dehydrate, HydrationBoundary, QueryClient, useMutation } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import { PageProject } from '@/types/deck.type'

import dynamic from 'next/dynamic'

const Idea = dynamic(() => import('../_clientComponents/index'), {
  loading: () => <LoadingComponent open />
})

const IdeaPage = <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Idea projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default IdeaPage
