import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { CustomerPurchasing, TypeLiftStyle } from '@/types/customer-service.type'
import CardMultiple from './card-multiple'
import { getLiftStyle } from '@/services/customer.service'
import { useQuery } from '@tanstack/react-query'
import SectionTitle from '@/components/home/section-title'
import { PaymentMethodData } from '../step_03/edit/card-data-customer'

export interface PaymentMethodProps {
  isView?: boolean
  sectionTitle?: React.ReactNode
}

const PaymentMethod = ({ isView, sectionTitle }: PaymentMethodProps) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<CustomerPurchasing>()
  const { control } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'paymentMethod'
  })

  return (
    <>
      {sectionTitle ? (
        sectionTitle
      ) : (
        <SectionTitle
          title='채널 영향력'
          subtitle='타깃 고객이 제품 또는 서비스 정보를 얻거나 구매 결정에 영향을 받는 주요 채널을 선택해 보세요.'
        />
      )}

      <Box component={'div'} p={remConvert('20px')} borderRadius={remConvert('10px')} bgcolor={home.gray400}>
        <CardMultiple
          height={'auto'}
          dataList={isView ? fields : PaymentMethodData}
          cardActiveList={isView ? undefined : fields}
          maxSelected={10}
          isTitle
          isHiddenIconDelete
          onRemoveCard={(index) => remove(index)}
          onAddCard={(item, index) => {
            const { url, ...rest } = item
            append({ ...rest, index })
          }}
        />
      </Box>
    </>
  )
}

export default PaymentMethod
