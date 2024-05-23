'use client'
import Image from 'next/image'
import { Stack, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import { IProjectTemplate } from '../../../../domain'
import { LockCard } from '..'
import { convertToRem } from '@/utils/convert-to-rem'
import { TextWIcon } from '../../atoms'
import IcCheck from '@/assets/icons/ic-check'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IGroupTemplateCard {
  template: IProjectTemplate
  templateSelected: IProjectTemplate | null
  setTemplateSelected: (template: IProjectTemplate) => void
  isFreeUser?: boolean
}

export const GroupTemplateCard = ({
  template,
  templateSelected,
  setTemplateSelected,
  isFreeUser
}: IGroupTemplateCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { id: templateId, name, groupName, decks, imageUrls, isMember, allowOtherCreate } = template || {}
  const imageUrl = imageUrls?.[0]

  return (
    <S.BoxCard
      className={templateId === templateSelected?.id ? 'selected' : ''}
      onClick={() => {
        if (!isFreeUser) {
          setTemplateSelected(template)
        }
      }}
    >
      <S.BoxIcon>
        {template?.id === templateSelected?.id ? (
          <RadioOutlineFilledIcon color={palette.home.blue500} />
        ) : (
          <RadioOutlineIcon color={palette.home.gray100} />
        )}
      </S.BoxIcon>

      <Stack flexDirection='row' gap={convertToRem(8)} alignItems='center'>
        <S.Avatar>
          <Image src={imageUrl || '/images/group-avatar.png'} alt={groupName} width={20} height={20} />
        </S.Avatar>
        <Typography cate='caption_1_semibold' color={palette.home.gray100} flex={1}>
          {groupName}
        </Typography>
      </Stack>

      <Stack>
        <Typography
          cate='body_2_semibold'
          color={palette.home.gray50}
          textAlign='center'
          lines={2}
          sx={{
            whiteSpace: 'pre-line'
          }}
        >
          {name}
        </Typography>
      </Stack>

      <Stack flexDirection='row' gap={convertToRem(8)}>
        <TextWIcon icon={IcCheck} description={dict.project_home_public_project} colorIcon={palette.home.gray100} />
        <TextWIcon
          icon={IcCheck}
          description={`DECK ${decks?.length || 0}${dict.project_home_piece}`}
          colorIcon={palette.home.gray100}
        />
      </Stack>

      {(isFreeUser || (!isMember && !allowOtherCreate)) && (
        <LockCard label={dict.project_home_participation_limitations} />
      )}
    </S.BoxCard>
  )
}
export default GroupTemplateCard
