'use client'
import dynamic from 'next/dynamic'
import React, { FC, useEffect } from 'react'
import { useExplorerProjectContext } from '../../../utils'
import { PROJECT_PATHS_ENUM } from '../../../domain'

const LayoutProjectDetail = dynamic(() => import('../../components/project-detail/layout-project-detail'), {
  ssr: false
})
const CloneProject = dynamic(() => import('../../components/project-detail/project-infor/clone-project'), {
  ssr: false
})

interface Props {
  id: number | string
}

const ShareProjectDetail: FC<Props> = ({ id }) => {
  const { setPageType } = useExplorerProjectContext()
  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_DETAIL)
  }, [])

  return (
    <LayoutProjectDetail
      id={id}
      premiumOnly
      isShare
      showCreaer
      showChatting={() => true}
      inforArea={(dataProject) => <CloneProject dataProject={dataProject} />}
    />
  )
}
export default ShareProjectDetail
