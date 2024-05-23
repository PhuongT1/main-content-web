'use client'
import { loadingAtom } from '@/atoms/loading'
import { Banner } from '@/components'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import CardCommunityEvent from '@/elements/card-community-event'
import Checkbox from '@/elements/checkbox'
import SearchInput from '@/elements/search-input'
import Typography from '@/elements/typography'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Button as MButton, Divider, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

interface NotificationType {
  email: boolean
  sms: boolean
}

const CommunityEvents = () => {
  const theme = useTheme()
  const breadcrumbData = [{ name: '커뮤니티' }, { name: '교육행사&지원사업' }]
  const categories = [
    { value: '전체', label: '전체' },
    { value: '스타트업 캠프', label: '스타트업 캠프' },
    { value: '강연/특강', label: '강연/특강' },
    { value: '데모데이/경진대회', label: '데모데이/경진대회' },
    { value: '전시/박람회', label: '전시/박람회' },
    { value: '컨퍼런스/세미나', label: '컨퍼런스/세미나' },
    { value: '네트워킹', label: '네트워킹' },
    { value: '네트워킹', label: '네트워킹' },
    { value: '네트워킹', label: '네트워킹' }
  ]
  const setLoading = useSetRecoilState(loadingAtom)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)

  const mdUp = useMediaQuery('(min-width: 768px)')

  const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')

  return (
    <>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={4.5} mb={5}>
        교육행사&지원사업
      </Typography>
      <Banner type={BANNER_TYPE.EVENT} subType={BANNER_SUBTYPE.EVENT_TOP} />
      <Box
        component='div'
        display={'flex'}
        justifyContent='space-between'
        alignItems={mdUp ? 'center' : 'flex-start'}
        flexDirection={mdUp ? 'row' : 'column'}
        mb={4}
      >
        <Box display={'flex'} gap={1} alignItems={'center'} mb={mdUp ? 0 : 2} width={mdUp ? 'auto' : '100%'}>
          <Button cate={'outlined'} customType={'active'} title='교육행사' sx={{ width: mdUp ? '10rem' : '100%' }} />
          <Button cate={'outlined'} customType={undefined} title='지원사업' sx={{ width: mdUp ? '10rem' : '100%' }} />
        </Box>
        <SearchInput placeholder='팀원을 검색해보세요' fullWidth={mdUp ? false : true} />
      </Box>
      <Box
        component='div'
        width={'100%'}
        borderRadius={convertToRem(8)}
        sx={{
          padding: '1rem 1.5rem 1rem 1rem',
          backgroundColor: theme.palette.main.gray80,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3} lg={2} xl={1.5} mb={!mdUp ? 2 : 0}>
            <Typography cate='body_2' color={theme.palette.main.white} px={mdUp ? 2 : 0}>
              분야선택
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={7.5}
            xl={8.5}
            sx={{
              borderRight: `${mdUp ? 1 : 0}px solid ` + theme.palette.main.gray50
            }}
          >
            <Box display='flex' gap={4} flexWrap={'wrap'}>
              {categories.map((i, index) => {
                return <Checkbox key={index} label={i.label} />
              })}
            </Box>
          </Grid>
          {!mdUp && (
            <Divider
              sx={{
                border: '1px solid ' + theme.palette.main.gray50,
                width: '100%',
                marginY: '1rem'
              }}
            />
          )}
          <Grid item xs={12} md={3} lg={2.5} xl={2}>
            <Checkbox label={'종료 모집제외'} sx={{ marginLeft: mdUp ? '1.75rem' : 0 }} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: '3rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <MButton sx={{ paddingX: '1.5rem' }}>
          <Typography cate='body_2' color={theme.palette.main.white}>
            마감일
          </Typography>
        </MButton>
        <Divider
          orientation='vertical'
          sx={{
            height: convertToRem(14),
            borderColor: theme.palette.main.gray70
          }}
        />
        <MButton sx={{ paddingX: '1.5rem' }}>
          <Typography cate='body_2' color={theme.palette.main.point}>
            인기순
          </Typography>
        </MButton>
        <Divider
          orientation='vertical'
          sx={{
            height: convertToRem(14),
            borderColor: theme.palette.main.gray70
          }}
        />
        <MButton sx={{ paddingX: '1.5rem' }}>
          <Typography cate='body_2' color={theme.palette.main.white}>
            최신순
          </Typography>
        </MButton>
      </Box>
      <Grid container spacing={3} rowGap={6}>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
        <Grid item>
          <CardCommunityEvent />
        </Grid>
      </Grid>
      <AlertPopup
        onSubmit={async () => {
          setShowError(false)
          setErrorMessage('')
          setErrorTitle(undefined)
        }}
        submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
        cancelTitle={errorTitle ? '취소' : undefined}
        onCancel={
          errorTitle
            ? () => {
                setShowError(false)
                setErrorMessage('')
                setErrorTitle(undefined)
              }
            : undefined
        }
        title={errorTitle}
        description={errorMessage}
        open={showError}
      />
    </>
  )
}

export default CommunityEvents
