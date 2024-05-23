import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Pagination, SxProps, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

export interface ColumnsTableProjectType<T extends object> {
  title: string | React.ReactNode
  key: keyof T
  width?: string
  headAlign?: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  bodyAlign?: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  onRender?: (row: T, index: number) => React.ReactNode
}

interface Props<T extends object> {
  columns: ColumnsTableProjectType<T>[]
  sxHead?: SxProps
  sxHeadCell?: SxProps
  data?: T[]
  all?: boolean
}

const ProjectTable = <T extends object>({ columns, data, all, sxHead, sxHeadCell }: Props<T>) => {
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
    <TableContainer sx={{ flexGrow: 1, width: 0 }}>
      <Table aria-label='simple table' sx={{ minWidth: '936px' }}>
        <TableHead
          sx={{
            background: home.gray400,
            color: home.gray100,
            borderRadius: remConvert('10px'),
            fontWeight: 600,
            ...sxHead
          }}
        >
          <TableRow
            sx={{
              th: {
                margin: remConvert('14px 16px'),
                borderBottom: 0,
                position: 'relative'
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
              <TableCell sx={{ color: home.gray100, ...sxHeadCell }} width={width} key={index} align={headAlign}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataWithPage.length > 0 ? (
            dataWithPage.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  td: {
                    padding: remConvert('14px 16px'),
                    borderColor: home.gray300,
                    position: 'relative',
                    '&:not(:last-child):before': {
                      content: "''",
                      position: 'absolute',
                      left: '100%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      height: '50%',
                      width: '1px',
                      borderRight: `1px solid ${home.gray300}`
                    }
                  }
                }}
              >
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

export default ProjectTable
