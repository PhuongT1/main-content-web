import React, { CSSProperties } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

export type TypeProperties = CSSProperties | Record<string, SxProps<Theme>>
export interface TableItemProps {
  children?: React.ReactNode
  hiddenFinalSelected?: boolean
  isDisable?: boolean
  bgColorColumn?: string
  sxCell?: TypeProperties
  sxRow?: TypeProperties
  sxBox?: SxProps<Theme>
}

const TableItem = ({
  children,
  bgColorColumn,
  isDisable,
  hiddenFinalSelected,
  sxCell,
  sxRow,
  sxBox
}: TableItemProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        border: `1px solid ${home.gray200}`,
        borderRadius: remConvert('10px'),
        color: home.gray50,
        pointerEvents: isDisable ? 'none' : 'all',
        ...sxBox
      }}
    >
      <Table
        aria-label='Analyzing Table'
        sx={{
          minWidth: 650,
          borderCollapse: 'separate',
          td: {
            padding: remConvert('20px 28px'),
            borderColor: home.gray200,
            backgroundColor: home.gray500,
            borderLeft: `1px solid  ${home.gray200}`,
            fontWeight: 600,
            color: home.gray50,
            ...sxCell
          },
          '.activeCell': {
            borderLeft: `2px solid ${home.blue500}`,
            borderRight: `2px solid ${home.blue500}`
          },
          tr: {
            'td:first-child': {
              borderLeft: 0,
              backgroundColor: bgColorColumn ?? home.gray400
            },
            '&:first-child': {
              td: {
                borderLeftWidth: 0,
                backgroundColor: bgColorColumn ?? home.gray400,
                '&.activeCell': {
                  borderTop: `2px solid ${home.blue500}`,
                  borderLeftWidth: remConvert('2px')
                },
                ':first-child': {
                  borderTopLeftRadius: remConvert('10px')
                },
                ':last-child': {
                  borderTopRightRadius: remConvert('10px')
                }
              }
            },
            '&:last-child': {
              td: {
                borderBottom: 0,
                '&.activeCell': {
                  backgroundColor: hiddenFinalSelected ? home.gray500 : home.opacity_blue_100,
                  borderBottomLeftRadius: 0,
                  borderBottom: `2px solid ${home.blue500}`,
                  button: {
                    backgroundColor: home.blue500
                  }
                },
                ':first-child': {
                  borderBottomLeftRadius: remConvert('10px')
                },
                ':last-child': {
                  borderBottomRightRadius: remConvert('10px')
                }
              }
            },
            ...sxRow
          }
        }}
      >
        <TableBody>{children}</TableBody>
      </Table>
    </Box>
  )
}

export default TableItem
