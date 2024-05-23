import moment from 'moment'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { IENotice, IMyProject, PROJECT_PATHS_ENUM } from '../../../../domain'
import { useMemo } from 'react'
import { CardProjectCustom } from '../card-project-custom'
import Close from '@/assets/icons/close'
import { useRouter } from 'next/navigation'
import { getUrlWithParams } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface INoticeCard {
  project: IMyProject
  isClose?: boolean
  onDelete: (project: IMyProject) => void
}

export const NoticeCard = ({ project, isClose = true, onDelete }: INoticeCard) => {
  const { dict } = useLanguage()
  const router = useRouter()
  const { palette } = useTheme()
  const itemData = project?.itemData as IENotice

  const onCardClick = () => {
    const url = getUrlWithParams(PROJECT_PATHS_ENUM.NOTICE, { id: `${itemData.id}` })
    router.push(url)
  }

  const projectCard = useMemo(() => {
    const { title, content, updatedAt } = itemData || {}

    return {
      content: (
        <S.BoxCard>
          <Stack flexDirection='column' gap={convertToRem(16)} flex={1}>
            <Box display='flex'>
              <S.Tag
                sx={{ cursor: 'pointer' }}
                label={
                  <Typography cate='caption_1_semibold' color={palette.main_grey.gray_scale_50}>
                    {dict.project_home_status_notification}
                  </Typography>
                }
              />
            </Box>
            <Stack flexDirection='column' gap={convertToRem(8)}>
              <Typography cate='title_50' plainColor='home.mint500'>
                {title}
              </Typography>
              <Typography cate='caption_1' plainColor='home.gray50' lines={3}>
                <Box dangerouslySetInnerHTML={{ __html: content || '' }} />
              </Typography>
            </Stack>
          </Stack>

          <Typography cate='body_3' plainColor='home.gray100'>
            {dict.project_home_status_funding_period} : {moment(updatedAt).format('YYYY.MM.DD ~ HH.mm')}
          </Typography>

          {isClose && (
            <S.IconsClosed
              onClick={(e) => {
                e.stopPropagation()
                onDelete(project)
              }}
            >
              <Close color={palette.main_grey.gray_scale_50} />
            </S.IconsClosed>
          )}
        </S.BoxCard>
      )
    }
  }, [project])

  return <CardProjectCustom cardItem={projectCard} isActive={false} onClick={onCardClick} />
}

export default NoticeCard
