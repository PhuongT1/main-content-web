import { getStrenghtList } from '@/services/sa.service'
import { TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Grid, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import CardType from '../../../components/card'

type Props = {
  cardActiveList: TTypesSA[]
  maxSelected?: number
  onAddCard: (item: TTypesSA) => void
  overQuantity: VoidFunction
  onRemoveCard: (index: number, item: TTypesSA) => void
}

const TypeList = ({ cardActiveList, onAddCard, onRemoveCard, overQuantity, maxSelected }: Props) => {
  const theme = useTheme()
  const { data, isLoading } = useQuery({
    queryKey: ['GET_STRENGTH'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: () => getStrenghtList()
  })

  const handleAddCarditem = (card: TTypesSA) => {
    const index = cardActiveList?.findIndex(
      (item) => item.strengthType === card.strengthType && item.description === card.description
    )
    if (index > -1) {
      const indexRemove = cardActiveList.findIndex((item: TTypesSA) => item.strengthType === card.strengthType)
      onRemoveCard && onRemoveCard(indexRemove, card)
    } else {
      if (maxSelected && cardActiveList?.length >= maxSelected) {
        overQuantity && overQuantity()
        return
      }
      onAddCard && onAddCard({ ...card })
    }
  }

  return (
    <Grid container display={'flex'} flexWrap={'wrap'} spacing={remConvert('20px')}>
      {data &&
        data?.data.map((item: TTypesSA) => (
          <Grid
            item
            key={item.strengthType}
            sx={{
              [theme.breakpoints.up(1700)]: {
                flexBasis: 'calc(100% / 5)',
                maxWidth: 'calc(100% / 5)'
              },
              [theme.breakpoints.down(1699)]: {
                flexBasis: 'calc(100% / 3)',
                maxWidth: 'calc(100% / 3)'
              },
              [theme.breakpoints.up(1200)]: {
                flexBasis: 'calc(100% / 2)',
                maxWidth: 'calc(100% / 2)'
              }
            }}
          >
            <CardType
              icon='checked'
              item={item}
              isActive={cardActiveList?.map((card: TTypesSA) => card.strengthType).includes(item.strengthType)}
              onClick={() => handleAddCarditem(item)}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default TypeList
