import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import Button from '@/elements/button'
import { IProjectTemplate } from '../../../../domain'
import { LockCard } from '..'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IRecommendProjectTemplate {
  onSelect: (item: IProjectTemplate) => void
  project: IProjectTemplate
  isFreeUser: boolean
}

export const RecommendProjectTemplate = ({ onSelect, project, isFreeUser }: IRecommendProjectTemplate) => {
  const { t } = useLanguage()
  const { palette } = useTheme()

  return (
    <S.BoxCard
      sx={{
        background: `url(${project.imageUrls?.[0] || '/images/personal-project-template-1.png'}) 50%/cover no-repeat`
      }}
    >
      <Box display='flex' flexDirection='column' alignItems='flex-start' flex={1} gap={convertToRem(12)}>
        <Typography cate='title_4_semibold' color={palette.main.white} lines={1}>
          {project.name}
        </Typography>
        <Typography cate='caption_1_semibold' color={palette.main.white} lines={1}>
          {project.description}
        </Typography>
      </Box>
      <Box>
        <Button
          title={t('project_home_add_to_deck_list_count', { number: project.numberOfDeck })}
          type='button'
          onClick={() => {
            if (!project.isDisabled) {
              onSelect(project)
            }
          }}
          cate='contained'
          customSize={'sm'}
          sx={{
            color: palette.home.mint500,
            borderColor: palette.home.gray400,
            backgroundColor: palette.home.gray400,
            paddingX: convertToRem(24),
            paddingY: convertToRem(10),
            '&:hover, &:focus': {
              borderColor: 'rgba(144, 202, 249, 0.04)'
            }
          }}
        />
      </Box>
      {(isFreeUser || project.isDisabled) && <LockCard />}
    </S.BoxCard>
  )
}
