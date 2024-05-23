import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { IConfigsFonts } from '@/types/edit-ir.type'

export interface IMenuFontProps {
  dataFont?: IConfigsFonts
}

const MenuFont = ({ dataFont }: IMenuFontProps) => {
  // Get color from theme.
  const {
    palette: { home }
  } = useTheme()

  const [{ fontFamilyID }, setIRPalette] = useRecoilState(iRPalette)

  // Add the src of the font from API to apply menu font.
  useEffect(() => {
    if (dataFont && dataFont.data) {
      const style = document.createElement('style')

      // Add fonts from API to style tag.
      style.innerHTML = dataFont.data
        .map((item) => `@font-face { font-family: '${item.fontName}'; src: url('${item.fontUrl}');}`)
        .join('')

      document.head.appendChild(style)

      // Clean up function to remove the injected style tag when the component unmounts.
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [dataFont])

  return (
    <>
      {dataFont &&
        dataFont.data &&
        dataFont.data.map((itemFont, index) => {
          return (
            <Box
              component={'div'}
              key={index}
              sx={{
                padding: remConvert('12px 8px'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: remConvert('8px'),
                alignSelf: 'stretch',
                borderRadius: remConvert('8px'),
                color: fontFamilyID == itemFont.id ? home.blue600 : home.gray100,
                backgroundColor: fontFamilyID == itemFont.id ? home.alpha_blue_10 : 'transparent',
                fontFamily: itemFont.fontName,
                fontSize: remConvert('16px'),
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '150%',
                cursor: 'pointer'
              }}
              onClick={() => {
                setIRPalette((prev) => ({ ...prev, fontFamilyIR: itemFont.fontName, fontFamilyID: itemFont.id }))
              }}
            >
              {itemFont.fontName}
            </Box>
          )
        })}
    </>
  )
}

export default MenuFont
