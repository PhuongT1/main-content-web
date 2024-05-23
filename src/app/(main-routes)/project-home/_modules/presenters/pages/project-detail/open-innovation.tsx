'use client'
import dynamic from 'next/dynamic'
import React, { FC, useEffect } from 'react'
import CloneProject from '../../components/project-detail/project-infor/clone-project'
import { useRouter } from 'next/navigation'
import BtnDeleteProject from '../../components/project-detail/project-infor/delete-project'
import InfoFeedBack from '../../components/project-detail/project-infor/infor-feedback'
import AdminSettingProject from '../../components/project-detail/project-infor/admin-setting-project'
import { PROJECT_PATHS_ENUM } from '../../../domain'
import { useExplorerProjectContext } from '../../../utils'

const LayoutProjectDetail = dynamic(() => import('../../components/project-detail/layout-project-detail'), {
  ssr: false
})

interface Props {
  id: number | string
}

const OpenInnovationProjectDetail: FC<Props> = ({ id }) => {
  const { isAdmin, setPageType } = useExplorerProjectContext()
  const router = useRouter()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.OPEN_INNOVATION_DETAIL)
  }, [])

  return (
    <LayoutProjectDetail
      id={id}
      premiumOnly
      showCreaer
      showEditIR={isAdmin}
      showEditDeck={() => isAdmin}
      showEditProject={() => isAdmin}
      inforArea={(dataProject) => (
        <>
          <InfoFeedBack dataProject={dataProject} />
          <CloneProject dataProject={dataProject} />
          <AdminSettingProject dataProject={dataProject} />
        </>
      )}
      deleteProject={(dataProject) => {
        if (isAdmin) {
          return (
            <BtnDeleteProject
              dataProject={dataProject}
              onDeleteSusses={() => router.replace(PROJECT_PATHS_ENUM.OPEN_INNOVATION)}
              adminDeleteOpenInnovation
            />
          )
        }
      }}
    />
  )
}
export default OpenInnovationProjectDetail
