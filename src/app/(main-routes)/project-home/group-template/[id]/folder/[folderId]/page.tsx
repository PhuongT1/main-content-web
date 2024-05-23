import LoadingComponent from '@/components/loading'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const GroupProjectTemplateFolder = dynamic(
  () => import('../../../../_modules/presenters/pages/group-project-template-folder'),
  {
    ssr: false,
    loading: () => <LoadingComponent open />
  }
)

type SearchParams = {
  page: number
  searchKeyword: string
}

const GroupProjectTemplateFolderPage = async ({
  params,
  searchParams
}: {
  params: { id: string; folderId: string }
  searchParams: SearchParams
}) => {
  const queryClient = new QueryClient()
  const { id: parentExplorerId, folderId } = params

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupProjectTemplateFolder parentExplorerId={parentExplorerId} folderId={folderId} />
    </HydrationBoundary>
  )
}

export default GroupProjectTemplateFolderPage
