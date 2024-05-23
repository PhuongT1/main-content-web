import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, useTheme } from '@mui/material'
import { default as MuiTable } from '@mui/material/Table'
import { convertToRem } from '@/utils/convert-to-rem'
import { IFormValuesStepThree, ICompetitorComparisonItem } from '@/types/competitor-analysis.type'
import { Typography } from '@/elements'
import { optionsTruncate } from '@/utils/styles'
import { FIELD_TYPE } from '../utils'
import { TableItemChip } from '../table_item'
import StatusCircle from '@/assets/icons/status-circle'
import StatusRemove from '@/assets/icons/status-remove'
import StatusArrow from '@/assets/icons/status-arrow'

interface ITableComparisonView {
  data: IFormValuesStepThree
  headers: string[]
}
function TableComparisonView({ data, headers }: ITableComparisonView) {
  const { palette } = useTheme()

  const handleRenderContentTable = (fields: ICompetitorComparisonItem[]) => {
    return fields?.map((field: ICompetitorComparisonItem) => {
      switch (field?.type) {
        case FIELD_TYPE.TARGET_CUSTOMER:
        case FIELD_TYPE.DIFFERENT_CHARACTERISTICS:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key} display='flex' gap={convertToRem(5)} justifyContent='center' flexWrap={'wrap'}>
                {Array.isArray(value) &&
                  value?.map((value: string, indexCol: number) => (
                    <TableItemChip key={indexCol} index={indexCol} text={value} />
                  ))}
              </Box>
            ])
          )
        case FIELD_TYPE.TEXT:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key}>
                <Typography fontSize={14} fontWeight={400} color={palette.home.gray50} sx={{ ...optionsTruncate(2) }}>
                  {value}
                </Typography>
              </Box>
            ])
          )
        case FIELD_TYPE.OPTION:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key}>
                {value === '있음' ? (
                  <Box display='flex' justifyContent='center' alignItems='center' gap={convertToRem(5)}>
                    <StatusCircle />
                    <Typography color={palette.home.gray50}>{value}</Typography>
                  </Box>
                ) : (
                  <Box display='flex' justifyContent='center' alignItems='center' gap={convertToRem(5)}>
                    <StatusRemove />
                    <Typography color={palette.home.gray50}>{value}</Typography>
                  </Box>
                )}
              </Box>
            ])
          )
        case FIELD_TYPE.SLIDE:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key}>
                {value === 1 ? (
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    gap={convertToRem(5)}
                    sx={{ svg: { transform: 'rotate(180deg)' } }}
                  >
                    <StatusArrow stroke={palette.home.red500} />
                    <Typography color={palette.home.gray50}>{'낮음'}</Typography>
                  </Box>
                ) : value === 2 ? (
                  <Box display='flex' justifyContent='center' alignItems='center' gap={convertToRem(5)}>
                    <StatusCircle stroke={palette.home.mint500} />
                    <Typography color={palette.home.gray50}>{'보통'}</Typography>
                  </Box>
                ) : (
                  <Box display='flex' justifyContent='center' alignItems='center' gap={convertToRem(5)}>
                    <StatusArrow />
                    <Typography color={palette.home.gray50}>{'높음'}</Typography>
                  </Box>
                )}
              </Box>
            ])
          )
        case FIELD_TYPE.SELECT_PROMOTION:
        case FIELD_TYPE.SELECT_STRUCTURE:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key}>
                <Typography fontWeight={600} color={palette.home.gray50}>
                  {value}
                </Typography>
              </Box>
            ])
          )
        default:
          return field.data
      }
    })
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundImage: 'unset', borderRadius: convertToRem(10), border: `1px solid ${palette.home.gray200}` }}
    >
      <MuiTable sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow
            sx={{
              '&:first-child': {
                td: { borderTop: 'none' }
              }
            }}
          >
            {headers.map((header, index) => (
              <TableCell
                align='center'
                height={60}
                key={`header-${header}`}
                sx={{
                  width: index === 0 ? convertToRem(168) : 'auto',
                  fontWeight: 600,
                  color: palette.home.gray50,
                  background: palette.home.gray300,
                  borderColor: palette.home.gray200,
                  '&:not(:first-child)': { borderLeftWidth: '1px', borderLeftStyle: 'solid' },
                  '&:nth-child(2), &:nth-child(3)': {
                    borderLeftColor: palette.home.blue500,
                    borderLeftWidth: '2px'
                  },
                  '&:nth-child(2)': { boxShadow: `0 2px 0 ${palette.home.blue500} inset` }
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {handleRenderContentTable(data?.rowList || []).map((field, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: palette.home.gray500,
                '&:last-child': {
                  td: { borderBottom: 'none' },
                  'td:nth-child(2)': { borderBottom: `2px solid ${palette.home.blue500}` }
                }
              }}
            >
              {headers.map((header, indexRow) => (
                <TableCell
                  align='center'
                  height={90}
                  key={`content-${header}`}
                  sx={{
                    borderColor: palette.home.gray200,
                    '&:not(:first-child)': { borderLeftWidth: '1px', borderLeftStyle: 'solid' },
                    '&:nth-child(2), &:nth-child(3)': { borderLeftColor: palette.home.blue500, borderLeftWidth: '2px' }
                  }}
                >
                  {indexRow === 0 ? (
                    <Typography fontWeight={600} color={palette.home.gray50}>
                      {data?.rowList?.[index]?.name}
                    </Typography>
                  ) : (
                    field?.[header]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default TableComparisonView
