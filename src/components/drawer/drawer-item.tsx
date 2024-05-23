import { Box, Collapse, List, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import ListItemLink from './component/list-item-link'
import { ListItemLinkProps } from './drawer.type'

export interface drawerItemProps extends IDrawerItem {
  drawerOpen: boolean
  setDrawerOpen: (state: boolean) => void
}
export interface IDrawerItem {
  to?: string
  text?: string
  icon?: ReactNode
  child?: Array<ListItemLinkProps> | undefined
  index?: number
  activeIcon?: ReactNode
}

const DrawerItem = ({ to, text, icon, child, index, drawerOpen, setDrawerOpen, activeIcon }: drawerItemProps) => {
  const theme = useTheme()

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const router = useRouter()
  const path = usePathname() as string
  const mdDown = useMediaQuery('(max-width: 768px)')
  const handleToggle = () => {
    if (mdDown) {
      setDrawerOpen(false)
    }
  }
  useEffect(() => {
    if (!drawerOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [drawerOpen])

  if (!to && child) {
    return (
      <Box
        sx={{
          padding: `${index === 0 ? 0 : mdDown ? 1 : 2}rem 0 ${mdDown ? 1 : 2}rem 0`,
          borderBottom: '1px solid ' + theme.palette.main.gray80,
          width: drawerOpen ? 'unset' : 'fit-content'
        }}
      >
        <ListItemLink
          text={text}
          open={isOpen}
          icon={icon}
          onClick={handleToggle}
          activeIcon={activeIcon}
          child={child}
          highlight={child.some((i) => i.to && path === i.to)}
          sx={{
            width: drawerOpen ? '100%' : 'fit-content'
          }}
          drawerOpen={drawerOpen}
        />
        <Collapse component='li' in={isOpen} timeout='auto' unmountOnExit>
          <List
            disablePadding
            sx={{
              padding: '1.5rem 0'
            }}
          >
            {child.map((i: ListItemLinkProps, index: number) => {
              return (
                <ListItemLink to={i.to} onClick={handleToggle} text={i.text} key={index} highlight={path === i.to} />
              )
            })}
          </List>
        </Collapse>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        padding: `${index === 0 ? 0 : 2}rem 0 2rem 0`,
        borderBottom: '1px solid ' + theme.palette.main.gray80,
        width: drawerOpen ? 'unset' : 'fit-content'
      }}
    >
      <ListItemLink
        drawerOpen={drawerOpen}
        isParent={true}
        highlight={path.includes(to || '')}
        to={to}
        activeIcon={activeIcon}
        onClick={handleToggle}
        text={text}
        icon={icon}
        sx={{
          width: drawerOpen ? '100%' : 'fit-content'
        }}
      />
    </Box>
  )
}
export default DrawerItem
