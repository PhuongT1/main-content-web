import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import {
  Box,
  CircularProgress,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material'

type AlignCellProps = 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined

export type TColumn = {
  label: string
  value: any
  render?: (value?: any, obj?: any) => any
  alignCell?: AlignCellProps
  width?: number | string
}

export type TTableProps = {
  direction?: 'row' | 'column'
  columns: Array<TColumn>
  rows: any
}

export const ColumnTable = ({ key, column, sx }: { key: number; column: any; sx?: SxProps }) => {
  const { palette } = useTheme()
  return (
    <Box
      key={key}
      sx={{
        width: column.width || '100%',
        background: palette.main_grey.gray700,
        paddingX: convertToRem(24),
        paddingY: convertToRem(12),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        ...sx
      }}
    >
      <Typography cate='caption_1_semibold' plainColor='main.grayf7' sx={{ textAlign: 'center' }}>
        {column.label}
      </Typography>
    </Box>
  )
}

export const RowTable = ({
  key,
  column,
  row,
  sx,
  textAlign = 'center'
}: {
  key: number
  column: any
  row: any
  sx?: SxProps
  textAlign?: 'center' | 'left'
}) => {
  const { palette } = useTheme()
  return (
    <Box
      key={key}
      sx={{
        width: column.width || '100%',
        borderBottom: `1px solid ${palette.main_grey.gray600}`,
        paddingX: convertToRem(24),
        paddingY: convertToRem(12),
        ...sx
      }}
    >
      {column?.render
        ? column?.render(row[column.value], row)
        : (
            <Typography cate='body_20' plainColor='main.white' sx={{ textAlign }}>
              {row[column.value]}
            </Typography>
          ) ?? '-'}
    </Box>
  )
}

export const TableHorizontal = ({ direction = 'column', columns, rows }: TTableProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: direction }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between'
        }}
      >
        {columns.map((column, index) => (
          <ColumnTable column={column} key={index} />
        ))}
      </Box>
      {rows?.map((row: any, index: number) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between'
          }}
        >
          {columns.map((column: any, index: number) => (
            <RowTable column={column} row={row} key={index} />
          ))}
        </Box>
      ))}
    </Box>
  )
}

export const TableVertical = ({ direction = 'row', columns, rows }: TTableProps) => {
  const { palette } = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: direction }}>
      {rows?.map((row: any, index: number) => (
        <Box key={index}>
          {columns.map((column: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ColumnTable
                column={column}
                key={index}
                sx={{ borderBottom: `1px solid ${palette.main_grey.gray600}`, width: convertToRem(166) }}
              />
              <RowTable
                column={column}
                row={row}
                key={index}
                sx={{ borderTop: index === 0 ? `1px solid ${palette.main_grey.gray600}` : 'unset' }}
                textAlign='left'
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export const TablePayment = ({
  direction = 'column',
  columns,
  rows,
  isLoading
}: TTableProps & { isLoading: boolean }) => {
  const { palette } = useTheme()
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                width={column.width || 'auto'}
                align={column.alignCell || 'center'}
                key={index}
                sx={{
                  background: palette.main_grey.gray700,
                  paddingX: convertToRem(24),
                  paddingY: convertToRem(16)
                }}
              >
                <Typography cate='caption_1_semibold' plainColor='main.grayf7' sx={{ textAlign: 'center' }}>
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!isLoading && rows ? (
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row: any, index: number) => (
                <TableRow key={`row-${index}`}>
                  {columns.map((item: any, indexRow: number) => {
                    return (
                      <TableCell
                        width={item.width || 'auto'}
                        align={item.alignCell || 'center'}
                        key={indexRow}
                        sx={{
                          borderBottom: `1px solid ${palette.main_grey.gray600}`,
                          paddingX: convertToRem(24),
                          paddingY: convertToRem(16)
                        }}
                      >
                        {item?.render
                          ? item?.render(row[item.value], row)
                          : (
                              <Typography cate='body_40' plainColor='main.white'>
                                {row[item.value]}
                              </Typography>
                            ) ?? '-'}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align={'center'}>
                  <Typography cate='body_40' plainColor='main.white'>
                    결제내역이 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              align={'center'}
              sx={{
                borderBottom: 'none'
              }}
            >
              <Stack
                width={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ minHeight: convertToRem(240) }}
              >
                <CircularProgress />
              </Stack>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </TableContainer>
  )
}
