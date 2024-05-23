import Button from '@/elements/button'
import ControlInput from '@/elements/control-input'
import InputPhoneNumber from '@/elements/input-phone-number'
import Typography from '@/elements/typography'
import { ISendContactOutsourceCompany, sendContactOutsourceCompany } from '@/services/outsource-company.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { ValidationMode, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ContactPopupProps } from './ContactPopup.type'
import ContactTerm from './ContactTerm/ContactTerm'
import styles from './styles.module.scss'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { formatPhoneNumber } from '@/utils/format-phone-number'
export default function ContactPopup({
  title,
  description,
  onCancel,
  submitTitle,
  id,
  cancelTitle,
  type = 'dark',
  data,
  onClose,
  ...props
}: ContactPopupProps) {
  const theme = useTheme()
  const user = useRecoilValue(userAtom)
  const mdDown = useMediaQuery(`(max-width: 768px)`)

  useEffect(() => {
    setValue('name', user?.nickname || '')
    setValue('email', user?.email)
    setValue('phoneNumber', !!user?.phoneNumber ? formatPhoneNumber(user?.phoneNumber) : '')
    setCheckedTerm(false)
  }, [props.open])

  const schema = yup.object({
    name: yup.string().required('이름을 입력해주세요.'),
    email: yup.string().test('email', '이메일 형식을 확인해주세요', (value?: string) => emailValidator(value)),

    phoneNumber: yup
      .string()
      .trim()
      .test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) => phoneOptionalValidator(value))
  })

  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
    content: ''
  }

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }
  const { handleSubmit, formState, getValues, control, register, setValue, reset, setError } = useForm(formOptions)
  const { isValid, errors } = formState

  const [checkedTerm, setCheckedTerm] = useState<boolean>(false)
  const sendContactMutate = useMutation({
    mutationFn: sendContactOutsourceCompany
  })
  const onSubmit = async (dataSubmit: any) => {
    const reqData: ISendContactOutsourceCompany = {
      name: dataSubmit.name,
      email: dataSubmit.email,
      phoneNumber: dataSubmit.phoneNumber?.split('-')?.join(''),
      content: dataSubmit.content
    }
    const { data, error } = await sendContactMutate.mutateAsync({ submitData: reqData, id })
    if (error) {
      enqueueSnackbar(error.content, { variant: 'error' })
    } else {
      enqueueSnackbar('메일전송이 완료 되었습니다', { variant: 'success' })
      onCancel?.()
      setCheckedTerm(false)
      reset()
    }
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    } else {
      reset()
      onCancel?.()
      setCheckedTerm(false)
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        container: styles.popup_container,
        root: styles.popup_root
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
          maxWidth: convertToRem(560) + ' !important'
        }
      }}
    >
      <DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
        <div className={`${styles.content_wrapper}`}>
          <Typography
            cate='title_70'
            color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
            className={`${styles.title}`}
          >
            연락하기
          </Typography>
          <Typography
            cate='body_30'
            color={type === 'dark' ? theme.palette.main_grey.gray200 : theme.palette.main_grey.gray600}
            mt={1}
          >
            해당 기업에 개인정보가 전달됩니다.
          </Typography>
          <Box component={'form'} sx={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'} my={5} gap={3}>
              <Box display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'}>
                <Box display={'flex'} mb={1} mt={1}>
                  <Typography cate='body_30'>이름</Typography>
                  <Typography color={theme.palette.main.danger} cate='body_30'>
                    *
                  </Typography>
                </Box>
                <ControlInput
                  register={register}
                  type='text'
                  name='name'
                  label='name'
                  onKeyDown={(event) => {
                    if (event.keyCode === 13 || event.keyCode === 176) {
                      event.preventDefault()
                    }
                  }}
                  sx={{
                    padding: '0 !important'
                  }}
                  autoComplete='off'
                  placeholder='이름 입력'
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  fullWidth
                  control={control}
                />
                <Box display={'flex'} mb={1} mt={3}>
                  <Typography cate='body_30'>이메일</Typography>
                  <Typography color={theme.palette.main.danger} cate='body_30'>
                    *
                  </Typography>
                </Box>
                <ControlInput
                  register={register}
                  type='text'
                  name='email'
                  label='email'
                  sx={{
                    padding: '0 !important'
                  }}
                  placeholder='이메일 입력'
                  onKeyDown={(event) => {
                    if (event.keyCode === 13 || event.keyCode === 176) {
                      event.preventDefault()
                    }
                  }}
                  autoComplete='off'
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  fullWidth
                  control={control}
                />
                <Box display={'flex'} mb={1} mt={3}>
                  <Typography cate='body_30'>연락처</Typography>
                </Box>
                <InputPhoneNumber
                  register={register}
                  type='tel'
                  name='phoneNumber'
                  sx={{
                    padding: '0 !important'
                  }}
                  control={control}
                  placeholder='연락처 입력'
                />
              </Box>
              <Box display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'}>
                <Typography
                  cate='sub_title_40'
                  color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
                  mb={1}
                >
                  전달 메세지
                </Typography>
                <ControlInput
                  name='content'
                  fullWidth
                  maxLength={500}
                  multiline
                  register={register}
                  placeholder='수신자에게 전달할 메세지를 입력해주세요.'
                  control={control}
                  sx={{
                    height: convertToRem(128) + ' !important',
                    padding: '1rem !important',
                    fieldset: {
                      padding: '0 !important'
                    },
                    '.MuiInputAdornment-root': {
                      display: 'none'
                    },
                    '.MuiInputBase-input': {
                      padding: '0 !important',
                      overflow: 'auto',
                      width: '100%',
                      height: '100% !important'
                    }
                  }}
                />
              </Box>
              <Box
                sx={{
                  borderRadius: 1,
                  border: '1px solid ' + theme.palette.main_grey.gray600,
                  padding: 2,
                  gap: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <Typography cate='sub_title_30' plainColor='main_grey.gray200'>
                  안내사항
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray300'>
                  해당 기업에게 입력한 개인정보(이름, 이메일, 연락처)가 전달됩니다. 추후 미팅을 통해 요구사항을
                  전달해주세요.
                </Typography>
              </Box>
              <ContactTerm
                checked={checkedTerm}
                onChange={() => {
                  setCheckedTerm((prev) => !prev)
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={mdDown ? 'center' : 'flex-end'} width={'100%'}>
              <Button
                sx={{ width: mdDown ? '100%' : convertToRem(120), height: convertToRem(44) }}
                cate={'outlined'}
                onClick={() => {
                  onCancel?.()
                  setCheckedTerm(false)
                  reset()
                }}
                isNonSubmit
                customTitle={
                  <Typography color={theme.palette.main.gray20} cate='body_3_semibold'>
                    닫기
                  </Typography>
                }
              />
              <Button
                sx={{
                  marginLeft: '0.5rem',
                  width: mdDown ? '100%' : convertToRem(120),
                  height: convertToRem(44)
                }}
                customType={'active'}
                disabled={!isValid || !checkedTerm}
                cate={'primary'}
                isOnFormPopup
                customTitle={<Typography cate='body_3_semibold'>메일 보내기</Typography>}
                fullWidth
              />
            </Box>
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  )
}
