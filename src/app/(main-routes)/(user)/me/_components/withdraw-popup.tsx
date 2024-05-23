import Checkbox from '@/elements/checkbox'
import Typography from '@/elements/typography'
import { GrayButton, SecondaryGrayButton } from '@/elements/v2/button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import styles from './withdraw-popup.module.scss'
import { WithdrawPopupProps } from './withdraw-popup.type'

export default function WithdrawPopup({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  type = 'dark',
  onClose,
  ...props
}: WithdrawPopupProps) {
  const theme = useTheme()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    } else {
      if (onCancel) {
        onCancel()
      } else if (onSubmit) {
        onSubmit()
      }
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        container: styles.popup_container,
        root: styles.popup_root
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
          maxWidth: convertToRem(720) + ' !important'
        }
      }}
    >
      <DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
        <div className={`${styles.content_wrapper}`}>
          <Typography cate='title_2_bold' color={theme.palette.main_grey.gray900} className={`${styles.title}`}>
            탈퇴 안
          </Typography>
          <Box display={'flex'} flexDirection='column' alignItems='flex-start'>
            <Typography
              cate='body_3'
              color={theme.palette.main_grey.gray900}
              className={`${styles.description}`}
              mb={4}
            >
              탈퇴를 진행하면 더 이상 해당 계정으로 로그인할 수 없으며, 계정 데이터가 모두 삭제됩니다. 진행하시겠습니까?
            </Typography>
            <Typography cate='sub_title_40' color={theme.palette.main_grey.gray900} className={`${styles.subtitle}`}>
              탈퇴 시 보관 또는 유지되는 항목
            </Typography>
            <Typography
              cate='body_3'
              color={theme.palette.main_grey.gray900}
              className={`${styles.description}`}
              mb={4}
            >
              탈퇴 시 법령에 따라 보관해야하는 항목은 관련 법정에 따라 일정 기간 보관하며 다른 목적으로 사용하지
              않습니다. 전자 상거래 등에서의 소비자보호에 관한 법률에 의거하여 대금 결제 및 재화 등의 공급에 관한 기록
              5년, 소비자 불만 또는 분쟁처리에 관한 기록 3년동안 보관됩니다.
            </Typography>
            <Typography cate='sub_title_40' color={theme.palette.main_grey.gray900} className={`${styles.subtitle}`}>
              탈퇴 불가 및 기타 유의 사항
            </Typography>
            <li className={`${styles.item_list}`}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray900} className={`${styles.description}`}>
                이용중인 이용권이 있는 경우 탈퇴를 할 수 없습니다.
              </Typography>
            </li>
            <li className={`${styles.item_list}`}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray900} className={`${styles.description}`}>
                이용중인 이용권이 있는 경우 탈퇴를 할 수 없습니다.
              </Typography>
            </li>

            <Typography
              cate='body_3'
              color={theme.palette.main_grey.gray900}
              className={`${styles.description}`}
              mt={4}
            >
              고객센터
            </Typography>
            <Typography
              cate='body_3'
              color={theme.palette.main_grey.gray900}
              className={`${styles.description}`}
              mb={6}
            >
              (주)메인콘텐츠 1566-9178 (main@maincontents.com)
            </Typography>
            <Stack direction={'row'} alignItems='flex-start'>
              <Checkbox
                sx={{
                  mt: convertToRem(2.6)
                }}
                checked={isChecked}
                onChange={() => {
                  setIsChecked((prev) => !prev)
                }}
              />
              <Stack direction={'column'}>
                <Typography
                  cate='body_3'
                  color={theme.palette.main_grey.gray900}
                  className={`${styles.description}`}
                  ml={1.5}
                >
                  (필수) 안내 사항을 모두 확인하였으며, 이에 동의합니다.
                </Typography>
                <Typography
                  cate='body_3'
                  color={theme.palette.main_grey.gray300}
                  className={`${styles.description}`}
                  ml={1.5}
                >
                  * 필수 항목에 동의해주세요.
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box className={`${styles.action_wrapper}`}>
            <SecondaryGrayButton onClick={onCancel} btnSize='md' className={styles.submit_button}>
              <Typography cate='button_40' plainColor='main_grey.gray400'>
                취소
              </Typography>
            </SecondaryGrayButton>

            <GrayButton onClick={onSubmit} className={styles.submit_button} disabled={!isChecked}>
              <Typography cate='button_40' plainColor='main_grey.gray100'>
                탈퇴
              </Typography>
            </GrayButton>
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  )
}
