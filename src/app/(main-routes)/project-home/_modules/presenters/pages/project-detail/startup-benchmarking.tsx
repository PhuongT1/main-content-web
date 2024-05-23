'use client'
import React, { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CloneProject from '../../components/project-detail/project-infor/clone-project'
import InfoFeedBack from '../../components/project-detail/project-infor/infor-feedback'
import AdminSettingProject from '../../components/project-detail/project-infor/admin-setting-project'
import { useExplorerProjectContext } from '../../../utils'
import { PROJECT_PATHS_ENUM } from '../../../domain'
import BtnDeleteProject from '../../components/project-detail/project-infor/delete-project'
import { useRouter } from 'next/navigation'

const LayoutProjectDetail = dynamic(() => import('../../components/project-detail/layout-project-detail'), {
  ssr: false
})

interface Props {
  id: number | string
}

const StartupBenchmarkingProjectDetail: FC<Props> = ({ id }) => {
  const router = useRouter()
  const { isAdmin, setPageType } = useExplorerProjectContext()
  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING_DETAIL)
  }, [])

  return (
    <LayoutProjectDetail
      id={id}
      premiumOnly
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
              onDeleteSusses={() => router.replace(PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING)}
            />
          )
        }
      }}
    />
  )
}
export default StartupBenchmarkingProjectDetail
