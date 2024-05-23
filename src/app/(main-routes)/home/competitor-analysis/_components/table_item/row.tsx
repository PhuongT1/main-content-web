import { ReactElement } from 'react'
import { Box, IconButton, TableCell as MuiTableCell, useTheme, TableRow } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ICompetitorComparisonItem } from '@/types/competitor-analysis.type'
import InputItem from '@/form/input'
import DragIcon from '@/assets/icons/drag'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import { convertToRem } from '@/utils/convert-to-rem'
import { MAXLENGTH_INPUT } from './../utils'

type TTableItemCard = {
  index: number
  item: ICompetitorComparisonItem
  onDelete?: (index: number) => void
  children: ReactElement
  inputProps?: any
}

function TableItemCard({ index, item, onDelete, children, inputProps }: TTableItemCard) {
  const {
    palette: { home }
  } = useTheme()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: (item?.id ?? '') as string
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <TableRow
      sx={{
        backgroundColor: isDragging ? home.dark_blue700 : home.gray500,
        '&:last-child': { 'td:nth-child(2)': { borderBottom: `2px solid ${home.blue500}` } },
        ...style
      }}
    >
      <MuiTableCell sx={{ borderColor: home.gray200, padding: convertToRem(4) }}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <IconButton
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            disableRipple
            sx={{ width: convertToRem(40), height: convertToRem(40) }}
          >
            <DragIcon />
          </IconButton>

          <InputItem
            sxInput={{
              '.MuiInputBase-root': { maxHeight: convertToRem(45), width: convertToRem(120) },
              input: { padding: convertToRem(8) + ' !important' }
            }}
            name={`rowList.${index}.name`}
            textFieldProps={{
              required: true,
              placeholder: '내용입력',
              inputProps: { maxLength: MAXLENGTH_INPUT.KEYWORDS_TEXT }
            }}
            {...inputProps}
          />

          {onDelete ? (
            <IconButton onClick={() => onDelete(index)}>
              <ClearBoxIcon svgProps={{ width: 30, height: 30 }} />
            </IconButton>
          ) : (
            <Box width={48} />
          )}
        </Box>
      </MuiTableCell>
      {children}
    </TableRow>
  )
}

export default TableItemCard
