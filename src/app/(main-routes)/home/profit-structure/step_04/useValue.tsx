import { useMemo } from 'react'
import { useTheme } from '@mui/material'
import { IFormValuesProfitGenerationStructure, ProfitDiagramType } from '@/types/profit-structure.type'
import { STEP } from '@/constants/common.constant'
import { useProfitStructureData } from '../use-profit-structure'
import DiagramDirectSelling from '@/assets/images/profit-structures/diagram-direct-selling'
import DiagramPlatform from '@/assets/images/profit-structures/diagram-platform'
import DiagramBrokerage from '@/assets/images/profit-structures/diagram-brokerage'

function useGetDefaultValueProfitStructures() {
  const { isLoading: isLoadingProfitStructureList, data: dataProfitStructures } =
    useProfitStructureData<IFormValuesProfitGenerationStructure>(STEP.STEP_ONE, 'data-profit-generation-structures')

  const dataProfitStructureList = useMemo(() => {
    return dataProfitStructures?.data?.profitStructureList || []
  }, [dataProfitStructures?.data])

  // ====
  return { isLoadingProfitStructureList, dataProfitStructureList }
}

interface IUseGetDefaultValueProfitDiagram {
  defaultImageProps?: {
    colorHeadText?: string
    colorLine?: string
    colorCircle?: string
  }
}
function useGetDefaultValueProfitDiagram({ defaultImageProps }: IUseGetDefaultValueProfitDiagram) {
  const { palette } = useTheme()
  const isLightMode = palette.mode === 'light'
  const defaultImageOptionProps = {
    colorHeadText: defaultImageProps?.colorHeadText || palette.home.gray50,
    colorLine: defaultImageProps?.colorLine || (isLightMode ? palette.home.gray200 : palette.home.gray100),
    colorCircle: defaultImageProps?.colorCircle || (isLightMode ? palette.home.gray500 : palette.home.gray50)
  }

  const dataProfitDiagrams = [
    {
      id: ProfitDiagramType.DirectSelling,
      name: '직접판매 모델',
      description:
        '상품이나 서비스를 직접 소비자에게 판매하여 수익을 창출한다. 보통 전통적인 소매업체나 제조업체가 해당한다.',
      image: <DiagramDirectSelling {...defaultImageOptionProps} />
    },
    {
      id: ProfitDiagramType.Platform,
      name: '플랫폼 모델',
      description:
        '허브 역할을 하는 플랫폼을 통해 판매자와 구매자를 연결하여 수수료를 받아 수익을 창출한다. 이커머스 플랫폼, 스트리밍 서비스, 앱 스토어 등이 해당한다.',
      image: <DiagramPlatform {...defaultImageOptionProps} colorSquare={palette.home.gray300} />
    },
    {
      id: ProfitDiagramType.Brokerage,
      name: '중개 모델',
      description:
        '구매자와 판매자 간의 거래를 중개하고 조정하여 수익을 얻는 방식이다. 부동산 중개업이나 주식 거래소 또는 인력 연결 등이 해당한다. ',
      image: <DiagramBrokerage {...defaultImageOptionProps} colorSquare={palette.home.gray300} />
    }
  ]

  // ====
  return { dataProfitDiagrams }
}

export { useGetDefaultValueProfitStructures, useGetDefaultValueProfitDiagram }
