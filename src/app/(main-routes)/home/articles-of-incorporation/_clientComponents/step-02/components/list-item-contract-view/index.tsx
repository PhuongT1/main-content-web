import { Box, SxProps, useTheme } from '@mui/material'
import { ReactNode } from 'react'

interface IListItem {
  item: ReactNode | string
  key: number
}

interface IListItemContractView {
  listItem: IListItem[]
  styleItem: SxProps
  styleListItem: SxProps
}

const ListItemContractView = ({ listItem, styleItem, styleListItem }: IListItemContractView) => {
  return (
    <Box component={'ol'} sx={styleListItem}>
      {listItem.map((e, i) => {
        return (
          <Box component={'li'} key={e.key} sx={styleItem}>
            {e.item}
          </Box>
        )
      })}
    </Box>
  )
}

export default ListItemContractView
