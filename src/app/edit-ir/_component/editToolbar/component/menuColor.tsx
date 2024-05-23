import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { IConfigsColors } from '@/types/edit-ir.type'
import ColorCircleIcon from '@/assets/icons/color-circle'

export interface IMenuColorProps {
  dataColor?: IConfigsColors
}

const MenuColor = ({ dataColor }: IMenuColorProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [{ primaryColorID }, setIRPalette] = useRecoilState(iRPalette)

  return (
    <>
      {dataColor?.result &&
        dataColor?.result.map((itemColor, index) => {
          return (
            <Box
              key={index}
              component={'div'}
              sx={{
                color: primaryColorID == itemColor.id ? home.gray50 : home.gray100,
                backgroundColor: primaryColorID == itemColor.id ? home.alpha_blue_10 : 'transparent',
                padding: remConvert('12px 8px'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: remConvert('8px'),
                alignSelf: 'stretch',
                borderRadius: remConvert('8px'),
                cursor: 'pointer'
              }}
              onClick={() => {
                setIRPalette((prev) => ({ ...prev, primaryColor: itemColor.colorValue, primaryColorID: itemColor.id }))
              }}
            >
              <ColorCircleIcon circleProps={{ fill: itemColor.colorValue }} />
              {itemColor.colorName}
            </Box>
          )
        })}
    </>
  )
}

export default MenuColor
