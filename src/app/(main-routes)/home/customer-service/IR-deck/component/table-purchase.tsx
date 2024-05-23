import { Box, TableCell, TableRow, useTheme } from '@mui/material'
import TableItem, { TypeProperties } from '@/components/home/table-item'
import {
  ColumnTable,
  PurchaseDesign,
  TablePurchaseCustomer,
  VirtualTargetCustomer
} from '@/types/customer-service.type'
import { remConvert } from '@/utils/convert-to-rem'
import React, { useEffect, useState } from 'react'
import { MULTIPLE_DATA_CHART, ROW_ITEM_DEFAULT, columnsTable } from '@/constants/customer-service.constant'
import LineChart, { LineChartProps } from './line-chart'
import { getColorAlpha } from '@/utils/styles'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { Typography } from '@/elements'
import { iconList } from '../../_clientComponents/_components/table-purchase'
export interface PurchaseProps {
  data?: PurchaseDesign
  dataTargetCustomer?: VirtualTargetCustomer
  sxTdFirstChild?: TypeProperties
  sxTdLastChild?: TypeProperties
  sxTdDescription?: TypeProperties
  widthBoxFirstChild?: string
  sxCell?: TypeProperties
  chartProps?: LineChartProps
  isNoBorderDes?: boolean
}

const ROW_ITEM_IR: TablePurchaseCustomer[] = ROW_ITEM_DEFAULT.map((item) => ({ ...item }))
ROW_ITEM_IR.splice(2, 1)

const TablePurchase = ({
  data,
  sxTdFirstChild,
  widthBoxFirstChild,
  sxTdLastChild,
  sxTdDescription,
  sxCell,
  chartProps,
  dataTargetCustomer,
  isNoBorderDes
}: PurchaseProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)
  const [dataTable, setDataTable] = useState<TablePurchaseCustomer[]>()
  const [dataChart, setDataChart] = useState<number[]>()
  const [labelChart, setLabelChart] = useState<string[]>()
  const colorAlpha = getColorAlpha(primaryColor, home.ir_alpha10)

  const convert = (value: string) => (Number(value) + 1) * MULTIPLE_DATA_CHART

  const sortData = (item: TablePurchaseCustomer) => {
    const { motivation, quest, experience, attainment, feedback } = item
    return [motivation, quest, experience, attainment, feedback]
  }

  useEffect(() => {
    if (!data?.purchaseCustomer) return
    // convert data
    const dataCustomer: TablePurchaseCustomer[] = []
    data?.purchaseCustomer.map((item, index) => {
      if (index !== 2) {
        dataCustomer.push(item)
      }
    })

    const { motivation, quest, experience, attainment, feedback } = dataCustomer[4]
    setDataChart([convert(motivation), convert(quest), convert(experience), convert(attainment), convert(feedback)])
    setDataTable(dataCustomer)

    setLabelChart(sortData(data?.purchaseCustomer[2]))
  }, [data?.purchaseCustomer])

  const indexCustom = (index: number) => index === 3 || index === 6

  const renderItem = (row: TablePurchaseCustomer, column: ColumnTable, indexColumn: number) => {
    switch (row.type) {
      case 'point':
        return (
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              minHeight: remConvert('130px'),
              justifyContent: 'end'
            }}
          >
            <LineChart dataChart={dataChart} labelChart={labelChart} {...chartProps} />
          </Box>
        )

      case 'icon':
        return iconList[row[column.dataIndex] as number].svg
      default:
        return row[column.dataIndex]
    }
  }

  return (
    <TableItem
      sxBox={{
        borderColor: 'transparent'
      }}
      sxCell={{
        backgroundColor: home.ir_neutral_alpha4,
        color: home.ir_neutral_500,
        fontWeight: 400,
        borderLeftWidth: remConvert('4px'),
        borderBottomWidth: remConvert('4px'),
        borderLeftColor: home.ir_white,
        borderBottomColor: home.ir_white,
        padding: 0,
        fontSize: remConvert('12px'),
        ...sxCell
      }}
      sxRow={{
        '&:first-child': {
          td: {
            backgroundColor: home.ir_neutral_alpha10,
            fontWeight: 700,
            '&:first-child': {
              opacity: 0,
              backgroundColor: 'transparent'
            },
            '&:nth-child(2)': {
              borderTopLeftRadius: remConvert('10px')
            },
            '&:last-child': {
              borderTopRightRadius: remConvert('10px')
            }
          }
        },
        '&:nth-child(7)': {
          td: {
            backgroundColor: 'transparent'
          }
        },
        '&:nth-child(6)': {
          td: {
            backgroundColor: colorAlpha,
            '&:first-child': {
              backgroundColor: colorAlpha,
              color: primaryColor
            },
            ...sxTdLastChild
          }
        },
        '&:last-child': {
          td: {
            '&:first-child': {
              borderBottomLeftRadius: 0
            },
            borderLeft: isNoBorderDes ? 0 : remConvert('4px')
          }
        },
        td: {
          '&:first-child': {
            backgroundColor: home.ir_neutral_alpha4,
            fontWeight: 700,
            ...sxTdFirstChild
          }
        }
      }}
    >
      {dataTable?.map((row, index) => (
        <TableRow key={index}>
          {columnsTable.map((column, indexColumn) => (
            <React.Fragment key={`${index}_${indexColumn}`}>
              {indexCustom(index) && indexColumn > 1 ? (
                <></>
              ) : (
                <TableCell width={'1%'} align='center' colSpan={indexCustom(index) && indexColumn === 1 ? 6 : 1}>
                  <Box
                    component={'div'}
                    sx={{
                      minHeight: index === 0 ? remConvert('26px') : remConvert('44px'),
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: '1 0 0',
                      width: indexColumn === 0 ? widthBoxFirstChild ?? remConvert('50px') : 'auto'
                    }}
                  >
                    {row.type && column.dataIndex !== 'title'
                      ? renderItem(row, column, indexColumn)
                      : row.type
                      ? ROW_ITEM_IR[index]?.title
                      : column.title}
                  </Box>
                </TableCell>
              )}
            </React.Fragment>
          ))}
        </TableRow>
      ))}
      <TableRow>
        <TableCell
          sx={{
            backgroundColor: 'transparent',
            opacity: dataTargetCustomer?.customer.path ? 1 : 0,
            background: `url(${dataTargetCustomer?.customer.path}) center/cover no-repeat`
          }}
        ></TableCell>
        <TableCell colSpan={6}>
          <Box component={'div'} sx={{ width: 1, textAlign: 'center' }}>
            <Typography
              cate='text_12_bold'
              sx={{
                color: home.ir_neutral_500,
                letterSpacing: '-0.24px',
                padding: remConvert('12px 20px'),
                backgroundColor: colorAlpha,
                border: `${remConvert('1px')} solid ${primaryColor}`,
                borderRadius: remConvert('4px'),
                marginTop: remConvert('28px'),
                ...sxTdDescription
              }}
            >
              {data?.reachStrategy}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    </TableItem>
  )
}

export default TablePurchase
