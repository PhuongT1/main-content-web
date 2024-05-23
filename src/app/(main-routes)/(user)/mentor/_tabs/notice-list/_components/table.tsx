import FileIcon from '@/assets/icons/mentor/file'
import PinIcon from '@/assets/icons/mentor/pin'
import { Pagination } from '@/components'
import { EmptyText, Typography } from '@/elements'
import SearchInput from '@/elements/search-input'
import { getMentoringNoticeList } from '@/services/mentoring.service'
import { color_gray, color_orange } from '@/themes/system-palette'
import { IMentoringNotice } from '@/types/mentoring.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
type MentoringTableProps = {
  onDetailClick: Function
}
const NoticeListTable = ({ onDetailClick }: MentoringTableProps) => {
  const theme = useTheme()
  const lgUp = useMediaQuery('(min-width: 992px)')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const [keyword, setKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [searchKeyword, setSearchKeyword] = useState<string>((queryData.get('searchKeyword') as string) || '')
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
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

  useEffect(() => {
    const searchKeyword = queryData.get('searchKeyword')
    const page = queryData.get('page')

    setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setKeyword(!!searchKeyword ? (searchKeyword as string) : '')
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  const {
    data: mentoringNoticeList,
    refetch: refetchNotice,
    isFetching,
    isLoading: isLoadingNotices
  } = useQuery({
    queryKey: ['mentoring-notice-list', page, searchKeyword],
    queryFn: () =>
      getMentoringNoticeList({
        page: page,
        limit: 16,
        keyword: !!searchKeyword ? searchKeyword : undefined
      })
  })
  const resData = mentoringNoticeList?.data || null

  const searchNotice = () => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (!!keyword) {
      newQuery.set('searchKeyword', keyword.trim())
      setKeyword(keyword.trim())
    } else {
      if (!!newQuery.get('searchKeyword')) {
        newQuery.delete('searchKeyword')
      }
      setKeyword(keyword.trim())
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathName}${query}`)
  }
  return (
    <>
      <Box width={'100%'} display='flex' justifyContent='flex-end' sx={{ mb: 3 }}>
        <SearchInput
          placeholder='Search'
          value={keyword}
          onRemove={() => {
            let newQuery = new URLSearchParams(Array.from(queryData.entries()))
            newQuery.delete('searchKeyword')
            const search = newQuery.toString()
            const query = search ? `?${search}` : ''
            router.push(`${pathName}${query}`)
          }}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          fullWidth={lgUp ? false : true}
          onSearch={searchNotice}
        />
      </Box>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={lgUp ? 3 : 2}>
        {false ? (
          <Typography
            cate={lgUp ? 'body_40' : 'body_20'}
            sx={{ width: '100%' }}
            my={lgUp ? 20 : 17.5}
            textAlign={'center'}
          >
            등록된 리뷰가 없습니다.
          </Typography>
        ) : (
          <>
            <Box display='flex' flexDirection={'column'}>
              {lgUp && (
                <Grid
                  container
                  bgcolor={theme.palette.main_grey.gray700}
                  sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                >
                  <Grid item xs={7.5} p={2}>
                    <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                      제목
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5} p={2}>
                    <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                      첨부파일
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5} p={2}>
                    <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                      조회수
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5} p={2}>
                    <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                      일시
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {resData?.result.length === 0 && !isLoadingNotices && !isFetching ? (
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} my={14}>
                  <EmptyText>
                    {!!searchKeyword
                      ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.'
                      : `등록된 외주기업이 없습니다.`}
                  </EmptyText>
                </Box>
              ) : (
                resData?.result?.map((x: IMentoringNotice, index: number) => {
                  return (
                    <Grid
                      key={x.id}
                      container
                      gap={lgUp ? 0 : 1}
                      display={'flex'}
                      flexDirection={lgUp ? 'row' : 'column'}
                      sx={{
                        borderBottom: '1px solid ' + theme.palette.main_grey.gray600
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        lg={7.5}
                        display='flex'
                        gap={lgUp ? 2 : 1}
                        pt={lgUp ? 2 : 3}
                        pb={lgUp ? 2 : 0}
                        px={lgUp ? 3 : 0}
                        alignItems={'center'}
                        flexDirection={'row'}
                      >
                        <Box width={convertToRem(lgUp ? 88 : 30)} display={'flex'} alignItems={'center'}>
                          {x.hasPinned && <PinIcon />}
                        </Box>
                        <Typography
                          cate={lgUp ? 'body_20' : 'body_30'}
                          width={'100%'}
                          textAlign={'left'}
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                            cursor: 'pointer'
                          }}
                          color={x.hasPinned ? color_orange[500] : color_gray[100]}
                          onClick={() => {
                            onDetailClick(x.id)
                          }}
                        >
                          {x.title}
                        </Typography>
                      </Grid>
                      {lgUp && (
                        <>
                          <Grid
                            item
                            xs={1.5}
                            py={lgUp ? 2 : 3}
                            px={lgUp ? 3 : 0}
                            display='flex'
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            {x.attachments && x.attachments.length > 0 && <FileIcon />}
                          </Grid>
                          <Grid
                            item
                            xs={1.5}
                            py={lgUp ? 2 : 3}
                            px={lgUp ? 3 : 0}
                            display='flex'
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Typography cate='body_20' width={'100%'} textAlign={lgUp ? 'center' : 'right'}>
                              {x.totalView || 0}회
                            </Typography>
                          </Grid>
                        </>
                      )}
                      <Grid
                        item
                        xs={12}
                        pt={lgUp ? 2 : 0}
                        pb={lgUp ? 2 : 3}
                        lg={1.5}
                        display='flex'
                        alignItems={'center'}
                      >
                        {!lgUp && <Box width={convertToRem(40)}></Box>}
                        <Typography
                          cate={lgUp ? 'body_20' : 'caption_10'}
                          width={'100%'}
                          color={lgUp ? undefined : color_gray[200]}
                          textAlign={lgUp ? 'center' : 'left'}
                        >
                          {moment(x.createdAt).format('YYYY.MM.DD - HH:mm')}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })
              )}
            </Box>
            <Pagination action={handlePageChange} page={page} count={resData?.metaData?.totalPages || 0} />
          </>
        )}
      </Box>
    </>
  )
}

export default NoticeListTable
