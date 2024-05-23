import { useFormContext } from 'react-hook-form'
import { useTheme, Box } from '@mui/material'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { remConvert } from '@/utils/convert-to-rem'
import { useGetDefaultCardsValue, ICardData } from './../useData'
import { optionAutoFillItems } from '@/utils/styles'
import CardItem from '@/components/home/card-item'

function CardsTamSamSom() {
  const { palette } = useTheme()
  const { data } = useGetDefaultCardsValue()
  const { watch, setValue, trigger } = useFormContext<IFormValuesTamSamSom>()
  const dataTableTamSamSom = watch('data') || []
  const typeCardTamSamSom = watch('type') || ''

  // ====
  const handleClickCardItem = (item: ICardData) => {
    setValue('type', item?.id)
    const isValidData =
      dataTableTamSamSom?.length > 0 &&
      dataTableTamSamSom?.every((entry) => !!entry?.calculationBasis && !!entry?.marketCate && !!entry?.marketSize)

    return isValidData && trigger()
  }

  const renderCardData = (item: ICardData) => {
    return {
      title: <Box />,
      content: <Box>{item?.image}</Box>
    }
  }

  // ====
  return (
    <Box sx={{ ...optionAutoFillItems({ minWidth: 380, maxColumn: 3, mediaQuery: 1280 }) }}>
      {data.map((item, index) => (
        <Box key={index}>
          <CardItem
            icon={'radio'}
            isActive={item?.id === typeCardTamSamSom}
            cardItem={renderCardData(item)}
            onClick={() => handleClickCardItem(item)}
            sxCard={{
              minHeight: remConvert('268px'),
              backgroundColor: palette.home.gray400,
              backgroundImage: 'none',
              '&.active': {
                backgroundColor: palette.home.opacity_blue_100,
                outline: `1px solid ${palette.home.blue500}`
              },
              '.MuiButtonBase-root': {
                paddingBottom: remConvert('40px'),
                '.MuiBox-root:nth-child(2)': { background: 'unset', mt: 0 }
              }
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default CardsTamSamSom
