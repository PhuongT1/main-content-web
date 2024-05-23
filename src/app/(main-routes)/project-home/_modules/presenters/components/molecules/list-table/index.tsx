import { Box, Pagination, SxProps, useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import styles from './list-table.module.scss'
import { remConvert } from '@/utils/convert-to-rem'

export type AlignCellProps = 'left' | 'right' | 'center' | 'inherit' | 'justify' | undefined

export interface ColumnsProps {
    title: string
    value: string | string[]
    render?: (value?: any, obj?: any) => any
    alignCell?: AlignCellProps
    width?: number | string
    isNotTruncate?: boolean
}

interface ListTableProps {
    columns: Array<ColumnsProps>
    rows: Array<any>
    heightRow?: number
    isLoading?: boolean
    numberItem?: number
    handleClickRow?: (id: number, value: any) => void
    handleClickColumn?: (row: any, value: any) => void
    handleDoubleClickRow?: (id: number, value: any) => void
    handleGetCurrentPage?: (value: any) => void
    total?: number
    currentPage?: number
    totalItem?: number
    emptyText?: string
    sxHead?: SxProps
    sxHeadCell?: SxProps

}

const ListTable = ({
    columns,
    rows,
    isLoading = false,
    handleClickRow,
    handleClickColumn,
    handleDoubleClickRow,
    handleGetCurrentPage,
    total,
    currentPage,
    sxHead,
    sxHeadCell,
    emptyText = '검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.',
}: ListTableProps) => {
    const {
        palette: { home }
    } = useTheme()

    return (
        <Box className={styles['table-pagination']} sx={{ overflowX: 'auto' }}>
            <TableContainer className={styles.table_container}>
                {/* <BackdropLoading relative open={isLoading} /> */}
                <Table aria-label='simple table' className={styles.table}>
                    <TableHead sx={{
                        background: home.gray400,
                        color: home.gray100,
                        borderRadius: remConvert('10px'),
                        fontWeight: 600,
                        ...sxHead
                    }}
                    >
                        <TableRow sx={{
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
                            {columns?.map((column, index) => {
                                return (
                                    <TableCell sx={{ color: home.gray100, ...sxHeadCell }} align={column.alignCell || 'center'} width={column.width || 'auto'} key={column.title}>
                                        {column.title}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody className={styles.table_body}>
                        {rows?.length > 0 &&
                            rows?.map((row: any) => {
                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        className={row?.isPinned ? 'isPinned' : ''}
                                        key={row.code}
                                        onClick={(event: any) => handleClickRow?.(event, row)}
                                        onDoubleClick={(event: any) => handleDoubleClickRow?.(event, row)}
                                        sx={{
                                            cursor: handleClickRow ? 'pointer' : 'default',
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
                                            },
                                            '&.isPinned': {
                                                background: 'rgba(114, 154, 254, 0.10)',
                                                'td:first-child': {
                                                    borderTopLeftRadius: remConvert('10px'),
                                                    borderBottomLeftRadius: remConvert('10px'),
                                                },
                                                'td:last-child': {
                                                    borderTopRightRadius: remConvert('10px'),
                                                    borderBottomRightRadius: remConvert('10px'),
                                                },
                                            }
                                        }}
                                    >
                                        {columns.map((item: any) => {
                                            return (
                                                <TableCell
                                                    align={item?.alignCell || 'center'}
                                                    width={item?.width || 'auto'}
                                                    key={item.value}
                                                    onClick={(event: any) => handleClickColumn?.(row, item)}
                                                    sx={{
                                                        '& > *': item?.isNotTruncate
                                                            ? {}
                                                            : {
                                                                display: 'inline !important',
                                                            },
                                                        '&.MuiTableCell-root, & > *': item?.isNotTruncate
                                                            ? {}
                                                            : {
                                                                maxWidth: 250,
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textAlign: 'center',
                                                            },
                                                    }}
                                                >
                                                    {item?.render ? item?.render(row[item.value], row) : row[item.value]}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        {/* No Data */}
                        {(!rows || rows?.length === 0) && !isLoading && (
                            <TableRow>
                                <TableCell colSpan={columns?.length + 1} className={styles.message_empty}>
                                    {emptyText}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!!total && (
                <Pagination
                    onChange={(e: any, page: number) => handleGetCurrentPage?.(page)}
                    className={styles.pagination}
                    page={currentPage}
                    count={total}
                    sx={{
                        display: 'flex',
                        marginTop: remConvert('24px'),
                        '.MuiPaginationItem-root': {
                            width: remConvert('40px'),
                            height: remConvert('40px'),
                            borderRadius: '50%',
                            '&.Mui-selected': {
                                border: `1px solid ${home.blue500}`,
                                background: home.blue500
                            },
                            '&.MuiPaginationItem-ellipsis': {
                                alignContent: 'center'
                            }
                        }
                    }}

                />
            )}
        </Box>
    )
}

export default ListTable
