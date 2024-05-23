import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { TextWIcon } from '../../atoms'
import ClockIcon from '@/assets/icons/clock'
import SharedIcon from '@/assets/icons/shared'
import Button from '@/elements/button'
import { DECK_CATEGORY_ENUM, ProjectDeckItem } from '../../../../domain'
import { LockCard } from '..'
import { useMemo } from 'react'
import { formatNumberWithText } from '@/utils/string'
import { ColorPalette } from '@/themes/get-design-tokens'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IDeckCard {
  deckItem: ProjectDeckItem
  selectDecks: ProjectDeckItem[]
  onSelectDeck: (deckItem: ProjectDeckItem) => void
}

const mapDeckTypeToColor = (category?: DECK_CATEGORY_ENUM): ColorPalette => {
  switch (category) {
    case DECK_CATEGORY_ENUM.IDEA_COMMERCIALIZATION:
      return 'home.blue500'
    case DECK_CATEGORY_ENUM.STARTUP_SIMULATION:
      return 'home.yellow'
    case DECK_CATEGORY_ENUM.FRAMEWORK:
      return 'home.mint500'
    default:
      return 'home.blue500'
  }
}

export const DeckCard = ({ deckItem, selectDecks, onSelectDeck }: IDeckCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const totalUsages = useMemo(() => {
    return formatNumberWithText(deckItem?.totalUsages || '')
  }, [deckItem])
  const hasActive = useMemo(() => selectDecks.find((deck) => deck.id === deckItem.id), [deckItem, selectDecks])

  return (
    <S.BoxCard
      sx={
        hasActive
          ? {
              backgroundColor: 'rgba(60, 130, 249, 0.10)',
              outline: `1px solid ${palette.home.blue500}`
            }
          : {}
      }
    >
      <Typography cate='subtitle_1_semibold' plainColor='main.white' lines={1}>
        {deckItem.name}
      </Typography>

      <Box display='flex' flexDirection='column' gap={convertToRem(6)}>
        <Typography cate='body_3_semibold' plainColor={mapDeckTypeToColor(deckItem.category)} lines={1}>
          {deckItem.name}
        </Typography>
        <Typography cate='caption_1' plainColor='home.gray100' lines={3}>
          {deckItem.description}
        </Typography>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center' gap={convertToRem(10)}>
        <TextWIcon icon={SharedIcon} name={dict.project_home_be_born} description={`${totalUsages}건`} />
        <TextWIcon icon={ClockIcon} name={dict.project_home_duration} description={`${deckItem.workingTime}분`} />
      </Box>

      <Box>
        <Button
          title={dict.project_home_add_to_deck_list}
          type='button'
          onClick={() => {
            if (!deckItem.isDisabled) {
              onSelectDeck(deckItem)
            }
          }}
          cate='outlined'
          customSize={'sm'}
          sx={{
            width: '100%',
            fontWeight: 600,
            fontSize: convertToRem(14),
            color: palette.home.blue500,
            backgroundColor: 'rgba(60, 130, 249, 0.10)',
            borderColor: palette.home.blue500,
            paddingY: convertToRem(12),
            minHeight: convertToRem(42),
            '&:hover': {
              backgroundColor: palette.home.blue500,
              color: palette.main.white
            }
          }}
        />
      </Box>

      {deckItem.isDisabled && <LockCard />}
    </S.BoxCard>
  )
}
export default DeckCard
