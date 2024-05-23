import MoreIcon from '@/assets/icons/more'
import { Box, MenuItem, SxProps, useTheme } from '@mui/material'
import { useState } from 'react'
import { IMoreActionItem, PROJECT_MORE_OPTIONS } from '../../../../domain'
import { Typography } from '@/elements'
import * as S from './style'

interface IMoreAction {
  id: string
  options?: IMoreActionItem[]
  onActionClick: (action: IMoreActionItem | null) => void
  sx?: SxProps
}

export const MoreAction = ({ id, options, onActionClick, sx }: IMoreAction) => {
  const { palette } = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onItemClick = (event: React.MouseEvent<HTMLElement>, item: IMoreActionItem) => {
    event.stopPropagation()
    handleClose()
    onActionClick(item)
  }

  const onClickActions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box display='flex' sx={sx}>
      <S.Icon
        id={`more-action-button_${id}`}
        aria-controls={open ? `more-action-menu_${id}` : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={onClickActions}
      >
        <MoreIcon width={3} height={15} color={palette.home.gray50} />
      </S.Icon>

      <S.StyledMenu
        id={`more-action-menu_${id}`}
        MenuListProps={{
          'aria-labelledby': `more-action-button_${id}`
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation()
          handleClose()
        }}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation()
        }}
      >
        {(options || PROJECT_MORE_OPTIONS).map((option: IMoreActionItem) =>
          option.disabled ? (
            <S.DisabledItem
              key={option.value}
              onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
            >
              <Typography cate='body_3' color={palette.home.gray100}>
                {option.label}
              </Typography>
            </S.DisabledItem>
          ) : (
            <MenuItem key={option.value} onClick={(event: React.MouseEvent<HTMLElement>) => onItemClick(event, option)}>
              {option.label}
            </MenuItem>
          )
        )}
      </S.StyledMenu>
    </Box>
  )
}
