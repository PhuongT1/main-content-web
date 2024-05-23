import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTheme, TableCell, TableRow, Box, Typography } from '@mui/material'
import { useLanguage } from '@/hooks/use-language'
import { IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { remConvert } from '@/utils/convert-to-rem'
import { formatNumberWithText, parseNumber } from '@/utils/string'
import { formatCurrencyKorean, formatCurrencyEnglish } from '@/utils/format-currency'
import TableItem from '@/components/home/table-item'
import InputNumberWithText from '@/components/input/input-number-with-text'
import TextareaItem from '@/form/textarea'
import { useGetDefaultTableValue } from './../useValue'
import { DATA_COLORS } from './../../data'

interface ITableAnnualSales {
  isView?: boolean
}
function TableAnnualSales({ isView = false }: ITableAnnualSales) {
  const { palette, breakpoints } = useTheme()
  const { dict, lang } = useLanguage()
  const form = useFormContext<IFormValuesSalesAnalysis>()
  const { watch, setValue, getValues, trigger } = form
  const watchCurrency = watch('currency') || '원'
  const { tableDataAnnualSales } = useGetDefaultTableValue()

  // =====
  useEffect(() => {
    if (watchCurrency) {
      tableDataAnnualSales.columnList?.forEach((_, index) => {
        const sale = parseNumber(getValues(`annualSalesGoals.${index}.sale`) ?? '')
        !!sale && setValue(`annualSalesGoals.${index}.sale`, formatNumberWithText(sale, ` ${watchCurrency}`))
      })
    }
  }, [watchCurrency])

  const renderCell = (type: string, index: number) => {
    switch (type) {
      case 'sale': {
        const selectedSale = watch(`annualSalesGoals.${index}.sale`) || ''
        return (
          <InputNumberWithText
            form={form}
            placeholder={dict.profit_step3_input_number_placeholder}
            unitText={` ${watchCurrency}`}
            maxLength={15}
            name={`annualSalesGoals.${index}.sale`}
            sxInput={{
              '.MuiInputBase-root': { height: remConvert('68px'), maxHeight: remConvert('68px') },
              '.MuiInputBase-input': {
                padding: remConvert('6px'),
                textOverflow: 'ellipsis',
                textAlign: 'center',
                marginTop: selectedSale ? remConvert('-14px') : 0
              }
            }}
            textFieldProps={{
              InputProps: {
                endAdornment: (
                  <Typography
                    color={palette.home.blue500}
                    fontSize={14}
                    position={'absolute'}
                    bottom={remConvert('12px')}
                    left={'50%'}
                    whiteSpace={'nowrap'}
                    width={'90%'}
                    sx={{ transform: 'translate(-50%, 0)', textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {lang === 'en'
                      ? formatCurrencyEnglish(parseNumber(selectedSale), `${watchCurrency}`)
                      : formatCurrencyKorean(parseNumber(selectedSale), `${watchCurrency}`)}
                  </Typography>
                )
              }
            }}
          />
        )
      }
      case 'desc': {
        return (
          <TextareaItem
            name={`annualSalesGoals.${index}.desc`}
            maxLength={MAX_LENGTH.ANNUAL_SALES_GOALS_DESCRIPTION}
            textFieldProps={{ multiline: true, placeholder: dict.profit_step3_input_desc_placeholder }}
            sxInput={{
              '.MuiInputBase-input': { padding: remConvert('6px'), textAlign: 'center' },
              '.MuiInputBase-root': { minHeight: remConvert('68px') }
            }}
          />
        )
      }
      case 'color': {
        const selectedColor = watch(`annualSalesGoals.${index}.color`) || ''
        const sxActive = { border: `${remConvert('3px')} solid ${palette.home.gray50}` }
        return (
          <Box
            display={'grid'}
            rowGap={remConvert('8px')}
            columnGap={remConvert('14px')}
            gridTemplateColumns={'repeat(4, 1fr)'}
          >
            {DATA_COLORS.map((color) => (
              <Box
                key={color}
                height={remConvert('28px')}
                width={remConvert('28px')}
                borderRadius={'100%'}
                bgcolor={color}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { ...sxActive },
                  ...(selectedColor === color && { ...sxActive }),
                  [breakpoints.down(1532)]: {
                    height: remConvert('24px'),
                    width: remConvert('24px')
                  }
                }}
                onClick={() => {
                  setValue(`annualSalesGoals.${index}.color`, color)
                  trigger()
                }}
              />
            ))}
          </Box>
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
      bgColorColumn={isView ? palette.home.gray300 : undefined}
      sxBox={{ overflowX: 'auto' }}
      sxRow={{
        td: { fontSize: remConvert('20px'), lineHeight: remConvert('24px') },
        '&:not(:first-child) td': {
          backgroundColor: 'unset',
          whiteSpace: 'break-spaces',
          height: remConvert('109px'),
          padding: remConvert('20px')
        }
      }}
      sxCell={{
        height: remConvert('60px'),
        padding: remConvert('12px'),
        '&:first-child': { width: remConvert('158px'), minWidth: remConvert('108px') },
        '&:not(:first-child)': { borderLeftWidth: '1px !important' }
      }}
    >
      {tableDataAnnualSales.rowList.map((row, index) => (
        <TableRow key={index}>
          {tableDataAnnualSales.columnList.map((column, indexColumn) => (
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

export default TableAnnualSales
