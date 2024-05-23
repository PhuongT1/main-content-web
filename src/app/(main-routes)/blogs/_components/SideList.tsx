import { getBlogList } from '@/actions/apis/blogs.action'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { getCategories } from '@/actions/apis/category.action'
import { ObserverBox } from '@/components'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { SUB_CATEGORY } from '@/constants/common.constant'
import SearchInput from '@/elements/search-input'
import Typography from '@/elements/typography'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { IBlog } from '@/types/blog.type'
import { Category } from '@/types/types.type'
import { BLOG_LIST_TYPE, BLOG_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useState } from 'react'
import SideCardNews from './SideCardNews'
import SideListTabItem from './SideListTabItem'
import SideListTabs from './SideListTabs'
import SideVideoItem from './SideVideoItem'

const SideList = ({
  blogType,
  id,
  spaceOfCategory
}: {
  blogType: string
  id: string | number
  spaceOfCategory: number
}) => {
  const [categoryValue, setCategoryValue] = useState(0)
  const mdUp = useMediaQuery('(min-width: 768px)')
  const theme = useTheme()
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCategoryValue(newValue)
  }
  const [keyword, setKeyword] = useState<string>('')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  // const [categories, setCategories] = useState<ICategory[]>([])
  const [blogsData, setBlogsData] = useState<IBlog[]>([])
  // const fetchingRef = useRef<boolean>(false)

  const handleSelectChange = (event: any) => {
    setCategoryValue(event.target?.value)
  }

  const searchBlogs = () => {
    setSearchKeyword(keyword.trim())
    setKeyword(keyword.trim())
  }

  const { data: blogCategories, status: blogCategoriesStatus } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.CONTENT }),
    select(data) {
      return [{ id: 0, name: '전체' } as Category, ...data.data]
    },
    meta: {
      offLoading: true
    }
  })

  const { refetch, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } = useInfiniteScroll({
    key: 'blog-list-in-detail',
    depend: [searchKeyword, categoryValue, blogType],
    initialPageParam: {
      page: 1,
      categoryId: categoryValue !== 0 ? categoryValue : undefined,
      listType: BLOG_LIST_TYPE[1].value,
      keyword: !!searchKeyword ? searchKeyword : undefined,
      type: blogType,
      currentId: id
    },
    meta: {
      offLoading: true
    },
    fn: (pageParam: any) =>
      getBlogList({
        page: pageParam.page,
        limit: 16,
        categoryId: pageParam.categoryId,
        listType: pageParam.listType,
        keyword: pageParam.keyword,
        type: pageParam.type,
        currentId: pageParam.currentId
      }),
    onSuccess: (data) => {
      const page = data.pages as any[]
      let blogsDataRes: IBlog[] = []

      page.forEach((page: any) =>
        page?.data?.result?.forEach((x: IBlog) => {
          blogsDataRes.push(x)
        })
      )

      setBlogsData(blogsDataRes as IBlog[])
    }
  })

  // const handleScroll = async (e: any) => {
  //   if (!fetchingRef.current && e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight * 1.5) {
  //     fetchingRef.current = true
  //     if (hasNextPage) await fetchNextPage()
  //     fetchingRef.current = false
  //   }
  // }

  // const { mutate: updateBookmarkMutate } = useMutation({
  // 	mutationKey: ['update-bookmark'],
  // 	mutationFn: (id: number) => updateBookmark({ id, type: 'CONTENT' }),
  // 	onSuccess: () => {
  // 		queryClient.invalidateQueries({ queryKey: ['blog-list-in-detail', 'blogs-list'] })
  // 	}
  // })

  const { mutate: updateBookmarkSideList } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetch()
    }
  })

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box>
        <SearchInput
          fullWidth
          placeholder='Search'
          sx={{ marginBottom: '1.5rem' }}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          value={keyword}
          onRemove={() => {
            setKeyword('')
            setSearchKeyword('')
          }}
          onSearch={searchBlogs}
        />
      </Box>
      {mdUp ? (
        <SideListTabs
          value={categoryValue}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          aria-label='scrollable force tabs example'
        >
          {blogCategories?.map((i: Category) => (
            <SideListTabItem value={i.id} label={i.name} key={i.id} />
          ))}
        </SideListTabs>
      ) : (
        <SideListTabs
          sx={{
            top: spaceOfCategory,
            position: 'sticky',
            zIndex: 5,
            bgcolor: 'main_grey.gray800',
            px: 2,
            py: '13px'
          }}
          value={categoryValue}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={false}
        >
          {blogCategories?.map((i: Category) => (
            <SideListTabItem type='secondary' sx={{ height: 34 }} value={i.id} label={i.name} key={i.id} />
          ))}
        </SideListTabs>
      )}
      {blogsData.length === 0 && !isLoading && !isFetchingNextPage ? (
        <Box width={'100%'}>
          <Typography cate='body_3' textAlign={'center'} color={theme.palette.main_grey.gray300} mt={15}>
            {searchKeyword === '' && categoryValue !== 0
              ? '등록된 콘텐츠가 없습니다.'
              : '검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.'}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            marginX: { xs: convertToRem(20), md: 0 }
          }}
        >
          <Grid container mt={2} columnSpacing={2} rowSpacing={blogType === BLOG_TYPE.VIDEO ? 2 : 4}>
            {blogType === BLOG_TYPE.VIDEO
              ? blogsData.map((i: IBlog) => {
                  return (
                    <Grid item xs={12} key={i.id}>
                      <SideVideoItem
                        item={i}
                        onBookmark={() => {
                          updateBookmarkSideList({
                            id: i.id || 0,
                            type: BOOKMARK_TYPE.CONTENT_BLOG
                          })
                        }}
                      />
                    </Grid>
                  )
                })
              : blogsData.map((i: IBlog) => {
                  return (
                    <Grid item xs={6} key={i.id}>
                      <SideCardNews
                        item={i}
                        onBookmark={() => {
                          updateBookmarkSideList({
                            id: i.id || 0,
                            type: BOOKMARK_TYPE.CONTENT_BLOG
                          })
                        }}
                      />
                    </Grid>
                  )
                })}
          </Grid>
          {hasNextPage && (
            <ObserverBox
              haveNextPage={hasNextPage}
              fetchNext={() => fetchNextPage()}
              showLoading={isFetchingNextPage}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default SideList
