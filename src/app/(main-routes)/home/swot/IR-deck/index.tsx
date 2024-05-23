import { LayoutIR } from '@/components/home/layout-IR'
import Layout_1_Swot from './layout-01'
import Layout_2_Swot from './layout-02'
import Layout_3_Swot from './layout-03'


const Layout_IR_Swot = ({ data }: any) => {

    return (
        <LayoutIR
            layout={{
                layoutOne: <Layout_1_Swot data={data} />,
                layoutTwo: <Layout_2_Swot data={data} />,
                layoutThree: <Layout_3_Swot data={data} />
            }}
        />
    )
}
export default Layout_IR_Swot
