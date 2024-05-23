import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type TCardMyTestProps = {
  thumbnail: string
  certificateNumber: string
  name: string
  certificateName: string
  birthDay: string
  certificateLevel: string
  onClick: () => void
}

const CardCertificate = ({
  thumbnail,
  certificateNumber,
  name,
  certificateName,
  birthDay,
  certificateLevel,
  onClick
}: TCardMyTestProps) => {
  const { palette } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: convertToRem(16),
        borderRadius: convertToRem(16),
        padding: convertToRem(16),
        background: palette.main.gray80
      }}
      onClick={onClick}
    >
      <Image
        src={thumbnail}
        alt={name}
        height={380}
        width={304}
        style={{
          borderRadius: convertToRem(8),
          objectFit: 'cover',
          width: '100%'
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: convertToRem(8) }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography cate='sub_title_20' sx={{ color: palette.main.point }}>
            {certificateNumber}
          </Typography>
          <Box
            sx={{
              borderRadius: convertToRem(99),
              paddingX: convertToRem(12),
              paddingY: convertToRem(3),
              border: '1px solid',
              borderColor: palette.sub.orange500,
              background: 'rgba(236, 74, 10, 0.10)',
              height: convertToRem(27),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography cate='body_20' sx={{ color: palette.sub.orange500 }}>
              {certificateLevel}
            </Typography>
          </Box>
        </Box>
        <Typography cate='title_40' plainColor='main.grayf7'>
          {certificateName}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: convertToRem(4) }}>
        <Typography cate='body_30' plainColor='main.gray30'>
          {name}
        </Typography>
        <Typography cate='body_30' plainColor='main.gray30'>
          |
        </Typography>
        <Typography cate='body_30' plainColor='main.gray30'>
          {birthDay}
        </Typography>
      </Box>
    </Box>
  )
}

export default CardCertificate
