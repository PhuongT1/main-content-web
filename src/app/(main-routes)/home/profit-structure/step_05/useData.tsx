import { ReactNode, SVGProps } from 'react'
import { useTheme } from '@mui/material'
import CardType01 from '@/assets/images/profit-structures/card-type01'
import CardType02 from '@/assets/images/profit-structures/card-type02'
import CardType03 from '@/assets/images/profit-structures/card-type03'
import CardType04 from '@/assets/images/profit-structures/card-type04'
import CardType05 from '@/assets/images/profit-structures/card-type05'
import CardType06 from '@/assets/images/profit-structures/card-type06'

function useGetDefaultTableValue() {
  const columnList = [{ dataIndex: 'name' }, { dataIndex: 'item1' }, { dataIndex: 'item2' }, { dataIndex: 'item3' }]
  const rowList = [
    {
      id: 'name',
      name: '구분',
      item1: `TAM<span>전체시장</span>`,
      item2: `SAM<span>유효시장</span>`,
      item3: `SOM<span>목표시장</span>`
    },
    { id: 'marketCate', name: '진입시장' },
    { id: 'marketSize', name: '시장규모' },
    { id: 'calculationBasis', name: '산출근거' }
  ]

  return { rowList, columnList }
}

export interface ICardData {
  id: string
  image: ReactNode
}
function useGetDefaultCardsValue() {
  const { palette } = useTheme()
  const styleCardType = {
    width: '100%',
    colorText: palette.home.gray50,
    colorCircle1: palette.home.gray300,
    colorCircle2: palette.home.gray50,
    colorCircle3: palette.home.blue500
  }

  const type = {
    TYPE_01: 'type_01',
    TYPE_02: 'type_02',
    TYPE_03: 'type_03',
    TYPE_04: 'type_04',
    TYPE_05: 'type_05',
    TYPE_06: 'type_06'
  }

  const getCardComponent = (props?: SVGProps<SVGSVGElement>) => {
    return {
      [type.TYPE_01]: <CardType01 {...styleCardType} {...props} />,
      [type.TYPE_02]: <CardType02 colorCircle1Line={palette.home.gray200} {...styleCardType} {...props} />,
      [type.TYPE_03]: <CardType03 {...styleCardType} {...props} />,
      [type.TYPE_04]: <CardType04 {...styleCardType} {...props} />,
      [type.TYPE_05]: <CardType05 {...styleCardType} {...props} />,
      [type.TYPE_06]: <CardType06 colorCircle1Line={palette.home.gray200} {...styleCardType} {...props} />
    }
  }

  const data: ICardData[] = [
    { id: type.TYPE_01, image: getCardComponent()[type.TYPE_01] },
    { id: type.TYPE_02, image: getCardComponent()[type.TYPE_02] },
    { id: type.TYPE_03, image: getCardComponent({ height: 200 })[type.TYPE_03] },
    { id: type.TYPE_04, image: getCardComponent()[type.TYPE_04] },
    { id: type.TYPE_05, image: getCardComponent()[type.TYPE_05] },
    { id: type.TYPE_06, image: getCardComponent()[type.TYPE_06] }
  ]

  return { data, type, getCardComponent }
}

export { useGetDefaultTableValue, useGetDefaultCardsValue }
