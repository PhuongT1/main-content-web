'use client'
import { useEffect, useState } from 'react'
import { useExplorerProjectContext } from '../../../utils'
import { IFolderDetail, PROJECT_PATHS_ENUM } from '../../../domain'
import { useQuery } from '@tanstack/react-query'
import { getTemplateGroupByExplorer } from '../../../use-cases'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })
const ExplorersProject = dynamic(() => import('../../components/organisms/explorers-project'), {
  loading: () => <LoadingComponent open />
})

interface IGroupProject {
  id: string
}

export const GroupProject = ({ id }: IGroupProject) => {
  const { setPageType } = useExplorerProjectContext()
  const [folderDetail, setFolderDetail] = useState<IFolderDetail>({} as IFolderDetail)

  const { data: templateGroup } = useQuery({
    queryKey: ['getTemplateGroupByExplorer', id],
    queryFn: () => {
      return getTemplateGroupByExplorer({
        explorerId: Number(id)
      })
    }
  })

  useEffect(() => {
    const data = (templateGroup?.data || {}) as IFolderDetail
    setFolderDetail(data)
  }, [templateGroup])

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL)
  }, [])

  return (
    <MainTemplate showTabs={false}>
      <ExplorersProject folderDetail={folderDetail} />
    </MainTemplate>
  )
}
export default GroupProject
