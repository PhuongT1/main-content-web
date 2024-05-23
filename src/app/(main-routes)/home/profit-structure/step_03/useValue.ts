import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLanguage } from '@/hooks/use-language'
import { STEP } from '@/constants/common.constant'
import { IFormValuesProfitGenerationStructure, IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { useProfitStructureData } from './../use-profit-structure'
import { generateYearsArray } from './../data'

function useGetDefaultTableValue() {
  const { dict, lang, getValueLanguage } = useLanguage()
  const { watch } = useFormContext<IFormValuesSalesAnalysis>()
  const watchYear = watch('startYear')
  const { data: dataProfitStructureList } = useProfitStructureData<IFormValuesProfitGenerationStructure>(
    STEP.STEP_ONE,
    'data-profit-generation-structures'
  )

  // ====
  const tableDataExpectedSales = useMemo(() => {
    const { profitStructureList = [] } = dataProfitStructureList?.data || {}
    const structureNames = profitStructureList.map((profit) => (getValueLanguage(profit) as string) || '') || []

    const columnList = [
      { dataIndex: 'name' },
      ...structureNames.map((_: string, index: number) => ({ dataIndex: `item_${index + 1}` }))
    ]
    const rowList = [
      {
        id: 'title',
        name: dict.profit_step3_table1_row_title1,
        ...structureNames.reduce((acc: Record<string, string>, item: string, index: number) => {
          acc[`item_${index + 1}`] = item
          return acc
        }, {})
      },
      { id: 'unit', name: dict.profit_step3_table1_row_title2 },
      { id: 'quantity', name: dict.profit_step3_table1_row_title3 },
      { id: 'annualSales', name: dict.profit_step3_table1_row_title4 }
    ]

    return { rowList, columnList }
  }, [JSON.stringify(dataProfitStructureList), lang])

  // ====
  const tableDataAnnualSales = useMemo(() => {
    const defaultYear = Array.from({ length: 5 }, (_, i) =>
      lang === 'en'
        ? `${i + 1}${i < 3 ? ['st', 'nd', 'rd'][i] : 'th'} ${dict.profit_year}`
        : `${i + 1}${dict.profit_year}`
    )
    const yearList = watchYear
      ? generateYearsArray(watchYear, (watchYear || 0) + 4).map((year) => (lang === 'en' ? `${year}` : `${year}년`)) ||
        []
      : defaultYear

    const columnList = [
      { dataIndex: 'name' },
      ...yearList.map((_: string, index: number) => ({ dataIndex: `item_${index + 1}` }))
    ]
    const rowList = [
      {
        id: 'title',
        name: dict.profit_step3_table2_row_title1,
        ...yearList.reduce((acc: Record<string, string>, item: string, index: number) => {
          acc[`item_${index + 1}`] = item
          return acc
        }, {})
      },
      { id: 'sale', name: dict.profit_step3_table2_row_title2 },
      { id: 'desc', name: dict.profit_step3_table2_row_title3 },
      { id: 'color', name: dict.profit_step3_table2_row_title4 }
    ]

    return { rowList, columnList }
  }, [watchYear, lang])

  // ====
  return { tableDataExpectedSales, tableDataAnnualSales }
}

function useGetDefaultChartValue() {
  const { lang } = useLanguage()
  const { watch } = useFormContext<IFormValuesSalesAnalysis>()
  const watchYear = watch('startYear')
  const watchCurrency = watch('currency')
  const watchData = watch('annualSalesGoals')

  // ====
  const labels = watchYear
    ? generateYearsArray(watchYear, (watchYear || 0) + 4).map((year) => (lang === 'kr' ? `${year}년` : `${year}`)) || []
    : []

  const isShowChart = useMemo(() => {
    if (!watchYear || !watchData || watchData?.length <= 0) return false
    return watchData.every((item) => !!item?.sale && !!item?.desc && !!item?.color)
  }, [watchYear, JSON.stringify(watchData)])

  const calculateAddedWidthItemChart = (length: number): number => {
    if (length === 0) return 0
    if (length % 2 === 1) {
      return calculateAddedWidthItemChart(length - 1) + 2
    }
    return calculateAddedWidthItemChart(length - 1) + 3
  }

  // ====
  return { labels, data: watchData, isShowChart, currency: watchCurrency, calculateAddedWidthItemChart }
}

export { useGetDefaultTableValue, useGetDefaultChartValue }
