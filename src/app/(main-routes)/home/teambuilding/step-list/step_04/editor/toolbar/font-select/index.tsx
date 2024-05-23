import ArrowDownIcon from '@/assets/icons/arrow-down'
import { EditorNodeList } from '@/types/teambuilding/index.type'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { CSSProperties } from 'react'

type TSelectToolbar = {
  data: EditorNodeList
  indexOfRow: number
  updateStyleRow: ({ style, id, indexOfRow }: { style: CSSProperties; id: string; indexOfRow: number }) => void
  id: string
  onClose: VoidFunction
}

function SelectTToolbar({ data, updateStyleRow, onClose, id, indexOfRow }: TSelectToolbar) {
  const fontList = [
    { value: '18px', label: 'Large Text' },
    { value: '16px', label: 'Normal Text' },
    { value: '14px', label: 'Small Text' }
  ]

  return (
    <Select
      disableUnderline
      sx={{
        color: '#000',
        '& .MuiSelect-select': {
          paddingRight: '8px!important'
        },
        '&:hover': {
          border: 'none'
        }
      }}
      onChange={(e: SelectChangeEvent) => {
        updateStyleRow({
          id,
          indexOfRow,
          style: {
            fontSize: e.target.value
          }
        })
        onClose()
      }}
      value={data.styles?.[indexOfRow]?.fontSize as string}
      variant='standard'
      IconComponent={() => <ArrowDownIcon svgProps={{ width: 14 }} />}
    >
      {fontList.map((font) => (
        <MenuItem key={font.value} value={font.value}>
          {font.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectTToolbar
