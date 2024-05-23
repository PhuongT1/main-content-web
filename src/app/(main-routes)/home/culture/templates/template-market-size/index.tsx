import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import { MarketSize } from '@/assets/images/culture'

const TemplateMarketSize = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'97px'}>
        <TemplateHeading title='기회를 파악합니다' subTitle='시장 규모' />
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Image src={MarketSize} width={320} height={337} alt='' style={{ transform: 'translateX(-52px)' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          {[1, 2, 3].map((value: number) => {
            return (
              <Box
                key={value}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <Typography cate='body_3_semibold' color='#3C82F999' fontWeight='700'>
                  {value === 1 ? 'SAM' : value === 2 ? 'SOM' : 'TAM'}
                </Typography>
                <Typography cate='title_60_bold' color='#3C82F9' fontWeight='700'>
                  {value === 1 ? data.total_market_sam : value === 2 ? data.total_market_som : data.total_market_tam}
                </Typography>
                <Typography cate='body_10' color='#292A2C' fontWeight='700'>
                  {value === 1 ? data.market_size_sam : value === 2 ? data.market_size_som : data.market_size_tam}
                </Typography>
                <Typography cate='body_10' color='#292A2C' fontWeight='400'>
                  {value === 1 ? data.basis_sam : value === 2 ? data.basis_som : data.basis_tam}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateMarketSize
