'use client'
import { uploadMultipleFile } from '@/actions/apis/file.action'
import { AddIcon } from '@/assets/icons'
import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { ConfirmAlert, ExceedingAlert, PageTitle } from '@/components'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import {
  CustomInput,
  DesignedSecondaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  IconButton,
  PrimaryTextarea,
  Typography,
  Upload
} from '@/elements'
import { DesignedPrimaryButton, GhostBorderButton } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { applyMentor } from '@/services/mentoring.service'
import yup from '@/services/yup.service'
import { NestedFile } from '@/types/classes/nested-file.class'
import { Attached } from '@/types/types.type'
import { convertFileListToArray } from '@/utils/file'
import { createFormData } from '@/utils/object'
import { emailValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, useTheme } from '@mui/material'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TestContext } from 'yup'

type TPortfolioUrl = { value: string }[]

interface RegisterForm {
  name: string
  email: string
  nameOfAffiliation?: string
  position?: string
  skills: string
  portfolioUrl?: TPortfolioUrl
  portfolioFile?: Attached
  otherInformation?: string
}

const schema = yup.object({
  name: yup.string().noOnlySpaces().required(),
  email: yup
    .string()
    .noOnlySpaces()
    .required()
    .test('email', '', (value?: string) => {
      return emailValidator(value)
    }),
  nameOfAffiliation: yup.string(),
  position: yup.string(),
  skills: yup.string().required(),
  portfolioFile: yup
    .mixed<Attached>()
    .transform((curr: Attached) => {
      return curr && (curr.nestedFile?.getLength() || 0) > 0 ? curr : undefined
    })
    .optional()
    .test({
      test: (value: any, context: TestContext) => {
        if (context.parent?.portfolioUrl?.length > 0 || value?.fileList?.length > 0) {
          return true
        }
        return false
      }
    }),
  portfolioUrl: yup
    .mixed<TPortfolioUrl>()
    .transform((curr: TPortfolioUrl) => {
      return curr.length > 0 ? curr : undefined
    })
    .optional()
    .test({
      test: (value: any, context: TestContext) => {
        if (context.parent?.portfolioFile?.fileList?.length > 0 || value?.length > 0) {
          return true
        }
        return false
      }
    }),
  otherInformation: yup.string()
})

const defaultValues = {
  name: '',
  email: '',
  nameOfAffiliation: '',
  position: '',
  skills: '',
  portfolioUrl: [],
  portfolioFile: {
    fileList: undefined,
    nestedFile: new NestedFile()
  },
  otherInformation: ''
}

const MentorRegister = () => {
  const theme = useTheme()
  const queryClient = new QueryClient()
  const searchParams = useSearchParams()
  const { open: openSent, onOpen: onOpenSent } = useDialog()
  const { open: openRequesting, onOpen: onOpenRequesting, onClose: onCloseRequesting } = useDialog()
  const router = useRouter()
  const { user } = useUserProfile()
  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const applyMentorAct = useMutation({
    mutationFn: applyMentor
  })

  const uploadImagesAct = useMutation({
    mutationFn: uploadMultipleFile
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'portfolioUrl' as any
  })

  const categoryIds = searchParams.get('categoryIds')
  const isDisabledSubmitBtn = !form.formState.isValid

  const back = () => {
    router.push('/community/expert-mentoring')
  }

  const onSubmit = async (values: RegisterForm) => {
    let portfolioFileResId: { id: number }[] = []
    if ((values?.portfolioFile?.fileList?.length || 0) > 0) {
      const fileArr = convertFileListToArray(values?.portfolioFile?.fileList)
      const uploadFormData = createFormData({
        fileUploads: fileArr,
        folderName: IMAGE_FOLDER.MENTORING
      })
      const { data } = await uploadImagesAct.mutateAsync(uploadFormData)
      portfolioFileResId = data?.map((i) => ({
        id: i.id
      }))
    }
    const categoryIds =
      searchParams
        .get('categoryIds')
        ?.split(',')
        .map((i) => ({ id: Number(i) })) || []

    const { name, nameOfAffiliation = '', position, email, skills, otherInformation = '', portfolioUrl } = values
    const urls = portfolioUrl?.map((i) => i.value) || []
    const result = await applyMentorAct.mutateAsync({
      ...(portfolioFileResId.length > 0 && {
        portfolios: portfolioFileResId
      }),
      ...(urls.length > 0 && {
        urls
      }),
      ...(nameOfAffiliation && {
        nameOfAffiliation
      }),
      ...(otherInformation && {
        otherInformation
      }),
      position,
      categories: categoryIds,
      username: name,
      email,
      skills
    })
    if (result?.data?.id) {
      queryClient.refetchQueries({
        queryKey: ['mentor-profile-info']
      })
      onOpenSent()
    } else if (result?.error?.code === '2002') {
      onOpenRequesting()
    }
  }

  useEffect(() => {
    if (user) {
      form.setValue('name', user.nickname || '')
      form.setValue('email', user.email || '')
    }
  }, [user])

  useEffect(() => {
    if (!categoryIds) {
      back()
    }
  }, [categoryIds])

  return (
    <Box display={'flex'} gap={6} flexDirection={'column'}>
      <PageTitle>전문가 멘토링</PageTitle>
      <Divider
        sx={{
          borderColor: 'main_grey.gray700',
          display: {
            md: 'block',
            xs: 'none'
          }
        }}
      />
      <Typography
        cate='title_70'
        breakpoints={{
          md: 'title_50'
        }}
        plainColor='main_grey.gray100'
      >
        멘토 신청하기
      </Typography>
      <Form {...form}>
        <Box
          component={'form'}
          onSubmit={form.handleSubmit(onSubmit)}
          display={'flex'}
          sx={{
            gap: 3
          }}
          flexDirection={'column'}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
              return false
            }
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }} required>
                      이름
                    </FormLabel>
                    <FormControl>
                      <CustomInput maxLength={30} fullWidth placeholder='이름을 입력해주세요.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }} required>
                      이메일
                    </FormLabel>
                    <FormControl>
                      <CustomInput maxLength={30} fullWidth placeholder='이메일을 입력해주세요.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                control={form.control}
                name='nameOfAffiliation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }}>
                      소속명
                    </FormLabel>
                    <FormControl>
                      <CustomInput maxLength={30} fullWidth placeholder='소속명을 입력해주세요.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }}>
                      직책
                    </FormLabel>
                    <FormControl>
                      <CustomInput maxLength={30} fullWidth placeholder='직책을 입력해주세요.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={form.control}
                name='skills'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }} required>
                      보유역량
                    </FormLabel>
                    <FormControl>
                      <PrimaryTextarea
                        sx={{ height: '162px !important', width: '100%' }}
                        placeholder='전문성이 있는 보유 역량, 기술, 자격 및 경력 사항 등을 입력해주세요.'
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12} flexWrap={'nowrap'}>
              <FormField
                control={form.control}
                name='portfolioUrl'
                render={() => (
                  <FormItem sx={{ maxWidth: 712 }}>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }} required>
                      포트폴리오 업로드
                    </FormLabel>
                    <FormControl mt={'14px'}>
                      <DesignedSecondaryButton onClick={() => append({ value: '' })} btnSize='md' sx={{ width: 351 }}>
                        <Typography cate='button_30' plainColor='main_grey.gray200'>
                          URL 추가
                        </Typography>
                        <AddIcon
                          pathProps={{ stroke: theme.palette.main_primary.blue300 }}
                          circleProps={{ stroke: theme.palette.main_primary.blue300 }}
                        />
                      </DesignedSecondaryButton>
                      {fields.length > 0 && (
                        <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>
                          {fields.map((field, index) => {
                            return (
                              <CustomInput
                                fullWidth
                                sx={{
                                  '.MuiOutlinedInput-input': {
                                    padding: 0 + ' !important',
                                    color: 'main_primary.blue300',
                                    textDecoration: 'underline',
                                    '&::placeholder': {
                                      color: theme.palette.main_grey.gray300
                                    }
                                  }
                                }}
                                startAdornment={
                                  <Typography
                                    width={'3rem'}
                                    plainColor='main_grey.gray300'
                                    flexShrink={0}
                                    cate='button_30'
                                  >
                                    URL
                                  </Typography>
                                }
                                endAdornment={
                                  <IconButton onClick={() => remove(index)}>
                                    <CloseCircleSmIcon />
                                  </IconButton>
                                }
                                key={field.id} // important to include key with field's id
                                {...form.register(`portfolioUrl.${index}.value` as any)}
                              />
                            )
                          })}
                        </Box>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={form.control}
                name='portfolioFile'
                render={({ field }) => (
                  <FormItem sx={{ maxWidth: 712 }}>
                    <FormControl>
                      <DesignedSecondaryButton btnSize='md' sx={{ width: 351 }}>
                        <Typography cate='button_30' plainColor='main_grey.gray200'>
                          파일첨부
                        </Typography>
                        <AddIcon
                          pathProps={{ stroke: theme.palette.main_primary.blue300 }}
                          circleProps={{ stroke: theme.palette.main_primary.blue300 }}
                        />
                        <Upload
                          additionalListFileLength={0}
                          maxFile={10}
                          limitSize={30}
                          accept='image/png, image/jpg, image/jpeg, .pdf'
                          merge
                          multiple
                          value={field?.value?.nestedFile?.getLocalFiles}
                          onChange={(fileList: FileList) => {
                            const newObj = { ...field.value, fileList }
                            newObj.nestedFile?.addLocalFile(fileList)
                            field.onChange(newObj)
                          }}
                        />
                      </DesignedSecondaryButton>
                      <Typography mt={2} cate='caption_20' plainColor='main_grey.gray400'>
                        30mb 미만 jpg,jpeg, png, pdf 파일을 업로드해주세요.
                      </Typography>
                      <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>
                        {field?.value?.nestedFile?.fileInfo.map((i) => {
                          return (
                            <CustomInput
                              startAdornment={
                                <Typography
                                  width={'3rem'}
                                  plainColor='main_grey.gray300'
                                  flexShrink={0}
                                  cate='button_30'
                                >
                                  파일
                                </Typography>
                              }
                              endAdornment={
                                <IconButton
                                  onClick={() => {
                                    field?.value?.nestedFile?.removeItem(i.rootId, i.type)
                                    const newFileList = field?.value?.nestedFile?.getLocalFiles
                                    const newObj = { ...field.value, fileList: newFileList }
                                    field.onChange(newObj)
                                  }}
                                >
                                  <CloseCircleSmIcon />
                                </IconButton>
                              }
                              name=''
                              key={i.rootId}
                              disabled
                              fullWidth
                              value={i.name}
                            />
                          )
                        })}
                      </Box>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={form.control}
                name='otherInformation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel cate='body_30' breakpoints={{ md: 'body_30' }}>
                      기타 전달 사항
                    </FormLabel>
                    <FormControl>
                      <PrimaryTextarea
                        sx={{ height: '162px !important', width: '100%' }}
                        placeholder='내용을 입력해주세요.'
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
          </Grid>
          <Divider
            sx={{
              borderColor: 'main_grey.gray700'
            }}
          />
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Box
              display={'flex'}
              gap={1}
              width={{
                md: 'auto',
                xs: '100%'
              }}
            >
              <GhostBorderButton
                onClick={back}
                sx={{
                  height: 56,
                  width: {
                    md: 160,
                    xs: '100%'
                  }
                }}
                btnSize='designed-md'
              >
                취소
              </GhostBorderButton>
              <DesignedPrimaryButton
                sx={{
                  width: {
                    md: 160,
                    xs: '100%'
                  }
                }}
                disabled={isDisabledSubmitBtn}
                type='submit'
                btnSize='designed-md'
              >
                제출하기
              </DesignedPrimaryButton>
            </Box>
          </Box>
        </Box>
      </Form>
      <ConfirmAlert
        title='멘토 신청이 접수되었습니다.'
        description={`결과는 입력해주신 메일 주소로 발송됩니다.`}
        onSubmit={() => {
          back()
        }}
        open={openSent}
        submitTxt='확인'
      />
      <ExceedingAlert
        onSubmit={() => {
          onCloseRequesting()
          back()
        }}
        submitTxt={'확인'}
        title={'멘토 신청이 접수되었습니다.'}
        description={`결과는 입력해주신 메일 주소로 발송됩니다.`}
        open={openRequesting}
      />
    </Box>
  )
}

export default MentorRegister
