'use client'
import { CloseCircleMdIcon, CreditCardIcon, ExceedingIcon, TrashRedDarkIcon } from '@/assets/icons'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import EditRedIcon from '@/assets/icons/dialog-icons/edit-icon'
import FileRedIcon from '@/assets/icons/dialog-icons/file-red'
import LockRedIcon from '@/assets/icons/dialog-icons/lock-red'
import PhoneRedIcon from '@/assets/icons/dialog-icons/phone-red'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { THEME_MODE } from '@/constants/common.constant'
import { IconButton, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { useThemeMode } from '@/hooks/use-theme-mode'
import createComponentContext from '@/utils/create-component-context'
import { getPageStyle } from '@/utils/spacing-file-pdf'
import { convertToRem } from '@/utils/styles'
import {
  Dialog as MDialog,
  DialogContent,
  DialogContentProps,
  DialogProps as MDialogProps,
  DialogTitle as MDialogTitle,
  DialogTitleProps as MDialogTitleProps,
  Stack,
  StackProps,
  SxProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { CSSProperties, ReactNode, RefObject } from 'react'
import ReactToPrint from 'react-to-print'
import File2RedIcon from '@/assets/icons/dialog-icons/file-2-red'

type DialogWrapperContext = {} & Pick<DialogProps, 'onClose'>

const { Provider: CardWrapperProvider, useContextHook } = createComponentContext<DialogWrapperContext>('DialogWrapper')

type DialogProps = {
  onClose?: () => void
  dialogContentProps?: DialogContentProps
  mdFullScreen?: boolean
} & MDialogProps

const Dialog = ({ children, sx, PaperProps, dialogContentProps, mdFullScreen, ...rest }: DialogProps) => {
  const { sx: paperSx, ...restPaperProps } = (PaperProps as any) || {}
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('lg'))

  const fullScreen = mdFullScreen && mdMatches

  const { sx: dialogContentSx, ...restDialogContentProps } = dialogContentProps || ({} as any)
  return (
    <CardWrapperProvider value={{ onClose: rest?.onClose }}>
      <MDialog
        PaperProps={{
          sx: {
            borderRadius: {
              md: 3,
              xs: 0
            },
            bgcolor: 'popup.general_bg',
            ...paperSx
          },
          ...restPaperProps
        }}
        sx={sx}
        {...{ fullScreen }}
        {...rest}
      >
        <DialogContent
          sx={{
            py: 4,
            px: { md: 4, xs: 2.5 },
            bgcolor: 'popup.general_bg',
            borderRadius: {
              md: 3,
              xs: 0
            },
            ...dialogContentSx
          }}
          {...restDialogContentProps}
        >
          {children}
        </DialogContent>
      </MDialog>
    </CardWrapperProvider>
  )
}

type DialogTitleProps = {} & MDialogTitleProps

const DialogTitle = ({ children, sx, ...rest }: DialogTitleProps) => {
  return (
    <MDialogTitle sx={{ p: 0, ...sx }} {...rest}>
      {children}
    </MDialogTitle>
  )
}

const XDialogTitle = ({ children }: { children?: ReactNode }) => {
  const { onClose } = useContextHook()
  const theme = useTheme()

  const stroke = theme.palette.mode === 'dark' ? '#F7F8FA' : 'black'

  return (
    <DialogTitle sx={{ display: 'flex', justifyContent: children ? 'space-between' : 'flex-end' }}>
      {children}
      <IconButton onClick={onClose}>
        <CloseCircleMdIcon pathProps={{ stroke: stroke }} />
      </IconButton>
    </DialogTitle>
  )
}

export type AlertProps = {
  open?: boolean
  title?: ReactNode
  description?: ReactNode
  submitTxt?: ReactNode
  cancelTxt?: ReactNode
  onSubmit?: (event?: any) => void
  onCancel?: (event?: any) => void
  onExportFilePdf?: (event?: any) => void
  containerSx?: SxProps
  paperSx?: SxProps
  icon?: ReactNode
  darkIcon?: ReactNode
  hideCancelBtn?: boolean
  stackProps?: StackProps
  sxButtonCancel?: SxProps
  sxButtonSubmit?: SxProps
  sxTitle?: SxProps
  sxDescription?: SxProps
  sxDialog?: SxProps
  children?: ReactNode
  isFixedFooter?: boolean
  additonalFooterContent?: ReactNode
  refFilePdf?: RefObject<HTMLElement>
  startIconSubmit?: ReactNode
  onClose?: () => void
}

const Alert = ({
  open = true,
  icon,
  title,
  submitTxt = '확인',
  cancelTxt = '취소',
  onSubmit,
  onCancel,
  onExportFilePdf,
  description = '',
  containerSx,
  paperSx,
  darkIcon,
  sxButtonSubmit,
  sxButtonCancel,
  stackProps,
  sxTitle,
  sxDescription,
  sxDialog,
  children,
  isFixedFooter = false,
  refFilePdf,
  additonalFooterContent,
  startIconSubmit,
  onClose
}: AlertProps) => {
  const theme = useTheme()
  const { themeMode } = useThemeMode()
  const mdDown = useMediaQuery('(max-width: 768px')

  // Style for modal Children
  const stackStyle: CSSProperties = isFixedFooter
    ? {
        position: 'sticky',
        bottom: 0,
        paddingBottom: convertToRem(32),
        background: theme.palette.home.gray400
      }
    : {}

  return (
    <Dialog
      dialogContentProps={{
        sx: { p: 4, bgcolor: 'popup.general.background.color', ...containerSx }
      }}
      PaperProps={{
        sx: {
          width: {
            md: 560
          },
          maxWidth: 560,
          borderRadius: 6,
          ...paperSx
        }
      }}
      open={open}
      onClose={onClose}
      sx={isFixedFooter ? { ...sxDialog, '.MuiDialogContent-root': { paddingBottom: 0 } } : sxDialog}
    >
      {themeMode === THEME_MODE.DARK ? <>{darkIcon || icon}</> : <>{icon || darkIcon}</>}
      <Typography
        component={'div'}
        mt={2.25}
        cate='title_70'
        breakpoints={{ md: 'title_50' }}
        plainColor='popup.title'
        sx={{ ...sxTitle }}
      >
        {title}
      </Typography>
      {children && children}
      {description && (
        <Typography component={'div'} mt={1.25} cate='body_30' plainColor='popup.body' sx={{ ...sxDescription }}>
          {description}
        </Typography>
      )}
      <Stack
        direction={'row'}
        gap={1}
        justifyContent={{ md: 'flex-end' }}
        mt={5}
        {...stackProps}
        sx={{ ...stackStyle, ...stackProps?.sx }}
      >
        {additonalFooterContent}
        {!!onCancel && (
          <SecondaryGrayButton
            sx={{
              bgcolor: 'popup.button_neutral_bg',
              minWidth: convertToRem(120),
              height: convertToRem(50),
              flex: {
                md: 0,
                xs: 1
              },
              ...sxButtonCancel
            }}
            onClick={onCancel}
            fullWidth={mdDown}
            btnSize={'sm-np'}
          >
            <Typography cate='button_30' plainColor='main_grey.gray400'>
              {cancelTxt}
            </Typography>
          </SecondaryGrayButton>
        )}
        {!!refFilePdf && (
          <ReactToPrint
            onBeforePrint={onExportFilePdf}
            trigger={() => (
              <DesignedPrimaryButton
                sx={{ minWidth: 120, height: convertToRem(50), ...sxButtonSubmit }}
                btnSize={'designed-sm'}
              >
                {submitTxt}
              </DesignedPrimaryButton>
            )}
            content={() => refFilePdf?.current}
            pageStyle={getPageStyle()}
          />
        )}
        {!!onSubmit && (
          <DesignedPrimaryButton
            sx={{
              minWidth: 120,
              height: convertToRem(50),
              flex: {
                md: 0,
                xs: 1
              },
              ...sxButtonSubmit
            }}
            onClick={onSubmit}
            btnSize={'designed-sm'}
            startIcon={startIconSubmit}
            fullWidth={mdDown}
          >
            {submitTxt}
          </DesignedPrimaryButton>
        )}
      </Stack>
    </Dialog>
  )
}

const TrashAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<TrashRedIcon />} darkIcon={<TrashRedDarkIcon />} {...rest} />
}
const EditAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<EditRedIcon />} darkIcon={<EditRedIcon />} {...rest} />
}

const InfoAlert = ({ icon, ...rest }: AlertProps) => {
  return (
    <Alert
      icon={<FileRedIcon rectProps={{ fill: 'rgba(255, 57, 50, 0.12)' }} />}
      darkIcon={<FileRedIcon />}
      {...rest}
    />
  )
}

const LockAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<LockRedIcon />} darkIcon={<LockRedIcon />} {...rest} />
}

const ExceedingAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<ExceedingIcon />} darkIcon={<ExceedingIcon />} {...rest} />
}

const ConfirmAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<ConfirmationIcon />} darkIcon={<ConfirmationIcon />} {...rest} />
}

const CreditCardAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<CreditCardIcon />} darkIcon={<CreditCardIcon />} {...rest} />
}

const VerifyPhoneAlert = ({ icon, ...rest }: AlertProps) => {
  return <Alert icon={<PhoneRedIcon />} darkIcon={<PhoneRedIcon />} {...rest} />
}

const NoAuthorityAlert = ({ icon, ...rest }: AlertProps) => {
  return (
    <Alert
      icon={<File2RedIcon rectProps={{ fill: 'rgba(255, 57, 50, 0.12)' }} />}
      darkIcon={<File2RedIcon />}
      {...rest}
    />
  )
}

export {
  Alert,
  ConfirmAlert,
  CreditCardAlert,
  Dialog,
  DialogTitle,
  EditAlert,
  ExceedingAlert,
  InfoAlert,
  LockAlert,
  TrashAlert,
  VerifyPhoneAlert,
  XDialogTitle,
  NoAuthorityAlert
}
