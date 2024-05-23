'use client'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { useEffect, useState } from 'react'
import { getProjectDetail } from '../../../use-cases/project-detail.use-cases'
import { KEY_PROJECT_DETAIL } from '../../components/project-detail/layout-project-detail'
import { IDetailProject } from '../../../domain'
import { useQuery } from '@tanstack/react-query'

const CreateProject = dynamic(() => import('../create-project'), {
  loading: () => <LoadingComponent open />
})

interface IEditProject {
  projectId?: number | string
}

export const EditProject = ({ projectId }: IEditProject) => {
  const [projectDetail, setProjectDetail] = useState<IDetailProject>({} as IDetailProject)

  const { data: projectDetailRes } = useQuery({
    queryKey: [KEY_PROJECT_DETAIL, projectId],
    queryFn: () => {
      return getProjectDetail(projectId || '')
    },
    enabled: !!projectId
  })

  useEffect(() => {
    setProjectDetail((projectDetailRes || {}) as IDetailProject)
  }, [projectDetailRes])

  return <CreateProject projectDetail={projectDetail} />
}
export default EditProject
