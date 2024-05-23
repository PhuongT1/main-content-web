'use client'

import { LayoutIR } from '@/components/home/layout-IR'
import Layout01 from './layout_01'
import Layout02 from './layout_02'
import Layout03 from './layout_03'

const LogoIRLayouts = () => {
  return (
    <LayoutIR
      layout={{
        layoutOne: <Layout01 />,
        layoutTwo: <Layout02 />,
        layoutThree: <Layout03 />
      }}
    />
  )
}

export default LogoIRLayouts
