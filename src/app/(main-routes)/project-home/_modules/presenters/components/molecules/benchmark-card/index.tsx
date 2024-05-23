import BookmarkIcon from '@/assets/icons/bookmark'
import { Typography } from '@/elements'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { IMyProject, IProject, IMoreActionItem } from '../../../../domain'
import { getLastUpdateTimestamp } from '../../../../utils'
import { MoreAction, Participant, TextWIcon } from '../../atoms'
import { CardProjectCustom } from '../card-project-custom'
import Image from 'next/image'
import ChatIcon from '@/assets/icons/chat'
import EyeIcon from '@/assets/icons/eye'
import CheckFilledIcon from '@/assets/icons/check-filled'
import WhiteUncheckIcon from '@/assets/icons/logo/white-uncheck-icon'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IBenchmarkCard {
  project: IMyProject
  isEdit?: boolean
  isSelected?: boolean
  options?: IMoreActionItem[]
  onClick?: (project: IMyProject) => void
  onBookmark: (project: IMyProject) => void
  toggleSelect?: (selected: boolean, project: IMyProject) => void
  onClickActions: (item: IMoreActionItem | null, project: IMyProject) => void
}

export const BenchmarkCard = ({
  project,
  options,
  isEdit = false,
  isSelected = false,
  onClick,
  onBookmark,
  toggleSelect,
  onClickActions
}: IBenchmarkCard) => {
  const { palette } = useTheme()
  const { dict, t } = useLanguage()
  const itemData = project?.itemData as IProject
  const { bookmark = false, numberOfDeck, imageUrl, logoUrl } = itemData || {}
  const [isBookmark, setIsBookmark] = useState<boolean>(bookmark)
  const [selected, setSelected] = useState<boolean>(isSelected)

  const toggleBookmark = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onBookmark(project)
    setIsBookmark((prevState) => !prevState)
  }

  const onActionClick = (item: IMoreActionItem | null) => {
    onClickActions(item, project)
  }

  const onToggleSelect = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const toggle = !selected
    setSelected(toggle)
    toggleSelect?.(toggle, project)
  }

  const benchmarkCard = useMemo(() => {
    const { name, updatedAt, participants, totalViews, totalFeedbacks } = itemData || {}
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
                <Typography cate='body_3_semibold' color={palette.home.gray50} lines={1}>
                  {name}
                </Typography>
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

                <MoreAction options={options} id={`${project.explorerId}`} onActionClick={onActionClick} />
              </Box>
            </Box>

            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              paddingTop={convertToRem(8)}
              paddingBottom={convertToRem(24)}
            >
              <Image
                width={500}
                height={500}
                style={{ width: remConvert('134px'), height: remConvert('67px') }}
                alt='Logo'
                src={logoUrl || ''}
              />
            </Box>
          </Box>

          <Box display='flex' flexDirection='column' gap={convertToRem(16)}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Box display='flex' flexDirection='row' alignItems='center' gap={convertToRem(10)}>
                <TextWIcon
                  icon={EyeIcon}
                  description={`${totalViews}${dict.project_home_times}`}
                  colorDescription={palette.home.gray50}
                />
                <TextWIcon
                  icon={ChatIcon}
                  description={`${totalFeedbacks}${dict.project_home_piece}`}
                  colorDescription={palette.home.gray50}
                />
              </Box>
              <Typography cate='caption_1' color={palette.home.gray100}>
                {lastUpdatedAt}
              </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box display='flex' flexDirection='row' justifyContent='flex-start' width='60%'>
                <Typography cate='caption_1' color={palette.home.gray100}>
                  {t('project_home_piece_deck', { number: numberOfDeck })}
                </Typography>
              </Box>
              <Box display='flex' flexDirection='row' justifyContent='flex-end' width='40%'>
                {!!participants.length && <Participant participants={participants} />}
              </Box>
            </Box>
          </Box>
        </S.BoxCard>
      )
    }
  }, [project, isBookmark, selected, isEdit, dict])

  return (
    <CardProjectCustom
      cardItem={benchmarkCard}
      isActive={false}
      sxCard={{
        color: palette.home.gray50,
        background: `url(${imageUrl}) rgba(25, 26, 28, 0.85) 50%/cover no-repeat !important`,
        '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
          backgroundColor: `${palette.home.gray400}CC`
        },
        '&:hover, &:focus': {
          outline: `1px solid ${palette.home.blue500}`,
          background: `url(${imageUrl}) rgba(25, 26, 28, 0.85) 50%/cover no-repeat !important`,
          '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
            backgroundColor: 'inherit'
          }
        }
      }}
      onClick={() => onClick?.(project)}
    />
  )
}

export default BenchmarkCard
