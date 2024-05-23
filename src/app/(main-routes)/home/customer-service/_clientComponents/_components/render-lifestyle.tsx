import Box from '@mui/material/Box'
import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { LiftStyle } from '@/types/customer-service.type'
import Image from 'next/image'

export interface RenderGoalProps {
  item: LiftStyle
}

const RenderLifestyle = ({ item }: RenderGoalProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Grid item xs={4} alignItems='center' display={'flex'}>
      <Box
        sx={{
          wordBreak: 'break-word',
          bgcolor: home.gray300,
          borderRadius: remConvert('10px'),
          padding: remConvert('20px'),
          display: 'flex',
          flexDirection: 'row',
          gap: remConvert('12px'),
          height: 1,
          flex: 1
        }}
      >
        <Image
          alt='user'
          src={(item.url as string) || ''}
          quality={100}
          width={130}
          height={90}
          style={{
            flexShrink: 0,
            borderRadius: remConvert('10px'),
            objectFit: 'cover',
            overflow: 'hidden'
          }}
        />
        <Box
          component={'div'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          justifyContent={'center'}
          gap={remConvert('8px')}
          flex={'1 0 0'}
        >
          <Typography fontWeight={600} color={home.gray50} lineHeight={'150%'}>
            {item.name}
          </Typography>
          <Typography color={home.gray100} fontSize={remConvert('14px')} lineHeight={'150%'}>
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}
export default RenderLifestyle
