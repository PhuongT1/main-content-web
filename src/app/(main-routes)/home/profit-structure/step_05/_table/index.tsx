import { useFormContext } from 'react-hook-form'
import { useTheme, TableCell, TableRow, Box, Typography } from '@mui/material'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { remConvert } from '@/utils/convert-to-rem'
import { parseNumber } from '@/utils/string'
import { formatCurrencyKorean } from '@/utils/format-currency'
import TableItem from '@/components/home/table-item'
import InputNumberWithText from '@/components/input/input-number-with-text'
import TextareaItem from '@/form/textarea'
import InputItem from '@/form/input'
import { useGetDefaultTableValue } from './../useData'

interface ITableTamSamSom {
  isView?: boolean
}
function TableTamSamSom({ isView = false }: ITableTamSamSom) {
  const { palette } = useTheme()
  const { rowList, columnList } = useGetDefaultTableValue()
  const form = useFormContext<IFormValuesTamSamSom>()
  const { watch } = form

  // =====
  const renderCell = (type: string, index: number, value?: string) => {
    switch (type) {
      case 'name': {
        return (
          <Box
            component={'div'}
            sx={{ span: { fontWeight: 400, color: palette.home.blue500, ml: remConvert('10px') } }}
            dangerouslySetInnerHTML={{ __html: value || '' }}
          />
        )
      }
      case 'marketCate': {
        return (
          <InputItem
            maxLength={30}
            name={`data.${index}.marketCate`}
            textFieldProps={{ placeholder: '내용 입력' }}
            sxInput={{
              '.MuiInputBase-root': { height: remConvert('56px') },
              '.MuiInputBase-input': { padding: remConvert('10px') }
            }}
          />
        )
      }
      case 'calculationBasis': {
        return (
          <TextareaItem
            maxLength={30}
            name={`data.${index}.calculationBasis`}
            textFieldProps={{ multiline: true, placeholder: '내용 입력' }}
            sxInput={{
              '.MuiInputBase-root': { minHeight: remConvert('56px') },
              '.MuiInputBase-input': { padding: remConvert('10px') }
            }}
          />
        )
      }
      case 'marketSize': {
        const selectedSize = watch(`data.${index}.marketSize`) || ''
        return (
          <InputNumberWithText
            form={form}
            unitText=''
            maxLength={20}
            placeholder='금액 입력'
            name={`data.${index}.marketSize`}
            sxInput={{
              '.MuiInputBase-root': { height: remConvert('56px'), maxHeight: remConvert('56px') },
              '.MuiInputBase-input': { padding: remConvert('10px'), textOverflow: 'ellipsis' }
            }}
            textFieldProps={{
              InputProps: {
                endAdornment: (
                  <Typography
                    paddingRight={remConvert('10px')}
                    color={palette.home.gray100}
                    fontSize={14}
                    fontWeight={600}
                    whiteSpace={'nowrap'}
                    sx={{ textWrap: 'nowrap' }}
                  >
                    {formatCurrencyKorean(parseNumber(selectedSize))}
                  </Typography>
                )
              }
            }}
          />
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
        td: { lineHeight: remConvert('24px') },
        '&:not(:first-child) td': {
          whiteSpace: 'break-spaces',
          height: remConvert('109px'),
          padding: remConvert('20px')
        }
      }}
      sxCell={{
        height: remConvert('60px'),
        padding: remConvert('12px'),
        '&:first-child': { minWidth: remConvert('128px'), width: remConvert('128px') },
        '&:not(:first-child)': { borderLeftWidth: '1px !important', width: '30%' }
      }}
    >
      {rowList.map((row, index) => (
        <TableRow key={index}>
          {columnList.map((column, indexColumn) => (
            <TableCell key={indexColumn} align='center'>
              {/* Why index - 1 ? > cuz we don't save headers */}
              {indexColumn === 0
                ? row?.[column?.dataIndex as 'name']
                : renderCell(row.id, indexColumn - 1, row?.[column?.dataIndex as 'name'])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableItem>
  )
}

export default TableTamSamSom
