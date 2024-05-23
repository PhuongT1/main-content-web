'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, DragEndEvent, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useDialog } from '@/hooks/use-dialog'
import { useExplorerModal } from '../../../hooks'
import {
  IFolderDetail,
  IMyProject,
  IMoreActionItem,
  IFolder,
  IParentFolder,
  IENotice,
  IProject,
  MORE_ACTIONS,
  EXPLORER_ITEM_TYPE_ENUM,
  EXPLORER_CATEGORY_ENUM,
  NOTICE_ADD_REACT_ENUM,
  MORE_ACTIONS_PARTICIPATING,
  PROJECT_PATHS_ENUM,
  TYPE_MODAL_CONFIRM,
  GROUP_PROJECT_PATHS
} from '../../../../domain'
import { getUrlWithParams, useExplorerProjectContext } from '../../../../utils'
import {
  BookmarkProjectPayload,
  CloneProjectPayload,
  DeleteExplorersPayload,
  MoveItemToFolderPayload,
  NoticeAdReactPayload,
  NoticeAdReactResponse,
  noticeAdReact
} from '../../../../use-cases'
import { Typography } from '@/elements'
import ModalPremiumOnly from '../modal-premium-only'
import { LoadMoreInfinite } from '../../atoms/load-more'
import { useLanguage } from '@/hooks/use-language'

const AddCard = dynamic(() => import('../../molecules/add-card'))
const ProjectCard = dynamic(() => import('../../molecules/project-card'))
const ProjectParticipatingCard = dynamic(() => import('../../molecules/project-card/participating-card'))
const BackToFolderCard = dynamic(() => import('../../molecules/back-to-folder-card'))
const DragAndDropItem = dynamic(() => import('../../molecules/drag-and-drop-item'))
const FolderCard = dynamic(() => import('../../molecules/folder-card'))
const NoticeCard = dynamic(() => import('../../molecules/notice-card'))
const ModalProjectCreation = dynamic(() => import('../modal-project-creation'), { ssr: false })
const ModalChangeNameProject = dynamic(() => import('../modal-change-name-project'), { ssr: false })
const ModalCreateFolder = dynamic(() => import('../modal-create-folder'), { ssr: false })
const ModalCreateGroupProject = dynamic(() => import('../modal-create-group-project'), { ssr: false })
const ModalDeleteFolder = dynamic(() => import('../modal-delete-folder'), { ssr: false })
const ModalShareProject = dynamic(() => import('../modal-share-project'), { ssr: false })
const ConfirmModal = dynamic(() => import('../../molecules/alerts/confirm-modal'), { ssr: false })

interface IExplorersProject {
  folderDetail?: IFolderDetail
}

const CAN_DRAG_DROP = [EXPLORER_ITEM_TYPE_ENUM.PROJECT, EXPLORER_ITEM_TYPE_ENUM.FOLDER]

export const ExplorersProject = ({ folderDetail }: IExplorersProject) => {
  const { dict } = useLanguage()
  const router = useRouter()
  const { palette } = useTheme()
  const { open: openCreation, onOpen: onOpenCreation, onClose: onCloseCreation } = useDialog()
  const { open: openCreateGroup, onOpen: onOpenCreateGroup, onClose: onCloseCreateGroup } = useDialog()
  const {
    explorer: noticeDelete,
    open: deleteNotice,
    openModal: openDeleteNotice,
    closeModal: closeDeleteNotice
  } = useExplorerModal()
  const {
    explorer: folderDelete,
    open: openDeleteFolderModal,
    openModal: onOpenDeleteFolderModal,
    closeModal: onCloseDeleteFolderModal
  } = useExplorerModal()
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
    explorer: projectShare,
    open: openProjectShare,
    openModal: onOpenProjectShare,
    closeModal: onCloseProjectShare
  } = useExplorerModal()
  const {
    open: openProjectPremiumOnly,
    openModal: onOpenProjectPremiumOnly,
    closeModal: onCloseProjectPremiumOnly
  } = useExplorerModal()
  const {
    isFreeUser,
    tabData,
    pageType,
    explorers,
    folderCreate,
    openCreateFolderModal,
    isEditProjects,
    explorersLoading,
    deleteExplorersMutation,
    cloneProjectMutation,
    bookmarkProjectMutation,
    moveItemToFolderMutation,
    fetchExplorersNextPage,
    fetchExplorers,
    setFolderDetail,
    setExplorers,
    onOpenCreateFolderModal,
    onCloseCreateFolderModal,
    handleAfterCreateFolder,
    openAllowFolderCreation,
    setProjectsSelected
  } = useExplorerProjectContext()
  const [activeExplorer, setActiveExplorer] = useState<IMyProject | null>(null)
  const [currentDropExplorer, setCurrentDropExplorer] = useState<string | null>(null)

  const styleDragOver = {
    outline: `1px solid ${palette.home.blue500}`,
    backgroundColor: 'rgba(60, 130, 249, 0.10) !important',
    backgroundImage: 'none',
    '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
      backgroundColor: 'transparent'
    }
  }
  const styleOverlay = {
    '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
      cursor: 'grabbing !important'
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      distance: 10,
      tolerance: 0
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 0
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const findExplorerById = (id: string | number): IMyProject | null => {
    return explorers.find((item) => item.explorerId?.toString() === id.toString()) || null
  }

  const folderActionSelected = (action: IMoreActionItem | null, folder: IMyProject) => {
    switch (action?.value) {
      case MORE_ACTIONS.TITLE_CHANGE:
        onOpenCreateFolderModal({ explorer: folder })
        break
      case MORE_ACTIONS.DELETE:
        onOpenDeleteFolderModal({ explorer: folder })
        break
      default:
        break
    }
  }

  const onBackToParent = (parent: IParentFolder) => {
    let url: string = ''
    switch (tabData?.category) {
      case EXPLORER_CATEGORY_ENUM.MY_PROJECTS:
        if (parent.id) {
          url = getUrlWithParams(PROJECT_PATHS_ENUM.MY_PROJECT_FOLDER, { id: `${parent.id}` })
        } else {
          url = getUrlWithParams(PROJECT_PATHS_ENUM.MY_PROJECT)
        }
        break
      case EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS:
        if (parent.id) {
          url = getUrlWithParams(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_FOLDER, { id: `${parent.id}` })
        } else {
          url = getUrlWithParams(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT)
        }
        break
      case EXPLORER_CATEGORY_ENUM.GROUP_PROJECTS:
        if (parent.id) {
          if (parent.level === 1) {
            url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL, { id: `${parent.explorerId}` })
          } else {
            const { parents, explorerId } = folderDetail || {}
            const parentExplorerId = parents?.[parents.length - 1]?.explorerId || explorerId
            url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER, {
              id: `${parentExplorerId}`,
              folderId: `${parent.id}`
            })
          }
        } else {
          url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE)
        }
        break
      default:
        break
    }

    router.push(url)
  }

  const renderDefaultCard = () => {
    switch (pageType) {
      case PROJECT_PATHS_ENUM.MY_PROJECT:
        return <AddCard onClick={onOpenCreation} />
      case PROJECT_PATHS_ENUM.MY_PROJECT_FOLDER:
      case PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_FOLDER:
        return <BackToFolderCard key={folderDetail?.id} onClick={onBackToParent} folderDetail={folderDetail} />
      case PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL:
      case PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER:
        return (
          <BackToFolderCard
            title={dict.project_home_title_group_project}
            onClick={onBackToParent}
            folderDetail={folderDetail}
          />
        )
      default:
        return null
    }
  }

  const onFolderClick = (folder: IMyProject) => {
    let url: string = ''
    switch (tabData?.category) {
      case EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS:
        url = getUrlWithParams(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_FOLDER, { id: `${folder.itemData.id}` })
        router.push(url)
        break
      case EXPLORER_CATEGORY_ENUM.MY_PROJECTS:
        url = getUrlWithParams(PROJECT_PATHS_ENUM.MY_PROJECT_FOLDER, { id: `${folder.itemData.id}` })
        router.push(url)
        break
      case EXPLORER_CATEGORY_ENUM.GROUP_PROJECTS:
        const { parents, explorerId } = folderDetail || {}
        const parentExplorerId = parents?.[parents.length - 1]?.explorerId || explorerId

        url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER, {
          id: `${parentExplorerId}`,
          folderId: `${folder.itemData.id}`
        })
        router.push(url)
        break
      default:
        break
    }
  }

  const handleDragStart = (event: DragEndEvent) => {
    const explorerFound = findExplorerById(event.active.id)
    setActiveExplorer(explorerFound as IMyProject)
  }

  const handleDragProjectOverFolder = async (project: IMyProject, folder: IMyProject) => {
    const dataBody = {
      targetExplorerId: folder.explorerId,
      explorerIds: [project.explorerId],
      category: tabData?.category
    }
    await moveItemToFolderMutation.mutateAsync(dataBody as MoveItemToFolderPayload)
  }

  const handleDragProjectOverProject = (projectDrag: IMyProject, projectOver: IMyProject) => {
    const moveProjectsAfterCreate = async (folder: IFolder) => {
      if (!folder) {
        return
      }
      const dataBody = {
        targetExplorerId: folder.explorerId,
        explorerIds: [projectDrag.explorerId, projectOver.explorerId],
        category: tabData?.category
      } as MoveItemToFolderPayload
      await moveItemToFolderMutation.mutateAsync(dataBody as MoveItemToFolderPayload)
    }
    onOpenCreateFolderModal({ afterCreateFolder: moveProjectsAfterCreate })
  }

  const handleDragFolderOverFolder = async (folderDrag: IMyProject, folderOver: IMyProject) => {
    const dataDrag = folderDrag.itemData as IFolder
    const dataOver = folderOver.itemData as IFolder
    if (dataDrag.totalFolders >= 1 || dataOver.totalFolders >= 1) {
      openAllowFolderCreation()
      return
    }

    const dataBody = {
      targetExplorerId: folderOver.explorerId,
      explorerIds: [folderDrag.explorerId],
      category: tabData?.category
    }
    await moveItemToFolderMutation.mutateAsync(dataBody as MoveItemToFolderPayload)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveExplorer(null)
    setCurrentDropExplorer(null)

    const { active, over } = event

    if (!active?.id || !over?.id || active.id === over.id) {
      return
    }

    const explorerActive = findExplorerById(active.id)
    const explorerOver = findExplorerById(over.id)

    if (!explorerActive || !explorerOver) {
      return
    }

    if (
      explorerActive.itemType === EXPLORER_ITEM_TYPE_ENUM.PROJECT &&
      explorerOver.itemType === EXPLORER_ITEM_TYPE_ENUM.FOLDER
    ) {
      handleDragProjectOverFolder(explorerActive, explorerOver)
    }

    if (
      explorerActive.itemType === EXPLORER_ITEM_TYPE_ENUM.PROJECT &&
      explorerOver.itemType === EXPLORER_ITEM_TYPE_ENUM.PROJECT
    ) {
      handleDragProjectOverProject(explorerActive, explorerOver)
    }

    if (
      explorerActive.itemType === EXPLORER_ITEM_TYPE_ENUM.FOLDER &&
      explorerOver.itemType === EXPLORER_ITEM_TYPE_ENUM.FOLDER
    ) {
      handleDragFolderOverFolder(explorerActive, explorerOver)
    }
  }

  const getCardStyle = (isOverlay: boolean, isDragOver: boolean) => {
    if (isOverlay) {
      return styleOverlay
    } else if (isDragOver) {
      return styleDragOver
    }
    return undefined
  }

  const onBookmark = async (project: IMyProject) => {
    const dataBody = {
      explorerIds: [project.explorerId],
      category: tabData?.category
    } as BookmarkProjectPayload
    await bookmarkProjectMutation.mutateAsync(dataBody)
    fetchExplorers()
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

  const noticeAdReactMutation = useMutation({
    mutationFn: noticeAdReact,
    onSuccess: (data: NoticeAdReactResponse) => {
      const { data: response, error } = data

      if (error) {
        enqueueSnackbar('An error occurred when delete notice', {
          variant: 'error'
        })
        return
      }
      fetchExplorers()
    }
  })

  const handleDeleteNotice = async () => {
    const itemData = (noticeDelete?.itemData || {}) as IENotice
    const body = {
      id: itemData.id.toString(),
      position: tabData?.category,
      type: NOTICE_ADD_REACT_ENUM.MARK_DELETE
    } as NoticeAdReactPayload

    await noticeAdReactMutation.mutateAsync(body)
    closeDeleteNotice()
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

  const onProjectCardClick = (project: IMyProject) => {
    const itemData = project.itemData as IProject
    let url: string = ''
    if (!isEditProjects) {
      switch (tabData?.category) {
        case EXPLORER_CATEGORY_ENUM.MY_PROJECTS:
          url = getUrlWithParams(PROJECT_PATHS_ENUM.MY_PROJECT_DETAIL, { id: `${itemData.id}` })
          router.push(url)
          break
        case EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS:
          if (isFreeUser) return onOpenProjectPremiumOnly()
          url = getUrlWithParams(PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_DETAIL, { id: `${itemData.id}` })
          router.push(url)
          break
        case EXPLORER_CATEGORY_ENUM.GROUP_PROJECTS:
          url = getUrlWithParams(PROJECT_PATHS_ENUM.GROUP_PROJECT_DETAIL, { id: `${itemData.id}` })
          router.push(url)
          break
        default:
          break
      }
    }
  }

  const onProjectActions = (item: IMoreActionItem | null, project: IMyProject) => {
    const itemData = project.itemData as IProject

    switch (item?.value) {
      case MORE_ACTIONS.TITLE_CHANGE:
        onOpenProjectUpdate({
          explorer: project
        })
        break
      case MORE_ACTIONS.EDIT_DECK_LIST:
        const url = getUrlWithParams(PROJECT_PATHS_ENUM.EDIT_PROJECT, { id: `${itemData.id}` })
        router.push(url)
        break
      case MORE_ACTIONS_PARTICIPATING.DELETE:
      case MORE_ACTIONS.DELETE:
        onOpenProjectDelete({
          explorer: project
        })
        break
      case MORE_ACTIONS.SET_SHARING:
        onOpenProjectShare({ explorer: project })
        break
      case MORE_ACTIONS_PARTICIPATING.CLONE:
      case MORE_ACTIONS.DUPLICATE_PROJECT:
        if (itemData.allowReplication) {
          const body = {
            projectId: itemData.id
          } as CloneProjectPayload
          cloneProjectMutation.mutate(body)
        }
        break
      default:
        break
    }
  }

  const renderItem = (project: IMyProject | null, isOverlay?: boolean) => {
    if (!project) {
      return null
    }

    const isDragOver =
      CAN_DRAG_DROP.includes(project.itemType) &&
      project.explorerId?.toString() === currentDropExplorer &&
      currentDropExplorer !== activeExplorer?.explorerId?.toString()

    const cardStyle = getCardStyle(!!isOverlay, isDragOver)

    switch (project.itemType) {
      case EXPLORER_ITEM_TYPE_ENUM.PROJECT:
        switch (tabData?.value) {
          case PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT:
            return (
              <ProjectParticipatingCard
                key={project.explorerId}
                project={project}
                sxCard={cardStyle}
                isEdit={isEditProjects}
                tabData={tabData}
                onClick={onProjectCardClick}
                toggleSelect={toggleSelect}
                onBookmark={onBookmark}
                onClickActions={onProjectActions}
              />
            )
          default:
            return (
              <ProjectCard
                key={project.explorerId}
                project={project}
                sxCard={cardStyle}
                isEdit={isEditProjects}
                showMore={pageType !== PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL}
                tabData={tabData}
                onClick={onProjectCardClick}
                toggleSelect={toggleSelect}
                onBookmark={onBookmark}
                onClickActions={onProjectActions}
              />
            )
        }
      case EXPLORER_ITEM_TYPE_ENUM.NOTICE:
        return (
          <NoticeCard
            project={project}
            key={project.explorerId}
            onDelete={(notice: IMyProject) => openDeleteNotice({ explorer: notice })}
          />
        )
      case EXPLORER_ITEM_TYPE_ENUM.FOLDER:
        const itemData = project.itemData as IFolder
        const disabledSelect = GROUP_PROJECT_PATHS.includes(tabData?.value as PROJECT_PATHS_ENUM) && itemData.totalItems
        return (
          <FolderCard
            key={project.explorerId}
            project={project}
            sxCard={cardStyle}
            isEdit={isEditProjects}
            tabData={tabData}
            disabledSelect={!!disabledSelect}
            onClick={onFolderClick}
            onActionSelected={folderActionSelected}
            toggleSelect={toggleSelect}
          />
        )
      default:
        return null
    }
  }

  useEffect(() => {
    setExplorers(explorers)
  }, [explorers])

  useEffect(() => {
    setFolderDetail((folderDetail || {}) as IFolderDetail)
  }, [folderDetail])

  return (
    <Box>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <Box display='flex' gap={convertToRem(20)} flexWrap='wrap'>
          {renderDefaultCard()}
          {explorers.map((project: IMyProject) => {
            return CAN_DRAG_DROP.includes(project.itemType) && !isEditProjects ? (
              <DragAndDropItem
                key={project.explorerId}
                id={`${project.explorerId}`}
                setCurrentDropExplorer={setCurrentDropExplorer}
              >
                {renderItem(project)}
              </DragAndDropItem>
            ) : (
              renderItem(project)
            )
          })}
          {Boolean(explorers.length) && (
            <LoadMoreInfinite loading={explorersLoading} getNextPage={() => fetchExplorersNextPage()} />
          )}
        </Box>
        <DragOverlay>{activeExplorer ? <>{renderItem(activeExplorer, true)}</> : null}</DragOverlay>
      </DndContext>
      {!!openCreation && (
        <ModalProjectCreation
          open={true}
          onClose={onCloseCreation}
          openCreateGroupProject={() => {
            onCloseCreation()
            onOpenCreateGroup()
          }}
        />
      )}
      {openCreateGroup && <ModalCreateGroupProject open={true} onClose={onCloseCreateGroup} />}
      {openCreateFolderModal && (
        <ModalCreateFolder
          open={true}
          folder={folderCreate}
          onClose={onCloseCreateFolderModal}
          afterCreate={handleAfterCreateFolder}
        />
      )}
      {openDeleteFolderModal && (
        <ModalDeleteFolder open={true} folder={folderDelete} onClose={onCloseDeleteFolderModal} />
      )}
      {deleteNotice && (
        <ConfirmModal
          open={true}
          onClose={closeDeleteNotice}
          title={dict.project_home_modal_delete_notice_title}
          description={dict.project_home_modal_delete_notice_description}
          onSubmit={handleDeleteNotice}
          onCancel={closeDeleteNotice}
          type={TYPE_MODAL_CONFIRM.DELETE}
        />
      )}
      {openProjectUpdate && (
        <ModalChangeNameProject open={true} project={projectUpdate} onClose={onCloseProjectUpdate} />
      )}
      {openProjectDelete && (
        <ConfirmModal
          open={true}
          onClose={onCloseProjectDelete}
          title={
            tabData?.category === EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS
              ? dict.project_home_modal_notification_title
              : dict.project_home_delete_project_title
          }
          description={
            <Typography
              cate='body_3'
              color={palette.home.gray100}
              sx={{ whiteSpace: 'pre-line', lineHeight: convertToRem(24) }}
            >
              {tabData?.category === EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS
                ? dict.project_home_modal_notification_description
                : dict.project_home_delete_project_description}
            </Typography>
          }
          onSubmit={() => handleDeleteProject(projectDelete)}
          onCancel={onCloseProjectDelete}
          type={TYPE_MODAL_CONFIRM.DELETE}
        />
      )}
      {openProjectShare && (
        <ModalShareProject open={true} project={(projectShare || {}) as IMyProject} onClose={onCloseProjectShare} />
      )}
      {openProjectPremiumOnly && <ModalPremiumOnly open={true} onClose={onCloseProjectPremiumOnly} />}
    </Box>
  )
}

export default ExplorersProject
