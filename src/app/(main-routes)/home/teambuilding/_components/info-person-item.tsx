import { Divider, Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { TFormValue } from '@/types/teambuilding/index.type'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { useMemo } from 'react'

function InfoPersonItem({ item, index, markTitle }: { item: TFormValue; index: number; markTitle: string }) {
  const {
    palette: { home }
  } = useTheme()
  const { dict, getValueLanguage } = useLanguage()

  const pathImage = useMemo(() => {
    if (!item.path) return ''
    if (typeof item.path === 'string') {
      return item.path
    }
    return URL.createObjectURL(item.path)
  }, [item])

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
      <Box display='flex' justifyContent='start' alignItems='center' gap={2} width='100%'>
        <Typography color={home.gray50}>
          {markTitle} {index + 1}
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='start' gap={2} width='100%'>
        <Image
          alt='user'
          src={pathImage}
          quality={100}
          width={240}
          height={300}
          style={{
            flexShrink: 0,
            borderRadius: '10px',
            objectFit: 'cover',
            overflow: 'hidden'
          }}
        />
        <Box
          flexDirection='column'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          gap={2}
          width='100%'
        >
          <Box
            padding={'25px 20px'}
            mb={5}
            display='flex'
            bgcolor={home.gray_bg_200}
            borderRadius={'10px'}
            justifyContent='center'
            alignItems='center'
            gap={'16px'}
            width='100%'
          >
            <Typography cate='title_50' color={'#00C7BE'}>
              &quot;
            </Typography>
            <Typography fontWeight={'bold'} color={home.gray50}>
              {getValueLanguage(item, 'description')}
            </Typography>
            <Typography cate='title_50' color={'#00C7BE'}>
              &quot;
            </Typography>
          </Box>
          <Stack
            width={1}
            direction={'row'}
            gap={'40px'}
            divider={<Divider sx={{ bgcolor: home.gray200, borderColor: home.gray200 }} cate='vertical' />}
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'50px'}>
                    {dict.common_name}
                  </Typography>
                  <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'50px'}>
                    {dict.common_role}
                  </Typography>
                  <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                    {getValueLanguage(item, 'role')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'50px'}>
                    {dict.common_age}
                  </Typography>
                  <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                    {item.age}
                    {dict.common_count}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                  <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'50px'}>
                    {dict.common_email}
                  </Typography>
                  <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                    {item.email ? `${item.email}@${item.manualDomain || item.domain}` : ''}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid gap={2.5} container>
              <Grid alignItems={'start'} item xs={12}>
                <Typography cate='body_3' lineHeight={1} color={'main.gray50'}>
                  {dict.teambuilding_education_experience}
                </Typography>
              </Grid>
              {item?.eduandexp?.map((content, index) => (
                <Grid key={index} item xs={12}>
                  <Typography color={home.gray50} cate='body_3_semibold'>
                    {content.content}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoPersonItem
