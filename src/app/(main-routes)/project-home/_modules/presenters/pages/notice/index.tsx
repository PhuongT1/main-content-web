'use client'
import LoadingComponent from '@/components/loading'
import { Box, Grid, useTheme } from '@mui/material'
import { EXPLORER_ITEM_TYPE_ENUM, IMyProject, IProject, PROJECT_PATHS_ENUM, columns } from '../../../domain'
import { NoticeCard } from '../../components/molecules'
import { convertToRem } from '@/utils/convert-to-rem'
import ListTable from '../../components/molecules/list-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getNoticeList } from '../../../use-cases'
import { useIsFetching, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getUrlWithParams, useExplorerProjectContext } from '../../../utils'
import dynamic from 'next/dynamic'

const MainTemplate = dynamic(() => import('../../components/templates/main'), { ssr: false })

export const Notice = () => {
  const {
    palette: { home }
  } = useTheme()
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const [projects, setProjects] = useState<IMyProject[] | null>(null)
  const { setPageType } = useExplorerProjectContext()

  const fetchNoticeList = (params: any) => {
    try {
      return getNoticeList(params)
    } catch (e) {
      console.log(e)
    }
  }

  const { data } = useQuery({
    queryKey: [`notice-list`, page],
    queryFn: () => {
      return fetchNoticeList({
        page,
        limit: 5,
        orderKey: 'isPinned'
      })
    },
    staleTime: 0
  })

  if (!projects && page === 1 && data?.data?.result?.length) {
    setProjects(
      data.data.result.slice(0, 3).map((item) => ({
        explorerId: 1,
        createdAt: '',
        updatedAt: '',
        level: 0,
        itemType: EXPLORER_ITEM_TYPE_ENUM.NOTICE,
        itemData: {
          updatedAt: item?.updatedAt,
          name: item?.title,
          description: (
            <div
              style={{
                fontWeight: 400,
                fontSize: convertToRem(14),
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden'
              }}
              dangerouslySetInnerHTML={{ __html: item?.content ?? '-' }}
            ></div>
          )
        } as IProject,
        no: 1
      }))
    )
  }

  const isFetching = useIsFetching({
    predicate: (mutation: any) => {
      return !mutation.meta?.offLoading
    }
  })

  useEffect(() => {
    const page = queryData.get('page')
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.NOTICE)
  }, [])

  const handlePageChange = (newValue: number) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== 1) {
      newQuery.set('page', newValue + '')
    } else {
      if (!!newQuery.get('page')) {
        newQuery.delete('page')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  return (
    <MainTemplate showActions={false}>
      {isFetching ? (
        <LoadingComponent open />
      ) : (
        <Grid container spacing={'50px'} sx={{ width: '100%' }}>
          <Grid item flex={1}>
            <ListTable
              columns={columns({ home })}
              rows={data?.data?.result || []}
              handleGetCurrentPage={handlePageChange}
              handleClickRow={(_, row) => {
                const url = getUrlWithParams(PROJECT_PATHS_ENUM.NOTICE, { id: `${row.id}` })
                router.push(url)
              }}
              total={data?.data?.metaData?.totalPages}
              currentPage={data?.data?.metaData?.currentPage}
            />
          </Grid>
          <Grid item sx={{ width: convertToRem(326) }}>
            {projects?.map((project, index) => (
              <Box sx={{ mb: 3, width: 'fit-content' }} key={index}>
                <NoticeCard project={project} isClose={false} onDelete={() => {}} />
              </Box>
            ))}
          </Grid>
        </Grid>
      )}
    </MainTemplate>
  )
}
export default Notice
