import { useState, useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTheme, Box, TableCell, TableRow, Typography } from '@mui/material'
import { IFormValuesMarketingPlans, IMarketingPlans, ColumnTable } from '@/types/advertisement-marketing.type'
import { remConvert } from '@/utils/convert-to-rem'
import { generateMonthList } from './../../utils'
import { formatNumberWithText } from '@/utils/string'
import { optionsTruncate } from '@/utils/styles'
import { COLORS_MAPPING } from './../../data'
import TableItem from '@/components/home/table-item'
import InputNumberWithText from '@/components/input/input-number-with-text'
import BoxColor from './boxColor'

interface IMarketingPlanTable {
  isView?: boolean
}
function MarketingPlanTable({ isView = false }: IMarketingPlanTable) {
  const { palette } = useTheme()
  const [isEditingBudget, setIsEditingBudget] = useState(false)

  const form = useFormContext<IFormValuesMarketingPlans>()
  const { watch, setValue, getValues } = form
  const startMonth = watch('startMonth')
  const unitCurrency = watch('unitCurrency')
  const channelListWatch = watch('data')
  const totalBudgetWatch = watch('totalBudget')

  const columns: ColumnTable[] = [
    { title: '구분', dataIndex: 'channel' },
    { title: '배정예산', dataIndex: 'budget' },
    { title: '', dataIndex: 'monthSelectedList' }
  ]

  const tableData = useMemo(() => {
    const monthList = generateMonthList(startMonth)?.map((month) => `${month}월`) ?? []
    const channelList = channelListWatch?.filter((channel) => channel.channel) ?? []
    const rowList = [{ channel: '구분', budget: '배정예산', monthSelectedList: [] }, ...channelList]
    return { monthList, channelList, rowList }
  }, [startMonth, channelListWatch])

  // =====
  useEffect(() => {
    if (isEditingBudget && tableData?.channelList) {
      const allocatedBudget = tableData.channelList?.reduce((total, channel) => {
        if (!channel?.budget) return total
        return total + parseInt(channel.budget?.replace(/\D/g, ''))
      }, 0)

      const remainBudget = parseInt(totalBudgetWatch?.replace(/\D/g, '')) - (allocatedBudget || 0)
      setValue('remainBudget', remainBudget?.toLocaleString())
      setIsEditingBudget(false)
    }
  }, [isEditingBudget])

  useEffect(() => {
    if (unitCurrency) {
      // update budget when currency change
      tableData.channelList?.forEach((_, index) => {
        const numericValue = parseFloat(getValues(`data.${index}.budget`)?.replace(/\D/g, ''))
        const formattedValue = formatNumberWithText(numericValue, unitCurrency)
        setValue(`data.${index}.budget`, formattedValue)
      })
    }
  }, [unitCurrency])

  const renderCell = (type: string, index: number, row: IMarketingPlans) => {
    switch (type) {
      case 'channel':
        return (
          <Typography fontWeight={600} sx={{ ...optionsTruncate(2) }}>
            {row?.channel}
          </Typography>
        )
      case 'budget':
        return (
          <InputNumberWithText
            form={form}
            unitText={unitCurrency}
            name={`data.${index}.budget`}
            placeholder={'숫자를 입력해주세요.'}
            handleChangeInput={() => setIsEditingBudget(true)}
            maxLength={15}
            sxInput={{
              input: { textAlign: 'center', fontWeight: '600 !important' },
              '.MuiInputBase-input': { textOverflow: 'ellipsis' },
              '.MuiInputBase-root': {
                height: remConvert('44px'),
                ...(isView && { backgroundColor: 'transparent' }),
                '>fieldset': {
                  ...(isView && { borderColor: 'transparent' })
                }
              }
            }}
          />
        )
      case 'monthSelectedList':
        if (index >= 0)
          return (
            <BoxColor
              defaultColor={COLORS_MAPPING?.[index]}
              defaultValue={channelListWatch?.[index]?.monthSelectedList}
              handleChange={(colors) => setValue(`data.${index}.monthSelectedList`, colors)}
            />
          )
        return (
          <Box width={'100%'} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
            {tableData?.monthList?.map((month) => (
              <Box
                key={month}
                flex={'1'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'calc(100% / 12)'}
                height={remConvert('64px')}
                borderLeft={`1px solid ${palette.home.gray200}`}
                sx={{ padding: remConvert('20px 12px'), whiteSpace: 'nowrap' }}
              >
                {month}
              </Box>
            ))}
          </Box>
        )
      default:
        return <></>
    }
  }

  // =====
  return (
    <TableItem
      isDisable={isView}
      bgColorColumn={isView ? palette.home.gray300 : undefined}
      sxBox={{ overflowX: 'auto' }}
      sxCell={{
        height: remConvert('64px'),
        padding: remConvert('8px 12px'),
        '&:first-child': { minWidth: remConvert('80px') },
        '&:nth-child(2)': {
          minWidth: remConvert('198px'),
          borderLeftWidth: '1px !important'
        },
        '&:last-child': { padding: 0, borderLeftWidth: '0px !important' }
      }}
    >
      {tableData.rowList.map((row, index) => (
        <TableRow key={row.channel}>
          {columns.map((column, indexColumn) => (
            <TableCell key={`${row.channel}_${indexColumn}`} align='center'>
              {/* Why index - 1 ? > cuz we don't save headers */}
              {index === 0 && column.dataIndex !== 'monthSelectedList'
                ? row[column.dataIndex]
                : renderCell(column.dataIndex, index - 1, row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableItem>
  )
}

export default MarketingPlanTable
