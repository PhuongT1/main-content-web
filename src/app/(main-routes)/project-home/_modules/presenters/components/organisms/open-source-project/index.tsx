'use client'
import { Box, Stack, useTheme } from '@mui/material'
import {
  EXPLORER_CATEGORY_ENUM,
  IMoreActionItem,
  IMyProject,
  IProject,
  MORE_ACTIONS,
  OPEN_INNOVATION_MORE_OPTIONS,
  OPEN_INNOVATION_MORE_OPTIONS_ADMIN,
  PROJECT_PATHS_ENUM,
  STARTUP_BENCHMARKING_MORE_OPTIONS_ADMIN,
  TYPE_MODAL_CONFIRM
} from '../../../../domain'
import { getUrlWithParams, useExplorerProjectContext } from '../../../../utils'
import ScrollBar from 'react-perfect-scrollbar'
import { AddCard, BenchmarkCard, ConfirmModal, ProjectCard } from '../../../components/molecules'
import { remConvert } from '@/utils/convert-to-rem'
import { BookmarkProjectPayload, CloneProjectPayload, DeleteExplorersPayload } from '../../../../use-cases'
import { useExplorerModal } from '../../../hooks'
import { ModalChangeNameProject } from '../../../components/organisms'
import { useRouter } from 'next/navigation'
import { Typography } from '@/elements'
import ModalPremiumOnly from '../modal-premium-only'
import { useMemo } from 'react'
import { LoadMoreInfinite } from '../../atoms/load-more'
import { useLanguage } from '@/hooks/use-language'

export const OpenSourceProject = () => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const router = useRouter()
  const {
    isAdmin,
    isFreeUser,
    tabData,
    explorers,
    isEditProjects,
    explorersLoading,
    bookmarkProjectMutation,
    cloneProjectMutation,
    deleteExplorersMutation,
    fetchExplorers,
    fetchExplorersNextPage,
    setProjectsSelected
  } = useExplorerProjectContext()

  const {
    explorer: projectUpdate,
    open: openProjectUpdate,
    openModal: onOpenProjectUpdate,
    closeModal: onCloseProjectUpdate
  } = useExplorerModal()

  const {
    explorer: projectDelete,
    open: openProjectDelete,
    openModal: onOpenProjectDelete,
    closeModal: onCloseProjectDelete
  } = useExplorerModal()

  const {
    open: openProjectPremiumOnly,
    openModal: onOpenProjectPremiumOnly,
    closeModal: onCloseProjectPremiumOnly
  } = useExplorerModal()

  const onBookmark = (project: IMyProject) => {
    const dataBody = {
      explorerIds: [project.explorerId],
      category: tabData?.category
    } as BookmarkProjectPayload
    bookmarkProjectMutation.mutateAsync(dataBody).finally(() => fetchExplorers())
  }

  const onProjectActions = (item: IMoreActionItem | null, project: IMyProject) => {
    const itemData = project.itemData as IProject
    switch (item?.value) {
      //USER
      case MORE_ACTIONS.DUPLICATE_PROJECT:
        if (itemData.allowReplication) {
          const body = {
            projectId: itemData.id
          } as CloneProjectPayload
          cloneProjectMutation.mutate(body)
        }
        break
      case MORE_ACTIONS.TITLE_CHANGE:
        onOpenProjectUpdate({
          explorer: project
        })
        break
      case MORE_ACTIONS.EDIT_DECK_LIST:
        const url = getUrlWithParams(PROJECT_PATHS_ENUM.EDIT_PROJECT, { id: `${itemData.id}` })
        router.push(url)
        break
      case MORE_ACTIONS.DELETE:
        onOpenProjectDelete({
          explorer: project
        })
        break
      default:
        break
    }
  }

  const handleDeleteProject = async (project?: IMyProject | null) => {
    const explorerId = project?.explorerId || ''
    const dataBody = {
      explorerIds: [explorerId],
      category: tabData?.category
    } as DeleteExplorersPayload
    await deleteExplorersMutation.mutateAsync(dataBody)
    onCloseProjectDelete()
  }

  const toggleSelect = (selected: boolean, project: IMyProject) => {
    setProjectsSelected((prevState) => {
      let newList: IMyProject[] = []

      if (selected) {
        newList = [...prevState, project]
      } else {
        newList = prevState.filter((item) => item.explorerId !== project.explorerId)
      }

      return newList
    })
  }

  const onProjectCardClick = (project: IMyProject) => {
    const itemData = project.itemData as IProject
    let url: string = ''
    if (!isEditProjects) {
      if (isFreeUser) return onOpenProjectPremiumOnly()
      switch (tabData?.category) {
        case EXPLORER_CATEGORY_ENUM.OPEN_INNOVATION:
          url = getUrlWithParams(PROJECT_PATHS_ENUM.OPEN_INNOVATION_DETAIL, { id: `${itemData.id}` })
          router.push(url)
          break
        case EXPLORER_CATEGORY_ENUM.STARTUP:
          url = getUrlWithParams(PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING_DETAIL, { id: `${itemData.id}` })
          router.push(url)
          break
        default:
          break
      }
    }
  }

  const optionsCommomForUserCard = useMemo(() => OPEN_INNOVATION_MORE_OPTIONS(isFreeUser), [isFreeUser])

  const textModal = useMemo(() => {
    switch (tabData?.category) {
      case EXPLORER_CATEGORY_ENUM.OPEN_INNOVATION:
        return {
          title: dict.project_home_modal_delete_project_open_title,
          description: dict.project_home_modal_delete_project_open_description
        }
      default:
        return {
          title: dict.project_home_modal_delete_project_startup_title,
          description: dict.project_home_modal_delete_project_startup_description
        }
    }
  }, [tabData?.category, dict])

  return (
    <>
      <ScrollBar
        // onYReachEnd={() => hasNextPage && !isFetching && fetchNextPage()}
        style={{
          marginLeft: remConvert('-3px'),
          marginRight: remConvert('-3px'),
          padding: '1px'
        }}
      >
        <Stack direction={'row'} gap={remConvert('20px')} flexWrap='wrap'>
          {isAdmin && !explorersLoading && tabData?.value === PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING && (
            <AddCard
              onClick={() => {
                router.push(PROJECT_PATHS_ENUM.CREATE_PROJECT)
              }}
            />
          )}
          {explorers.map((item) => {
            switch (tabData?.category) {
              case EXPLORER_CATEGORY_ENUM.OPEN_INNOVATION:
                return (
                  <Box key={item.explorerId} sx={{ position: 'relative' }}>
                    <ProjectCard
                      project={item}
                      isEdit={isEditProjects}
                      options={isAdmin ? OPEN_INNOVATION_MORE_OPTIONS_ADMIN : optionsCommomForUserCard}
                      toggleSelect={toggleSelect}
                      onClickActions={onProjectActions}
                      onBookmark={onBookmark}
                      onClick={onProjectCardClick}
                    />
                  </Box>
                )

              case EXPLORER_CATEGORY_ENUM.STARTUP:
                return (
                  <Box key={item.explorerId} sx={{ position: 'relative' }}>
                    <BenchmarkCard
                      project={item}
                      isEdit={isEditProjects}
                      options={isAdmin ? STARTUP_BENCHMARKING_MORE_OPTIONS_ADMIN : optionsCommomForUserCard}
                      toggleSelect={toggleSelect}
                      onClickActions={onProjectActions}
                      onBookmark={onBookmark}
                      onClick={onProjectCardClick}
                    />
                  </Box>
                )
            }
          })}
        </Stack>
        {Boolean(explorers.length) && (
          <LoadMoreInfinite loading={explorersLoading} getNextPage={() => fetchExplorersNextPage()} />
        )}
      </ScrollBar>
      {openProjectUpdate && (
        <ModalChangeNameProject open={true} project={projectUpdate} onClose={onCloseProjectUpdate} />
      )}
      {openProjectDelete && (
        <ConfirmModal
          open={true}
          onClose={onCloseProjectDelete}
          title={textModal.title}
          description={
            <Typography cate='body_3' color={home.gray100}>
              {textModal.description}
            </Typography>
          }
          onSubmit={() => handleDeleteProject(projectDelete)}
          onCancel={onCloseProjectDelete}
          type={TYPE_MODAL_CONFIRM.DELETE}
        />
      )}
      {openProjectPremiumOnly && <ModalPremiumOnly open={true} onClose={onCloseProjectPremiumOnly} />}
    </>
  )
}
export default OpenSourceProject
