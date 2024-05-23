'use client'

import UserSmIcon from '@/assets/icons/header-menu-icons/user-sm'
import MenuItem from '@/elements/menu-item'
import Typography from '@/elements/typography'
import { ListItemIcon } from '@mui/material'
import { useRouter } from 'next/navigation'
import { MenuProps } from './constants'

interface ListMenuProps {
  menus: MenuProps[]
  closeMenuFn: Function
}

const ListMenu = ({ menus, closeMenuFn }: ListMenuProps) => {
  const router = useRouter()
  return menus.map((value, index) => {
    return (
      <MenuItem
        key={index}
        sx={{
          padding: '0.62rem 1rem'
        }}
        onClick={() => {
          router.push(value.to)
          closeMenuFn()
        }}
      >
        <ListItemIcon>
          <UserSmIcon />
        </ListItemIcon>
        <Typography cate='caption_1' color='main.white'>
          {value.name}
        </Typography>
      </MenuItem>
    )
  })
}

export default ListMenu
