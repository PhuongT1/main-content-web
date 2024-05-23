'use client'
import { LayoutIR } from '@/components/home/layout-IR'
import Layout_1_Teambuilding from './layout_1'
import Layout_2_Teambuilding from './layout_2'
import Layout_3_Teambuilding from './layout_3'
import { TFormValue } from '@/types/teambuilding/index.type'
import { useTeambuildingData } from '../use-teambuilding'
import { STEP } from '@/constants/common.constant'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { useMemo } from 'react'

const Layout_IR_Teambuilding = () => {
  const { data: dataStep1 } = useTeambuildingData<TFormValue[]>(STEP.STEP_ONE, TEAMBUILDING_QUERY_KEY.GET_DATA_S1)
  const { data: dataStep2 } = useTeambuildingData<TFormValue[]>(STEP.STEP_TWO, TEAMBUILDING_QUERY_KEY.GET_DATA_S2)
  const data = useMemo(() => {
    let rs = []
    if (dataStep1?.data?.length) {
      rs.push(
        ...dataStep1.data.map(({ name, role, path, description }: any) => ({
          name,
          role,
          path,
          description,
          level: 0
        }))
      )
    }
    if (dataStep2?.data?.length) {
      rs.push(
        ...dataStep2.data.map(({ name, role, path, description }: any) => ({
          name,
          role,
          path,
          description,
          level: 1
        }))
      )
    }

    return rs
  }, [dataStep1, dataStep2])

  return (
    <LayoutIR
      layout={{
        layoutOne: <Layout_1_Teambuilding data={data.slice(0, 3)} />,
        layoutTwo: <Layout_2_Teambuilding data={data.slice(0, 4)} />,
        layoutThree: <Layout_3_Teambuilding data={data} />
      }}
    />
  )
}
export default Layout_IR_Teambuilding
