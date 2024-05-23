'use-client'
import { Box } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import Button from '@/elements/button'
import { ButtonProps } from '@/elements/button/button.type'
import { MouseEventHandler } from 'react'

export const ButtonCustom = ({ customTitle, onClick, cate, customSize, customType, disabled, sx }: ButtonProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    !disabled && onClick?.(event)
  }

  return (
    <Box position='relative'>
      <Button
        customTitle={customTitle}
        onClick={handleClick}
        cate={cate}
        customSize={customSize}
        customType={customType}
        sx={{ minHeight: convertToRem(44), padding: `${convertToRem(10)} ${convertToRem(24)}`, ...sx }}
      />
      {disabled && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            cursor: 'not-allowed',
            borderRadius: convertToRem(8)
          }}
        />
      )}
    </Box>
  )
}
