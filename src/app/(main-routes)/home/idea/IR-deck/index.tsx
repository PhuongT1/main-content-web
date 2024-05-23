import { LayoutIR } from '@/components/home/layout-IR'
import { STEP } from '@/constants/common.constant'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { TCreateIdea, TWriteIdea } from '@/types/idea.type'
import { useIdeaData } from '../_clientComponents/use-idea'
import Layout_1_Idea from './layout_01'
import Layout_2_Idea from './layout_02'
import Layout_3_Idea from './layout_03'

const Layout_IR_Idea = () => {
    const { data } = useIdeaData<TWriteIdea>(STEP.STEP_THREE, QUERY_KEY_IDEA.WRITE_IDEA)
    const { data: dataIdea } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

    return (
        <LayoutIR
            layout={{
                layoutOne: <Layout_1_Idea data={data?.data} dataIdea={dataIdea?.data?.plus?.content} />,
                layoutTwo: <Layout_2_Idea data={data?.data} dataIdea={dataIdea?.data?.plus?.content} />,
                layoutThree: <Layout_3_Idea data={data?.data} dataIdea={dataIdea?.data?.plus?.content} />
            }}
        />
    )
}
export default Layout_IR_Idea
