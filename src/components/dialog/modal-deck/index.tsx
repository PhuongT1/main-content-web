'use client'
import ConfirmIcon from '@/assets/icons/dialog-icons/confirm.ico'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, SxProps, useTheme } from '@mui/material'
import { Alert, AlertProps } from '..'
import FilePdfIconModal from '@/assets/icons/dialog-icons/dark/file-pdf-icon-modal'
import DownloadIcon from '@/assets/icons/download'
import { BREAKPOINTS_MODAL_IR } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'

const ModalNotification = ({
  stackProps,
  sxTitle,
  containerSx,
  sxButtonSubmit,
  sxButtonCancel,
  sxDescription,
  sxDialog,
  ...rest
}: AlertProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Alert
      sxDialog={{
        ...sxDialog,
        '.MuiBackdrop-root': {
          backgroundColor: home.popup_overlay
        }
      }}
      paperSx={{
        backgroundColor: 'transparent'
      }}
      containerSx={{
        bgcolor: home.gray400,
        borderRadius: 0,
        '.MuiButton-text': {
          lineHeight: '120%',
          marginTop: 0,
          padding: remConvert('12px 24px'),
          height: 'auto',
          fontSize: remConvert('16px'),
          '.MuiTypography-root': {
            fontSize: remConvert('16px')
          }
        },
        ...containerSx
      }}
      sxButtonSubmit={{
        bgcolor: home.blue500,
        gap: 0,
        flex: 'inherit',
        '&:hover': {
          bgcolor: home.blue700
        },
        '.MuiTypography-root': {
          color: home.gray500
        },
        ...sxButtonSubmit
      }}
      sxButtonCancel={{
        bgcolor: home.gray300,
        flex: 'inherit',
        '&:hover': {
          bgcolor: home.gray200
        },
        '.MuiTypography-root': {
          color: home.gray50
        },
        ...sxButtonCancel
      }}
      sxTitle={{
        color: home.gray50,
        fontWeight: 600,
        ...sxTitle
      }}
      sxDescription={{
        color: home.gray100,
        ...sxDescription
      }}
      stackProps={{
        gap: remConvert('12px'),
        margin: remConvert('32px -32px 0'),
        borderTop: `1px solid ${home.gray200}`,
        padding: remConvert('32px 32px 0'),
        ...stackProps
      }}
      {...rest}
    />
  )
}

const ModalChildren = ({
  icon,
  title = '',
  isFixedFooter = true,
  sxTitle,
  sxDivider,
  stackProps,
  ...rest
}: AlertProps & { sxDivider?: SxProps }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  return (
    <ModalNotification
      title={
        <>
          {title || dict.modal_delete_deck_title}
          <Box
            component='span'
            sx={{
              display: 'flex',
              backgroundColor: home.gray200,
              height: remConvert('1px'),
              margin: remConvert('32px -32px 0 -32px'),
              borderColor: home.gray200,
              ...sxDivider
            }}
          />
        </>
      }
      stackProps={{
        margin: remConvert('0 -32px 0'),
        ...stackProps
      }}
      sxTitle={{
        marginTop: 0,
        top: 0,
        zIndex: 1,
        paddingTop: remConvert('40px'),
        position: 'sticky',
        backgroundColor: home.gray400,
        ...sxTitle
      }}
      containerSx={{ padding: 0 }}
      isFixedFooter={isFixedFooter}
      sxButtonSubmit={{
        gap: 0
      }}
      {...rest}
    />
  )
}

const ModalReset = ({
  title = '입력된 데이터를 초기화 하시겠습니까?',
  description = '초기화 시, 입력된 데이터가 모두 삭제되며 복구되지 않습니다.',
  ...rest
}: AlertProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <ModalNotification
      icon={<TrashRedIcon pathProps={{ fill: home.red500 }} />}
      title={title}
      description={description}
      sxButtonSubmit={{
        bgcolor: home.red500,
        '&:hover': {
          bgcolor: home.red500
        }
      }}
      {...rest}
    />
  )
}

const ModalConfirm = ({
  title = '적용하면 다시 수정할 수 없습니다.',
  description = '검사 결과에 대한 측정이 필요하기 때문에 Step 1을 적용하여 설문조사를 생성할 경우 문항을 수정할 수 없습니다. 진행하시겠습니까?',
  ...rest
}: AlertProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <ModalNotification
      icon={<ConfirmIcon />}
      title={title}
      description={description}
      sxButtonSubmit={{
        bgcolor: home.blue500,
        '&:hover': {
          bgcolor: home.blue500
        }
      }}
      submitTxt='적용하기'
      {...rest}
    />
  )
}

const ModalExportFilePdf = ({
  title = '동업계약서 PDF 다운로드',
  description = '이 계약서의 사용으로 발생하는 분쟁 및 기타 손해에 대해서, 메인콘텐츠와 슘페터는 법적인 책임을 지지 않습니다. 이 계약서는 참고자료로만 활용해야 하며, 최종 계약서를 작성하기 위해서는 법률 전문가의 도움을 받는 것이 권장됩니다.',
  ...rest
}: AlertProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <ModalNotification
      icon={<FilePdfIconModal />}
      title={title}
      description={description}
      sxButtonSubmit={{
        bgcolor: home.blue500,
        color: home.gray500,
        '&:hover': {
          bgcolor: home.blue500
        }
      }}
      {...rest}
    />
  )
}

const ModalIR = ({ icon, title = '', ...rest }: AlertProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home },
    breakpoints
  } = useTheme()

  return (
    <ModalChildren
      paperSx={{
        width: '100%',
        maxWidth: remConvert('1352px'),
        [breakpoints.down(BREAKPOINTS_MODAL_IR)]: {
          maxHeight: `calc(100% - ${remConvert('30px')})`
        }
      }}
      containerSx={{
        background: home.ir_grey,
        boxShadow: '0px 0px 6.8px 0px rgba(0, 0, 0, 0.10)',
        padding: '0 !important'
      }}
      sxButtonSubmit={{ color: home.base_black, fontWeight: 600, minWidth: remConvert('136px') }}
      title={title || dict.teambuilding_ir_dialog_title}
      startIconSubmit={<DownloadIcon pathProps={{ stroke: home.gray400, strokeWidth: 1.5 }} />}
      cancelTxt={dict.common_close}
      submitTxt={<>{dict.common_download}</>}
      stackProps={{
        sx: {
          padding: remConvert('20px 32px'),
          paddingBottom: remConvert('20px'),
          [breakpoints.down(BREAKPOINTS_MODAL_IR)]: {
            padding: remConvert('10px 15px')
          },
          margin: 0
        }
      }}
      sxTitle={{
        paddingTop: remConvert('20px'),
        px: remConvert('32px'),
        fontSize: remConvert('20px'),
        zIndex: 2,
        [breakpoints.down(BREAKPOINTS_MODAL_IR)]: {
          paddingTop: remConvert('10px'),
          fontSize: remConvert('23px')
        }
      }}
      sxDivider={{
        marginTop: remConvert('20px'),
        [breakpoints.down(BREAKPOINTS_MODAL_IR)]: {
          marginTop: remConvert('10px')
        }
      }}
      sxButtonCancel={{
        fontWeight: 600,
        minWidth: remConvert('120px')
      }}
      {...rest}
    />
  )
}

export { ModalChildren, ModalConfirm, ModalNotification, ModalReset, ModalExportFilePdf, ModalIR }
