'use-client'
import dynamic from 'next/dynamic'
import { PageTitle } from '@/components'
import SearchInput from '@/elements/search-input'
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { TabsStackCount } from '@/components/tabs'
import { convertToRem } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import {
  EXPLORER_CATEGORY_ENUM,
  EXPLORER_ITEM_TYPE_ENUM,
  IFolder,
  IProjectHomeTab,
  MAX_LEVEL_FOLDER_ALLOWED,
  PROJECT_PATHS_ENUM,
  PROJECT_HOME_TAB_DATA,
  SEARCH_KEYWORD,
  SEARCH_SORT_TYPE,
  SORT_PROJECT_ENUM,
  TYPE_MODAL_CONFIRM,
  GROUP_PROJECT_PATHS,
  ADMIN_PROJECT_PATHS
} from '../../../../domain'
import { useExplorerProjectContext } from '../../../../utils'
import { ButtonCustom } from '../../atoms'
import { DeleteExplorersPayload, MoveItemToFolderPayload } from '../../../../use-cases'
import { enqueueSnackbar } from 'notistack'
import { useDialog } from '@/hooks/use-dialog'
import { USER_ROLE } from '@/constants/user.constants'
import { useLanguage } from '@/hooks/use-language'
import { TranslateKey } from '@/types/types.type'
import * as S from './style'

const SolidTrash = dynamic(() => import('@/assets/icons/solid-trash'), { ssr: false })
const FolderIcon = dynamic(() => import('@/assets/icons/folder'), { ssr: false })
const DocumentIcon = dynamic(() => import('@/assets/icons/document'), { ssr: false })
const ConfirmModal = dynamic(() => import('../../molecules/alerts/confirm-modal'), { ssr: false })
const TabSortExplorer = dynamic(() => import('../../molecules/tab-sort-explorer'), { ssr: false })

interface IHeadPage {
  showTabs?: boolean
  showActions?: boolean
  pageTitle: string
  onKeywordChange?: (word: string) => void
  onSearchByKeyword?: (word: string) => void
}
const AMOUNT_FOLDER_WILL_CREATE = 1

export const HeadPage = ({
  pageTitle,
  showTabs = true,
  showActions = true,
  onKeywordChange,
  onSearchByKeyword
}: IHeadPage) => {
  const { dict, t } = useLanguage()
  const router = useRouter()
  const theme = useTheme()
  const path = usePathname()
  const queryData = useSearchParams()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>(queryData.get(SEARCH_KEYWORD) || '')
  const { open: confirmDelete, onOpen: openConfirmDelete, onClose: closeConfirmDelete } = useDialog()
  const [tabs, setTabs] = useState<IProjectHomeTab[]>([] as IProjectHomeTab[])
  const {
    pageType,
    tabData,
    userMe,
    explorers,
    folderDetail,
    allowFolderCreation,
    isEditProjects,
    projectsSelected,
    moveItemToFolderMutation,
    deleteExplorersMutation,
    setExplorers,
    onOpenCreateFolderModal,
    closeAllowFolderCreation,
    openAllowFolderCreation,
    setIsEditProjects,
    setProjectsSelected
  } = useExplorerProjectContext()

  const [tab, setTab] = useState<PROJECT_PATHS_ENUM>(tabData?.value as PROJECT_PATHS_ENUM)
  const isHaveSort =
    tabData?.category &&
    [EXPLORER_CATEGORY_ENUM.OPEN_INNOVATION, EXPLORER_CATEGORY_ENUM.STARTUP].includes(tabData?.category)

  const onRemove = () => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    newQuery.delete(SEARCH_KEYWORD)
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''
    setKeyword('')
    router.push(`${path}${query}`)
  }

  const onSearch = () => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (!!keyword) {
      newQuery.set(SEARCH_KEYWORD, keyword.trim())
      setKeyword(keyword.trim())
    } else {
      if (!!newQuery.get(SEARCH_KEYWORD)) {
        newQuery.delete(SEARCH_KEYWORD)
      }
      setKeyword(keyword.trim())
    }
    const search = newQuery.toString()
    const query = search ? `?${search}` : ''

    router.push(`${path}${query}`)
    if (onSearchByKeyword) {
      onSearchByKeyword(keyword)
    }
  }

  const onChangeSortType = (newSort: SORT_PROJECT_ENUM) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    newQuery.set(SEARCH_SORT_TYPE, newSort)
    const search = newQuery.toString()
    router.push(`${path}?${search}`)
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKeyword(e.target.value)
    if (onKeywordChange) {
      onKeywordChange(e.target.value || '')
    }
  }

  const onChangeTab = (value: PROJECT_PATHS_ENUM) => {
    setTab(value)

    const selectedTab: IProjectHomeTab | undefined = PROJECT_HOME_TAB_DATA.find((tab) => tab.value === value)
    if (selectedTab) {
      router.push(selectedTab.url)
      setExplorers([])
    }
  }

  const onCreateFolder = () => {
    const maxLevel = GROUP_PROJECT_PATHS.includes(pageType as PROJECT_PATHS_ENUM)
      ? MAX_LEVEL_FOLDER_ALLOWED + 1
      : MAX_LEVEL_FOLDER_ALLOWED

    if (isEditProjects) {
      if (folderDetail.level >= maxLevel) {
        openAllowFolderCreation()
        return
      }

      const folders = projectsSelected.filter((item) => item.itemType === EXPLORER_ITEM_TYPE_ENUM.FOLDER)
      if (folders.length) {
        const isNotAllowed = folders.some((item) => {
          const itemData = item.itemData as IFolder
          const currentFolderLevel = folderDetail.level || 0
          return AMOUNT_FOLDER_WILL_CREATE + currentFolderLevel + itemData.totalFolders >= maxLevel
        })

        if (isNotAllowed) {
          openAllowFolderCreation()
          return
        }
      }

      const moveItemsAfterCreate = async (folder: IFolder) => {
        if (!folder) {
          return
        }
        const explorerIds = projectsSelected.map((item) => item.explorerId)
        const dataBody = {
          targetExplorerId: folder.explorerId,
          explorerIds,
          category: tabData?.category
        } as MoveItemToFolderPayload
        await moveItemToFolderMutation.mutateAsync(dataBody as MoveItemToFolderPayload)
        setIsEditProjects(false)
        enqueueSnackbar(dict.project_home_toast_folder_created, {
          variant: 'info'
        })
      }

      onOpenCreateFolderModal({ afterCreateFolder: moveItemsAfterCreate })
      return
    }

    if (folderDetail.level >= maxLevel) {
      openAllowFolderCreation()
      return
    }
    onOpenCreateFolderModal()
  }

  const editMultiProjects = () => {
    const toggleEdit = !isEditProjects
    setIsEditProjects(toggleEdit)
  }

  const onDeleteMulti = () => {
    if (!projectsSelected.length) {
      return
    }

    openConfirmDelete()
  }

  const deleteMultiItems = async () => {
    const explorerIds = projectsSelected.map((item) => item.explorerId)

    const dataBody = {
      explorerIds,
      category: tabData?.category
    } as DeleteExplorersPayload

    await deleteExplorersMutation.mutateAsync(dataBody)
    closeConfirmDelete()
    setIsEditProjects(false)
  }

  useEffect(() => {
    if (!isEditProjects) {
      setProjectsSelected([])
    }
  }, [isEditProjects])

  useEffect(() => {
    setIsFullWidth(!mdUp)
  }, [mdUp])

  useEffect(() => {
    setTab(tabData?.value as PROJECT_PATHS_ENUM)
  }, [])

  useEffect(() => {
    setTabs((prevTab) => {
      let newTab = PROJECT_HOME_TAB_DATA.filter((item) => item.isTab).map((item) => ({
        ...item,
        label: dict[item.label as TranslateKey] || null,
        count: item.value === tab ? explorers.length || 0 : undefined
      })) as IProjectHomeTab[]

      if (userMe.id && !userMe.isGroupLeader) {
        newTab = newTab.filter((item) => item.value !== PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE)
      }

      if (userMe.role === USER_ROLE.ADMIN) {
        newTab = newTab.filter((item) => ADMIN_PROJECT_PATHS.includes(item.value))
      }
      return newTab
    })
  }, [tab, explorers, userMe, dict])

  return (
    <Stack flexDirection='column' paddingBottom={convertToRem(20)}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <S.PageTitleStyled>
          <PageTitle>{pageTitle}</PageTitle>
        </S.PageTitleStyled>
        <SearchInput
          placeholder='Search'
          fullWidth={isFullWidth}
          value={keyword}
          onRemove={onRemove}
          onChange={onChange}
          onSearch={onSearch}
        />
      </Box>
      <Stack
        flexDirection='row'
        gap={convertToRem(10)}
        justifyContent='space-between'
        alignItems='center'
        paddingY={convertToRem(20)}
      >
        <Box sx={{ minHeight: convertToRem(37) }}>
          {showTabs && (
            <TabsStackCount
              data={tabs}
              value={tab}
              handleChange={(_, value: PROJECT_PATHS_ENUM) => onChangeTab(value)}
            />
          )}
        </Box>
        {showActions && (
          <Stack flexDirection='row' gap={convertToRem(20)}>
            {![PROJECT_PATHS_ENUM.OPEN_INNOVATION, PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING].includes(
              tabData?.value!
            ) && (
              <ButtonCustom
                customTitle={
                  <Stack flexDirection='row' alignItems='center' gap={convertToRem(5)}>
                    <FolderIcon />
                    <Typography cate='caption_1_semibold' plainColor='main.gray90'>
                      {dict.project_home_title_my_project}
                    </Typography>
                  </Stack>
                }
                onClick={onCreateFolder}
                cate='primary'
                customSize={'sm'}
                customType={'active'}
                type='button'
                disabled={isEditProjects && !projectsSelected.length}
              />
            )}
            {isEditProjects && !GROUP_PROJECT_PATHS.includes(pageType as PROJECT_PATHS_ENUM) && (
              <ButtonCustom
                customTitle={
                  <Stack flexDirection='row' alignItems='center' gap={convertToRem(5)}>
                    <SolidTrash />
                    <Typography cate='caption_1_semibold' color={theme.palette.home.gray50}>
                      {dict.common_delete}
                    </Typography>
                  </Stack>
                }
                type='button'
                onClick={onDeleteMulti}
                cate='outlined'
                customSize={'sm'}
                customType={'active'}
                disabled={!projectsSelected.length}
                sx={{
                  border: `1px solid ${theme.palette.home.gray400}`,
                  backgroundColor: theme.palette.home.gray400
                }}
              />
            )}
            <ButtonCustom
              customTitle={
                <Stack flexDirection='row' alignItems='center' gap={convertToRem(5)}>
                  <DocumentIcon color={theme.palette.main_grey.gray_scale_50} />
                  <Typography cate='caption_1_semibold' plainColor='main_grey.gray_scale_50'>
                    {isEditProjects ? dict.project_home_complete_project_editing : dict.project_home_edit_project}
                  </Typography>
                </Stack>
              }
              type='button'
              onClick={editMultiProjects}
              cate={'outlined'}
              customSize={'sm'}
              customType={undefined}
              sx={
                isEditProjects
                  ? {
                      borderColor: theme.palette.home.blue600,
                      backgroundColor: theme.palette.main_primary.blue900
                    }
                  : undefined
              }
            />
          </Stack>
        )}
      </Stack>
      {isHaveSort && (
        <TabSortExplorer
          active={(queryData.get(SEARCH_SORT_TYPE) as SORT_PROJECT_ENUM) || SORT_PROJECT_ENUM.CREATED_AT}
          onChange={(dataSort) => onChangeSortType(dataSort)}
        />
      )}
      {allowFolderCreation && (
        <ConfirmModal
          open={true}
          onClose={closeAllowFolderCreation}
          title={dict.project_home_modal_max_level_folder_title}
          description={t('project_home_modal_max_level_folder_description', { max: MAX_LEVEL_FOLDER_ALLOWED })}
          onSubmit={closeAllowFolderCreation}
          type={TYPE_MODAL_CONFIRM.CAN_NOT_ACTION}
        />
      )}
      {confirmDelete && (
        <ConfirmModal
          open={true}
          onClose={closeConfirmDelete}
          title={t('project_home_modal_delete_multi_project_title', { number: projectsSelected.length })}
          description={dict.project_home_modal_delete_multi_project_description}
          onSubmit={deleteMultiItems}
          onCancel={closeConfirmDelete}
          type={TYPE_MODAL_CONFIRM.DELETE}
        />
      )}
    </Stack>
  )
}
export default HeadPage
