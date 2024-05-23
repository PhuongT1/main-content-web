import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTheme, TableCell, TableRow, Typography } from '@mui/material'
import { IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { remConvert } from '@/utils/convert-to-rem'
import { formatNumberWithText, parseNumber } from '@/utils/string'
import { formatCurrencyKorean, formatCurrencyEnglish } from '@/utils/format-currency'
import { useLanguage } from '@/hooks/use-language'
import TableItem from '@/components/home/table-item'
import InputNumberWithText from '@/components/input/input-number-with-text'
import { DATA_UNIT_CURRENCY } from './../../data'
import { useGetDefaultTableValue } from './../useValue'

interface ITableExpectedSales {
  isView?: boolean
}
function TableExpectedSales({ isView = false }: ITableExpectedSales) {
  const { palette } = useTheme()
  const { dict, lang } = useLanguage()
  const form = useFormContext<IFormValuesSalesAnalysis>()
  const { watch, setValue, getValues } = form
  const watchCurrency = watch('currency') || '원'
  const { tableDataExpectedSales } = useGetDefaultTableValue()
  const currentDataUnitCurrency = DATA_UNIT_CURRENCY[lang || 'kr'] || []

  // =====
  useEffect(() => {
    const selectedCurrencyIndex = currentDataUnitCurrency?.findIndex((currency) => currency?.value === watchCurrency)
    if (lang && selectedCurrencyIndex < 0) {
      const targetLang = lang === 'en' ? 'kr' : 'en'
      const suitableIndex = DATA_UNIT_CURRENCY[targetLang]?.findIndex((currency) => currency.value === watchCurrency)
      setValue('currency', currentDataUnitCurrency[suitableIndex]?.value)
    }
  }, [lang, watchCurrency])

  useEffect(() => {
    if (watchCurrency) {
      tableDataExpectedSales.columnList?.forEach((_, index) => {
        const unit = parseNumber(getValues(`expectedSales.${index}.unit`) ?? '')
        const quantity = parseNumber(getValues(`expectedSales.${index}.quantity`) ?? '')
        !!unit && setValue(`expectedSales.${index}.unit`, formatNumberWithText(unit, ` ${watchCurrency}`))
        !!quantity && setValue(`expectedSales.${index}.quantity`, formatNumberWithText(quantity, ` ${watchCurrency}`))
      })
    }
  }, [watchCurrency])

  const renderCell = (type: string, index: number) => {
    switch (type) {
      case 'unit':
      case 'quantity':
        return (
          <InputNumberWithText
            form={form}
            placeholder={dict.profit_step3_input_number_placeholder}
            unitText={` ${watchCurrency}`}
            maxLength={15}
            name={`expectedSales.${index}.${type}`}
            sxInput={{
              '.MuiInputBase-input': { padding: remConvert('6px'), textOverflow: 'ellipsis', textAlign: 'center' },
              '.MuiInputBase-root': {
                height: remConvert('68px'),
                maxHeight: remConvert('68px'),
                ...(isView && { backgroundColor: palette.home.gray400 }),
                '>fieldset': {
                  ...(isView && { borderColor: 'transparent' })
                }
              }
            }}
          />
        )

      case 'annualSales': {
        const unit = getValues(`expectedSales.${index}.unit`) ?? ''
        const quantity = getValues(`expectedSales.${index}.quantity`) ?? ''
        const annualSales = parseNumber(unit) * parseNumber(quantity) * 12
        const hasValueInputs = !!unit && !!quantity
        return (
          <>
            <Typography fontSize={remConvert('20px')} color={palette.home.mint500}>
              {hasValueInputs
                ? formatNumberWithText(annualSales, ` ${watchCurrency}`)
                : dict.profit_step3_automatic_placeholder}
            </Typography>
            {!isView && hasValueInputs && (
              <Typography mt={remConvert('2px')} color={palette.home.blue500}>
                {lang === 'en'
                  ? formatCurrencyEnglish(annualSales, watchCurrency)
                  : formatCurrencyKorean(annualSales, watchCurrency)}
              </Typography>
            )}
          </>
        )
      }
      default:
        return <></>
    }
  }

  // =====
  return (
    <TableItem
      isDisable={isView}
      bgColorColumn={isView ? palette.home.gray400 : undefined}
      sxBox={{ overflowX: 'auto' }}
      sxRow={{
        td: { fontSize: remConvert('20px'), lineHeight: remConvert('24px') },
        '&:not(:first-child) td': {
          backgroundColor: isView ? palette.home.gray500 : 'unset',
          whiteSpace: 'break-spaces',
          height: remConvert('109px'),
          padding: remConvert('20px')
        }
      }}
      sxCell={{
        height: remConvert('60px'),
        padding: remConvert('12px'),
        '&:first-child': { width: remConvert('158px') },
        '&:not(:first-child)': { borderLeftWidth: '1px !important' }
      }}
    >
      {tableDataExpectedSales.rowList.map((row, index) => (
        <TableRow key={index}>
          {tableDataExpectedSales.columnList.map((column, indexColumn) => (
            <TableCell key={`${indexColumn}`} align='center'>
              {/* Why index - 1 ? > cuz we don't save headers */}
              {index === 0 || indexColumn === 0
                ? row?.[column?.dataIndex as 'name']
                : renderCell(row.id, indexColumn - 1)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableItem>
  )
}

export default TableExpectedSales
