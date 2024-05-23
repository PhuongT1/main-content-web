'use client'
import { useEffect } from 'react'
import { PROJECT_PATHS_ENUM } from '../../../domain'
import dynamic from 'next/dynamic'
import { useExplorerProjectContext } from '../../../utils'
import OpenSourceProject from '../../components/organisms/open-source-project'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })

export const StartupBenchmarking = () => {
  const { isAdmin, setPageType } = useExplorerProjectContext()

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING)
  }, [])

  return (
    <MainTemplate showActions={isAdmin}>
      <OpenSourceProject />
    </MainTemplate>
  )
}
export default StartupBenchmarking
