import React, { FC, memo } from 'react'
import styles from './card-selected.module.scss'
import { Box, IconButton, SxProps, Theme, useTheme } from '@mui/material'
import DeleteIcon from '@/assets/icons/delete'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ParkIcon from '@/assets/icons/park'
import { remConvert } from '@/utils/convert-to-rem'

type CardSelectedProps = {
  label: string
  isView?: boolean
  onRemove?: () => void
  sx?: SxProps<Theme>
  sxIcon?: React.SVGProps<SVGSVGElement>
  idDnd?: string
}

const CardSelectedBox: FC<CardSelectedProps> = ({ label, onRemove, sx, sxIcon, isView = false, idDnd }) => {
  const {
    palette: { home }
  } = useTheme()
  const { setNodeRef, listeners, transform, transition, attributes } = useSortable({ id: idDnd || '' })

  const stylesSort = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Box
      ref={setNodeRef}
      className={styles.selected_item}
      sx={{ backgroundColor: isView ? home.gray300 : home.gray400, color: home.gray50, ...sx }}
      style={stylesSort}
    >
      {idDnd && !isView && (
        <IconButton {...attributes} {...listeners} sx={{ margin: remConvert('-10px') }}>
          <ParkIcon pathProps={{ fill: home.gray50, stroke: home.gray50 }} />
        </IconButton>
      )}
      <p className={styles.content}>{label}</p>
      {!isView && onRemove && (
        <Box onClick={() => onRemove()} component={'span'} className={styles.remove_icon}>
          <DeleteIcon fill={home.gray60} stroke={home.gray50} {...sxIcon} />
        </Box>
      )}
    </Box>
  )
}

export default memo(CardSelectedBox)
