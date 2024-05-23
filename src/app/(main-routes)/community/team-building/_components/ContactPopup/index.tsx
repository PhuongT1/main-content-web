import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { IconButton, PrimaryTextarea, SecondaryButton, Upload } from '@/elements'
import Button from '@/elements/button'
import InputPhoneNumber from '@/elements/input-phone-number'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/elements/v2/form'
import CustomInput from '@/elements/v2/input/custom-input'
import { uploadFile } from '@/services/file.service'
import { ISendContactTeamBuilding, sendContactTeamBuilding } from '@/services/team-building.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { ValidationMode, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import { ContactPopupProps } from './ContactPopup.type'
import ContactTerm from './ContactTerm/ContactTerm'
import styles from './styles.module.scss'
import { IMAGE_TYPES } from '@/constants/common.constant'
import { formatPhoneNumber } from '@/utils/format-phone-number'

export default function ContactPopup({
  title,
  description,
  onCancel,
  submitTitle,
  id,
  cancelTitle,
  type = 'dark',
  onClose,
  name,
  thumbnail,
  slogan,
  categories,
  ...props
}: ContactPopupProps) {
  const theme = useTheme()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const user = useRecoilValue(userAtom)
  const mdUp = useMediaQuery('(min-width: 768px)')
  useEffect(() => {
    form.setValue('username', user?.username || '')
    form.setValue('email', user?.email)
    form.setValue('phoneNumber', user?.phoneNumber ? formatPhoneNumber(user?.phoneNumber) : '')
    setCheckedTerm(false)
  }, [props.open])

  const schema = yup
    .object({
      username: yup.string().required('이름을 입력해주세요.'),
      email: yup.string().test('email', '이메일 형식을 확인해주세요', (value?: string) => emailValidator(value)),
      category: yup.number().required('이름을 입력해주세요.'),
      file: yup.mixed<FileList>().transform((curr: FileList) => {
        return curr && curr.length > 0 ? curr : undefined
      }),
      phoneNumber: yup
        .string()
        .trim()
        .test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) => phoneOptionalValidator(value)),
      message: yup.string()
    })
    .required()

  const defaultValues = {
    username: '',
    email: '',
    category: -1,
    message: '',
    phoneNumber: '',
    file: undefined
  }

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }
  const form = useForm<any>(formOptions)
  const { isValid, errors } = form.formState
  const setLoading = useSetRecoilState(loadingAtom)
  const [checkedTerm, setCheckedTerm] = useState<boolean>(false)
  const uploadFileMutate = useMutation({
    mutationFn: uploadFile
  })

  const onSubmit = async (dataSubmit: any) => {
    let fileId = -1
    if (dataSubmit.file) {
      const { data: fileData } = await uploadFileMutate.mutateAsync({ file: dataSubmit.file[0] })

      fileId = fileData.id
    }

    const contactData: ISendContactTeamBuilding = {
      name: dataSubmit.username,
      email: dataSubmit.email,
      phoneNumber: !!dataSubmit.phoneNumber ? dataSubmit.phoneNumber?.split('-')?.join('') : undefined,
      note: !!dataSubmit.message ? dataSubmit.message : undefined,
      attachmentId: fileId === -1 ? undefined : fileId
    }
    const reqData = {
      submitData: contactData,
      id: id,
      recruitId: dataSubmit.category
    }
    const { data, error } = await sendContactTeamBuilding(reqData)
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } else {
      enqueueSnackbar('메일전송이 완료 되었습니다', { variant: 'success' })
      onCancel?.()
      form.reset()
    }
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    } else {
      form.reset()
      onCancel?.()
    }
  }

  useEffect(() => {
    if (categories && categories.length > 0) {
      form.setValue('category', Number(categories[0].recruitmentId || 0))
    }
  }, [props.open, categories])

  const category = form.watch('category')
  const file = form.watch('file')

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
          <Box display='flex' width='100%' justifyContent='flex-start' alignItems={'center'} gap={3}>
            <Image
              alt='img'
              src={!!thumbnail?.url ? thumbnail?.url : '/images/blank-user.png'}
              width={100}
              height={100}
              style={{ borderRadius: '0.5rem' }}
            />

            <Box display={'flex'} alignItems='flex-start' flexDirection={'column'} gap={0.5}>
              <Typography
                cate='caption_20'
                color={theme.palette.sub.teal400}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {name}
              </Typography>
              <Typography
                cate='sub_title_30'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
                color={theme.palette.main_grey.gray100}
              >
                {slogan}
              </Typography>
            </Box>
          </Box>
          <Form {...form}>
            <Box
              component={'form'}
              mt={6}
              onSubmit={form.handleSubmit(onSubmit)}
              display={'flex'}
              gap={3}
              width={'100%'}
              flexDirection={'column'}
            >
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required cate='body_30'>
                      지원분야
                    </FormLabel>
                    <FormControl>
                      <Select
                        placeholder='졸업 형태 선택'
                        displayEmpty
                        inputProps={{
                          disabled: !categories || categories.length <= 1
                        }}
                        {...field}
                        sx={{
                          borderColor: theme.palette.main_grey.gray800,
                          '.MuiTypography-root': {
                            marginLeft: 0
                          }
                        }}
                        fullWidth
                        renderValue={(value) => {
                          if (!value) {
                            return (
                              <Typography cate='body_3' color={theme.palette.main.gray30}>
                                졸업 형태 선택
                              </Typography>
                            )
                          }
                          return (
                            <Box display={'flex'} alignItems={'center'}>
                              <Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
                                {categories?.find((i) => i.recruitmentId == category)?.name}
                              </Typography>
                            </Box>
                          )
                        }}
                        // onChange={updateCountry}
                      >
                        {categories?.map(
                          (i) =>
                            i.recruitmentId !== -1 && (
                              <MenuItem value={i.recruitmentId} key={i.recruitmentId}>
                                {i.name}
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required cate='body_30'>
                      이름
                    </FormLabel>
                    <FormControl>
                      <CustomInput fullWidth placeholder='팀 이름을 입력해주세요 (ex.슘페터)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required cate='body_30'>
                      이메일
                    </FormLabel>
                    <FormControl>
                      <CustomInput fullWidth placeholder='팀 이름을 입력해주세요 (ex.슘페터)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                <Box display={'flex'} mb={1}>
                  <Typography cate='body_30'>연락처</Typography>
                </Box>
                <InputPhoneNumber
                  register={form.register}
                  sx={{
                    '.MuiInputBase-input': { padding: 0 },
                    fieldset: { padding: 0 },
                    '.MuiInputAdornment-root': { display: 'none' }
                  }}
                  type='tel'
                  name='phoneNumber'
                  control={form.control}
                  placeholder='연락처 입력'
                  startAdornment={<></>}
                />
              </Box>

              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30'>첨부파일</FormLabel>
                    <FormControl>
                      <Box display={'flex'} alignItems={'center'} flexDirection={mdUp ? 'row' : 'column'} gap={1}>
                        <CustomInput
                          name=''
                          disabled
                          fullWidth
                          value={file && file.length > 0 ? file?.[0].name : ''}
                          endAdornment={
                            !!file ? (
                              <IconButton
                                onClick={() => {
                                  form.setValue('file', undefined)
                                }}
                              >
                                <CloseCircleSmIcon />
                              </IconButton>
                            ) : undefined
                          }
                        />
                        <SecondaryButton
                          btnSize='md'
                          active
                          sx={{
                            width: mdUp ? convertToRem(160) : '100%',
                            py: 2.25,
                            px: 3,
                            alignItems: 'center',
                            borderColor: theme.palette.main_primary.blue300
                          }}
                        >
                          <Typography cate='button_30' plainColor='main_grey.gray200'>
                            파일 첨부
                          </Typography>

                          <Upload
                            accept={
                              'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,  application/pdf, .xlsx, .xls, .doc, .docx, .ppt, .pptx,.txt, .hwp, .HWP' +
                              IMAGE_TYPES
                            }
                            {...field}
                          />
                        </SecondaryButton>
                      </Box>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PrimaryTextarea
                        maxRows={4.6}
                        minRows={4.6}
                        sx={{ width: '100%' }}
                        placeholder='지원하면서 특별한 사항이 있다면 작성해주세요.'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Box display={'flex'} alignItems={'center'} justifyContent={mdUp ? 'flex-end' : 'center'} width={'100%'}>
                <Button
                  sx={{ width: mdUp ? convertToRem(120) : '100%', height: convertToRem(44) }}
                  cate={'outlined'}
                  onClick={() => {
                    onCancel?.()
                    setCheckedTerm(false)
                    form.reset()
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
                    width: mdUp ? convertToRem(120) : '100%',
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
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
