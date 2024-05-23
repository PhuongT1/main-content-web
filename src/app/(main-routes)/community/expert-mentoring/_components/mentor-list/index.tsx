'use client'
import { getCategories } from '@/actions/apis/category.action'
import MentorOfTheMonthCard from '@/components/cards/mentor-of-the-month.card'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { CATEGORY } from '@/constants/common.constant'
import { MENTORING_STATUS } from '@/constants/community/mentoring.constant'
import SearchInput from '@/elements/v2/input/search-input'
import { getMentors } from '@/services/mentoring.service'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const MentorList = () => {
  const [page, setPage] = useState(1)
  const [searchKey, setSearchKey] = useState('')
  const [tab, setTab] = useState<number>(0)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('lg'))

  const { data: mentorCategories } = useQuery({
    queryKey: ['mentor-categories'],
    queryFn: () => getCategories({ type: CATEGORY.MENTORING })
  })

  const { data: mentorsData, refetch } = useQuery({
    queryKey: [`mentor-best-of-the-month`, page, tab],
    queryFn: getMentors.bind(null, {
      status: [MENTORING_STATUS.APPROVAL],
      page,
      limit: 16,
      ...(tab && {
        category: [tab]
      }),
      ...(searchKey && {
        keyword: searchKey,
        keySearch: 'username' //Search keyword by keySearch: username
      })
    })
  })

  const { data: { result: mentors = [] } = {} } = (mentorsData || {}) as any
  const { data = [] } = mentorCategories || {}

  const onChangeTab = (value: number) => {
    setTab(value)
  }

  // useEffect(() => {
  //   if ((mentorCategories?.data.length || 0) > 0) {
  //     setTab(mentorCategories?.data[0].id)
  //   }
  // }, [mentorCategories])

  return (
    <Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <SearchInput
          onChange={(e) => setSearchKey(e.target.value)}
          onClear={() => setSearchKey('')}
          onSearch={() => refetch()}
          fullWidth={mdMatches}
          placeholder='검색어를 입력하세요.'
        />
      </Box>
      <FilledTabStack
        sx={{ my: 3 }}
        keepBg
        value={tab}
        onChange={(_, e) => onChangeTab(e)}
        variant='scrollable'
        aria-label='scrollable force tabs example'
      >
        <FillTabItem isSelected={!tab} key={-1} value={0} label={'All'} />
        {data.map((i) => (
          <FillTabItem isSelected={i.id === tab} key={i.id} value={i.id} label={i.name} />
        ))}
      </FilledTabStack>
      <Grid container spacing={3}>
        {mentors.map((i) => (
          <Grid item xs={12} lg={6} key={i.id}>
            <MentorOfTheMonthCard refetch={refetch} mentor={i} key={i.id} />
          </Grid>
        ))}
      </Grid>
      {/* <PaginationList
        containerSx={{ mt: 3 }}
        itemWidth={366}
        gap={24}
        isEmpty={mentors.length === 0}
        responsiveListProps={{ minBreakpoints: { md: [320, 10] } }}
        curPage={1}
        scrollTop={false}
        totalPage={1}
        onPageChange={(page: number) => setPage(page)}
        emptyTxt='멘토 없음'
      >
        {mentors.map((i) => (
          <MentorOfTheMonthCard refetch={refetch} mentor={i} key={i.id} />
        ))}
      </PaginationList> */}
    </Box>
  )
}

export default MentorList
