import { LayoutIR } from '@/components/home/layout-IR'
import Layout_1_Naming from './layout_1'
import Layout_2_Naming from './layout_2'
import Layout_3_Naming from './layout_3'
import { useAdvMarketingDataIR } from '../use-advertisement-marketing'
import { DataAdvMarketingIR, IFormValuesMarketingStrategies } from '@/types/advertisement-marketing.type'
import { StepActivity } from '@/types/deck.type'

const Layout_IR_AdvMarketing = () => {
  const data = useAdvMarketingDataIR<DataAdvMarketingIR>() as StepActivity<DataAdvMarketingIR>[]

  return (
    <LayoutIR
      layout={{
        layoutOne: <Layout_1_Naming />,
        layoutTwo: <Layout_2_Naming />,
        layoutThree: <Layout_3_Naming />
      }}
    />
  )
}
export default Layout_IR_AdvMarketing
