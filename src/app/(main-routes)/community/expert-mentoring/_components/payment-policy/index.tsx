import { PrimaryCheckbox, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { List, ListItem, Stack, SxProps } from '@mui/material'
import { ChangeEvent } from 'react'
import FooterPopup from '@/components/dialog/footer-popup'
import { CATE } from '@/components/dialog/footer-popup/footer-popup.type'
import { useDialog } from '@/hooks/use-dialog'

type PaymentPolicyBoxProps = {
  isCheckTerm: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  sx?: SxProps
}

const PaymentPolicyBox = ({ isCheckTerm, onChange, sx }: PaymentPolicyBoxProps) => {
  const { onOpen: onOpenPolicy, open: openPolicy, onClose: onClosePolicy } = useDialog()

  return (
    <Stack
      gap={1}
      sx={{
        padding: convertToRem(16),
        border: '1px solid',
        borderColor: 'main.gray60',
        borderRadius: convertToRem(8),
        ...sx
      }}
      width={'100%'}
    >
      <Typography cate='body_20' plainColor='main_grey.gray300' sx={{ fontWeight: 'bold' }}>
        유의 사항
      </Typography>
      <List
        sx={{
          padding: 0
        }}
      >
        <ListItem sx={{ padding: 0 }}>
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            {`1. ‘메인콘텐츠'는 멘토와 멘티간의 수업이 진행되도록 지원해 드리고 있으며, 멘토가 제공하는 서비스에는 멘토의
            책임으로 진행됩니다.`}
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            {`2. 멘토의 연락두절 및 이용 불가한 상태 방치 등에 의한 환불인 경우 환불을 보장하고 있습니다.`}
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0, paddingTop: convertToRem(16) }}>
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            {
              '*서비스 참여중에 판매자의 실수를 비롯하여 네트워크, 서비스 제공업체 등의 문제로 의도치 않는 문제들이 발생할 수 있습니다. 문제 발생 시 상호간 매너있는 대화 부탁드리며, 부적절한 언어 선택 시 이용제한 등의 조치가 진행될 수 있습니다.'
            }
          </Typography>
        </ListItem>
      </List>
      <Stack direction={'row'} gap={1.5} alignItems={'flex-start'}>
        <PrimaryCheckbox
          value={isCheckTerm}
          onChange={onChange}
          sx={{ p: 0, pt: 0.5 }}
          containerSx={{ alignItems: 'flex-start' }}
        />
        <Typography cate='body_20' plainColor='main_grey.gray100' sx={{}}>
          위 상품의 구매조건을 확인하였으며{' '}
          <Typography
            component={'span'}
            cate='body_20'
            plainColor='blue.500'
            onClick={onOpenPolicy}
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            이용약관
          </Typography>{' '}
          동의와 결제서비스 업체의 개인정보 처리방침에 따라 개인정보가 처리되는 것에 동의합니다.
        </Typography>
      </Stack>
      <FooterPopup
        open={openPolicy}
        cate={CATE.TERM}
        onCancel={() => {
          onClosePolicy()
        }}
      />
    </Stack>
  )
}

export default PaymentPolicyBox
