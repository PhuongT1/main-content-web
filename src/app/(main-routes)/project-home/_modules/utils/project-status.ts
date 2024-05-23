import { Palette } from '@mui/material'
import { PROJECT_STATUS_ENUM } from '../domain'

interface StatusMapping {
  text: string
  color: string
}

export const mapProjectStatus = (status: PROJECT_STATUS_ENUM, palette: Palette): StatusMapping => {
  switch (status) {
    case PROJECT_STATUS_ENUM.NEW:
      return { text: 'New', color: palette.home.yellow }
    case PROJECT_STATUS_ENUM.IN_PROGRESS:
      return { text: '진행중', color: palette.home.blue500 }
    case PROJECT_STATUS_ENUM.DONE:
      return { text: '완료', color: palette.home.gray100 }
    default:
      return { text: '', color: palette.home.gray100 }
  }
}
