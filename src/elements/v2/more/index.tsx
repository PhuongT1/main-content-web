'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { Edit05Icon, ReportIcon, Trash03Icon, UShareIcon } from '@/assets/icons'
import AnswerMenuIcon from '@/assets/icons/comment-menu'
import { TrashAlert } from '@/components'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, IconButton, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SxProps, alpha, styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    backgroundColor: theme.palette.main.gray80,
    marginTop: theme.spacing(1),
    width: 'auto',
    padding: '0.75rem 0',
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.main_grey.gray800
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 32,
  height: 4,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.main_grey.gray900 : theme.palette.main_grey.gray300,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}))

const StyledBottomDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    height: 'auto',
    margin: 8,
    borderRadius: 16,
    backgroundColor: theme.palette.main.gray70
  }
}))

type CommentActionMenuProps = {
  isOwn?: boolean
  handleDelete: any
  commentId?: number
  handleEdit?: any
  url?: string
  btnSx?: SxProps
  isShowEditBtn?: boolean
  isShowShareBtn?: boolean
  isShowRemoveBtn?: boolean
  isShowReportBtn?: boolean
  handleReport?: () => void
  deleteTxt?: string
}

export default function CommentActionMenu({
  handleDelete,
  handleEdit,
  commentId,
  isOwn,
  url = '',
  btnSx,
  isShowEditBtn = true,
  isShowShareBtn = true,
  isShowRemoveBtn = true,
  isShowReportBtn = false,
  handleReport,
  deleteTxt = '정말 글을 삭제하시겠습니까?'
}: CommentActionMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const mdDown = useMediaQuery('(max-width: 768px)')
  const open = Boolean(anchorEl)
  const [bottomMenuOpen, setBottomMenuOpen] = React.useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [showShare, setShowShare] = useState<boolean>(false)
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (mdDown) {
      setBottomMenuOpen(true)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = (event: any) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleCloseBottomMenu = (event: any) => {
    event.stopPropagation()
    setBottomMenuOpen(false)
  }

  return (
    <Box>
      <IconButton
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          background: theme.palette.main_grey.gray700,
          width: convertToRem(30),
          height: convertToRem(30),
          padding: 0,
          ...btnSx
        }}
        onClick={handleClick}
      >
        <AnswerMenuIcon />
      </IconButton>
      <StyledMenu
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <>
          {isOwn && isShowShareBtn && (
            <MenuItem
              onClick={(event: any) => {
                handleClose(event)
                setShowShare(true)
              }}
              disableRipple
            >
              <UShareIcon />
              <Typography cate='caption_1' ml={2}>
                공유하기
              </Typography>
            </MenuItem>
          )}
          {isShowEditBtn && (
            <MenuItem
              onClick={(event: any) => {
                handleClose(event)
                handleEdit()
              }}
              disableRipple
            >
              <Edit05Icon />
              <Typography cate='caption_1' ml={2}>
                수정하기
              </Typography>
            </MenuItem>
          )}
          {isShowRemoveBtn && (
            <MenuItem
              onClick={(event: any) => {
                handleClose(event)
                setShowError(true)
              }}
              disableRipple
            >
              <Trash03Icon />
              <Typography cate='caption_1' ml={2}>
                삭제하기
              </Typography>
            </MenuItem>
          )}
          {isShowReportBtn && (
            <MenuItem
              onClick={(event: any) => {
                handleClose(event)
                handleReport?.()
              }}
              disableRipple
            >
              <ReportIcon />
              <Typography cate='caption_1' ml={2}>
                신고하기
              </Typography>
            </MenuItem>
          )}
        </>
      </StyledMenu>
      <StyledBottomDrawer
        anchor='bottom'
        open={bottomMenuOpen}
        onClose={handleCloseBottomMenu}
        onOpen={handleCloseBottomMenu}
        disableSwipeToOpen
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            height: convertToRem(16),
            position: 'relative'
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 3,
            pb: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <>
            {isOwn && (
              <MenuItem
                onClick={(event: any) => {
                  handleCloseBottomMenu(event)
                  setShowShare(true)
                }}
                disableRipple
              >
                <Box
                  p={1}
                  borderRadius={convertToRem(250)}
                  sx={{
                    backgroundColor: theme.palette.main.gray50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <UShareIcon />
                </Box>
                <Typography cate='body_2' ml={2}>
                  공유하기
                </Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={(event: any) => {
                handleCloseBottomMenu(event)
                handleEdit()
              }}
              disableRipple
            >
              <Box
                p={1}
                borderRadius={convertToRem(250)}
                sx={{
                  backgroundColor: theme.palette.main.gray50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Edit05Icon />
              </Box>
              <Typography cate='body_2' ml={2}>
                수정하기
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={(event: any) => {
                handleCloseBottomMenu(event)
                setShowError(true)
              }}
              disableRipple
            >
              <Box
                p={1}
                borderRadius={convertToRem(250)}
                sx={{
                  backgroundColor: theme.palette.main.gray50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash03Icon />
              </Box>
              <Typography cate='body_2' ml={2}>
                신고하기
              </Typography>
            </MenuItem>
          </>
        </StyledBox>
      </StyledBottomDrawer>
      <TrashAlert
        onSubmit={async (event) => {
          event.stopPropagation()
          setShowError(false)
          handleDelete()
        }}
        submitTxt={'확인'}
        cancelTxt={'취소'}
        title={deleteTxt}
        onCancel={(event) => {
          event.stopPropagation()
          setShowError(false)
        }}
        open={showError}
      />
      <SharePopup open={showShare} onCancel={() => setShowShare(false)} url={url} />
    </Box>
  )
}

export { CommentActionMenu }
