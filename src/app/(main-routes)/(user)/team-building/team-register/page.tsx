'use client'
import { getCategories } from '@/actions/apis/category.action'
import { uploadMultipleFile } from '@/actions/apis/file.action'
import { getTeamBuildingServer } from '@/actions/apis/team-building.action'
import { AddIcon, CameraIcon, ChevronLeftIcon, TrashImageIcon } from '@/assets/icons'
import { CardHorizontalSlide, InputTags, PageTitle, Quill } from '@/components'
import { TrashAlert } from '@/components/dialog'
import { IMAGE_FOLDER, SUB_CATEGORY } from '@/constants/common.constant'
import {
  CustomInput,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  IconButtonSizes,
  PrimaryTextarea,
  SecondaryButton,
  Typography,
  Upload
} from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useNestedFile } from '@/hooks/use-nested-file'
import { CreateTeamPayload, createUserTeamBuilding, updateUserTeamBuilding } from '@/services/team-building.service'
import yup from '@/services/yup.service'
import { IMember, Member } from '@/types/team-building.type'
import { removeDuplicate, removeFalsy } from '@/utils/array'
import { convertFileListToArray } from '@/utils/file'
import { createFormData } from '@/utils/object'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import AddTeamMemberForm from '../_components/add-team-member-form'

const MAX_FILE = 5

interface RegisterForm {
  name: string
  slogan: string
  introduction: string
  productOrService?: string[]
  thumbnail?: FileList
  activityImages?: FileList
  awardHistory?: string[]
  description: string
  members: Member[]
}

const schema = yup.object({
  name: yup.string().noOnlySpaces().required(),
  slogan: yup.string().noOnlySpaces().required(),
  introduction: yup.string().noOnlySpaces().required(),
  thumbnail: yup.mixed<FileList>().transform((curr: FileList) => {
    return curr && curr.length > 0 ? curr : undefined
  }),
  activityImages: yup.mixed<FileList>().transform((curr: FileList) => {
    return curr && curr.length > 0 ? curr : undefined
  }),
  description: yup
    .string()
    .noOnlySpaces()
    .transform((str: string) => (str.replace('<p><br></p>', '').length > 0 ? str : undefined))
    .required(),
  members: yup
    .array<Member>()
    .transform((curr: FileList) => {
      return curr && curr.length > 0 ? curr : undefined
    })
    .required()
})

const defaultValues = {
  name: '',
  slogan: '',
  introduction: '',
  productOrService: [],
  awardHistory: [],
  thumbnail: undefined,
  activityImages: undefined,
  description: '',
  members: []
}

const TeamRegister = () => {
  const ref = useRef<HTMLInputElement | null>()
  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    formState: { isValid, isDirty },
    reset
  } = form

  const thumbnail = form.watch('thumbnail')
  const activityImages = form.watch('activityImages')

  const theme = useTheme()
  const router = useRouter()
  const { open, onClose, onOpen } = useDialog()
  const { setServerFiles: setThumbnailServer, imageURLs: thumbnailURLs } = useNestedFile(thumbnail)
  const {
    setServerFiles: setActivityImagesServer,
    imageURLs: activityImageUrls,
    removeItem,
    files,
    serverFiles
  } = useNestedFile(activityImages)

  // const teamData = undefined as any
  const { data: teamData } = useQuery({
    queryKey: ['team-building'],
    queryFn: () => {
      return getTeamBuildingServer()
    }
  })

  const { data: memberRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.TB_RECRUIT })
  })

  const uploadImageAct = useMutation({
    mutationFn: uploadMultipleFile
  })

  const createTeamAct = useMutation({
    mutationFn: createUserTeamBuilding,
    onSuccess: (data) => {
      if (data?.data?.id) {
        router.push('/team-building')
      }
    }
  })

  const updateTeamAct = useMutation({
    mutationFn: updateUserTeamBuilding,
    onSuccess: (data) => {
      if (data?.data?.id) {
        router.push('/team-building')
      }
    }
  })

  const handleDisabled = () => {
    if (isValid && activityImageUrls.length > 0 && thumbnailURLs.length > 0) {
      return false
    }
    return true
  }

  const handleUploadImage = async (file: FileList) => {
    if (file && file.length > 0) {
      const fileArr = convertFileListToArray(file)
      const uploadFormData = createFormData({
        fileUploads: fileArr,
        folderName: IMAGE_FOLDER.TEAM_BUILDING
      })

      const { data } = await uploadImageAct.mutateAsync(uploadFormData)
      return data
    }
  }

  const generateMemberPayload = async (members?: Member[]) => {
    if (members && members.length > 0) {
      // Use Promise.all to wait for all async operations to complete
      const memberPayload = await Promise.all(
        members.map(async ({ image, categories, memberRes, ...rest }) => {
          let avatarId = null
          if (image && image.length > 0) {
            const memberImageRes = await handleUploadImage(image)
            avatarId = memberImageRes?.[0].id || null
          } else if (memberRes?.avatarId) {
            avatarId = memberRes?.avatarId
          }
          const categorieIds = categories.map((i) => ({ id: i.id }))
          return avatarId ? { ...rest, avatarId, categories: categorieIds } : { ...rest, categories: categorieIds }
        })
      )
      return memberPayload
    }
    return []
  }

  const createTeam = async (value: RegisterForm) => {
    const {
      name,
      slogan,
      introduction,
      productOrService = [],
      thumbnail,
      activityImages,
      awardHistory = [],
      description,
      members
    } = value
    const thumbnailRes = await handleUploadImage(thumbnail!)
    const activityRes = await handleUploadImage(activityImages!)
    let memberPayload = await generateMemberPayload(members)
    console.log('upload images successfully', thumbnailRes, activityRes, memberPayload)
    const activityImageIds = activityRes?.map((i) => ({ id: i.id }))
    const payload = {
      name,
      slogan,
      introduction,
      productOrService,
      thumbnailId: thumbnailRes?.[0].id,
      activityImages: activityImageIds,
      awardHistory,
      description,
      members: memberPayload
    }
    createTeamAct.mutateAsync(payload)
  }

  const updateTeam = async (value: RegisterForm, id: number) => {
    const {
      name,
      slogan,
      introduction,
      productOrService = [],
      thumbnail,
      activityImages,
      awardHistory = [],
      description,
      members
    } = value
    console.log(description)
    let memberPayload = await generateMemberPayload(members)
    const payload = {
      name,
      slogan,
      introduction,
      productOrService,
      awardHistory,
      description,
      members: memberPayload
    } as Partial<CreateTeamPayload>
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailRes = await handleUploadImage(thumbnail)
      payload.thumbnailId = thumbnailRes?.[0].id
    }
    if (activityImages && activityImages?.length > 0) {
      const activityRes = await handleUploadImage(activityImages)
      const resIds = activityRes?.map((i) => i.id) || []
      const serverIds = serverFiles.map((i) => i.id) || []
      const finalData = removeDuplicate(resIds.concat(serverIds)).map((i) => ({ id: i }))
      payload.activityImages = finalData
    }
    updateTeamAct.mutateAsync({ id, payload })
  }

  const onSubmit = async (value: RegisterForm) => {
    if (teamData?.data) {
      updateTeam(value, teamData.data.id!)
    } else {
      createTeam(value)
    }
  }

  const convertMemberRes2FormData = (members: IMember[]) => {
    const dt = new DataTransfer()
    if (members.length > 0) {
      return members.map((i) => {
        const categories = removeFalsy(
          i.categories.map((category) => memberRoles?.data.find((role) => role.id === category.id)!)
        )
        const member: Member = {
          image: dt.files,
          name: i.name,
          introduction: i.introduction,
          categories: categories,
          memberRes: i
        }
        return member
      })
    }
    return []
  }

  useEffect(() => {
    if (teamData?.data) {
      const dt = new DataTransfer()
      const { data } = teamData
      setThumbnailServer([data.thumbnail])
      setActivityImagesServer(data.activityImages)
      const formData: RegisterForm = {
        name: data.name,
        slogan: data.slogan,
        introduction: data.introduction,
        description: data.description,
        thumbnail: dt.files,
        awardHistory: data.awardHistory || [],
        productOrService: data.productOrService || [],
        activityImages: dt.files,
        members: convertMemberRes2FormData(data.members)
      }
      reset(formData)
    }
  }, [teamData])

  useEffect(() => {
    if (files) {
      form.setValue('activityImages', files)
    }
  }, [files])

  return (
    <Box>
      <PageTitle>팀빌딩 프로필 작성</PageTitle>
      <Form {...form}>
        <Box
          component={'form'}
          mt={6}
          onSubmit={form.handleSubmit(onSubmit)}
          display={'flex'}
          sx={{ gap: { xs: 5, md: 6 } }}
          flexDirection={'column'}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
              return false
            }
          }}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 696 }}>
                <FormLabel required>팀 타이틀</FormLabel>
                <FormControl>
                  <CustomInput maxLength={30} fullWidth placeholder='팀 이름을 입력해주세요 (ex.슘페터)' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slogan'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 696 }}>
                <FormLabel required>팀 슬로건</FormLabel>
                <FormControl>
                  <CustomInput maxLength={30} fullWidth placeholder='팀을 표현하는 슬로건을 입력해주세요.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='introduction'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>팀 간략 소개</FormLabel>
                <FormControl>
                  <PrimaryTextarea
                    sx={{ height: '122px !important', width: '100%' }}
                    placeholder='어떤 팀을 꾸리고 계신가요? 팀 소개를 200자 이내로 작성해 주세요.'
                    maxLength={200}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='productOrService'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 696 }}>
                <FormLabel>제품/서비스군</FormLabel>
                <FormControl>
                  <InputTags
                    chipSx={{
                      px: 0.5
                    }}
                    showBtnInSmallRes
                    fullWidth
                    placeholder='팀에서 추구하고 있는 제품/서비스군을 입력해주세요.'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='thumbnail'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 351 }}>
                <FormLabel required>팀 아이콘 이미지</FormLabel>
                <FormControl>
                  <DesignedSecondaryButton btnSize='md' sx={{ width: 351 }}>
                    <Typography cate='button_30' plainColor='main_grey.gray200'>
                      파일첨부
                    </Typography>
                    <AddIcon
                      pathProps={{ stroke: theme.palette.main_primary.blue300 }}
                      circleProps={{ stroke: theme.palette.main_primary.blue300 }}
                    />
                    <Upload {...field} ref={ref} />
                  </DesignedSecondaryButton>
                </FormControl>
              </FormItem>
            )}
          />
          {thumbnailURLs.length > 0 && (
            <Box
              sx={{ height: { xs: 120, md: 148 }, width: { xs: 120, md: 148 } }}
              flexShrink={0}
              position={'relative'}
            >
              <Image
                height={148}
                width={148}
                style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
                src={thumbnailURLs[0].url}
                alt='logo_team'
              />
              <IconButtonSizes
                onClick={() => ref.current?.click()}
                btnSize='fit'
                sx={{ position: 'absolute', bottom: '-10px', right: '-15px' }}
              >
                <CameraIcon />
              </IconButtonSizes>
            </Box>
          )}
          <FormField
            control={form.control}
            name='activityImages'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 351 }}>
                <FormLabel required>팀 활동 이미지</FormLabel>
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
                      additionalListFileLength={serverFiles.length}
                      maxFile={MAX_FILE}
                      merge
                      multiple
                      {...field}
                    />
                  </DesignedSecondaryButton>
                </FormControl>
              </FormItem>
            )}
          />
          {activityImageUrls && activityImageUrls.length > 0 && (
            <CardHorizontalSlide>
              {activityImageUrls.map((i, index) => (
                <Box height={200} key={i.url} width={264} flexShrink={0} position={'relative'}>
                  <Image
                    height={200}
                    width={264}
                    style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
                    src={i.url}
                    alt='logo_team'
                  />
                  <IconButtonSizes
                    onClick={() => {
                      removeItem(i.rootId, i.type)
                    }}
                    btnSize='fit'
                    sx={{ position: 'absolute', top: '-7px', right: '-15px' }}
                  >
                    <TrashImageIcon />
                  </IconButtonSizes>
                </Box>
              ))}
            </CardHorizontalSlide>
          )}
          <FormField
            control={form.control}
            name='awardHistory'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 696 }}>
                <FormLabel>수상 이력</FormLabel>
                <FormControl>
                  <InputTags showBtnInSmallRes fullWidth placeholder='수상이력이 있다면 소개해주세요.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>팀 소개</FormLabel>
                <FormControl>
                  <Quill containerSx={{ height: { xs: 232, md: 312 } }} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='members'
            render={({ field }) => (
              <FormItem>
                <FormLabel>팀원 소개</FormLabel>
                <FormControl>
                  <AddTeamMemberForm {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Divider />
          <Box display={'flex'} gap={1} justifyContent={'space-between'} height={56}>
            <SecondaryButton
              onClick={() => {
                isDirty ? onOpen() : router.push('/team-building')
              }}
              btnSize='sm'
              sx={{
                borderRadius: { xs: '8px !important', md: '99px !important' },
                width: { xs: '100%', md: 121 },
                height: { xs: 56, md: 48 }
              }}
            >
              <ChevronLeftIcon
                svgProps={{ height: 16, width: 16 }}
                pathProps={{
                  stroke: theme.palette.main_grey.gray200
                }}
              />
              <Typography plainColor='main_grey.gray200' cate='button_20'>
                이전으로
              </Typography>
            </SecondaryButton>
            <DesignedPrimaryButton
              disabled={handleDisabled()}
              type='submit'
              btnSize='designed-md'
              sx={{ width: { xs: '100%', md: 160 } }}
            >
              정보 등록하기
            </DesignedPrimaryButton>
          </Box>
        </Box>
      </Form>
      <TrashAlert
        title='아직 등록해야 할 정보가 남았습니다.'
        description='작성 중이던 내용이 있다면 모두 소실됩니다.'
        onCancel={onClose}
        onSubmit={() => {
          onClose()
          router.back()
        }}
        open={open}
        submitTxt='확인'
        cancelTxt='취소'
      />
    </Box>
  )
}

export default TeamRegister
