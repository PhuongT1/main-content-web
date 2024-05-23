import { Box, SxProps, useTheme } from '@mui/material'
import { ITamSamSom } from '@/types/profit-structure.type'
import { remConvert } from '@/utils/convert-to-rem'
import { parseNumber } from '@/utils/string'
import { formatCurrencyKorean } from '@/utils/format-currency'
import { Typography } from '@/elements'

interface ICardsViewText {
  item: ITamSamSom
  sxBox?: SxProps
}
const CardsViewText = ({ item, sxBox }: ICardsViewText) => {
  const { palette } = useTheme()

  return (
    <Box
      display={'flex'}
      gap={remConvert('5px')}
      flexDirection={'column'}
      sx={{ width: remConvert('160px'), mt: remConvert('16px'), ...sxBox }}
    >
      <Typography cate='subtitle_1_semibold' color={palette.home.gray50}>
        {item?.marketCate}
      </Typography>
      <Typography cate='title_3_bold' color={palette.home.gray50} lineHeight={remConvert('28px')}>
        {formatCurrencyKorean(parseNumber(item?.marketSize))}
      </Typography>
      <Typography cate='body_3' color={palette.home.gray50}>
        {item?.calculationBasis}
      </Typography>
    </Box>
  )
}

export default CardsViewText
