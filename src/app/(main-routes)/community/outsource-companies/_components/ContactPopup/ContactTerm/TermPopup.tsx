import Button from '@/elements/button'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, DialogProps, useMediaQuery, useTheme } from '@mui/material'
import styles from './styles.module.scss'
type TermPopupProps = DialogProps & {
  onSubmit: () => void
  onCancel?: () => void
  type?: string
}

export default function TermPopup({ onSubmit, onCancel, type = 'dark', ...props }: TermPopupProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')

  return (
    <Dialog
      onClose={onCancel}
      {...props}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
          maxWidth: convertToRem(560) + ' !important'
        }
      }}
    >
      <DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
        <Box className={`${styles.content_wrapper}`} sx={{ gap: mdUp ? 5 : 3, display: 'flex' }}>
          <Typography
            cate='title_60'
            color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
            sx={{ whiteSpace: 'pre-line' }}
          >
            개인정보 제공
          </Typography>
          <Typography
            cate='body_20'
            color={type === 'dark' ? theme.palette.main_grey.gray300 : theme.palette.main_grey.gray500}
            className={`${styles.title}`}
          >
            {` ■ 본인은 신원조사기관이 본인에 대한 신원조사를 실시할 필요가 있다는 것과 개인정보(범죄 경력 등 민감정보
            포함. 이하 동일) 수집 목적 등 아래 유의사항을 이해하였으며, 이를 위해 「개인정보보호법」 등에 의해 보호되고
            있는 본인의 개인정보를 동법 제15조(개인정보의 수집ᆞ이용)의 규정 등에 따라 신원조사기관에 제공하는데
            동의합니다. \n■ 이에 따라, 개인정보 보유기관장은 원활한 신원조사를 위해 본인에 관한 개인정보를 해당 신원
            조사기관에게 제공하여 줄 것을 요청합니다. \n ■ 본인이 서명한 동의서 복사본은 원본과 동일하게 유효하다는 것을
            인정합니다.  \n■ 본인은 신원조사기관이 본인에 대한 신원조사를 실시할 필요가 있다는 것과 개인정보(범죄 경력 등
            민감정보 포함. 이하 동일) 수집 목적 등 아래 유의사항을 이해하였으며, 이를 위해 「개인정보보호법」 등에 의해
            보호되고 있는 본인의 개인정보를 동법 제15조(개인정보의 수집ᆞ이용)의 규정 등에 따라 신원조사기관에 제공하는데
            동의합니다. \n ■ 이에 따라, 개인정보 보유기관장은 원활한 신원조사를 위해 본인에 관한 개인정보를 해당 신원
            조사기관에게 제공하여 줄 것을 요청합니다. \n ■ 본인이 서명한 동의서 복사본은 원본과 동일하게 유효하다는 것을
            인정합니다.`}
          </Typography>

          <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'}>
            <Button
              sx={{ width: convertToRem(120), height: convertToRem(44) }}
              cate={'outlined'}
              onClick={() => {
                onCancel?.()
              }}
              isNonSubmit
              customTitle={
                <Typography color={theme.palette.main.gray20} cate='body_3_semibold'>
                  닫기
                </Typography>
              }
            />
            <Button
              sx={{
                marginLeft: '0.5rem',
                width: convertToRem(120),
                height: convertToRem(44)
              }}
              customType={'active'}
              cate={'primary'}
              onClick={onSubmit}
              isOnFormPopup
              customTitle={<Typography cate='body_3_semibold'>동의하기</Typography>}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
