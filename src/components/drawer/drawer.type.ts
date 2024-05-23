import { ListItemProps } from '@mui/material'
import { ReactNode } from 'react'

export enum DrawerItemType {
  DIVIDER = 'divider',
  DEFAULT = 'default'
}

export interface ListItemLinkProps extends ListItemProps {
  to?: string
  open?: boolean | undefined | null
  text?: ReactNode
  onClick?: () => void | undefined
  icon?: ReactNode
  activeIcon?: ReactNode
  highlight?: boolean | undefined
  isParent?: boolean
  drawerOpen?: boolean
  child?: any[]
  type?: DrawerItemType
  visible?: boolean
}
