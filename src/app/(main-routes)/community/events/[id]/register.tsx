import TermDropDown from '@/app/(auth)/sign-up/_components/term-drop-down'
import { loadingAtom } from '@/atoms/loading'
import ResizeImage from '@/components/resize-image'
import { termList } from '@/constants/common.constant'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import Checkbox from '@/elements/checkbox'
import ControlInput from '@/elements/control-input'
import Input from '@/elements/custom-input'
import InputPhoneNumber from '@/elements/input-phone-number'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator, phoneValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { KeyboardEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import Tag from '../../talents/components/Tag'

interface RegisterProps {
  name: string
  email: string
  phoneNumber: string
  teamName?: string
  idea?: string
}

const RegisterCommunityEvents = () => {
  const theme = useTheme()
  const breadcrumbData = [{ name: '커뮤니티' }, { name: '교육행사&지원사업' }]
  const setLoading = useSetRecoilState(loadingAtom)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [isReceiveNotification, setIsReceiveNotification] = useState<boolean>(false)
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 992px)')

  const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')

  const schema = yup
    .object({
      name: yup.string().required('이름을 입력해주세요.'),
      email: yup
        .string()
        .required('이메일 형식을 확인해주세요')
        .test('email', '이메일 형식을 확인해주세요', (value?: string) => emailValidator(value)),
      phoneNumber: yup
        .string()
        .required('이메일 형식을 확인해주세요')
        .trim()
        .test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) => phoneValidator(value))
    })
    .required()

  const defaultValues = {
    email: '',
    name: '',
    phoneNumber: '',
    teamName: '',
    idea: ''
  }

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema)
  }
  const { handleSubmit, formState, control, register, reset, setError } = useForm<any>(formOptions)

  const onSubmit = async (dataSubmit: any) => {
    setLoading(true)

    // const { data, error } = await updateUserProfile(updateData);
    // if (data && !error) {
    //   reset();
    //   enqueueSnackbar('회원정보가 변경되었습니다', {
    //     variant: 'success',
    //   });
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   setShowError(true);
    //   setErrorMessage(error?.message);
    // }
    setLoading(false)
  }

  const handleCheckAll = () => {
    if (checkedIds.length < termList.length) {
      let newCheckedIds = [...checkedIds]
      termList.forEach((i) => {
        if (!newCheckedIds.includes(i.id)) {
          newCheckedIds.push(i.id)
        }
      })
      setCheckedIds(newCheckedIds)
      setIsReceiveNotification(true)
    } else {
      setCheckedIds([])
      setIsReceiveNotification(false)
    }
  }
  const handleCheck = (id: number) => {
    if (checkedIds.includes(id)) {
      let newCheckedIds = checkedIds.filter((i) => i !== id)
      setCheckedIds(newCheckedIds)
    } else {
      let newCheckedIds = [...checkedIds]
      newCheckedIds.push(id)
      setCheckedIds(newCheckedIds)
    }
  }
  return (
    <>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={4.5} mb={5}>
        신청하기
      </Typography>
      <Typography cate='title_2_bold' mb={2}>
        행사정보
      </Typography>
      <Box
        component='div'
        width={'100%'}
        display={'flex'}
        flexDirection={lgUp ? 'row' : 'column'}
        mb={mdUp ? 6 : 3}
        borderRadius={convertToRem(8)}
        sx={{
          backgroundColor: theme.palette.main.gray80
        }}
        p={3}
      >
        <ResizeImage src='/images/test-img.png' baseWidth={270} placeholderSrc={'/images/test-img.png'} />
        <Box display={'flex'} flexDirection={'column'} ml={lgUp ? 4 : 0} mt={lgUp ? 0 : 2}>
          <Box display='block'>
            <Tag label='D-12' />
          </Box>
          <Typography mt={4} cate='body_2'>
            지원사업
          </Typography>
          <Typography mt={2} cate='title_2_bold'>
            데이터 기반 프로그램 코파운더 모집
          </Typography>
          <Typography mt={4} cate='body_2'>
            접수기간
          </Typography>
          <Typography mt={1} cate='subtitle_1'>
            2023.09.23 ~ 2023.09.26
          </Typography>
          <Typography mt={4} cate='body_2'>
            행사기간
          </Typography>
          <Typography mt={1} cate='subtitle_1'>
            2023.09.23 ~ 2023.09.26
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} pb={2} mb={4} borderBottom={'1px solid ' + theme.palette.main.gray70}>
          <Typography color={theme.palette.main.danger} cate='title_2_bold'>
            *
          </Typography>
          <Typography cate='title_2_bold'>필수 정보</Typography>
        </Box>
        <Grid container spacing={3} mb={mdUp ? 6 : 3}>
          <Grid item lg={4} xs={12}>
            <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
              성함
            </Typography>
            <ControlInput
              register={register}
              type='text'
              name='name'
              placeholder='성함을 입력해주세요'
              label='name'
              onKeyDown={(event) => {
                if (event.keyCode === 13 || event.keyCode === 176) {
                  event.preventDefault()
                }
              }}
              inputProps={{
                maxLength: 12
              }}
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
              성함
            </Typography>
            <ControlInput
              register={register}
              fullWidth
              type='text'
              name='email'
              label='email'
              control={control}
              placeholder='이메일을 입력해주세요'
              onKeyDown={(event) => {
                if (event.keyCode === 13 || event.keyCode === 176) {
                  event.preventDefault()
                }
              }}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
              성함
            </Typography>
            <InputPhoneNumber
              register={register}
              type='tel'
              name='phoneNumber'
              control={control}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.keyCode === 13 || event.keyCode === 176) {
                  event.preventDefault()
                }
              }}
              placeholder='연락처를 입력해주세요'
            />
          </Grid>
        </Grid>
        <Box display={'flex'} pb={2} mb={4} borderBottom={'1px solid ' + theme.palette.main.gray70}>
          <Typography color={theme.palette.main.danger} cate='title_2_bold'>
            *
          </Typography>
          <Typography cate='title_2_bold'>필수 정보</Typography>
        </Box>
        <Grid container spacing={3} mb={mdUp ? 6 : 3}>
          <Grid item lg={4} xs={12}>
            <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
              팀원/팀원명
            </Typography>
            <ControlInput
              register={register}
              type='text'
              name='teamName'
              placeholder='성함을 입력해주세요'
              label='teamName'
              onKeyDown={(event) => {
                if (event.keyCode === 13 || event.keyCode === 176) {
                  event.preventDefault()
                }
              }}
              fullWidth
              control={control}
            />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
              성함
            </Typography>
            <Box display={'flex'} flexDirection={mdUp ? 'row' : 'column'}>
              <Input
                fullWidth
                type='text'
                name='file'
                label='email'
                control={control}
                placeholder='이메일을 입력해주세요'
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 176) {
                    event.preventDefault()
                  }
                }}
                inputProps={{
                  contentEditable: false
                }}
                disabled
              />
              <Button
                cate={'outlined'}
                title={'파일 첨부하기'}
                isNonSubmit
                sx={{
                  width: mdUp ? convertToRem(160) : '100%',
                  marginLeft: mdUp ? '0.5rem' : 0,
                  marginTop: mdUp ? 0 : '0.5rem'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box flexDirection={'column'} mb={mdUp ? 7 : 3}>
          <Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
            한줄 아이디어{' '}
          </Typography>
          <ControlInput
            register={register}
            type='text'
            name='teamName'
            placeholder='연락처를 입력해주세요'
            label='teamName'
            onKeyDown={(event) => {
              if (event.keyCode === 13 || event.keyCode === 176) {
                event.preventDefault()
              }
            }}
            fullWidth
            control={control}
          />
        </Box>
        <Box alignItems={'center'} display={'flex'} py={1}>
          <Checkbox onClick={handleCheckAll} checked={checkedIds.length === termList.length} rounded />
          <Typography cate='body_2' color={theme.palette.main.gray10} ml={1.5}>
            모두 동의합니다.
          </Typography>
        </Box>
        {termList.map((i) => (
          <TermDropDown
            title={i.title}
            key={i.id}
            onClick={() => {
              handleCheck(i.id)
              if (i.id === 3) {
                setIsReceiveNotification((prev) => !prev)
              }
            }}
            checked={checkedIds.includes(i.id)}
            required={i.required}
          />
        ))}
      </form>
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

export default RegisterCommunityEvents
