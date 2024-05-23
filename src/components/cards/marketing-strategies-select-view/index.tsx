import { ReactNode } from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'
import { optionTruncateOneLine } from '@/utils/styles'
import { convertToRem } from '@/utils/convert-to-rem'
import { MarketingStrategiesSelect } from '@/components/cards/marketing-strategies-select'

interface IMarketingStrategiesSelectView<T> {
  name?: string
  url?: string
  item: string[]
  subTitle?: string
  prevDataList?: { title: string; data: string[] }[]
  children?: ReactNode
}
const MarketingStrategiesSelectView = <T,>({
  name,
  url,
  item,
  subTitle,
  prevDataList = [],
  children
}: IMarketingStrategiesSelectView<T>) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box height={'100%'} sx={{ '.MuiCardActionArea-root': { justifyContent: 'flex-start' } }}>
      <MarketingStrategiesSelect
        sxCard={{ backgroundColor: home.gray300 }}
        subTitle={subTitle || '마케팅 전략'}
        url={url}
        name={name}
        prevDataList={prevDataList}
      >
        {item?.map((name, index) => (
          <MarketingStrategyBox key={`${name}${index}`} index={index} name={name} />
        ))}
        {children && children}
      </MarketingStrategiesSelect>
    </Box>
  )
}

export const MarketingStrategyBox = ({ index, name }: { index: number; name: string }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      borderRadius={convertToRem(10)}
      fontSize={convertToRem(16)}
      padding={convertToRem('8px 32px 8px 20px')}
      sx={{ background: FIELD_SELECTED_COLORS?.[index as 0 | 1 | 2], height: convertToRem(44) }}
    >
      <Typography sx={{ ...optionTruncateOneLine() }}>{name}</Typography>
    </Box>
  )
}

export default MarketingStrategiesSelectView
