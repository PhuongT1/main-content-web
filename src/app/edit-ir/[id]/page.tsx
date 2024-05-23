'use client'
import { useEffect } from 'react'
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { IDetailProject } from '@/app/(main-routes)/project-home/_modules/domain'
import { getProjectDetail } from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import { useIREditContext } from '../utils/provider'
import MainContent from '../_component/mainContent'
import EditToolbar from '../_component/editToolbar'

type SearchParams = {
  page: number
  searchKeyword: string
}

const MyProjectPage = ({ params, searchParams }: { params: { id: string }; searchParams: SearchParams }) => {
  const queryClient = new QueryClient()

  const {
    palette: { home }
  } = useTheme()

  const { setProjectDetail, setDeckSelected } = useIREditContext()

  const { data: dataProject, refetch: fetchProjectDetail } = useQuery({
    queryKey: ['get-project-detail', params.id],
    queryFn: () => {
      return getProjectDetail(params.id || '', false)
    },
    enabled: !!params.id,
    staleTime: 0
  })

  useEffect(() => {
    setProjectDetail((dataProject || {}) as IDetailProject)
    // setDeckSelected(dataProject?.decks[)
  }, [dataProject])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          marginLeft: remConvert('350px'),
          backgroundColor: home.gray400
        }}
      >
        <MainContent projectID={Number(params.id)} />
        <EditToolbar projectID={Number(params.id)} />
      </Box>
    </HydrationBoundary>
  )
}

export default MyProjectPage
