'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { ChevronLeftSmIcon } from '@/assets/icons'
import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import LinkCommunity from '@/assets/icons/link-community'
import { userAtom } from '@/atoms/user'
import { PageTitle } from '@/components'
import { IconButton, PrimaryButton, SecondaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import Typography from '@/elements/typography'
import { IEducation, IExperience, IPool, IProject, Occupation } from '@/types/pool.type'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { Avatar, Box, Chip, Divider, Grid, GridProps, styled, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CareerItem from '../components/CareerItem'
import ContactPopup from '../components/ContactPopup'
import EducationItem from '../components/EducationItem'
import FileCategory from '../components/FileCategory'
import ProjectItem from '../components/ProjectItem'
import UrlCategory from '../components/UrlCategory'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { getPoolById } from '@/actions/apis/pool.action'

const Section = styled(Grid)<GridProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray80,
  padding: '1.5rem',
  [theme.breakpoints.down('md')]: {
    padding: '1rem'
  },
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

const TalentDetail = ({ params: { id } }: { params: { id: string } }) => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const [showShare, setShowShare] = useState<boolean>(false)
  const [openContact, setOpenContact] = useState<boolean>(false)
  const router = useRouter()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const user = useRecoilValue(userAtom)
  const onBack = async () => {
    router.back()
  }
  const onToggleContact = (status: boolean) => {
    setOpenContact(status)
  }

  const xlUp = useMediaQuery('(min-width: 1200px)')
  const {
    data: responseDetail,
    isLoading,
    refetch
  } = useQuery<{ data: IPool }, Error>({
    queryKey: ['talent-detail', id as string],
    queryFn: () => getPoolById(id || '')
  })

  const { mutate: executeBookmark } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetch()
    }
  })

  const handleBookmark = (id: number | string) => {
    executeBookmark({
      id: Number(id),
      type: BOOKMARK_TYPE.PORTFOLIO
    })
  }

  useEffect(() => {
    if ((!responseDetail || !responseDetail.data) && !isLoading) {
      router.push('/community/talents')
    }
  }, [responseDetail])

  return (
    <>
      <PageTitle>인재풀</PageTitle>
      {!mdMatches && (
        <Box mt={6}>
          <SecondaryButton btnSize='sm' action={onBack} sx={{ borderRadius: '99px !important', width: 121 }}>
            <ChevronLeftSmIcon
              pathProps={{
                stroke: theme.palette.main_grey.gray200
              }}
            />
            <Typography plainColor='main_grey.gray200' cate='button_20'>
              이전으로
            </Typography>
          </SecondaryButton>
        </Box>
      )}
      {!mdMatches && <Divider sx={{ borderColor: theme.palette.main_grey.gray700, my: 6 }} />}
      <Grid
        container
        columnGap={2.5}
        my={4}
        sx={{ flexWrap: xlUp ? 'nowrap' : 'wrap' }}
        direction={xlUp ? 'row' : 'column-reverse'}
      >
        <Grid item md={12} xl={9.06} width={'100%'}>
          <Grid container rowGap={2}>
            {!!responseDetail?.data?.introduction && (
              <Section item xs={12} gap={1.25}>
                <Typography cate='title_50' mb={2}>
                  소개
                </Typography>
                <Typography cate='body_30' sx={{ whiteSpace: 'pre-line' }}>
                  {responseDetail?.data?.introduction}
                </Typography>
              </Section>
            )}
            {responseDetail?.data?.experiences && responseDetail?.data?.experiences?.length > 0 && (
              <Section item xs={12}>
                <Box display={'flex'} mb={2} alignItems={'center'}>
                  <Typography cate='title_50'>경력 </Typography>
                  <Typography cate='title_50' color={theme.palette.main.point} ml={1}>
                    {responseDetail?.data?.yearsOfExperience}년
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {responseDetail?.data?.experiences?.map((i: IExperience) => {
                    return (
                      <Grid item xs={12} xl={6} key={i.id}>
                        <CareerItem item={i} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Section>
            )}
            {responseDetail?.data?.schools && responseDetail?.data?.schools?.length > 0 && (
              <Section item xs={12} gap={2}>
                <Typography cate='title_50' mb={2}>
                  학력
                </Typography>
                <Grid container gap={2}>
                  {responseDetail?.data?.schools?.map((i: IEducation) => {
                    return (
                      <Grid item xs={12} key={i.id}>
                        <EducationItem item={i} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Section>
            )}
            {responseDetail?.data?.skills && responseDetail?.data?.skills?.length > 0 && (
              <Section item xs={12}>
                <Typography cate='title_50' mb={2}>
                  보유기술 / 자격증
                </Typography>
                <Grid container columnGap={1} rowGap={1.5}>
                  {responseDetail?.data?.skills?.map((i: string, index: number) => (
                    <Chip
                      key={index}
                      label={i}
                      sx={{
                        fontSize: '0.875rem',
                        color: theme.palette.main_primary.blue300,
                        border: '1px solid ' + theme.palette.main_primary.blue300,
                        padding: '1rem 2rem',
                        background: 'rgba(45, 104, 254, 0.1)',
                        borderRadius: '250rem',
                        height: convertToRem(24),
                        '.MuiChip-label': {
                          padding: 0
                        }
                      }}
                    />
                  ))}
                </Grid>
              </Section>
            )}
            {responseDetail?.data?.projects && responseDetail?.data?.projects?.length > 0 && (
              <Section item xs={12}>
                <Typography cate='title_50' mb={2}>
                  프로젝트
                </Typography>
                <Grid container spacing={2}>
                  {responseDetail?.data?.projects?.map((i: IProject) => {
                    return (
                      <Grid item xs={12} key={i.id}>
                        <ProjectItem item={i} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Section>
            )}
            {((responseDetail?.data?.files && responseDetail?.data?.files?.length > 0) ||
              (responseDetail?.data?.urls && responseDetail?.data?.urls?.length > 0)) && (
              <Section item xs={12}>
                <Typography cate='title_50' mb={2}>
                  포트폴리오
                </Typography>
                <Box display={'flex'} flexDirection={'column'} mb={2}>
                  <Typography cate='title_40' mb={2}>
                    파일
                  </Typography>
                  <Box display={'flex'} flexDirection={mdMatches ? 'column' : 'row'} flexWrap={'wrap'} gap={1}>
                    {responseDetail?.data?.files?.map((file: IFile) => (
                      <FileCategory key={file.id} item={file} />
                    ))}
                  </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography cate='title_40'>URL</Typography>
                  {responseDetail?.data?.urls?.map((i: any) => {
                    return <UrlCategory key={i.id} item={i} />
                  })}
                </Box>
              </Section>
            )}
          </Grid>
        </Grid>
        <Grid item md={12} xl={2.94} mb={xlUp ? 0 : 2}>
          <Section
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar
              sx={{ width: '10rem', height: '10rem' }}
              src={
                !!responseDetail?.data?.user?.avatar?.url
                  ? responseDetail?.data?.user?.avatar?.url
                  : '/images/blank-user.png'
              }
            />
            <Box display={'flex'} flexDirection={'column'} alignItems='center' gap={0.5}>
              <Typography
                cate='title_60'
                textAlign={'center'}
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {responseDetail?.data?.user?.nickname}
              </Typography>
              <Typography cate='title_40' color={theme.palette.main_grey.gray200}>
                {responseDetail?.data?.title}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection='column' alignItems='flex-start' width='100%' gap={0.5}>
              <Typography cate='sub_title_30'>{'직군'}</Typography>
              <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
                {responseDetail?.data?.occupations?.map((i: Occupation) => (
                  <Box
                    key={i.id}
                    sx={{
                      background: theme.palette.main_grey.gray700,
                      borderRadius: 250,
                      padding: '0.5rem 1rem'
                    }}
                  >
                    <Typography cate='sub_title_10' color={theme.palette.main_grey.gray300}>
                      {i.name || ''}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box display={'flex'} flexDirection='column' alignItems='flex-start' width='100%' gap={0.5}>
              <Typography cate='sub_title_30'>{'전문분야'}</Typography>
              <Typography
                cate='body_30'
                color={theme.palette.main_primary.blue300}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {responseDetail?.data?.skills?.join(', ')}
              </Typography>
            </Box>
            {user?.id !== responseDetail?.data?.user?.id ? (
              <Box display={'flex'} alignItems={'center'} width={'100%'} gap={1}>
                <PrimaryButton
                  // customType={'active'}
                  // cate={'primary'}
                  // customTitle={}
                  sx={{ height: convertToRem(56) }}
                  fullWidth
                  onClick={() => {
                    onToggleContact(true)
                  }}
                >
                  <Typography cate='button_30'>연락하기</Typography>
                </PrimaryButton>
                <Button
                  cate={'outlined'}
                  sx={{ width: convertToRem(56) + ' !important', minWidth: convertToRem(56) }}
                  onClick={() => {
                    handleBookmark(id)
                  }}
                  customTitle={
                    responseDetail?.data?.isBookmark ? (
                      <BookmarkFilled />
                    ) : (
                      <Bookmark stroke={theme.palette.main.white} />
                    )
                  }
                />
              </Box>
            ) : (
              <></>
            )}
            <Box width='100%' justifyContent={'center'} display='flex' mt={1}>
              <IconButton
                sx={{ borderRadius: 1 }}
                onClick={() => {
                  setShowShare(true)
                }}
              >
                <LinkCommunity />
                <Typography color={theme.palette.main_grey.gray300}>공유하기</Typography>
              </IconButton>
            </Box>
          </Section>
        </Grid>
      </Grid>
      <ContactPopup
        open={openContact}
        poolData={responseDetail?.data as IPool}
        onCancel={() => {
          onToggleContact(false)
        }}
        id={id as string}
      />
      <SharePopup open={showShare} onCancel={() => setShowShare(false)} url={getCurrentUrl()} />
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

export default TalentDetail
