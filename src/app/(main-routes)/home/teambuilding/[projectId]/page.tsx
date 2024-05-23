'use client'

import { Box } from '@mui/material'
import StepList from '../step-list'
import { useResponsive } from '@/hooks/use-responsive'
import { Suspense } from 'react'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { PageProject } from '@/types/deck.type'

const TeamBuildingPage = <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  const breakpoint = useResponsive('up', 1600)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingComponent open />}>
        <Box p={breakpoint ? 5 : 1}>
          <StepList projectId={params.projectId} />
        </Box>
      </Suspense>
    </HydrationBoundary>
  )
}

export default TeamBuildingPage
