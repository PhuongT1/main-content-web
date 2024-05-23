'use client'
import dynamic from 'next/dynamic'
const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })
const ExplorersProject = dynamic(() => import('../../components/organisms/explorers-project'), {
  ssr: false
})

export const MyProject = () => {
  return (
    <MainTemplate>
      <ExplorersProject />
    </MainTemplate>
  )
}

export default MyProject
