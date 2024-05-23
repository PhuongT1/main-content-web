import PaperCard from '@/app/(main-routes)/(user)/talent-pool/_components/paper-card'
import ChevronDownSmIcon from '@/assets/icons/chevrons/chevron-down-sm'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import EditIcon from '@/assets/icons/edit'
import { userAtom } from '@/atoms/user'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { PrimaryButton, PrimarySwitch, Typography } from '@/elements'
import { RoundedButton } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { updateMyMentorProfile } from '@/services/mentoring.service'
import { getTextStyles } from '@/themes/get-design-tokens'
import { color_gray } from '@/themes/system-palette'
import { IMentorProfile } from '@/types/mentoring.type'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { Avatar, Box, Collapse, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import MentoringOptionCard from './mentoring-option-card'
import InfoIcon from '@/assets/icons/alert/info'
import MentorInfoIcon from '@/assets/icons/mentor/mentor-info'

type ProfileViewProps = {
  onEdit: Function
  showAlert: Function
  onRefetch: Function
  profile: IMentorProfile | null
}

const MAX_HTML_HEIGHT = 208

const ProfileView = ({ onEdit, profile, onRefetch, showAlert }: ProfileViewProps) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const userData = useRecoilValue(userAtom)
  const [key, setKey] = useState(Math.random().toString())
  const { open: mentorDialogOpen, onClose: onCloseMentorDialog, onOpen: onOpenMentorDialog } = useDialog()
  const [hydrate, setHydrate] = useState(false)
  const [show, setShow] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const pathname = getCurrentUrl()
  const renderHtmlRef = useRef<any>()
  useHydrate()
  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  const submitSaveMutate = useMutation({
    mutationFn: updateMyMentorProfile
  })
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (profile?.id === undefined) {
      showAlert()
      event.preventDefault()
      event.stopPropagation()
      return
    }
    const submitData = {
      isPublic: !profile?.isPublic
    }
    const { data, error } = await submitSaveMutate.mutateAsync(submitData)
    if (data) {
      onRefetch()
    }
  }

  useEffect(() => {
    if (renderHtmlRef.current) {
      setIsCollapsed(renderHtmlRef.current.clientHeight > MAX_HTML_HEIGHT)
    }
  }, [profile])

  return (
    <Box display='flex' flexDirection='column' key={key} gap={lgUp ? 5 : 4}>
      <Box
        display='flex'
        justifyContent={'flex-start'}
        flexDirection={'column'}
        gap={lgUp ? 6 : 3}
        pb={lgUp ? 6 : 3}
        borderBottom={'1px solid ' + theme.palette.main_grey.gray700}
      >
        <Stack
          alignItems={'center'}
          justifyContent={'space-between'}
          direction={{ md: 'row', sm: 'column' }}
          pb={2}
          gap={mdDown ? 3 : 0}
          borderBottom={'1px solid ' + theme.palette.main_grey.gray700}
        >
          <Stack
            direction={lgUp || mdDown ? 'row' : 'column'}
            justifyContent={'space-between'}
            width={'100%'}
            alignItems={lgUp || mdDown ? 'center' : 'flex-start'}
          >
            <Typography cate={mdDown ? 'title_50' : 'title_70'}>멘토 프로필</Typography>
            <Stack direction={'row'} gap={6} alignItems={'center'}>
              {!mdDown ? (
                <Stack
                  direction={'row'}
                  gap={2}
                  sx={{
                    alignSelf: 'center'
                  }}
                >
                  <Typography cate={mdDown ? 'body_40' : 'sub_title_40'}>멘토링 활성화</Typography>
                  <PrimarySwitch
                    checked={profile?.isPublic === undefined ? false : profile?.isPublic}
                    sx={{
                      alignSelf: 'center',
                      '& .MuiSwitch-track': {
                        bgcolor: theme.palette.mode === 'light' ? 'main.gray70' : 'main.gray70',
                        borderRadius: 26 / 2,
                        opacity: 1,
                        transition: theme.transitions.create(['background-color'], {
                          duration: 500
                        })
                      }
                    }}
                    onChange={handleChange}
                  />
                </Stack>
              ) : null}
              <PrimaryButton
                outlined
                btnSize={'md-np'}
                sx={{
                  width: { md: convertToRem(213), sm: 'auto' },
                  height: { md: convertToRem(56), sm: convertToRem(40) },
                  paddingX: { sm: convertToRem(12) }
                }}
                onClick={() => {
                  onEdit()
                }}
              >
                <Typography cate='button_30'>{'멘토링 프로필 작성'}</Typography>
                <EditIcon />
              </PrimaryButton>
            </Stack>
          </Stack>
          {mdDown ? (
            <Stack
              direction={'row'}
              gap={2}
              sx={{
                alignSelf: 'center'
              }}
              width={mdDown ? '100%' : undefined}
              justifyContent={{ md: 'flex-end', sm: 'space-between' }}
            >
              <Typography cate={mdDown ? 'body_2_semibold' : 'body_2_bold'}>멘토링 활성화</Typography>
              <PrimarySwitch
                sx={{
                  alignSelf: 'center'
                }}
                checked={profile?.isPublic}
                onChange={handleChange}
              />
            </Stack>
          ) : null}
        </Stack>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          flexDirection={mdDown ? 'column' : 'row'}
          alignItems={mdDown ? 'center' : 'flex-start'}
          width={'100%'}
          gap={mdDown ? 3 : 7.5}
        >
          <Box position={'relative'}>
            <Avatar
              src={userData && userData.avatar ? userData.avatar.url : '/images/blank-user.png'}
              sx={{ width: 160, height: 160 }}
            />
            {/* <IconButtonSizes onClick={() => {}} btnSize='fit' sx={{ position: 'absolute', bottom: '0', right: '0' }}>
              <CameraIcon />
            </IconButtonSizes> */}
          </Box>
          <Stack direction={'column'} width={'100%'} gap={1}>
            <Stack alignItems={'flex-start'} direction='row' gap={2.5}>
              <Typography cate='body_30' color={color_gray[300]} flexShrink={0} width={convertToRem(mdDown ? 60 : 68)}>
                멘토 이름
              </Typography>
              <Typography cate='body_30' color={color_gray[100]}>
                {profile?.username || '-'}
              </Typography>
            </Stack>
            <Stack alignItems={'flex-start'} direction='row' gap={2.5}>
              <Typography cate='body_30' color={color_gray[300]} flexShrink={0} width={convertToRem(mdDown ? 60 : 68)}>
                한줄 소개
              </Typography>
              <Typography cate='body_30' color={color_gray[100]}>
                {profile?.otherInformation || '-'}
              </Typography>
            </Stack>
            <Stack alignItems={'flex-start'} direction='row' gap={2.5}>
              <Typography cate='body_30' color={color_gray[300]} flexShrink={0} width={convertToRem(mdDown ? 60 : 68)}>
                전문 분야{' '}
              </Typography>
              <Typography cate='body_30' color={color_gray[100]}>
                {profile?.categories ? profile?.categories?.map((i) => i.name)?.join(', ') : '-'}
              </Typography>
            </Stack>
            <Stack alignItems={'flex-start'} direction='row' gap={2.5}>
              <Typography cate='body_30' color={color_gray[300]} flexShrink={0} width={convertToRem(mdDown ? 60 : 68)}>
                소속명
              </Typography>
              <Typography cate='body_30' color={color_gray[100]}>
                {profile?.nameOfAffiliation || '-'}
              </Typography>
            </Stack>
            <Stack alignItems={'flex-start'} direction='row' gap={2.5}>
              <Typography cate='body_30' color={color_gray[300]} flexShrink={0} width={convertToRem(mdDown ? 60 : 68)}>
                직책
              </Typography>
              <Typography cate='body_30' color={color_gray[100]}>
                {profile?.position || '-'}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      {!profile?.introduction &&
      (!profile?.productContents?.filter((i) => i.product.isSale) ||
        profile?.productContents?.filter((i) => i.product.isSale)?.length === 0) ? (
        <Grid
          container
          component={'div'}
          display={'flex'}
          sx={{ backgroundColor: theme.palette.home.alpha_mint_10, py: 2, px: 2.5 }}
          alignItems={'center'}
          gap={1.5}
          borderRadius={1}
        >
          <MentorInfoIcon />
          <Typography
            sx={{
              color: theme.palette.home.gray50,
              WebkitLineClamp: 'line',
              whiteSpace: 'pre-line',
              flexGrow: 1,
              minWidth: 0,
              width: 0
            }}
            cate='body_30'
          >
            멘토링 프로필이 비활성화 되어있습니다. 멘토링 프로필을 활성화하고 멘토 수익을 만들어보세요!
          </Typography>
        </Grid>
      ) : (
        <></>
      )}
      {!!profile?.introduction && (
        <Stack direction={'column'} gap={2}>
          <Typography cate='title_40'>멘토링 소개</Typography>
          <PaperCard
            sx={{
              maxWidth: '1416px',
              padding: mdDown ? 2 : 3
            }}
          >
            <Stack direction={'column'} gap={3} alignItems={'center'}>
              <Collapse
                in={true}
                sx={{
                  height: (isCollapsed ? (show ? '100%' : MAX_HTML_HEIGHT + 'px') : 'auto') + ' !important'
                }}
              >
                <Box
                  sx={{
                    // backgroundColor: theme.palette.main.gray10,
                    maxHeight: isCollapsed ? (!show ? convertToRem(MAX_HTML_HEIGHT) : 'unset') : 'unset',
                    overflow: 'hidden',
                    ...getTextStyles(14, 150, 400, 0),
                    color: theme.palette.main_grey.gray300,
                    img: {
                      maxWidth: '100%'
                    }
                  }}
                  ref={renderHtmlRef}
                  dangerouslySetInnerHTML={{ __html: profile?.introduction || '' }}
                ></Box>
              </Collapse>
              {!!isCollapsed && (
                <RoundedButton
                  btnSize='xxs-np'
                  sx={{
                    width: '104px'
                  }}
                  onClick={() => {
                    setShow((prev) => !prev)
                  }}
                >
                  {show ? (
                    <>
                      <Typography cate='button_20'>접기</Typography>
                      <ChevronUp stroke={'white'} />
                    </>
                  ) : (
                    <>
                      <Typography cate='button_20'>펼치기</Typography>
                      <ChevronDownSmIcon stroke={'white'} />
                    </>
                  )}
                </RoundedButton>
              )}
            </Stack>
          </PaperCard>
        </Stack>
      )}
      {profile?.productContents?.filter((i) => i.product.isSale) &&
        profile?.productContents?.filter((i) => i.product.isSale)?.length > 0 && (
          <Stack direction={'column'} gap={2}>
            <Typography cate='title_40'>멘토링 옵션</Typography>
            <PaperCard
              sx={{
                maxWidth: '1416px',
                padding: !lgUp ? 2 : 3,
                display: 'flex',
                gap: 2,
                flexDirection: !lgUp ? 'column' : 'row'
              }}
            >
              {profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES)?.product
                ?.isSale && (
                <MentoringOptionCard
                  sx={{
                    width:
                      profile?.productContents?.filter((item) => item.product.isSale === true).length === 1 && lgUp
                        ? '50%'
                        : '100%'
                  }}
                  product={
                    profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES)?.product
                  }
                />
              )}
              {profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES)?.product
                ?.isSale && (
                <MentoringOptionCard
                  sx={{
                    width:
                      profile?.productContents?.filter((item) => item.product.isSale === true).length === 1 && lgUp
                        ? '50%'
                        : '100%'
                  }}
                  product={
                    profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES)?.product
                  }
                />
              )}
              {profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.AN_HOUR)?.product
                ?.isSale && (
                <MentoringOptionCard
                  sx={{
                    width:
                      profile?.productContents?.filter((item) => item.product.isSale === true).length === 1 && lgUp
                        ? '50%'
                        : '100%'
                  }}
                  product={
                    profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.AN_HOUR)?.product
                  }
                />
              )}
            </PaperCard>
          </Stack>
        )}
    </Box>
  )
}

export default ProfileView
