'use client'
import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BtnDeleteProject from '../../components/project-detail/project-infor/delete-project'
import InfoForCreater from '../../components/project-detail/project-infor/infor-for-creater'
import { IS_MYPROJECT, PROJECT_PATHS_ENUM, PROJECT_TYPE_ENUM } from '../../../domain'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import dynamic from 'next/dynamic'
import { useExplorerProjectContext } from '../../../utils'

const LayoutProjectDetail = dynamic(() => import('../../components/project-detail/layout-project-detail'), {
  ssr: false
})

interface Props {
  id: number | string
}

const MyProjectDetail: FC<Props> = ({ id }) => {
  const { setPageType } = useExplorerProjectContext()
  const router = useRouter()
  const user = useRecoilValue(userAtom)
  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.MY_PROJECT_DETAIL)
  }, [])

  return (
    <LayoutProjectDetail
      id={id}
      showEditIR
      showChatting={() => true}
      showEditDeck={(dataProject) => Boolean(dataProject.type !== PROJECT_TYPE_ENUM.GROUP)}
      showEditProject={(dataProject) => Boolean(dataProject && user && user?.id === dataProject?.userId)}
      deleteProject={(dataProject) =>
        IS_MYPROJECT.includes(dataProject.type) && (
          <BtnDeleteProject
            dataProject={dataProject}
            onDeleteSusses={() => router.replace(PROJECT_PATHS_ENUM.MY_PROJECT)}
          />
        )
      }
      inforArea={(dataProject) =>
        IS_MYPROJECT.includes(dataProject.type) && <InfoForCreater dataProject={dataProject} />
      }
    />
  )
}
export default MyProjectDetail
