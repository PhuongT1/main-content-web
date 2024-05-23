import PaymentModal from '@/app/(main-routes)/startup/certification-exam/_component/payment-modal'
import { Dialog } from '@/components'
import { COURSE_FORMAT_STATUS, COURSE_TYPE } from '@/constants/certificate.constant'
import { DATE_FORMAT } from '@/constants/common.constant'
import { DesignedPrimaryButton, DesignedSecondaryButton } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { TCourse } from '@/types/certificate.type'
import { useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import CertificateModal from '../../_clientComponent/certificate-modal'
import CertificationIssurance from '../certificate-issurance'

const TEST_BUTTON_TXT = new Map([
  [COURSE_FORMAT_STATUS.LEARNING, '시험 응시하기'],
  [COURSE_FORMAT_STATUS.CAN_TEST, '시험 응시하기'],
  [COURSE_FORMAT_STATUS.RETEST, '재응시하기'],
  [COURSE_FORMAT_STATUS.FAIL_RETEST, '재응시하기'],
  [COURSE_FORMAT_STATUS.PASS, '자격증 발급하기'],
  [COURSE_FORMAT_STATUS.COMPLETE, '자격증 발급 완료']
])

const TestButtonByState = ({ course }: { course?: TCourse }) => {
  const {
    open: openCertificationIssurance,
    onClose: onCloseCertificationIssurance,
    onOpen: onOpenCertificationIssurance
  } = useDialog()
  const { open: openPayment, onClose: onClosePayment, onOpen: onOpenPayment } = useDialog()
  const { open: openCertification, onClose: onCloseCertification, onOpen: onOpenCertification } = useDialog()
  const theme = useTheme()
  const router = useRouter()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const {
    id,
    registrationNumber = '',
    name = '',
    grade = '',
    courseUserCertifications,
    courseQuizId,
    retestPrice = 0,
    statusRecruitmentFormatV2 = COURSE_FORMAT_STATUS.CAN_TEST,
    type,
    certificate
  } = course || {}

  const {
    nickname = '',
    dateOfBirth = '',
    createdAt = '',
    userImage: { url = '' } = {}
  } = courseUserCertifications || {}

  const { LEARNING, CAN_TEST, RETEST, PASS, FAIL_RETEST } = COURSE_FORMAT_STATUS
  const Component = [LEARNING, CAN_TEST, RETEST, PASS, FAIL_RETEST].includes(statusRecruitmentFormatV2)
    ? DesignedPrimaryButton
    : DesignedSecondaryButton
  const isDisabled = statusRecruitmentFormatV2 === LEARNING
  const txt = TEST_BUTTON_TXT.get(statusRecruitmentFormatV2)
  const issueTheCertificateBg = [RETEST, FAIL_RETEST].includes(statusRecruitmentFormatV2)
    ? { bgcolor: `${theme.palette.sub.horizon_blue700} !important`, border: 0 }
    : {}

  const handleNavigate = (url: string) => () => {
    router.push(url)
  }

  const renderButtonText = () => {
    let text = ''

    if ([RETEST, FAIL_RETEST].includes(statusRecruitmentFormatV2)) {
      if (type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험(재응시)'
      } else {
        text = `${grade}급 (재응시)`
      }
    } else {
      if (type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험'
      } else {
        text = `${grade}급`
      }
    }

    return text
  }

  const onClick = () => {
    const getAction = () => {
      switch (statusRecruitmentFormatV2) {
        case CAN_TEST:
          return handleNavigate(`/certificate-management/${id}/course-test/${courseQuizId}`)
        case RETEST:
          return handleNavigate(`/certificate-management/${id}/course-test/${courseQuizId}`)
        case FAIL_RETEST:
          return onOpenPayment
        case PASS:
          return onOpenCertificationIssurance
        default:
          return onOpenCertification
      }
    }
    const action = getAction()
    action()
  }

  return (
    <>
      <Component
        fullWidth={mdMatches}
        onClick={onClick}
        disabled={isDisabled}
        sx={{ width: 160, ...issueTheCertificateBg }}
        btnSize={'designed-md'}
      >
        {txt}
      </Component>
      {/* Dialog */}
      <Dialog
        mdFullScreen
        onClose={onCloseCertificationIssurance}
        open={openCertificationIssurance}
        PaperProps={{ sx: { maxWidth: 560, width: '100%' } }}
      >
        <CertificationIssurance course={course} onClose={onCloseCertificationIssurance} />
      </Dialog>

      <CertificateModal
        open={openCertification}
        onClose={onCloseCertification}
        certificateNumber={registrationNumber}
        courseName={name}
        thumbnail={url}
        username={nickname}
        dateOfBirth={moment(dateOfBirth).format(DATE_FORMAT.DASH_REV)}
        dateOfCertificate={moment(createdAt).format(DATE_FORMAT.DASH_REV)}
        grade={grade}
        certificateBackground={certificate?.url as string}
      />

      <PaymentModal
        price={retestPrice}
        onClose={onClosePayment}
        open={openPayment}
        title={name}
        examId={id!}
        buttonText={renderButtonText()}
      />
    </>
  )
}

export default TestButtonByState
