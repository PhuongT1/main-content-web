import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { IMyProject, IProject } from '../../../../domain'
import { Group } from '../../atoms'
import { CardProjectCustom } from '../card-project-custom'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IGroupProjectCard {
  project: IMyProject
  onClick: (project: IMyProject) => void
}

export const GroupProjectCard = ({ project, onClick }: IGroupProjectCard) => {
  const { t } = useLanguage()
  const { palette } = useTheme()
  const itemData = project?.itemData as IProject

  const projectCard = useMemo(() => {
    const { imageUrl, name, groupName } = itemData || {}

    return {
      content: (
        <S.BoxCard>
          <Box display='flex' flexDirection='column' gap={convertToRem(16)} flex={1}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Group imageUrl={imageUrl || ''} name={groupName} />
            </Box>

            <Typography cate='subtitle_1_semibold' plainColor='sub.orange500' lines={2}>
              {name}
            </Typography>
          </Box>

          <Box display='flex'>
            <Typography cate='body_3' color={palette.home.gray100}>
              {t('project_home_number_of_participiant', { number: 25 })}
            </Typography>
          </Box>
        </S.BoxCard>
      )
    }
  }, [project])

  return <CardProjectCustom cardItem={projectCard} isActive={false} onClick={() => onClick(project)} />
}

export default GroupProjectCard
