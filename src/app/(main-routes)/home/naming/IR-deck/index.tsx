import { LayoutIR } from '@/components/home/layout-IR'
import Layout_1_Naming from './layout_1'
import Layout_2_Naming from './layout_2'
import Layout_3_Naming from './layout_3'
import { NamingAnalyzing } from '@/types/naming.type'
import { useNamingDataIR } from '../hooks/use-naming'

const Layout_IR_Naming = () => {
  const data = useNamingDataIR<NamingAnalyzing>()

  return (
    <LayoutIR
      layout={{
        layoutOne: <Layout_1_Naming data={data?.data} />,
        layoutTwo: <Layout_2_Naming data={data?.data} />,
        layoutThree: <Layout_3_Naming data={data?.data} />
      }}
    />
  )
}
export default Layout_IR_Naming
