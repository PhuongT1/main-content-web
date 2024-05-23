'use client'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import { getUrlWithParams, useExplorerProjectContext } from '../../../utils'
import { IMyProject, PROJECT_PATHS_ENUM } from '../../../domain'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { GroupProjectCard } from '../../components/molecules'
import dynamic from 'next/dynamic'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })

export const GroupProjectTemplate = () => {
  const router = useRouter()
  const { explorers, setPageType } = useExplorerProjectContext()

  const onGroupTemplateClick = (project: IMyProject) => {
    const url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL, { id: `${project.explorerId}` })
    router.push(url)
  }

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE)
  }, [])

  return (
    <MainTemplate showActions={false}>
      <Box display='flex' gap={convertToRem(20)} flexWrap='wrap'>
        {explorers.map((project: IMyProject) => {
          return <GroupProjectCard key={project.explorerId} project={project} onClick={onGroupTemplateClick} />
        })}
      </Box>
    </MainTemplate>
  )
}
export default GroupProjectTemplate
