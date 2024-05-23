import { Divider, Typography } from '@/elements'
import { Customer } from '@/types/customer-service.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const InfoVirtualTargetCustomer = ({ item }: { item?: Customer; index: number; markTitle: string }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      flexWrap='wrap'
      display='flex'
      alignItems='start'
      borderRadius={'10px'}
      bgcolor='main.gray30'
      p='20px'
      gap='20px'
      sx={{
        backgroundColor: home.gray300
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center' gap={remConvert('20px')} width='100%'>
        {item?.path && (
          <Image
            alt='user'
            src={item?.path}
            quality={100}
            width={132}
            height={165}
            style={{
              flexShrink: 0,
              borderRadius: remConvert('10px'),
              objectFit: 'cover',
              overflow: 'hidden'
            }}
          />
        )}

        <Box
          flexDirection='column'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          gap={2}
          width='100%'
        >
          <Stack
            width={1}
            direction={'row'}
            gap={'40px'}
            divider={<Divider sx={{ bgcolor: home.gray200 }} cate='vertical' />}
          >
            <Grid container gap={'25px'} alignItems={'center'}>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    이름
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    나이
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.age}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    성별
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.gender}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    지역/거주지
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.region}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container gap={'25px'} alignItems={'center'}>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    직업
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.job}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    소득수준
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.incomeLevel}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    가족상황
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.familySituation}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={home.gray100} minWidth={remConvert('80px')}>
                    MBTI
                  </Typography>
                  <Typography color={home.gray0} cate='body_3_semibold' lineHeight={1}>
                    {item?.mbti}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoVirtualTargetCustomer
