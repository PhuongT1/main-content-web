import { THEME_MODE } from '@/constants/common.constant'
import { PaletteMode } from '@mui/material'
import { atom } from 'recoil'

export const themeModeAtom = atom<PaletteMode>({
  key: 'themeModeAtom',
  default: THEME_MODE.DARK
})
