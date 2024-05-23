'use client'
import { LayoutIR } from '@/components/home/layout-IR'
import { STEP } from '@/constants/common.constant'
import { PurchaseDesign } from '@/types/customer-service.type'
import { useCompleteStepList } from '../_clientComponents/use-customer'
import PageOneCustomerService from './layout_1/page_1'
import PageOneLayoutTwo from './layout_2/page_1'
import PageTwoLayoutTwo from './layout_2/page_2'
import LayoutPage from './component/layout-page'
import { remConvert } from '@/utils/convert-to-rem'
import PageTwoCustomerService from './layout_1/page_2'
import { StepActivity } from '@/types/deck.type'

export interface CustomerLayoutProps {
  data?: StepActivity[]
}

const Layout_IR_Customer = () => {
  const { data } = useCompleteStepList({})

  return (
    <LayoutIR
      layout={{
        layoutOne: (
          <LayoutPage>
            <PageOneCustomerService data={data} />
            <PageTwoCustomerService data={data && (data[STEP.STEP_FOUR].data as PurchaseDesign)} />
          </LayoutPage>
        ),
        layoutTwo: (
          <LayoutPage sx={{ marginTop: remConvert('4px') }}>
            <PageOneLayoutTwo data={data} />
            <PageTwoLayoutTwo data={data} />
          </LayoutPage>
        )
      }}
    />
  )
}
export default Layout_IR_Customer
