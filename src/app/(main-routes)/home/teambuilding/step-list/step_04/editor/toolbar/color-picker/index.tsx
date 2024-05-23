import { Box, IconButton, alpha } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Color, ColorResult, TwitterPicker } from 'react-color'
import ArrowDownIcon from '@/assets/icons/arrow-down'
import ColorIcon from '@/assets/icons/team-building/color'

import styles from './color-picker.module.scss'
import { MODE_TOOLBAR, TMode } from '@/types/teambuilding/index.type'
import { useRecoilState } from 'recoil'
import { toolbarEditorSelector } from '@/atoms/home/teambuilding'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { listenEvent } from '@/utils/events'

type TColorPicker = {
  mode: TMode | string
  handleClickOpen: (mode: TMode) => void
  onClose: VoidFunction
}

const colors = ['#252629', '#3C82F9', '#C67AFF', '#EA3939', '#EDEEF1']

function ColorPicker({ handleClickOpen, mode, onClose }: TColorPicker) {
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)

  const handleChangeColor = (color: ColorResult) => {
    const { hex } = color
    setDataToolbar((prev) => ({ ...prev, color: hex }))
    onClose()
  }
  return (
    <Box component={'div'}>
      <IconButton className={styles.toolbar_color_wrapper} onClick={() => handleClickOpen(MODE_TOOLBAR.COLOR)}>
        {dataToolbar.color ? (
          <Box
            component={'div'}
            width={21}
            height={20}
            borderRadius={'6px'}
            sx={{
              border: `1px dashed #000`,
              p: '2px'
            }}
          >
            <Box component={'div'} width={21} height={20} borderRadius={'6px'} bgcolor={dataToolbar.color} />
          </Box>
        ) : (
          <ColorIcon />
        )}
        <ArrowDownIcon svgProps={{ width: 12 }} />
      </IconButton>
      {mode === MODE_TOOLBAR.COLOR && (
        <Box onMouseLeave={onClose} component={'div'} className={styles.toolbar_color_picker}>
          <TwitterPicker colors={colors} onChange={handleChangeColor} color={'#252629'} />
        </Box>
      )}
    </Box>
  )
}

export default ColorPicker
