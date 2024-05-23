'use client'
import AddProjectIcon from '@/assets/icons/project-home/add-project'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, useTheme } from '@mui/material'
import { CardProjectCustom } from '../card-project-custom'
import { useLanguage } from '@/hooks/use-language'

interface IAddCard {
  onClick: () => void
}

export const AddCard = ({ onClick }: IAddCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()

  const createCard = {
    content: (
      <Stack flexDirection='column' justifyContent='center' alignItems='center' gap={convertToRem(18)} flex={1}>
        <AddProjectIcon />
        <Typography cate='title_50' color={palette.main_grey.gray_scale_50}>
          {dict.project_home_create_new_project}
        </Typography>
      </Stack>
    )
  }

  return <CardProjectCustom cardItem={createCard} isActive={false} onClick={onClick} />
}

export default AddCard
