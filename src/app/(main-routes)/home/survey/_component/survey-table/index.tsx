import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Pagination, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

export interface ColumnsTableSurveyType<T extends object> {
  title: string | React.ReactNode
  key: keyof T
  width?: string
  headAlign?: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  bodyAlign?: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  onRender?: (row: T, index: number) => React.ReactNode
}

interface Props<T extends object> {
  columns: ColumnsTableSurveyType<T>[]
  data?: T[]
  all?: boolean
}

const SurveyTable = <T extends object>({ columns, data, all }: Props<T>) => {
  const {
    palette: { home }
  } = useTheme()

  const [curentPage, setPage] = React.useState(1)
  const [rowsPerPage] = React.useState(10)

  const dataWithPage = React.useMemo(() => {
    return (
      (all ? data : data?.slice((curentPage - 1) * rowsPerPage, (curentPage - 1) * rowsPerPage + rowsPerPage)) || []
    )
  }, [data, curentPage, all, rowsPerPage])

  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead
          sx={{
            background: home.gray300,
            borderRadius: remConvert('10px')
          }}
        >
          <TableRow
            sx={{
              th: {
                padding: remConvert('8px 6px'),
                borderBottom: 0
              },
              'th:first-child': {
                borderRadius: remConvert(`10px 0 0 10px`)
              },
              'th:last-child': {
                borderRadius: remConvert(`0 10px 10px 0`)
              }
            }}
          >
            {columns.map(({ title, width, headAlign = 'center' }, index) => (
              <TableCell width={width} key={index} align={headAlign}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataWithPage.length > 0 ? (
            dataWithPage.map((row, index) => (
              <TableRow key={index}>
                {columns.map(({ key, bodyAlign = 'center', onRender }, indexColumns) => (
                  <TableCell align={bodyAlign} key={indexColumns}>
                    {onRender
                      ? onRender(row, all ? index + 1 : index + 1 + (curentPage - 1) * rowsPerPage)
                      : (row[key] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow style={{ height: 53 }}>
              <TableCell colSpan={99} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data && !all && dataWithPage.length !== 0 && (
        <Pagination
          sx={{
            display: 'flex',
            marginTop: remConvert('24px'),
            justifyContent: 'center',
            '.MuiPaginationItem-root': {
              borderRadius: remConvert('10px'),
              '&.Mui-selected': {
                border: `1px solid ${home.blue500}`,
                background: 'unset'
              }
            }
          }}
          count={Math.ceil(data.length / rowsPerPage)}
          shape='rounded'
          page={curentPage}
          defaultPage={curentPage}
          onChange={(e, value) => setPage(value)}
        />
      )}
    </TableContainer>
  )
}

export default SurveyTable
