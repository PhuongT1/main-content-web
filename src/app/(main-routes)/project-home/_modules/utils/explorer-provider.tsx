import React, { useEffect, useMemo, useState } from 'react'
import { Metadata, RequireChildren } from '@/types/types.type'
import { IOpenExplorerModal, useExplorerModal } from '../presenters/hooks'
import {
  ADMIN_PROJECT_PATHS,
  EXPLORER_CATEGORY_ENUM,
  GROUP_PROJECT_PATHS,
  IFolder,
  IFolderDetail,
  IMyProject,
  IProjectHomeTab,
  PROJECT_PATHS_ENUM,
  SEARCH_KEYWORD,
  SEARCH_SORT_TYPE,
  SORT_PROJECT_ENUM
} from '../domain'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDialog } from '@/hooks/use-dialog'
import {
  InfiniteData,
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import {
  BookmarkProjectPayload,
  BookmarkProjectResponse,
  CloneProjectPayload,
  CloneProjectResponse,
  DeleteExplorersPayload,
  DeleteExplorersResponse,
  MoveItemToFolderPayload,
  MoveItemToFolderResponse,
  bookmarkProject,
  deleteExplorers,
  cloneProject,
  getProjectExplorersMyProjects,
  moveItemToFolder,
  updateProject,
  UpdateProjectResponse,
  UpdateProjectPayload,
  UpdateDecksProjectResponse,
  updateDecksProject,
  UpdateDecksProjectPayload,
  shareProject,
  ShareProjectResponse,
  ShareProjectPayload
} from '../use-cases'
import { enqueueSnackbar } from 'notistack'
import { getUserMe } from '../use-cases/get-user-me.use-cases'
import { IUserMe, USER_UPGRADE_PACKAGE } from '@/types/user.type'
import { USER_ROLE } from '@/constants/user.constants'
import { findTabByUrl } from './tab-mapping'
import { useNavigationEvent } from '../presenters/hooks/use-navigation-event'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useLanguage } from '@/hooks/use-language'

type ExplorerProjectContextProps = {
  isAdmin: boolean
  isFreeUser: boolean
  userMe: IUserMe
  keyword: string
  tabData?: IProjectHomeTab
  explorers: IMyProject[]
  folderDetail: IFolderDetail
  folderCreate?: IMyProject | null
  openCreateFolderModal: boolean
  allowFolderCreation: boolean
  isEditProjects: boolean
  projectsSelected: IMyProject[]
  pageType: PROJECT_PATHS_ENUM | null
  explorersLoading: boolean
  cloneProjectMutation: UseMutationResult<CloneProjectResponse, Error, CloneProjectPayload, unknown>
  updateProjectMutation: UseMutationResult<UpdateProjectResponse, Error, UpdateProjectPayload, unknown>
  moveItemToFolderMutation: UseMutationResult<MoveItemToFolderResponse, Error, MoveItemToFolderPayload, unknown>
  bookmarkProjectMutation: UseMutationResult<BookmarkProjectResponse, Error, BookmarkProjectPayload, unknown>
  deleteExplorersMutation: UseMutationResult<DeleteExplorersResponse, Error, DeleteExplorersPayload, unknown>
  updateDecksProjectMutation: UseMutationResult<UpdateDecksProjectResponse, Error, UpdateDecksProjectPayload, unknown>
  shareProjectMutation: UseMutationResult<ShareProjectResponse, Error, ShareProjectPayload, unknown>
  setPageType: (type: PROJECT_PATHS_ENUM | null) => void
  setExplorers: (explorers: IMyProject[]) => void
  setFolderDetail: (folderDetail: IFolderDetail) => void
  onOpenCreateFolderModal: (data?: IOpenExplorerModal) => void
  onCloseCreateFolderModal: () => void
  handleAfterCreateFolder?: (folder: IFolder) => void
  openAllowFolderCreation: () => void
  closeAllowFolderCreation: () => void
  setIsEditProjects: (isEdit: boolean) => void
  setProjectsSelected: React.Dispatch<React.SetStateAction<IMyProject[]>>
  fetchExplorers: () => Promise<void>
  fetchExplorersNextPage: () => Promise<void>
  fetchUserMe: () => Promise<IUserMe>
}

const ExplorerProjectContext = React.createContext<ExplorerProjectContextProps>({} as ExplorerProjectContextProps)

interface IExplorerProjectProvider extends RequireChildren {}

export const ExplorerProjectProvider = ({ children }: IExplorerProjectProvider) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { dict } = useLanguage()
  const queryData = useSearchParams()
  const keyword = queryData.get(SEARCH_KEYWORD) || ''
  const sortType = (queryData.get(SEARCH_SORT_TYPE) as SORT_PROJECT_ENUM) || SORT_PROJECT_ENUM.CREATED_AT
  const [pageType, setPageType] = useState<PROJECT_PATHS_ENUM | null>(null)
  const { user } = useUserProfile()
  const { open: allowFolderCreation, onOpen: openAllowFolderCreation, onClose: closeAllowFolderCreation } = useDialog()
  const {
    explorer: folderCreate,
    open: openCreateFolderModal,
    openModal: onOpenCreateFolderModal,
    closeModal: onCloseCreateFolderModal,
    afterCreateFolder: handleAfterCreateFolder
  } = useExplorerModal()
  const path = usePathname()
  const [explorers, setExplorers] = useState<IMyProject[]>([])
  const [explorersLoading, setExplorersLoading] = useState<boolean>(false)
  const [userMe, setUserMe] = useState<IUserMe>({} as IUserMe)
  const [folderDetail, setFolderDetail] = useState<IFolderDetail>({} as IFolderDetail)
  const [isEditProjects, setIsEditProjects] = useState<boolean>(false)
  const [projectsSelected, setProjectsSelected] = useState<IMyProject[]>([])
  const tabData = useMemo(() => findTabByUrl(path), [path])
  useNavigationEvent(() => setExplorers([] as IMyProject[]))
  const isAdmin = useMemo(() => Boolean(userMe?.id && userMe.role === USER_ROLE.ADMIN), [userMe?.role])
  const isFreeUser = useMemo(
    () => Boolean(!isAdmin && user?.upgradePackage === USER_UPGRADE_PACKAGE.FREE),
    [user, isAdmin]
  )

  const explorerId: number | undefined = useMemo(() => folderDetail.explorerId, [folderDetail.explorerId])

  const queryUserMe = useQuery({
    queryKey: ['queryUserMe'],
    queryFn: () => {
      return getUserMe()
    },
    enabled: false,
    staleTime: 0
  })

  const { data, hasNextPage, isLoading, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getProjectExplorers', keyword, pageType, explorerId, sortType],
    queryFn: async (param) => {
      return getProjectExplorersMyProjects({
        explorerId,
        name: keyword,
        category: tabData?.category,
        page: param.pageParam,
        sortType,
        limit: 12
      })
    },
    initialPageParam: 1,
    getNextPageParam: ({ metaData }) => {
      return metaData.currentPage < metaData.totalPages ? metaData.currentPage + 1 : undefined
    },
    meta: {
      offLoading: true
    },
    enabled: false
  })

  const fetchUserMe = async () => {
    const { data: dataQuery } = await queryUserMe.refetch()
    const user = (dataQuery?.data || {}) as IUserMe
    setUserMe(user)
    return user as IUserMe
  }

  const fetchExplorers = async () => {
    setExplorersLoading(true)
    //only call page 1 whent refetch
    data &&
      queryClient.setQueryData(
        ['getProjectExplorers', keyword, pageType, explorerId, sortType],
        (
          data: InfiniteData<
            {
              metaData: Metadata
              result: IMyProject[]
            },
            unknown
          >
        ) => ({
          pages: data.pages.slice(0, 1),
          pageParams: data.pageParams.slice(0, 1)
        })
      )
    const { data: dataQuery } = await refetch()
    const explorers =
      dataQuery?.pages?.reduce((accumulator: IMyProject[], current) => {
        return [...accumulator, ...current.result]
      }, []) || []
    setExplorers(explorers)
    setExplorersLoading(false)
  }

  const fetchExplorersNextPage = async () => {
    if (!isLoading && !explorersLoading && explorers && hasNextPage) {
      setExplorersLoading(true)
      const { data: dataQuery } = await fetchNextPage()
      const explorers =
        dataQuery?.pages?.reduce((accumulator: IMyProject[], current) => {
          return [...accumulator, ...current.result]
        }, []) || []
      setExplorers(explorers)
      setExplorersLoading(false)
    }
  }

  const moveItemToFolderMutation = useMutation({
    mutationFn: moveItemToFolder,
    onSuccess: (data: MoveItemToFolderResponse) => {
      const { data: response, error } = data
      if (error) {
        enqueueSnackbar('An error occurred when Move item to folder', {
          variant: 'error'
        })
        return
      }
      fetchExplorers()
    }
  })

  const bookmarkProjectMutation = useMutation({
    mutationFn: bookmarkProject,
    onError: (error) => {
      if (error) {
        enqueueSnackbar('An error occurred when bookmark project', {
          variant: 'error'
        })
        return
      }
    }
  })

  const deleteExplorersMutation = useMutation({
    mutationFn: deleteExplorers,
    onSuccess: (data: DeleteExplorersResponse, variables) => {
      const { data: response, error } = data
      if (error) {
        enqueueSnackbar('An error occurred when delete folder', {
          variant: 'error'
        })
        return
      }
      fetchExplorers()
      switch (variables.category) {
        case EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS:
          return enqueueSnackbar(dict.project_home_toast_participating_projects_deleted, {
            variant: 'error'
          })
        default:
          return enqueueSnackbar(dict.project_home_toast_project_deletion_completed, {
            variant: 'info'
          })
      }
    }
  })

  const cloneProjectMutation = useMutation({
    mutationFn: cloneProject,
    onSuccess: (data: CloneProjectResponse) => {
      const { data: response, error } = data
      if (error) {
        enqueueSnackbar('An error occurred when clone project', {
          variant: 'error'
        })
        return
      }
      enqueueSnackbar(dict.project_home_toast_project_clone_completed, {
        variant: 'info'
      })
    }
  })

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (data: UpdateProjectResponse) => {
      const { data: response, error } = data

      if (error) {
        throw error
      }
    },
    onError: (error) => {
      enqueueSnackbar('An error occurred when update project', {
        variant: 'error'
      })
    }
  })

  const updateDecksProjectMutation = useMutation({
    mutationFn: updateDecksProject,
    onSuccess: (data: UpdateDecksProjectResponse) => {
      const { data: response, error } = data

      if (error) {
        throw error
      }
    },
    onError: (error) => {
      enqueueSnackbar('An error occurred when update decks project', {
        variant: 'error'
      })
    }
  })

  const shareProjectMutation = useMutation({
    mutationFn: shareProject,
    onSuccess: (data: ShareProjectResponse, variables: ShareProjectPayload) => {},
    onError(error, variables) {},
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    fetchUserMe()
  }, [])

  useEffect(() => {
    if (
      userMe.id &&
      userMe.role === USER_ROLE.ADMIN &&
      !ADMIN_PROJECT_PATHS.includes(tabData?.value as PROJECT_PATHS_ENUM)
    ) {
      router.push(PROJECT_PATHS_ENUM.OPEN_INNOVATION)
      return
    }
    if (userMe.id && !userMe.isGroupLeader && GROUP_PROJECT_PATHS.includes(tabData?.value as PROJECT_PATHS_ENUM)) {
      router.push(PROJECT_PATHS_ENUM.MY_PROJECT)
    }
  }, [userMe, tabData])

  useEffect(() => {
    switch (pageType) {
      case PROJECT_PATHS_ENUM.MY_PROJECT:
      case PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT:
      case PROJECT_PATHS_ENUM.OPEN_INNOVATION:
      case PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING:
      case PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE:
        setFolderDetail({} as IFolderDetail)
        fetchExplorers()
        break
      case PROJECT_PATHS_ENUM.MY_PROJECT_FOLDER:
      case PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL:
      case PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER:
        if (explorerId) {
          fetchExplorers()
        }
        break
      default:
        break
    }
  }, [pageType, explorerId, keyword, sortType])

  const contextValues = {
    isAdmin,
    isFreeUser,
    userMe,
    keyword,
    tabData,
    explorers,
    folderDetail,
    folderCreate,
    openCreateFolderModal,
    allowFolderCreation,
    isEditProjects,
    projectsSelected,
    pageType,
    explorersLoading,
    cloneProjectMutation,
    updateProjectMutation,
    moveItemToFolderMutation,
    bookmarkProjectMutation,
    deleteExplorersMutation,
    updateDecksProjectMutation,
    shareProjectMutation,
    setPageType,
    setFolderDetail,
    setExplorers,
    onOpenCreateFolderModal,
    onCloseCreateFolderModal,
    handleAfterCreateFolder,
    openAllowFolderCreation,
    closeAllowFolderCreation,
    setIsEditProjects,
    setProjectsSelected,
    fetchExplorers,
    fetchExplorersNextPage,
    fetchUserMe
  }

  return <ExplorerProjectContext.Provider value={contextValues}>{children}</ExplorerProjectContext.Provider>
}

export const useExplorerProjectContext = () => {
  const context = React.useContext(ExplorerProjectContext)
  if (!context) {
    console.error('[useExplorerProjectContext] Context not defined.')
    throw new Error('useExplorerProjectContext must be used within a ExplorerProjectProvider')
  }
  return context as ExplorerProjectContextProps
}
