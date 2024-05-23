import RefreshIcon from '@/assets/icons/refresh'
import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import CheckedboxIcon from '@/assets/icons/checkbox/check'
import { MouseEvent } from 'react'
import ModifyIcon from '@/assets/icons/modify'
import RotatecwIcon from '@/assets/icons/naming/rotatecw'
import PlusIcon from '@/assets/icons/plus'
import PreviewIcon from '@/assets/icons/preview'
import ArrowIcon from '@/assets/icons/arrow'
import PlusCreateIcon from '@/assets/icons/plus-create'
import { SvgComponentProps } from '@/types/types.type'

type MoreButtonProps = ButtonProps & { svgComponentProps?: SvgComponentProps }

import styles from './button.module.scss'
import TrashIcon from '@/assets/icons/card-news/trash'
import PlusBoldIcon from '@/assets/icons/partnership-agreement/plus-bold-icon'
import { DELETE_ON_DOWNLOAD_PDF } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'

const ButtonItem = <RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'], AdditionalProps = {}>({
  sx,
  children,
  ...rest
}: ButtonProps<RootComponent, AdditionalProps>) => {
  const theme = useTheme()

  return (
    <Button
      sx={{
        color: theme.palette.home.gray50,
        bgcolor: '#191A1C',
        padding: remConvert('18px 20px'),
        minWidth: remConvert('160px'),
        borderRadius: remConvert('8px'),
        fontWeight: 600,
        '&.Mui-disabled': {
          borderColor: 'button.primary.disabled.bg',
          backgroundColor: theme.palette.home.alpha_bluegray_80,
          color: theme.palette.home.gray50,
          opacity: 0.26,
          '& .MuiButton-icon svg path': {
            stroke: theme.palette.home.gray50
          }
        },
        ...sx
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

const RefreshButton = ({ disabled, ...rest }: ButtonProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  return (
    <ButtonItem
      {...rest}
      disabled={disabled}
      startIcon={
        rest.startIcon || <RefreshIcon svgProps={{ stroke: disabled ? 'rgba(255, 255, 255, 0.3)' : home.gray50 }} />
      }
      sx={{
        background: home.gray400,
        color: home.gray50,
        '&:hover': {
          backgroundColor: home.gray300
        }
      }}
    >
      {dict.common_reset}
    </ButtonItem>
  )
}

const SubmitButton = ({ sx, ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  return (
    <ButtonItem
      {...rest}
      sx={{
        color: home.gray500,
        backgroundColor: home.blue500,
        lineHeight: remConvert('20px'),
        '&:hover': {
          bgcolor: 'main_primary.blue300'
        },
        ...sx
      }}
      className={DELETE_ON_DOWNLOAD_PDF}
      startIcon={rest.startIcon || <CheckedboxIcon width={20} height={20} stroke={home.gray500} />}
    >
      {rest.children || dict.common_apply}
    </ButtonItem>
  )
}

const EditButton = ({ sx, title = '', svgComponentProps, ...rest }: MoreButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  return (
    <ButtonItem
      {...rest}
      sx={{
        backgroundColor: home.gray300,
        color: home.gray0,
        '&:hover': {
          backgroundColor: home.gray250
        },
        ...sx
      }}
      startIcon={
        <ModifyIcon {...svgComponentProps} pathProps={{ stroke: home.gray0 }} lineProps={{ stroke: home.gray0 }} />
      }
      className={DELETE_ON_DOWNLOAD_PDF}
    >
      {title || dict.common_edit}
    </ButtonItem>
  )
}

const PlusButton = ({ sx, startIcon, ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  return (
    <ButtonItem
      {...rest}
      sx={{ backgroundColor: home.gray400, ...sx }}
      startIcon={startIcon || <PlusIcon svgProps={{ width: 20, height: 20 }} />}
      className={DELETE_ON_DOWNLOAD_PDF}
    >
      {dict.common_add}
    </ButtonItem>
  )
}

const CreateButton = ({ sx, title = '', ...rest }: ButtonProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <ButtonItem
      title={title || dict.common_create}
      {...rest}
      sx={{
        backgroundColor: home.gray300,
        color: home.gray50,
        padding: remConvert('12px 28px'),
        borderRadius: remConvert('100px'),
        minWidth: 'auto',
        ...sx
      }}
      startIcon={<RotatecwIcon pathProps={{ fill: home.gray50 }} />}
    >
      {rest.children || dict.common_deck_btn_create}
    </ButtonItem>
  )
}

const AddButton = ({ sx, disabled, title = '', ...rest }: ButtonProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  return (
    <ButtonItem
      {...rest}
      id={disabled ? styles.deactive : ''}
      size='large'
      sx={{
        flexShrink: 0,
        borderColor: home.blue500,
        backgroundColor: home.opacity_blue_100,
        lineHeight: remConvert('20px'),
        color: home.blue500,
        '&:hover': {
          backgroundColor: home.opacity_blue_100,
          borderColor: home.blue500
        },
        ...sx
      }}
      variant='outlined'
      disabled={disabled}
      startIcon={
        <PlusIcon svgProps={{ width: 20, height: 20, color: home.blue500 }} pathProps={{ stroke: home.blue500 }} />
      }
    >
      {title || dict.add_more}
    </ButtonItem>
  )
}

const SubmitAccordionButton = ({ sx, disabled, title = '계약서에 추가하기', ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <ButtonItem
      {...rest}
      id={disabled ? styles.deactive : ''}
      size='large'
      sx={{
        backgroundColor: home.blue500,
        minHeight: remConvert('60px'),
        padding: remConvert('10px 24px'),
        color: home.gray500,
        '&:hover': {
          backgroundColor: home.blue500
        },
        ...sx
      }}
      startIcon={
        <PlusBoldIcon
          svgProps={{
            stroke: home.blue500
          }}
        />
      }
    >
      {title}
    </ButtonItem>
  )
}

const PreviewButton = ({ sx, ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  return (
    <ButtonItem
      {...rest}
      sx={{
        backgroundColor: home.mint500,
        minWidth: remConvert('198px'),
        minHeight: remConvert('60px'),
        padding: remConvert('10px 24px'),
        color: home.gray400,
        '&:hover': {
          backgroundColor: home.mint500
        },
        ...sx
      }}
      startIcon={
        <PreviewIcon
          svgProps={{
            stroke: home.gray400,
            fill: home.gray400
          }}
        />
      }
    >
      {dict.teambuilding_ir_dialog_title}
    </ButtonItem>
  )
}

const PracticeResultButton = ({ sx, ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  return (
    <ButtonItem
      {...rest}
      sx={{
        backgroundColor: home.gray0,
        minHeight: remConvert('60px'),
        padding: remConvert('10px 24px'),
        color: home.gray400,
        '&:hover': {
          backgroundColor: home.gray0
        },
        ...sx
      }}
      startIcon={
        <PreviewIcon
          svgProps={{
            stroke: home.gray400,
            fill: home.gray400
          }}
        />
      }
    >
      {dict.view_result_btn}
    </ButtonItem>
  )
}

const NextDeckButton = ({ sx, ...rest }: ButtonProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <ButtonItem
      {...rest}
      sx={{
        backgroundColor: home.blue500,
        minHeight: remConvert('60px'),
        padding: remConvert('10px 24px'),
        color: home.gray500,
        '&:hover': {
          backgroundColor: home.blue500
        },
        ...sx
      }}
      endIcon={
        <ArrowIcon
          svgProps={{
            stroke: '#101014'
          }}
        />
      }
    >
      다음 Deck으로 이동
    </ButtonItem>
  )
}

const DeleteButton = ({ sx, title = '삭제하기', ...rest }: ButtonProps) => {
  const theme = useTheme()
  return (
    <ButtonItem
      {...rest}
      sx={{
        color: theme.palette.home.gray50,
        backgroundColor: theme.palette.home.red500,
        lineHeight: remConvert('20px'),
        // '&:hover': {
        //   bgcolor: theme.lightPalette.home.
        // },
        ...sx
      }}
      startIcon={<TrashIcon />}
    >
      {title}
    </ButtonItem>
  )
}

const MoreButton = ({ sx, svgComponentProps, children, ...rest }: MoreButtonProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  return (
    <ButtonItem
      {...rest}
      sx={{
        backgroundColor: home.gray300,
        minHeight: remConvert('56px'),
        minWidth: remConvert('145px'),
        padding: remConvert('6px 8px'),
        borderRadius: remConvert('8px'),
        border: `1px solid ${home.gray200}`,
        color: home.gray50,
        '&.Mui-disabled': {
          backgroundColor: home.gray400,
          borderColor: home.gray300
        },
        ...sx
      }}
      startIcon={<PlusCreateIcon pathProps={{ stroke: home.gray50 }} {...svgComponentProps} />}
    >
      {children || dict.common_deck_btn_create}
    </ButtonItem>
  )
}

export {
  RefreshButton,
  SubmitButton,
  EditButton,
  CreateButton,
  ButtonItem,
  PlusButton,
  AddButton,
  PreviewButton,
  PracticeResultButton,
  NextDeckButton,
  DeleteButton,
  MoreButton,
  SubmitAccordionButton
}
