import { TableColumnsType } from '@/components/home/analyzing'
import { useLanguage } from '@/hooks/use-language'
import { NamingAnalyzing, NamingTab } from '@/types/naming.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { FieldArrayWithId } from 'react-hook-form'

const dataCart = [
  {
    title: (
      <Box component={'div'} display={'flex'}>
        슘페터{' '}
        <Box component={'p'} sx={{ color: '#3C82F9', marginLeft: '12px' }}>
          Schumpeter
        </Box>
      </Box>
    ),
    idCard: 1
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 2
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 3
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 4
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 5
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 6
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 7
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 8
  }
]

export const cardData = dataCart.map(
  (item) =>
    ({
      ...item,
      title: <> {item.title}</>
    } as NamingTab)
)

export const useRowTable = (fields?: FieldArrayWithId<NamingAnalyzing, 'cardActiveList'>[] | NamingTab[]) => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  const rowItem = [
    {
      title: dict.naming_step_3_remember,
      onRender: (_row, index) => convertTitle(index)
    },
    {
      title: dict.naming_step_3_remember
    },
    {
      title: dict.naming_step_3_message_clear
    },
    {
      title: dict.naming_step_3_unique
    },
    {
      title: dict.naming_step_3_consistent
    },
    {
      title: dict.naming_step_3_situations
    },
    {
      title: dict.naming_step_3_overall_score,
      onRender: (row) => {
        return (
          <Box component={'span'} color={home.blue500} fontWeight={600}>
            {row?.reduce((a: number, b: number) => (a || 0) + (b || 0), 0) || 0}점
          </Box>
        )
      }
    }
  ] as TableColumnsType[]

  const convertTitle = (index: number) => (
    <Box
      component={'p'}
      display={'flex'}
      justifyContent={'center'}
      columnGap={remConvert('12px')}
      flexWrap={'wrap'}
      fontWeight={600}
    >
      {fields && fields[index]?.name}
      <Box component={'span'} style={{ color: home.blue500 }}>
        {fields && fields[index]?.affectTitle}
      </Box>
    </Box>
  )

  return {
    rowItem
  }
}
