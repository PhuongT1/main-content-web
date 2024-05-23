'use client'
import { FC } from 'react'
import { LayoutIR } from '@/components/home/layout-IR'
import Layout_1_Slogan from './layout_1'
import Layout_2_Slogan from './layout_2'
import Layout_3_Slogan from './layout_3'
import { Slogan_Step4_Type } from '@/types/slogan.type'
import { useSloganDataIR } from '../_clientComponents/use-slogan'

const Layout_IR_Slogan: FC<{ id: number }> = ({ id }) => {
  // Get data form step 4.
  const dataStepFour = useSloganDataIR<Slogan_Step4_Type>({ id })

  return (
    <LayoutIR
      layout={{
        layoutOne: <Layout_1_Slogan data={dataStepFour?.data} />,
        layoutTwo: <Layout_2_Slogan data={dataStepFour?.data} />,
        layoutThree: <Layout_3_Slogan data={dataStepFour?.data} />
      }}
    />
  )
}

export default Layout_IR_Slogan
