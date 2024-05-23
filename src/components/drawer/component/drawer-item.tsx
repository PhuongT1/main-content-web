import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Collapse, Divider, List, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { DrawerItemType, ListItemLinkProps } from '../drawer.type'
import ListItemLink from './list-item-link'

export interface drawerItemProps extends IDrawerItem {
  drawerOpen: boolean
  setDrawerOpen: (state: boolean) => void
}
export interface IDrawerItem {
  to?: string
  text?: ReactNode
  icon?: ReactNode
  child?: Array<ListItemLinkProps> | undefined
  index?: number
  activeIcon?: ReactNode
  removeDivider?: boolean
  fn?: () => void
  showToAdmin?: boolean
}

const DrawerItem = ({
  to,
  text,
  icon,
  child,
  index,
  drawerOpen,
  setDrawerOpen,
  activeIcon,
  removeDivider,
  fn
}: drawerItemProps) => {
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
          padding: removeDivider ? '32px 0 0 0' : `${index === 0 ? 0 : 2}rem 0 2rem 0`,
          paddingBottom: 0,
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
          highlight={child.some((i) => !!i.to && path.includes(i.to))}
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
              if (i.visible === false) return
              return i.type === DrawerItemType.DIVIDER ? (
                <Divider
                  orientation='horizontal'
                  key={index}
                  sx={{
                    marginY: convertToRem(8)
                  }}
                />
              ) : (
                <ListItemLink to={i.to} onClick={handleToggle} text={i.text} key={index} highlight={path === i.to} />
              )
            })}
          </List>
        </Collapse>
      </Box>
    )
  }
  if (to && fn) {
    return (
      <Box
        sx={{
          padding: removeDivider ? '32px 0 0 0' : `${index === 0 ? 0 : 2}rem 0 2rem 0`,
          borderBottom: removeDivider ? undefined : '1px solid ' + theme.palette.main.gray80,
          width: drawerOpen ? 'unset' : 'fit-content'
        }}
      >
        <ListItemLink
          drawerOpen={drawerOpen}
          isParent={true}
          to={to}
          activeIcon={activeIcon}
          onClick={() => {
            fn()
            handleToggle()
          }}
          text={text}
          icon={icon}
          sx={{
            width: drawerOpen ? '100%' : 'fit-content'
          }}
        />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        padding: removeDivider ? '32px 0 0 0' : `${index === 0 ? 0 : 2}rem 0 2rem 0`,
        borderBottom: removeDivider ? undefined : '1px solid ' + theme.palette.main.gray80,
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
