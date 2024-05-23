import { ThumbUpIcon } from '@/assets/icons'
import { Typography } from '@/elements'
import { Box } from '@mui/material'

const ThumbupBadge = () => {
  return (
    <Box borderRadius={9999} bgcolor={'alpha.mint_10'} py={0.75} px={2} display={'flex'} gap={0.75}>
      <ThumbUpIcon />
      <Typography cate='button_20' plainColor='teal.500'>
        추천
      </Typography>
    </Box>
  )
}

export default ThumbupBadge
