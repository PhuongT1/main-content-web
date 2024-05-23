'use client'
import React, { FC, memo } from 'react'
import styles from './card-selected.module.scss'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import DeleteIcon from '@/assets/icons/delete'
import { Typography } from '@/elements'

type CardSelectedProps = {
  label: string
  isView?: boolean
  onRemove?: () => void
  sx?: SxProps<Theme>
  sxIcon?: React.SVGProps<SVGSVGElement>
  tag?: string | any
}

const CardSelectedBox: FC<CardSelectedProps> = ({ label, onRemove, sx, sxIcon, isView = false, tag }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      className={styles.selected_item}
      sx={{ background: isView ? home.gray200 : home.gray400, color: home.gray50, ...sx }}
    >
      {tag && (
        <Box className={styles.tag}>
          <Typography cate='body_3_semibold' plainColor='home.base_gray50'>
            {tag}
          </Typography>
        </Box>
      )}
      <Typography flexGrow={1} cate='body_3' plainColor='home.gray50'>
        {label}
      </Typography>
      {!isView && onRemove && (
        <Box onClick={() => onRemove()} component={'span'} className={styles.remove_icon}>
          <DeleteIcon fill={home.gray400} stroke={home.gray50} {...sxIcon} />
        </Box>
      )}
    </Box>
  )
}

export default memo(CardSelectedBox)
