import { GrayButton, Typography } from '@/elements'
import { getTextStyles } from '@/themes/get-design-tokens'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, Stack, useTheme } from '@mui/material'
import { PrivacyPopupProps } from './privacy-popup.type'
import styles from './styles.module.scss'

const htmlString = `<p>네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. <br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>
  <br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>`

const PrivacyPopup = ({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  type = 'default',
  onClose,
  ...props
}: PrivacyPopupProps) => {
  const theme = useTheme()

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
        '& .MuiDialog-paper': {
          maxWidth: convertToRem(560)
        }
      }}
    >
      <DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
        <div className={`${styles.content_wrapper}`}>
          <Typography
            cate='title_3_semibold'
            color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray900}
            className={`${styles.title}`}
          >
            서비스 이용약관
          </Typography>

          <Box
            my={4}
            sx={{
              backgroundColor: theme.palette.main_grey.gray100,
              height: convertToRem(560),
              padding: '1rem',
              overflow: 'auto',
              ...getTextStyles(14, 150, 400, 0),
              color: theme.palette.main_grey.gray900,
              img: {
                maxWidth: '100%'
              }
            }}
            dangerouslySetInnerHTML={{ __html: htmlString }}
          ></Box>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'} gap={2}>
            <GrayButton
              btnSize='sm-np'
              active={true}
              sx={{
                width: convertToRem(120)
              }}
              onClick={onCancel}
            >
              <Typography cate='button_30'>닫기</Typography>
            </GrayButton>
          </Stack>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyPopup
