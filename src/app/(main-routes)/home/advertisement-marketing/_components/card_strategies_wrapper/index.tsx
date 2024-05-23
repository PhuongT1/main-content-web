'use client'
import ScrollBar from 'react-perfect-scrollbar'
import { Grid, Box, Skeleton, Stack, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import MarketingCard from '@/components/cards/marketing-strategies-card'

type CardMarketingStrategiesWrapperProps<T> = {
  handleClickCardItem: (item: T) => void
  selectedData: T[]
  data: T[]
  fetchNextPage?: () => void
  isLoading?: boolean
}
function CardMarketingStrategiesWrapper<
  T extends { name: string; description: string; tags?: string[]; id: string | number }
>({ handleClickCardItem, selectedData, data, fetchNextPage, isLoading }: CardMarketingStrategiesWrapperProps<T>) {
  return (
    <ScrollBar style={{ width: '100%', maxHeight: convertToRem(600) }} onYReachEnd={() => fetchNextPage?.()}>
      <Grid spacing={2} container display='flex' alignItems='stretch' sx={{ padding: convertToRem(2) }}>
        {isLoading
          ? Array.from({ length: 12 }, (_, index) => (
              <Grid item xs={12} md={3} key={index} alignItems='stretch'>
                <LoadingCardMarketing />
              </Grid>
            ))
          : data.map((item: T, index) => (
              <Grid item xs={12} md={3} key={index} alignItems='stretch'>
                <MarketingCard
                  onClickCardItemData={() => handleClickCardItem(item)}
                  name={item?.name}
                  description={item?.description}
                  tags={item?.tags || []}
                  isActive={selectedData?.some((com: T) => com?.id === item?.id)}
                />
              </Grid>
            ))}
      </Grid>
    </ScrollBar>
  )
}

const LoadingCardMarketing = () => {
  const { palette } = useTheme()
  return (
    <Box p={convertToRem(20)} borderRadius={convertToRem(10)} sx={{ background: palette.home.gray300 }}>
      <Stack gap={convertToRem(12)}>
        <Skeleton variant='rounded' sx={{ width: '40%', height: 24 }} />
        <Skeleton variant='rounded' sx={{ height: 80 }} />
      </Stack>
    </Box>
  )
}

export default CardMarketingStrategiesWrapper
