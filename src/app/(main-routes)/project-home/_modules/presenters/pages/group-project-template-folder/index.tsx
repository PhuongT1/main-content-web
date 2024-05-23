'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IFolderDetail, PROJECT_PATHS_ENUM } from '../../../domain'
import { getFolderDetail } from '../../../use-cases'
import LoadingComponent from '@/components/loading'
import { useExplorerProjectContext } from '../../../utils'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })
const ExplorersProject = dynamic(() => import('../../components/organisms/explorers-project'), {
  loading: () => <LoadingComponent open />
})

interface IGroupTemplateFolder {
  parentExplorerId: string
  folderId: string
}

export const GroupTemplateFolder = ({ parentExplorerId, folderId }: IGroupTemplateFolder) => {
  const { setPageType } = useExplorerProjectContext()
  const [folderDetail, setFolderDetail] = useState<IFolderDetail>({} as IFolderDetail)

  const { data: dataFolder } = useQuery({
    queryKey: ['queryFolderDetail', folderId],
    queryFn: () => {
      return getFolderDetail({
        folderId: Number(folderId)
      })
    }
  })

  useEffect(() => {
    const folder = (dataFolder?.data || {}) as IFolderDetail
    setFolderDetail(folder)
  }, [dataFolder])

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER)
  }, [])

  return (
    <MainTemplate showTabs={false}>
      <ExplorersProject folderDetail={folderDetail} />
    </MainTemplate>
  )
}

export default GroupTemplateFolder
