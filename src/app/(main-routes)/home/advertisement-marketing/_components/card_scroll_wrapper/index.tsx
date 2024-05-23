import ScrollBar from 'react-perfect-scrollbar'
import { Box, Stack, Skeleton, useTheme } from '@mui/material'
import { IItemMarketingGoal } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionAutoFillItems } from '@/utils/styles'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'

type CardMarketingGoalWrapperProps = {
  handleClickCardItem: (item: IItemMarketingGoal) => void
  selectedGoals: IItemMarketingGoal[]
  data: IItemMarketingGoal[]
  fetchNextPage?: () => void
  isLoading?: boolean
}
function CardMarketingGoalWrapper({
  handleClickCardItem,
  selectedGoals,
  data,
  fetchNextPage,
  isLoading
}: CardMarketingGoalWrapperProps) {
  return (
    <ScrollBar style={{ width: '100%', maxHeight: convertToRem(900) }} onYReachEnd={() => fetchNextPage?.()}>
      <Box sx={{ ...optionAutoFillItems({ minWidth: 200, mediaQuery: 1560 }) }}>
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => <LoadingCardMarketingGoal key={index} />)
          : data?.map((item: IItemMarketingGoal) => (
              <Box key={item?.id}>
                <CardMarketingGoal
                  onClickCardItemData={handleClickCardItem}
                  selectedGoals={selectedGoals}
                  item={item}
                />
              </Box>
            ))}
      </Box>
    </ScrollBar>
  )
}

const LoadingCardMarketingGoal = () => {
  const { palette } = useTheme()
  return (
    <Box p={convertToRem(20)} borderRadius={convertToRem(10)} sx={{ background: palette.home.gray300 }}>
      <Stack gap={convertToRem(12)}>
        <Skeleton variant='rounded' sx={{ width: '40%', height: 24 }} />
        <Skeleton variant='rounded' sx={{ height: 24 }} />
        <Skeleton variant='rounded' sx={{ height: 120, borderRadius: convertToRem(10) }} />
      </Stack>
    </Box>
  )
}

export default CardMarketingGoalWrapper
