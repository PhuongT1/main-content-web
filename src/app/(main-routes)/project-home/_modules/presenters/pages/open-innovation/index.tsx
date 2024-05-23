'use client'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { PROJECT_PATHS_ENUM } from '../../../domain'
import { useExplorerProjectContext } from '../../../utils'
import OpenSourceProject from '../../components/organisms/open-source-project'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })

export const OpenInnovation = () => {
  const { isAdmin, setPageType } = useExplorerProjectContext()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.OPEN_INNOVATION)
  }, [])

  return (
    <MainTemplate showActions={isAdmin}>
      <OpenSourceProject />
    </MainTemplate>
  )
}
export default OpenInnovation
