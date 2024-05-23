'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IFolderDetail } from '../../../domain'
import { getFolderDetail } from '../../../use-cases'
import LoadingComponent from '@/components/loading'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })
const ExplorersProject = dynamic(() => import('../../components/organisms/explorers-project'), {
  loading: () => <LoadingComponent open />
})

interface IFolderDetailLevel {
  id: string
}

export const FolderDetailLevel = ({ id: folderId }: IFolderDetailLevel) => {
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

  return (
    <MainTemplate showTabs={false}>
      <ExplorersProject folderDetail={folderDetail} />
    </MainTemplate>
  )
}

export default FolderDetailLevel
