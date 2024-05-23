'use client'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material'
import { PROJECT_PATHS_ENUM } from '../../../domain'
import { useEffect } from 'react'
import { useExplorerProjectContext } from '../../../utils'
import LoadingComponent from '@/components/loading'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })
const ExplorersProject = dynamic(() => import('../../components/organisms/explorers-project'), {
  loading: () => <LoadingComponent open />
})

export const ParticipatingProject = () => {
  const {
    palette: { home }
  } = useTheme()
  const { setPageType } = useExplorerProjectContext()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT)
  }, [])

  return (
    <MainTemplate>
      <ExplorersProject />
    </MainTemplate>
  )
}
export default ParticipatingProject
