import { MenuItem as MMenuItem, MenuItemProps, styled, useTheme } from '@mui/material'

const MenuItemStyled = styled(MMenuItem)<MenuItemProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  }
}))

const MenuItem = (props: MenuItemProps) => {
  const theme = useTheme()
  return <MenuItemStyled {...props}>{props.children}</MenuItemStyled>
}

export default MenuItem
