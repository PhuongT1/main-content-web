import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, SxProps, Theme } from '@mui/material'
import { useMemo, useState } from 'react'
import {
  IMyProject,
  IFolder,
  IMoreActionItem,
  FOLDER_MORE_OPTIONS,
  MORE_ACTIONS,
  IProjectHomeTab,
  PROJECT_PATHS_ENUM,
  GROUP_PROJECT_PATHS
} from '../../../../domain'
import Image from 'next/image'
import { CardProjectCustom } from '../card-project-custom'
import { FolderIllustrator } from '@/assets/images'
import { MoreAction } from '../../atoms'
import CheckFilledIcon from '@/assets/icons/check-filled'
import WhiteUncheckIcon from '@/assets/icons/logo/white-uncheck-icon'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IFolderCard {
  sxCard?: SxProps<Theme>
  project: IMyProject
  isSelected?: boolean
  isEdit?: boolean
  tabData?: IProjectHomeTab
  disabledSelect?: boolean
  onClick: (project: IMyProject) => void
  onActionSelected: (action: IMoreActionItem | null, project: IMyProject) => void
  toggleSelect?: (selected: boolean, project: IMyProject) => void
}

export const FolderCard = ({
  sxCard,
  project,
  isEdit = false,
  isSelected = false,
  tabData,
  disabledSelect = true,
  toggleSelect,
  onClick,
  onActionSelected
}: IFolderCard) => {
  const { dict } = useLanguage()
  const [selected, setSelected] = useState<boolean>(isSelected)
  const itemData = project?.itemData as IFolder

  const onCardClick = () => {
    if (!isEdit) {
      onClick(project)
    }
  }

  const onToggleSelect = () => {
    const toggle = !selected
    setSelected(toggle)
    toggleSelect?.(toggle, project)
  }

  const defaultOptions = useMemo(() => {
    const itemData = project.itemData as IFolder
    return FOLDER_MORE_OPTIONS.map((item) => {
      if (
        item.value === MORE_ACTIONS.DELETE &&
        GROUP_PROJECT_PATHS.includes(tabData?.value as PROJECT_PATHS_ENUM) &&
        itemData.totalItems
      ) {
        return {
          ...item,
          disabled: true
        }
      }
      return item
    })
  }, [tabData, project, FOLDER_MORE_OPTIONS])

  const folderCard = useMemo(() => {
    const { name, totalItems } = itemData || {}

    return {
      content: (
        <S.BoxCard>
          <Box display='flex' flexDirection='column' gap={convertToRem(5)} flex={1}>
            {isEdit && !disabledSelect && (
              <S.Checkbox onClick={onToggleSelect}>{selected ? <CheckFilledIcon /> : <WhiteUncheckIcon />}</S.Checkbox>
            )}
            <S.Icon>
              <MoreAction
                id={`${project.explorerId}`}
                onActionClick={(action: IMoreActionItem | null) => onActionSelected(action, project)}
                options={defaultOptions}
              />
            </S.Icon>

            <Box
              position='relative'
              display='flex'
              justifyContent='center'
              alignItems='center'
              paddingTop={convertToRem(16)}
              paddingBottom={convertToRem(32)}
            >
              <Image alt='Folder Icon' src={FolderIllustrator} width={95} height={95} />
              <S.FolderLabel>
                <Typography cate='caption_2_semibold' plainColor='home.gray50'>
                  {totalItems || 0}
                  {dict.project_home_piece}
                </Typography>
              </S.FolderLabel>
            </Box>

            <Typography cate='body_2' plainColor='home.gray50' textAlign='center' lines={2}>
              {name}
            </Typography>
          </Box>
        </S.BoxCard>
      )
    }
  }, [project, selected, isEdit, dict])

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
      cardItem={folderCard}
      isActive={false}
      onClick={onCardClick}
    />
  )
}

export default FolderCard
