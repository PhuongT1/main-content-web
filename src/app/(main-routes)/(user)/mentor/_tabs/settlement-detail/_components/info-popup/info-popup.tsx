import Typography from '@/elements/typography'
import { PrimaryButton } from '@/elements/v2/button'
import { color_gray } from '@/themes/system-palette'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@mui/material'
import styles from './info-popup.module.scss'
import { InfoPopupProps } from './info-popup.type'
import moment from 'moment'
import { MENTOR_PRODUCT_TYPE, MENTOR_TRANSACTION_STATUS } from '@/constants/mentor.constant'
import { formatCurrency } from '@/utils/format-currency'

export default function InfoPopup({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  type = 'dark',
  onClose,
  createdAt,
  productContent,
  user,
  completedAt,
  bankName,
  order,
  status,
  ...props
}: InfoPopupProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    if (onCancel) {
      onCancel()
    } else if (onSubmit) {
      onSubmit()
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
          <Typography cate='title_70' width={'100%'}>
            세부내역
          </Typography>
          <Box my={3} display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'}>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderTop={'1px solid ' + color_gray[600]}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  신청일시
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {moment(createdAt).format('YYYY.MM.DD - HH:mm')}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  완료일시
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {!!completedAt ? moment(completedAt).format('YYYY.MM.DD - HH:mm') : '-'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  이체은행
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {bankName || '-'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                display={'flex'}
                alignItems='center'
                justifyContent={'center'}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  내용
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {`멘토링 - ${
                    productContent?.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
                      ? '20분 영상'
                      : productContent?.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
                      ? '40분 영상'
                      : '1시간 대면'
                  } - ${user?.nickname}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  판매금액
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {formatCurrency(order?.totalAmount || 0)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  지급상태
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {status === MENTOR_TRANSACTION_STATUS.PENDING
                    ? '대기'
                    : status === MENTOR_TRANSACTION_STATUS.COMPLETE
                    ? '지급'
                    : status === MENTOR_TRANSACTION_STATUS.CANCELED
                    ? '취소'
                    : '-'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              display={'flex'}
              flexWrap={'nowrap'}
              width={'100%'}
              borderBottom={'1px solid ' + color_gray[600]}
            >
              <Grid
                width={convertToRem(mdUp ? 100 : 80)}
                maxWidth={convertToRem(mdUp ? 100 : 80)}
                item
                flexShrink={0}
                py={1.5}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='sub_title_20' textAlign={'center'}>
                  정산 금액
                </Typography>
              </Grid>
              <Grid width={'100%'} item py={1.5}>
                <Typography cate='body_20' textAlign={'center'}>
                  {formatCurrency(order?.feeAmount || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box width='100%' justifyContent={'flex-end'} display={'flex'}>
            <PrimaryButton onClick={onCancel} sx={{ width: convertToRem(120), height: convertToRem(44) }}>
              <Typography cate='button_40' plainColor='main_grey.gray100'>
                확인
              </Typography>
            </PrimaryButton>
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  )
}
