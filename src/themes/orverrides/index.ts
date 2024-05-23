// mui
import { Theme } from '@mui/material/styles'

// component

import MenuItem from './components/MenuItem'
import TextField from './components/TextField'

export const componentsOverrides = (theme: Theme) => {
  const components = Object.assign({}, MenuItem(theme))
  return components
}
