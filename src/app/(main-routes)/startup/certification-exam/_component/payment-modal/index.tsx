'use client'
import { getCertificateExamDetail } from '@/actions/apis/certification.action'
import { Button, PrimaryButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, DialogProps, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import TipCard from '../tip-card'

type TCertificateModalProps = {
  buttonText: string
  title: string
  price: string | number
  examId: number
  onClose: () => void
}
const PaymentModal = ({
  buttonText,
  title,
  price,
  examId,
  onClose,
  ...props
}: TCertificateModalProps & DialogProps) => {
  const queryClient = useQueryClient()
  const { palette } = useTheme()
  const router = useRouter()
  const mdDown = useMediaQuery('(max-width: 768px)')

  const prefetchDetailInPayment = async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: [`certification-exam-detail-${id}`],
      queryFn: async () => {
        const { data, error } = await getCertificateExamDetail(+id)

        if (error) throw error

        return data
      }
    })
  }

  return (
    <Dialog
      {...props}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: convertToRem(560),
          width: '100%',
          borderRadius: convertToRem(24)
        }
      }}
    >
      <DialogContent
        sx={{
          background: palette.main.gray80,
          paddingY: convertToRem(32),
          paddingX: { md: convertToRem(32), sm: convertToRem(20) },
          display: 'flex',
          flexDirection: 'column',
          gap: mdDown ? 3 : 5
        }}
      >
        <Stack gap={1}>
          <Typography cate={mdDown ? 'title_60' : 'title_70'} plainColor='main.grayf7'>
            {title}
          </Typography>
          <Stack gap={0.5}>
            <Typography cate={mdDown ? 'body_20' : 'body_30'} color={palette.main_grey.gray200}>
              오프라인 양성과정 수료자를 대상으로 진행되는 자격시험입니다.
            </Typography>
            <Typography cate={mdDown ? 'body_20' : 'body_30'} color={palette.main_grey.gray200}>
              응시하고자 하는 급수를 선택 후 진행해 주세요.
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={mdDown ? 3 : 4}>
          <PrimaryButton fullWidth btnSize='sm' sx={{ borderRadius: convertToRem(99) }}>
            <Typography cate='button_3_semibold' plainColor='main_grey.gray100'>
              {buttonText}
            </Typography>
          </PrimaryButton>
          <TipCard
            title='안내사항'
            contents={[
              '시험 불합격 경우 재응시 비용이 발생할 수 있습니다.',
              '현금영수증에는 개인소득공제용과 사업자증빙용이 있으며, 세금계산서가 필요하신 경우 [마이페이지 - 결제관리]에서 신청할 수 있습니다.',
              '결제 후 응시가 가능하며 응시 기간에만 교육 이수 및 시험 응시를 할 수 있습니다.',
              '신용카드 매출전표는 결제 완료 시 자동 발급되며, [마이페이지 - 결제관리]에서 확인할 수 있습니다.'
            ]}
          />
        </Stack>
        <Stack
          gap={3}
          sx={{
            paddingTop: convertToRem(24),
            borderTop: `1px solid ${palette.main.gray60}`
          }}
        >
          <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
            <Typography cate='subtitle_1' plainColor='main.grayf7'>
              총 결제금액
            </Typography>
            <Typography cate='title_60' plainColor='main.grayf7'>
              {`${price.toLocaleString()}원`}
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={1} justifyContent={{ md: 'flex-end', sm: 'space-between' }}>
            <Button
              btnSize='sm'
              sx={{
                background: palette.main_grey.gray700,
                borderRadius: convertToRem(8),
                width: { md: convertToRem(120), sm: '100%' }
              }}
              onClick={onClose}
            >
              <Typography cate='button_30' plainColor='main_grey.gray300'>
                취소
              </Typography>
            </Button>
            <PrimaryButton
              btnSize='sm'
              sx={{ width: { md: convertToRem(120), sm: '100%' } }}
              onClick={() => {
                if (examId) {
                  prefetchDetailInPayment(examId)
                  router.push(`/startup/certification-exam/${examId}/payment`)
                }
              }}
            >
              <Typography cate='button_30' plainColor='main_grey.gray100'>
                결제하기
              </Typography>
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
