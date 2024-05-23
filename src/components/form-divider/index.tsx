import Line from '@/elements/divider'
import { SxProps, useTheme } from '@mui/material'

interface IFormDivierProps {
  sx?: SxProps
}
const FormDivider: React.FC<IFormDivierProps> = ({ sx } = { sx: {} }) => {
  const {
    palette: { home }
  } = useTheme()

  return <Line customStyle={{ backgroundColor: 'transparent', borderColor: home.gray200, ...sx }} />
}

export default FormDivider
