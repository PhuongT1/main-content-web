import { Divider, SxProps } from '@mui/material'

interface ILineProps {
  customStyle?: SxProps
}

const Line = ({ customStyle }: ILineProps) => {
  return (
    <>
      <Divider sx={{ backgroundColor: 'white', ...customStyle }} />
    </>
  )
}

export default Line
