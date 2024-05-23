'use client'
import { Typography } from '@/elements'
import { Stack, StackProps, styled } from '@mui/material'
import {
  AddCard,
  BenchmarkCard,
  FolderCard,
  GroupProjectCard,
  NoticeCard,
  ProjectCard
} from '@/app/(main-routes)/project-home/_modules/presenters/components/molecules'
import { EXPLORER_ITEM_TYPE_ENUM, IMyProject, IMoreActionItem } from '@/app/(main-routes)/project-home/_modules/domain'
import { DATA_CARDS, FOLDER_DETAIL, GROUP_PROJECT_CARD } from './mocks'
import { BackToFolderCard } from '@/app/(main-routes)/project-home/_modules/presenters/components/molecules/back-to-folder-card'

const ListCards = styled(Stack)<StackProps>(({ theme }) => ({
  '.MuiPaper-root': {
    height: 'auto'
  }
}))

const CardProjectHomeStyleGuide = () => {
  const folderActionSelected = (action: IMoreActionItem | null, project: IMyProject) => {
    console.log(action, project)
  }

  const onBookmark = (project: IMyProject) => {}

  const onClickActions = (item: IMoreActionItem | null, project: IMyProject) => {}

  return (
    <Stack flexDirection='column' gap='30px'>
      <Typography cate='large_title' plainColor='main.white'>
        Cards
      </Typography>

      <ListCards flexDirection='row' flexWrap='wrap' gap='20px' alignItems='center' justifyContent='flex-start'>
        <AddCard onClick={() => console.log('click')} />
        <BackToFolderCard onClick={() => console.log('back')} folderDetail={FOLDER_DETAIL} />
        <BackToFolderCard onClick={() => console.log('back')} folderDetail={FOLDER_DETAIL} />
        <GroupProjectCard onClick={() => console.log('GroupProjectCard')} project={GROUP_PROJECT_CARD} />
        {DATA_CARDS.map((project: IMyProject, index: number) => {
          switch (project.itemType) {
            case EXPLORER_ITEM_TYPE_ENUM.PROJECT:
              return (
                <ProjectCard
                  project={project}
                  key={project.explorerId || index}
                  onBookmark={onBookmark}
                  onClickActions={onClickActions}
                />
              )
            case EXPLORER_ITEM_TYPE_ENUM.NOTICE:
              return <NoticeCard project={project} key={project.explorerId || index} onDelete={() => {}} />
            case EXPLORER_ITEM_TYPE_ENUM.AD:
              return (
                <BenchmarkCard
                  project={project}
                  key={project.explorerId || index}
                  onBookmark={() => {}}
                  onClickActions={() => {}}
                />
              )
            case EXPLORER_ITEM_TYPE_ENUM.FOLDER:
              return (
                <FolderCard
                  project={project}
                  key={project.explorerId || index}
                  onClick={(project: IMyProject) => console.log(project)}
                  onActionSelected={folderActionSelected}
                />
              )
            default:
              return null
          }
        })}
      </ListCards>
    </Stack>
  )
}

export default CardProjectHomeStyleGuide
