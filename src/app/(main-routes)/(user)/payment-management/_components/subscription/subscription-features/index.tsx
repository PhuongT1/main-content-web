import CheckIcon from '@/assets/icons/check'
import { Typography } from '@/elements'
import { TSubscriptionFeature } from '@/types/payment.type'
import { Box, SxProps } from '@mui/material'

const SubscriptionFeatures = ({ list, sx }: { list: TSubscriptionFeature[]; sx?: SxProps }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} sx={sx}>
      {list.map(({ content, highlight }, idx) => (
        <Box key={idx} display={'flex'} gap={'9px'}>
          <CheckIcon pathProps={{ stroke: '#44BDBD' }} />
          <Typography cate='body_30' plainColor={highlight ? 'teal.500' : 'base_gray.200'}>
            {content}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default SubscriptionFeatures
