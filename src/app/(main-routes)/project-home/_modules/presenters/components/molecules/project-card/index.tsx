import BookmarkIcon from '@/assets/icons/bookmark'
import EyeIcon from '@/assets/icons/eye'
import ChatIcon from '@/assets/icons/chat'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack, SxProps, Theme, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import {
  IMyProject,
  IProject,
  IMoreActionItem,
  PROJECT_TYPE_ENUM,
  EXPLORER_CATEGORY_ENUM,
  PROJECT_MORE_OPTIONS,
  MORE_ACTIONS,
  IProjectHomeTab
} from '../../../../domain'
import { getLastUpdateTimestamp } from '../../../../utils'
import { Group, TextWIcon, Participant, TagStatus, MoreAction } from '../../atoms'
import { ProgressBar } from '..'
import { CardProjectCustom } from '../card-project-custom'
import CheckFilledIcon from '@/assets/icons/check-filled'
import WhiteUncheckIcon from '@/assets/icons/logo/white-uncheck-icon'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

export interface IProjectCard {
  sxCard?: SxProps<Theme>
  project: IMyProject
  isSelected?: boolean
  isEdit?: boolean
  options?: IMoreActionItem[]
  showMore?: boolean
  tabData?: IProjectHomeTab
  onClick?: (project: IMyProject) => void
  toggleSelect?: (selected: boolean, project: IMyProject) => void
  onBookmark: (project: IMyProject) => void
  onClickActions: (item: IMoreActionItem | null, project: IMyProject) => void
}

export const ProjectCard = ({
  sxCard,
  project,
  isSelected = false,
  isEdit = false,
  options,
  showMore = true,
  tabData,
  onClick,
  onBookmark,
  toggleSelect,
  onClickActions
}: IProjectCard) => {
  const { palette } = useTheme()
  const { dict, t } = useLanguage()
  const itemData = project?.itemData as IProject
  const { bookmark = false } = itemData || {}
  const [isBookmark, setIsBookmark] = useState<boolean>(bookmark)
  const [selected, setSelected] = useState<boolean>(isSelected)

  const defaultOptions = useMemo(() => {
    const itemData = project.itemData as IProject
    return PROJECT_MORE_OPTIONS.map((item) => {
      if (item.value === MORE_ACTIONS.DUPLICATE_PROJECT && !itemData.allowReplication) {
        return {
          ...item,
          disabled: true
        }
      }
      return item
    })
  }, [project, PROJECT_MORE_OPTIONS])

  const toggleBookmark = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onBookmark(project)
    setIsBookmark(!isBookmark)
  }

  const onToggleSelect = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const toggle = !selected
    setSelected(toggle)
    toggleSelect?.(toggle, project)
  }

  const onActionsClick = (item: IMoreActionItem | null) => {
    onClickActions(item, project)
  }

  const projectCard = useMemo(() => {
    const { type, status, name, progress, numberOfDeck, updatedAt, participants, creator, totalFeedbacks, totalViews } =
      itemData || {}
    const lastUpdatedAt = getLastUpdateTimestamp(updatedAt)

    return {
      content: (
        <S.BoxCard>
          <Box display='flex' flexDirection='column' gap={convertToRem(5)} flex={1}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Stack flexDirection='row' alignItems='center' gap={convertToRem(12)}>
                {isEdit && (
                  <S.Checkbox onClick={onToggleSelect}>
                    {selected ? <CheckFilledIcon /> : <WhiteUncheckIcon />}
                  </S.Checkbox>
                )}
                <TagStatus type={type} status={status} />
              </Stack>

              <Box display='flex' justifyContent='flex-end' alignItems='center' gap='5px'>
                <S.Icon onClick={toggleBookmark}>
                  <BookmarkIcon
                    width={24}
                    height={24}
                    stroke={isBookmark ? palette.home.blue500 : palette.home.alpha_white_12}
                    fill={isBookmark ? palette.home.blue500 : palette.home.gray200}
                  />
                </S.Icon>
                {showMore && (
                  <MoreAction
                    id={`${project.explorerId}`}
                    options={options || defaultOptions}
                    onActionClick={onActionsClick}
                  />
                )}
              </Box>
            </Box>

            <Typography cate='body_2' plainColor='home.gray50' lines={2}>
              {name}
            </Typography>
          </Box>

          <Box display='flex' flexDirection='column' gap={convertToRem(16)}>
            {type === PROJECT_TYPE_ENUM.OPEN_INNOVATION ? (
              <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Box display='flex' flexDirection='row' alignItems='center' gap={convertToRem(10)}>
                  <TextWIcon
                    icon={EyeIcon}
                    colorIcon={palette.home.gray50}
                    colorDescription={palette.home.gray50}
                    description={`${totalViews}${dict.project_home_times}`}
                  />
                  <TextWIcon
                    icon={ChatIcon}
                    colorIcon={palette.home.gray50}
                    colorDescription={palette.home.gray50}
                    description={`${totalFeedbacks}${dict.project_home_piece}`}
                  />
                </Box>
                <Typography cate='caption_1' color={palette.home.gray100}>
                  {lastUpdatedAt}
                </Typography>
              </Box>
            ) : (
              <ProgressBar progress={progress}>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                  <Box display='flex' flex={1} gap={convertToRem(10)}>
                    <Typography
                      cate='button_3_semibold'
                      color={progress >= 100 ? palette.home.blue500 : palette.home.mint500}
                    >
                      {progress}%
                    </Typography>
                    <Typography cate='caption_1' color={palette.home.gray100}>
                      {t('project_home_piece_deck', { number: numberOfDeck })}
                    </Typography>
                  </Box>
                  <Typography cate='caption_1' color={palette.home.gray100}>
                    {lastUpdatedAt}
                  </Typography>
                </Box>
              </ProgressBar>
            )}

            <Box display='flex' justifyContent='space-between' alignItems='center'>
              {tabData?.category === EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS ? (
                <Group
                  imageUrl={creator.avatarUrl || ''}
                  name={t('project_home_whose_project', { name: creator.nickname })}
                />
              ) : (
                <>
                  <Box display='flex' flexDirection='row' justifyContent='flex-start' width='60%'>
                    {type === PROJECT_TYPE_ENUM.OPEN_INNOVATION && (
                      <Typography cate='caption_1' color={palette.home.gray50}>
                        {t('project_home_piece_deck', { number: (project.itemData as IProject)?.numberOfDeck })}
                      </Typography>
                    )}
                    {type === PROJECT_TYPE_ENUM.GROUP && (
                      <Group imageUrl={creator.avatarUrl || ''} name={creator.nickname} />
                    )}
                  </Box>
                  <Box display='flex' flexDirection='row' justifyContent='flex-end' width='40%'>
                    {participants && !!participants.length && <Participant participants={participants} />}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </S.BoxCard>
      )
    }
  }, [project, isBookmark, selected, isEdit, dict])

  const cardStyles: SxProps<Theme> = isEdit
    ? {
        '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
          cursor: 'default'
        }
      }
    : {}

  return (
    <CardProjectCustom
      sxCard={{
        ...cardStyles,
        ...(sxCard || {})
      }}
      cardItem={projectCard}
      isActive={false}
      onClick={() => onClick?.(project)}
    />
  )
}

export default ProjectCard
