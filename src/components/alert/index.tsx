import Alert from '@/elements/alert'
import { AlertProps } from '@mui/material'

type TAlertComponentProps = AlertProps & {
  message: string
}

const AlertComponent = ({ message, ...props }: TAlertComponentProps) => {
  return <>{message ? <Alert {...props}>{message}</Alert> : null}</>
}
export default AlertComponent
