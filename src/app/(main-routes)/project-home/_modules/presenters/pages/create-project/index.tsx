'use client'
import dynamic from 'next/dynamic'
import { AxiosError } from 'axios'
import { TabsStackCount } from '@/components/tabs'
import { Typography } from '@/elements'
import ControlInput from '@/elements/control-input'
import { useDialog } from '@/hooks/use-dialog'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  DECKS_TYPE_TAB_DATA,
  DECK_CATEGORY_ENUM,
  IDeckSelected,
  IDecksCreateProjectTab,
  IProjectTemplate,
  MAX_LENGTH_INPUT,
  PROJECT_ERRORS_CODE,
  PROJECT_TYPE_ENUM,
  ProjectDeckItem,
  IDetailProject,
  PROJECT_PATHS_ENUM,
  TYPE_MODAL_CONFIRM,
  IMAGE_TYPE_ENUM
} from '../../../domain'
import {
  CreateIndividualProjectPayload,
  CreateIndividualProjectResponse,
  UpdateDecksProjectPayload,
  UpdateProjectPayload,
  createIndividualProject,
  getDecksProjectPart,
  getTemplatesProjectPart,
  CreateStartupBenchmarkingPayload,
  CreateStartupBenchmarkingResponse,
  createStartupBenchmarking
} from '../../../use-cases'
import { mapImageTypeEnumToString, useExplorerProjectContext } from '../../../utils'
import { uploadMultipleFile } from '@/actions/apis/file.action'
import { convertFileListToArray } from '@/utils/file'
import { createFormData } from '@/utils/object'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

const CarouselProjectTemplate = dynamic(() => import('../../components/organisms/carousel-project-template'))
const DeckCard = dynamic(() => import('../../components/molecules/deck-card'))
const SidebarProjectCreation = dynamic(() => import('../../components/molecules/sidebar-project-creation'))
const UploadSection = dynamic(() => import('../../components/molecules/upload-section'))
const ConfirmModal = dynamic(() => import('../../components/molecules/alerts/confirm-modal'), { ssr: false })

interface ICreateProject {
  projectDetail?: IDetailProject
}

interface INameProject {
  name: string
  thumbnail: FileList
  logo: FileList
}

interface IFiles {
  thumbnail?: FileList
  logo?: FileList
}

interface IHandleFileUpload {
  imageUrl?: string
  logoUrl?: string
}

export const CreateProject = ({ projectDetail }: ICreateProject) => {
  const router = useRouter()
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { open, onClose, onOpen } = useDialog()
  const [tabs, setTabs] = useState<IDecksCreateProjectTab[]>(DECKS_TYPE_TAB_DATA)
  const [tab, setTab] = useState<DECK_CATEGORY_ENUM>(DECK_CATEGORY_ENUM.ALL)
  const [deckItemsSelected, setDeckItemsSelected] = useState<IDeckSelected[]>(projectDetail?.decks || [])
  const [deckItems, setDeckItems] = useState<ProjectDeckItem[]>([])
  const [templates, setTemplates] = useState<IProjectTemplate[]>([])
  const [page, setPage] = useState<number>(1)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [showErrorMaxFreeProjects, setShowErrorMaxFreeProjects] = useState<boolean>(false)
  const [showErrorMaxFreeDecks, setShowErrorMaxFreeDecks] = useState<boolean>(false)
  const [lastedTemplate, setLastedTemplate] = useState<IProjectTemplate | null>(null)
  const { isAdmin, isFreeUser, folderDetail, updateProjectMutation, updateDecksProjectMutation } =
    useExplorerProjectContext()

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    thumbnail: isAdmin
      ? yup
          .mixed()
          .test('is-filelist', 'Thumbnail is required', (value) => value instanceof FileList && value.length > 0)
      : yup.mixed(),
    logo: isAdmin
      ? yup.mixed().test('is-filelist', 'Logo is required', (value) => value instanceof FileList && value.length > 0)
      : yup.mixed()
  })

  const form = useForm<any>({
    resolver: yupResolver(schema as yup.ObjectSchema<INameProject>),
    mode: 'onChange',
    defaultValues: {
      name: '',
      thumbnail: {} as FileList,
      logo: {} as FileList
    }
  })
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors }
  } = form

  const uploadImagesAct = useMutation({
    mutationFn: uploadMultipleFile
  })

  const { data: listDecks } = useQuery({
    queryKey: [`decks`, tab, page],
    queryFn: () => {
      return getDecksProjectPart({
        category: tab === DECK_CATEGORY_ENUM.ALL ? undefined : tab,
        page,
        limit: 20
      })
    }
  })

  const { data: projectTemplates } = useQuery({
    queryKey: [`templates`, page],
    queryFn: () => {
      return getTemplatesProjectPart({
        type: PROJECT_TYPE_ENUM.INDIVIDUAL,
        page,
        limit: 20
      })
    }
  })

  const createIndividualProjectMutation = useMutation({
    mutationFn: createIndividualProject,
    onSuccess: (data: CreateIndividualProjectResponse) => {
      const { data: response, error } = data
      if (!error) {
        setOpenConfirm(false)
        enqueueSnackbar(dict.project_home_toast_project_creation_complete, {
          variant: 'info'
        })
        router.push(PROJECT_PATHS_ENUM.MY_PROJECT)
      }
    },
    onError: (error: AxiosError) => {
      switch (error.code) {
        case PROJECT_ERRORS_CODE.EXCEED_MAX_FREE_PROJECTS:
          setShowErrorMaxFreeProjects(true)
          break
        case PROJECT_ERRORS_CODE.EXCEED_MAX_FREE_DECKS:
          setShowErrorMaxFreeDecks(true)
          break
        default:
          break
      }
    }
  })

  const createStartupBenchmarkingMutation = useMutation({
    mutationFn: createStartupBenchmarking,
    onSuccess: (data: CreateStartupBenchmarkingResponse) => {
      const { data: response, error } = data
      if (!error) {
        setOpenConfirm(false)
        enqueueSnackbar('Create startup benchmarking successfully', {
          variant: 'info'
        })
        router.push(PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING)
      }
    },
    onError: (error: AxiosError) => {
      console.log(error)
    }
  })

  const onSelectDeck = (deckItem: IDeckSelected) => {
    if (isFreeUser && deckItemsSelected.length >= 3) {
      setShowErrorMaxFreeDecks(true)
      return
    }
    const isAlreadyInDecks = deckItemsSelected.some((item) => item.id === deckItem.id)

    if (!isAlreadyInDecks) {
      const newList = [...deckItemsSelected, deckItem]
      setDeckItemsSelected(newList)
    }
  }

  const onSelectTemplate = (template: IProjectTemplate) => {
    const decks = template.decks || []

    const decksWillAdd: IDeckSelected[] = decks.reduce((prev, deck) => {
      let newList = prev

      const isAlreadyInDecks = newList.some((element) => element.id === deck.id)
      if (!isAlreadyInDecks) {
        newList = [...newList, { ...deck, templateId: template.id }]
      }

      return newList
    }, deckItemsSelected)

    setDeckItemsSelected(decksWillAdd)
    setLastedTemplate(template)
  }

  const onSubmit = () => {
    setOpenConfirm(true)
  }

  const handleFileUpload = async (): Promise<IHandleFileUpload> => {
    const { thumbnail, logo } = form.getValues() || {}
    const thumbnailFiles = convertFileListToArray(thumbnail)
    const logoFiles = convertFileListToArray(logo)

    if (!thumbnailFiles.length && !logoFiles.length) {
      return {
        imageUrl: undefined,
        logoUrl: undefined
      }
    }

    const uploadPromises = []

    if (thumbnailFiles.length) {
      const thumbnailFormData = createFormData({
        fileUploads: thumbnailFiles,
        folderName: IMAGE_FOLDER.PROJECT_HOME
      })
      uploadPromises.push(uploadImagesAct.mutateAsync(thumbnailFormData))
    }

    if (logoFiles.length) {
      const logoFormData = createFormData({
        fileUploads: logoFiles,
        folderName: IMAGE_FOLDER.PROJECT_HOME
      })
      uploadPromises.push(uploadImagesAct.mutateAsync(logoFormData))
    }

    try {
      const responses = await Promise.all(uploadPromises)
      const imageUrl = responses[0]?.data?.[0]?.url
      const logoUrl = responses[1]?.data?.[0]?.url

      return {
        imageUrl: imageUrl || undefined,
        logoUrl: logoUrl || undefined
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      return {
        imageUrl: undefined,
        logoUrl: undefined
      }
    }
  }

  const createProject = async () => {
    const haveUseTemplate = !!lastedTemplate && deckItemsSelected.some((deck) => deck.templateId === lastedTemplate.id)
    const templateId = haveUseTemplate ? lastedTemplate.id : undefined

    const { name } = form.getValues() || {}
    let dataBody = {
      folderId: Number(folderDetail.id || null),
      name,
      templateId,
      numberOfDeck: deckItemsSelected.length,
      decks: deckItemsSelected.map((item, index) => ({
        position: index + 1,
        deckId: item.id
      }))
    } as any

    if (isAdmin) {
      const { imageUrl, logoUrl } = await handleFileUpload()
      dataBody = {
        ...dataBody,
        imageUrl,
        logoUrl
      } as CreateStartupBenchmarkingPayload
      createStartupBenchmarkingMutation.mutate(dataBody)
      return
    }
    createIndividualProjectMutation.mutate(dataBody)
  }

  const editProject = async () => {
    const { name } = form.getValues() || {}
    const decksBody = {
      id: projectDetail?.id || '',
      decks: deckItemsSelected.map((item, index) => ({
        position: index + 1,
        deckId: item.id
      }))
    } as UpdateDecksProjectPayload
    const basicBody = {
      id: projectDetail?.id || '',
      name
    } as UpdateProjectPayload
    const updateRes = await updateProjectMutation.mutateAsync(basicBody)
    const updateDecks = await updateDecksProjectMutation.mutateAsync(decksBody)
    if (updateRes.error || updateDecks.error) {
      enqueueSnackbar('An error occurred when update project', {
        variant: 'error'
      })
      return
    }
    enqueueSnackbar('Update project successfully!', {
      variant: 'info'
    })
    router.push(PROJECT_PATHS_ENUM.MY_PROJECT)
    setOpenConfirm(false)
  }

  const validateForm = () => {
    if (!deckItemsSelected.length) {
      enqueueSnackbar(dict.project_home_toast_please_select_at_least_one_deck, {
        variant: 'error'
      })
    }
  }

  const onChangeUpload = (type: IMAGE_TYPE_ENUM, file: FileList) => {
    const name = mapImageTypeEnumToString(type)
    if (name) {
      setValue(name, file)
      trigger(name)
    }
  }

  const onClearUpload = (type: IMAGE_TYPE_ENUM) => {
    const name = mapImageTypeEnumToString(type)
    if (name) {
      setValue(name, {} as FileList)
      trigger(name)
    }
  }

  useEffect(() => {
    if (errors.name) {
      enqueueSnackbar(dict.project_home_toast_please_enter_project_name, {
        variant: 'error'
      })
      return
    }
    if (isAdmin && (errors.thumbnail || errors.logo)) {
      enqueueSnackbar((errors.thumbnail?.message as any) || errors.logo?.message, {
        variant: 'error'
      })
    }
  }, [errors])

  useEffect(() => {
    if (projectDetail) {
      const decks = (projectDetail.decks || []).map((deck) => deck)
      setDeckItemsSelected(decks)
      setValue('name', projectDetail.name || '')
    }
  }, [projectDetail])

  useEffect(() => {
    setTemplates((projectTemplates?.data?.result || []) as IProjectTemplate[])
  }, [projectTemplates])

  useEffect(() => {
    setDeckItems((listDecks?.data?.result || []) as ProjectDeckItem[])
    setTabs((prevCategory) =>
      prevCategory.map((category) => ({
        ...category,
        count: category.value === tab ? listDecks?.data?.result?.length || 0 : undefined
      }))
    )
  }, [listDecks])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'block' }}>
      <Box display='flex' flex={1}>
        <Box display='flex' width={convertToRem(300)} sx={{ backgroundColor: palette.home.gray400 }}>
          <SidebarProjectCreation
            onCancel={onOpen}
            onSubmit={validateForm}
            setDeckItemsSelected={setDeckItemsSelected}
            deckItemsSelected={deckItemsSelected}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          flex={1}
          gap={convertToRem(20)}
          padding={convertToRem(40)}
          width={`calc(100% - 300px)`}
        >
          <S.ProjectName>
            <ControlInput
              fullWidth
              type='text'
              name='name'
              placeholder={dict.project_home_modal_create_project_placeholder}
              control={control}
              maxLength={MAX_LENGTH_INPUT.PROJECT_NAME_PERSONAL}
            />
          </S.ProjectName>

          {isAdmin && (
            <Stack flexDirection='row' gap={convertToRem(80)}>
              <UploadSection
                title={IMAGE_TYPE_ENUM.THUMBNAIL}
                error={errors.thumbnail?.message as any}
                onChange={(file: FileList) => onChangeUpload(IMAGE_TYPE_ENUM.THUMBNAIL, file)}
                onClear={() => onClearUpload(IMAGE_TYPE_ENUM.THUMBNAIL)}
              />
              <UploadSection
                width={414}
                title={IMAGE_TYPE_ENUM.LOGO}
                error={errors.logo?.message as any}
                onChange={(file: FileList) => onChangeUpload(IMAGE_TYPE_ENUM.LOGO, file)}
                onClear={() => onClearUpload(IMAGE_TYPE_ENUM.LOGO)}
              />
            </Stack>
          )}

          <Stack gap={convertToRem(20)}>
            <Typography cate='title_50' color={palette.home.gray100}>
              {dict.project_home_recommended_project_templates}
            </Typography>
            <CarouselProjectTemplate projectTemplates={templates} onSelect={onSelectTemplate} isFreeUser={isFreeUser} />
          </Stack>

          <Stack>
            <Typography cate='title_50' color={palette.home.gray100}>
              {dict.project_home_full_deck}
            </Typography>
            <Box sx={{ mt: 3, mb: 3 }}>
              <TabsStackCount data={tabs} value={tab} handleChange={(_, value: DECK_CATEGORY_ENUM) => setTab(value)} />
            </Box>
            {!!deckItems?.length ? (
              <Stack flexDirection='row' flexWrap='wrap' gap={convertToRem(24)}>
                {deckItems.map((deckItem) => {
                  return (
                    <DeckCard
                      key={deckItem.id}
                      deckItem={deckItem}
                      selectDecks={deckItemsSelected}
                      onSelectDeck={onSelectDeck}
                    />
                  )
                })}
              </Stack>
            ) : (
              <S.SkeletonTemplate />
            )}
          </Stack>
        </Box>
        {open && (
          <ConfirmModal
            open={true}
            title={dict.project_home_modal_confirm_create_project_title}
            cancelText={dict.common_cancel}
            submitText={dict.common_confirm}
            onSubmit={() => {
              onClose()
              router.push(isAdmin ? PROJECT_PATHS_ENUM.OPEN_INNOVATION : PROJECT_PATHS_ENUM.MY_PROJECT)
            }}
            onCancel={onClose}
            onClose={onClose}
            type={TYPE_MODAL_CONFIRM.DELETE}
          />
        )}
        {openConfirm && (
          <ConfirmModal
            open={true}
            title={
              !!projectDetail
                ? dict.project_home_modal_edit_the_project_title
                : dict.project_home_modal_create_a_project_title
            }
            description={!projectDetail ? dict.project_home_modal_create_a_project_description : ''}
            cancelText={dict.common_cancel}
            submitText={dict.common_confirm}
            onSubmit={() => {
              if (!!projectDetail) {
                editProject()
              } else {
                createProject()
              }
            }}
            onCancel={() => setOpenConfirm(false)}
            onClose={() => setOpenConfirm(false)}
            type={TYPE_MODAL_CONFIRM.SUCCESS}
          />
        )}
        {showErrorMaxFreeProjects && (
          <ConfirmModal
            open={true}
            onClose={() => {
              setShowErrorMaxFreeProjects(false)
            }}
            title={dict.project_home_modal_max_free_project_title}
            description={dict.project_home_modal_max_free_project_description}
            cancelText={dict.common_close}
            submitText={dict.project_home_upgrade}
            onSubmit={() => {
              router.push('/payment-management')
              setShowErrorMaxFreeProjects(false)
            }}
            onCancel={() => {
              setShowErrorMaxFreeProjects(false)
            }}
            type={TYPE_MODAL_CONFIRM.CAN_NOT_ACTION}
          />
        )}
        {showErrorMaxFreeDecks && (
          <ConfirmModal
            open={true}
            onClose={() => {
              setShowErrorMaxFreeDecks(false)
            }}
            title={dict.project_home_modal_max_free_deck_title}
            description={
              <Stack gap={convertToRem(24)}>
                <Typography cate='body_3' color={palette.home.gray100}>
                  {dict.project_home_modal_max_free_deck_description_1}
                </Typography>
                <Typography cate='body_3' color={palette.home.gray100}>
                  {dict.project_home_modal_max_free_deck_description_2}
                </Typography>
              </Stack>
            }
            cancelText={dict.common_close}
            submitText={dict.project_home_upgrade}
            onSubmit={() => {
              router.push('/payment-management')
              setShowErrorMaxFreeDecks(false)
            }}
            onCancel={() => {
              setShowErrorMaxFreeDecks(false)
            }}
            type={TYPE_MODAL_CONFIRM.ERROR}
          />
        )}
      </Box>
    </form>
  )
}
export default CreateProject
