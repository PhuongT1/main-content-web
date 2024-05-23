import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import Typography from '@/elements/typography'
import { color_blue, color_gray } from '@/themes/system-palette'
import { TProduct } from '@/types/product.type'
import { formatCurrency } from '@/utils/format-currency'
import { Stack, StackProps, useMediaQuery, useTheme } from '@mui/material'

type MentoringOptionCardProps = StackProps & {
  product?: TProduct
}

export default function MentoringOptionCard({ product, ...rest }: MentoringOptionCardProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  return (
    <Stack p={2} bgcolor={color_gray[700]} borderRadius={2} gap={2} direction={'column'} {...rest}>
      <Stack justifyContent={'space-between'} direction='row'>
        <Typography cate='title_40'>
          {product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
            ? '20분 화상 멘토링'
            : product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
            ? '40분 화상 멘토링'
            : '1시간 대면 멘토링'}
        </Typography>
        <Typography cate='sub_title_40' color={color_blue[300]}>
          {formatCurrency(product?.price)}원
        </Typography>
      </Stack>
      <Typography cate='body_30' color={color_gray[300]}>
        {product?.description}
      </Typography>
    </Stack>
  )
}
