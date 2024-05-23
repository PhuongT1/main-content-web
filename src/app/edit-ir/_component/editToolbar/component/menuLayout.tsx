import React from 'react'
import { useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { ENUM_LAYOUT_DATA } from '@/constants/common.constant'
import Typography from '@/elements/typography'

export interface IMenuLayoutProps {}

const MenuLayout = (props: IMenuLayoutProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [{ layoutSelected }, setIRPalette] = useRecoilState(iRPalette)

  return (
    <>
      {ENUM_LAYOUT_DATA.map((itemLayout, index) => {
        return (
          <Typography
            key={index}
            cate='body_3_semibold'
            sx={{
              color: layoutSelected == itemLayout.value ? home.blue600 : home.gray100,
              backgroundColor: layoutSelected == itemLayout.value ? home.alpha_blue_10 : 'transparent',
              display: 'flex',
              padding: remConvert('12px 8px'),
              alignItems: 'center',
              gap: remConvert('8px'),
              alignSelf: 'stretch',
              borderRadius: remConvert('8px'),
              cursor: 'pointer'
            }}
            onClick={() => {
              setIRPalette((prev) => ({ ...prev, layoutSelected: itemLayout.value }))
            }}
          >
            {itemLayout.name}
          </Typography>
        )
      })}
    </>
  )
}

export default MenuLayout
