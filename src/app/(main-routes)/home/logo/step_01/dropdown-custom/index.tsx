import { useTheme } from '@mui/material'
import { FC } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export interface Props {
  items: any
  itemActive: any
  onSelected?: any
  readOnly?: boolean
}

const DropdownCustom: FC<Props> = ({ items, itemActive, onSelected, readOnly }) => {
  const {
    palette: { home }
  } = useTheme()

  const handleChange = (event: SelectChangeEvent) => {
    onSelected(event.target.value)
  }

  return (
    <Select inputProps={{ readOnly: readOnly }} className='selectCustom' value={itemActive} onChange={handleChange}>
      {items.map((item: any, index: number) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default DropdownCustom
