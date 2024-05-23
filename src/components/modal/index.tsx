import Button from '@/elements/button'
import { Box, Modal, Typography } from '@mui/material'
import styles from './Modal.module.scss'

interface Modal {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  style?: any
  title: string
}

const ModalComponent = ({ open, onClose, onConfirm, style, title }: Modal) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Box className={styles.wrapper_button}>
          <Button onClick={onClose} title='No' cate='outlined' />
          <Button onClick={onConfirm} title='Yes' cate='primary' />
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalComponent
