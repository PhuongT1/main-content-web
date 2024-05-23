import React, { FC, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Box, SliderOwnProps, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ButtonItem } from '@/components/home/button'
import { useFieldArray, useForm } from 'react-hook-form'
import SliderItem from '@/form/slider/index'
import TableItem from '../table-item'

export interface TableColumnsType {
  title: string
  hidden?: boolean
  onRender?: (row: number[], index: number) => React.ReactNode
}
export interface DataTableAnalyzing {
  tableAnalyzing: number[][]
  indexActive?: number
}

export interface Marks {
  value: number
  label?: React.ReactNode
}
export interface AnalyzingProps extends DataTableAnalyzing {
  lable?: React.ReactNode[]
  rows: TableColumnsType[]
  getValuesForm?: (data: DataTableAnalyzing) => void
  isDisable?: boolean
  textFinalSelected?: string
  hiddenFinalSelected?: boolean
  sliderProps?: SliderOwnProps
  onSetActive?: (index: number) => void
  bgColorColumn?: string
}

const Analyzing: FC<AnalyzingProps> = ({
  tableAnalyzing,
  indexActive,
  rows,
  getValuesForm,
  isDisable,
  textFinalSelected = '',
  hiddenFinalSelected = false,
  sliderProps,
  onSetActive,
  bgColorColumn
}) => {
  const {
    palette: { home }
  } = useTheme()

  const { control, watch } = useForm<DataTableAnalyzing>({
    mode: 'onBlur',
    values: { tableAnalyzing },
    reValidateMode: 'onChange',
    defaultValues: {
      tableAnalyzing
    }
  })

  // Emit data form
  useEffect(() => {
    const subscription = watch((valueForm) => {
      getValuesForm && getValuesForm(valueForm as DataTableAnalyzing)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const { fields } = useFieldArray({
    control,
    name: 'tableAnalyzing'
  })

  const rowsTable: TableColumnsType[] = [
    ...rows,
    {
      title: textFinalSelected,
      hidden: hiddenFinalSelected,
      onRender: (_row, index) => {
        return (
          <ButtonItem
            disabled={_row.length === 0 || !!_row.some((item) => !item)}
            sx={{
              background: home.gray400,
              color: home.gray50,
              '&:hover': {
                backgroundColor: home.gray300
              },
            }}
            onClick={() => {
              onSetActive && onSetActive(index)
            }}
          >
            선택
          </ButtonItem>
        )
      }
    }
  ]

  return (
    <TableItem hiddenFinalSelected={hiddenFinalSelected} bgColorColumn={bgColorColumn} isDisable={isDisable}>
      {rowsTable.map((item, index) => {
        if (item.hidden) return <></>
        else
          return (
            <TableRow key={index}>
              <TableCell width={'1%'} align='center'>
                {item.title}
              </TableCell>
              {fields.map((field, indexField) => {
                if (item.onRender) {
                  return (
                    <TableCell
                      width={'1%'}
                      key={field.id}
                      align='center'
                      className={indexField === indexActive ? 'activeCell' : ''}
                    >
                      {item.onRender(watch(`tableAnalyzing.${indexField}`), indexField)}
                    </TableCell>
                  )
                }
                return (
                  <TableCell
                    width={'1%'}
                    key={'field' + field.id}
                    align='center'
                    className={indexField === indexActive ? 'activeCell' : ''}
                  >
                    <SliderItem
                      control={control}
                      name={`tableAnalyzing.${indexField}.${index - 1}`}
                      sliderProps={sliderProps}
                    />
                  </TableCell>
                )
              })}
            </TableRow>
          )
      })}
    </TableItem>
  )
}

export default Analyzing
