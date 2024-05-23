'use client'

import { updateUserProfile } from '@/actions/apis/user.action'
import { CheckRoundIcon } from '@/assets/icons'
import CheckIcon from '@/assets/icons/check'
import LogoutRedIcon from '@/assets/icons/dialog-icons/logout-red'
import MoonIcon from '@/assets/icons/moon'
import SunIcon from '@/assets/icons/sun'
import { userAtom } from '@/atoms/user'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import { SecondaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import ButtonCustom from '@/elements/button'
import Checkbox from '@/elements/checkbox'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { TextButton } from '@/elements/v2/button'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { logoutOtherDevices } from '@/services/auth.service'
import WebInfoService from '@/services/web-info.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { Button, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import PrivacyPopup from './_component/privacy-popup'

interface NotificationType {
  email: boolean
  sms: boolean
}

const Setting = () => {
  const theme = useTheme()
  const { changeThemeMode } = useThemeMode()
  // const breadcrumbData = [{ name: '마이페이지' }, { name: '환경설정' }]
  const [languageValue, setLanguageValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const [showTerm, setShowTerm] = useState<boolean>(false)
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false)
  const [checkboxValues, setCheckboxValues] = useState<NotificationType>({
    email: false,
    sms: false
  })
  const [user, setUser] = useRecoilState(userAtom)
  const [checkAllValue, setCheckAllValue] = useState<boolean>(false)
  const mdUp = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setCheckboxValues({
      email: user?.isReceiveEventEmail || false,
      sms: user?.isReceiveEventPhone || false
    })
    setLayoutMode(user?.isDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT)
    setLanguageValue(user?.language || LANG.KR)
    if (user?.isReceiveEventEmail && user.isReceiveEventPhone) {
      setCheckAllValue(true)
    }
  }, [user])

  const [layoutMode, setLayoutMode] = useState<THEME_MODE>(THEME_MODE.DARK)

  const handleCheckboxGroup = (label: string) => {
    if (label === 'all') {
      if (checkboxValues.email && checkboxValues.sms) {
        let newCheckBoxGroup = { ...checkboxValues }
        newCheckBoxGroup.email = false
        newCheckBoxGroup.sms = false
        setCheckAllValue(false)
        setCheckboxValues(newCheckBoxGroup)
      } else {
        let newCheckBoxGroup = { ...checkboxValues }
        newCheckBoxGroup.email = true
        newCheckBoxGroup.sms = true
        setCheckAllValue(true)
        setCheckboxValues(newCheckBoxGroup)
      }
    } else {
      let newCheckBoxGroup = { ...checkboxValues }
      newCheckBoxGroup[label as keyof typeof checkboxValues] = !checkboxValues[label as keyof typeof checkboxValues]
      if (newCheckBoxGroup.email && newCheckBoxGroup.sms) {
        setCheckAllValue(true)
      } else {
        setCheckAllValue(false)
      }
      setCheckboxValues(newCheckBoxGroup)
    }
  }

  const handleLayoutMode = (mode: THEME_MODE) => {
    setLayoutMode(mode)
  }
  const submitSetting = async () => {
    const updateData = {
      isDarkMode: (layoutMode === THEME_MODE.DARK) !== user?.isDarkMode ? layoutMode === THEME_MODE.DARK : undefined,
      language: languageValue,
      isReceiveEventEmail: checkboxValues.email,
      isReceiveEventPhone: checkboxValues.sms
    }

    const { data, error } = await updateUserProfile(updateData)
    if (data && !error) {
      if ((layoutMode === THEME_MODE.DARK) !== user?.isDarkMode) {
        await changeThemeMode(layoutMode)
      }

      if (languageValue !== user?.language) {
        WebInfoService.setLanguage(languageValue)
      }
      setUser(data.data)
      enqueueSnackbar('회원정보가 변경되었습니다', {
        variant: 'success'
      })
    } else {
      setShowError(true)
      setErrorMessage(error?.message)
    }
  }

  const handleLogoutAll = async () => {
    const { data, error } = await logoutOtherDevices()
    if (data && !error) {
      enqueueSnackbar('Logout success', {
        variant: 'success'
      })
    } else {
      setShowError(true)
      setErrorMessage(error?.message)
    }
  }
  return (
    <>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={4.5} mb={5}>
        환경설정
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} xl={6}>
          <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
            언어
          </Typography>
          <Select
            placeholder='한국어'
            displayEmpty
            value={languageValue}
            fullWidth
            renderValue={(value) => {
              return (
                <Typography cate='body_3' color={theme.palette.main_grey.gray100}>
                  {value === LANG.EN ? '영어' : '한국어'}
                </Typography>
              )
            }}
            onChange={(event: any) => {
              setLanguageValue(event.target.value)
            }}
          >
            <MenuItem value={LANG.EN}>영어</MenuItem>
            <MenuItem value={LANG.KR}>한국어</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Box alignItems={'center'} justifyContent={'center'} flexDirection={'column'} display={'flex'}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} lg={8} xl={6}>
            <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
              화면테마
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Button
                  sx={{
                    height: convertToRem(56),
                    width: '100%',
                    backgroundColor: theme.palette.main_grey.gray100,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    ':hover': {
                      backgroundColor: theme.palette.main_grey.gray100
                    }
                  }}
                  onClick={() => {
                    handleLayoutMode(THEME_MODE.LIGHT)
                  }}
                >
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Box display={'flex'} alignItems='center'>
                      {layoutMode === 'light' ? (
                        <CheckRoundIcon />
                      ) : (
                        <CheckRoundIcon rectProps={{ fill: theme.palette.main.gray40 }} />
                      )}
                      <Typography sx={{ paddingLeft: '1rem' }} cate='body_2' color={theme.palette.main_grey.gray400}>
                        라이트 모드
                      </Typography>
                    </Box>
                    <SunIcon stroke={theme.palette.main_grey.gray500} />
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  sx={{
                    height: convertToRem(56),
                    width: '100%',
                    backgroundColor: theme.palette.main_grey.gray700,
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}
                  onClick={() => {
                    handleLayoutMode(THEME_MODE.DARK)
                  }}
                >
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Box display={'flex'} alignItems='center'>
                      {layoutMode === THEME_MODE.DARK ? (
                        <CheckRoundIcon />
                      ) : (
                        <CheckRoundIcon rectProps={{ fill: theme.palette.main.gray40 }} />
                      )}
                      <Typography sx={{ paddingLeft: '1rem' }} cate='body_2' color={theme.palette.main_grey.gray400}>
                        다크 모드
                      </Typography>
                    </Box>
                    <MoonIcon stroke={theme.palette.main_grey.gray300} />
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12}>
            <Box
              alignItems={'center'}
              display={'flex'}
              sx={{
                [theme.breakpoints.down('md')]: {
                  justifyContent: 'space-between'
                }
              }}
            >
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} mr={3}>
                혜택/이벤트 수신 동의
              </Typography>
              <TextButton
                btnSize='sm-np'
                sx={{
                  width: 'auto'
                }}
                onClick={() => {
                  setShowPrivacy(true)
                }}
              >
                <Typography cate='body_30' color={theme.palette.main.primary_light}>
                  약관보기
                </Typography>
              </TextButton>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={3.5}>
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            xl={2}
            sx={{
              [theme.breakpoints.down('md')]: {
                marginBottom: convertToRem(14)
              }
            }}
          >
            <Box alignItems={'center'} display={'flex'}>
              <Checkbox
                checked={checkAllValue}
                onClick={() => {
                  handleCheckboxGroup('all')
                }}
              />
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={1.5}>
                전체동의
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            xl={2}
            sx={{
              [theme.breakpoints.down('md')]: {
                marginBottom: convertToRem(14)
              }
            }}
          >
            <Box alignItems={'center'} display={'flex'}>
              <Checkbox
                checked={checkboxValues['email']}
                onClick={() => {
                  handleCheckboxGroup('email')
                }}
              />
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={1.5}>
                이메일
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3} xl={2}>
            <Box alignItems={'center'} display={'flex'}>
              <Checkbox
                checked={checkboxValues['sms']}
                onClick={() => {
                  handleCheckboxGroup('sms')
                }}
              />
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={1.5}>
                문자 메세지
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} lg={8} xl={6}>
            <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={2}>
              보안
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SecondaryButton
                  btnSize='md-np'
                  fullWidth={!mdUp}
                  sx={{ width: convertToRem(167) }}
                  isLoading={false}
                  onClick={() => {
                    setShowError(true)
                    setErrorTitle('모든 기기에서 로그아웃 하시겠습니까?')
                    setErrorMessage('다른 기기에서 편집한 내용이 저장되지 않은 경우 사용할 수 없게 됩니다.')
                  }}
                >
                  <Typography plainColor='main_grey.gray200' cate='button_30'>
                    모든 기기 로그아웃
                  </Typography>
                </SecondaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} lg={8} xl={6}>
            <Stack direction={'row'} gap={4}>
              <Typography
                onClick={() => {
                  setShowPrivacy(true)
                }}
                plainColor='main_primary.blue500'
                cate='body_3'
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                서비스 이용약관
              </Typography>
              <Divider
                orientation='vertical'
                sx={{
                  height: convertToRem(20),
                  borderColor: theme.palette.main_grey.gray700
                }}
              />
              <Typography
                onClick={() => {
                  setShowPrivacy(true)
                }}
                plainColor='main_primary.blue500'
                cate='body_3'
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                개인정보 처리방침
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Box
          mt={mdUp ? 16 : 4}
          display={'flex'}
          justifyContent='center'
          alignItems='center'
          position={'relative'}
          sx={{ width: ' 100%' }}
        >
          <ButtonCustom
            fullWidth={!mdUp}
            onClick={submitSetting}
            customTitle={
              <Box display={'flex'} alignItems={'center'}>
                <Box mr={1.5} display={'flex'} alignItems={'center'}>
                  <CheckIcon svgProps={{ stroke: theme.palette.main.primary_light }} />
                </Box>
                변경사항 저장
              </Box>
            }
            cate='outlined'
            customType='active'
            isLoading={false}
            customSize='md'
          />
        </Box>
      </Box>
      {/* Popup Section */}
      <PrivacyPopup
        open={showPrivacy}
        onCancel={() => {
          setShowPrivacy(false)
        }}
      />
      <AlertPopup
        onSubmit={async () => {
          setShowError(false)
          setErrorMessage('')
          setErrorTitle(undefined)
          if (errorTitle) {
            await handleLogoutAll()
          }
        }}
        submitTitle={errorTitle ? '로그아웃' : '확인'}
        cancelTitle={errorTitle ? '취소' : undefined}
        icon={<LogoutRedIcon />}
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

export default Setting
