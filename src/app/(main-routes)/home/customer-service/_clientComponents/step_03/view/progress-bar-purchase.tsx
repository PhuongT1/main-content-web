import { remConvert } from '@/utils/convert-to-rem'
import { Grid } from '@mui/material'
import { Purchasing } from '@/types/customer-service.type'
import ProgressBarItem from '@/components/home/progress-bar'

export interface ProgressBarPurchaseProps {
  data?: Purchasing[]
}

const ProgressBarPurchase = ({ data }: ProgressBarPurchaseProps) => {
  return (
    <Grid container display='flex' spacing={remConvert('20px')} alignItems='stretch' flexWrap={'wrap'}>
      {data?.map((item, index) => {
        return (
          <Grid item key={index} alignItems='stretch' sm={4}>
            <ProgressBarItem title={item.title} value={Number(item.point) * 20} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProgressBarPurchase
