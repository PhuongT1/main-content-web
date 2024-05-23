import MailLargeIcon from '@/assets/icons/mail-large'
import { PrimaryButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Button, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import styles from '../styles.module.scss'

interface IConfirmSendMail {
  title?: string
  type?: 'register' | 'resetPassword'
  message?: React.ReactNode
  resendTitle?: string
  backTitle?: string
  onResend?: () => void
  onBack?: () => void
}

const ConfirmSendMail = ({ title, message, onResend, onBack, backTitle, resendTitle }: IConfirmSendMail) => {
  const theme = useTheme()

  return (
    <>
      <Box
        className={styles.send_email}
        sx={{ backgroundColor: { md: theme.palette.main.black, xs: 'transparent' } }}
        py={{ md: 6, xs: 3 }}
        px={{ md: 5, xs: 3 }}
      >
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          display={'flex'}
          borderRadius={'50%'}
          sx={{
            backgroundColor: theme.palette.main_grey.gray700,
            width: convertToRem(120),
            height: convertToRem(120)
          }}
        >
          <MailLargeIcon />
        </Box>
        <Typography breakpoints={{ md: 'title_60' }} cate={'title_70'} color={theme.palette.main_grey.gray100} my={3}>
          {title || '이메일을 확인해주세요.'}
        </Typography>
        <Typography
          cate='body_40'
          color={theme.palette.main_grey.gray300}
          textAlign='center'
          sx={{ whiteSpace: 'pre-line' }}
        >
          {message ||
            '비밀번호 재설정 메일을\nmain@maincontents.com로 보냈어요.\n혹시 이메일이 오지 않았나요? 스팸함을 확인하거나 다시 받아보세요.'}
        </Typography>
        <PrimaryButton btnSize='md' sx={{ width: { md: convertToRem(360), xs: '100%' }, my: 6 }} onClick={onResend}>
          <Typography cate='button_40'>{resendTitle || '비밀번호 찾기 링크발송'}</Typography>
        </PrimaryButton>
        <Button onClick={onBack}>
          <Typography cate='caption_1' color={theme.palette.main_grey.gray400} sx={{ cursor: 'pointer' }}>
            {backTitle || '이전으로 돌아가기'}
          </Typography>
        </Button>
      </Box>
    </>
  )
}

export default ConfirmSendMail
