import { BoxLayout } from '@/components/home/box/box-custom'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import React, { useMemo } from 'react'

function InfoPersonItem({
  name,
  content,
  path,
  date
}: {
  name: string
  content: string
  path: string | File
  date: string | Date
}) {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  const pathImage = useMemo(() => {
    if (!path) return ''
    if (typeof path === 'string') {
      return path
    }
    return URL.createObjectURL(path)
  }, [path])

  return (
    <BoxLayout style={{ justifyContent: 'start' }}>
      <Box width={1} flexWrap='wrap' display='flex' alignItems='start' gap='20px'>
        <Box flexShrink={0} display='flex' justifyContent='space-between' alignItems='center' width={240} height={200}>
          <Image
            alt='user'
            src={pathImage}
            quality={100}
            width={240}
            height={200}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
              overflow: 'hidden'
            }}
          />
        </Box>
        <Box
          flex={1}
          flexDirection='column'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          gap={2}
          width='100%'
        >
          <Box
            padding={'25px 20px'}
            mb={3}
            display='flex'
            borderRadius={'10px'}
            justifyContent='center'
            alignItems='center'
            gap={2}
            width='100%'
            sx={{
              backgroundColor: home.gray_bg_200
            }}
          >
            <Typography
              cate='title_50'
              sx={{
                transform: 'rotate(10deg)',
                color: home.mint500
              }}
            >
              &quot;
            </Typography>
            <Typography sx={{ fontWeight: 600 }} color={home.gray50}>{content}</Typography>
            <Typography
              cate='title_50'
              sx={{
                transform: 'rotate(10deg)',
                color: home.mint500
              }}
            >
              &quot;
            </Typography>
          </Box>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'80px'}>
                  {dict.teambuilding_company_name}
                </Typography>
                <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                  {name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='start' alignItems='center' gap={3} width='100%'>
                <Typography cate='body_3' lineHeight={1} color={'main.gray50'} minWidth={'80px'}>
                {dict.teambuilding_establishment_date}
                </Typography>
                <Typography color={home.gray50} cate='body_3_semibold' lineHeight={1}>
                  {/* {date as string} */}
                  {moment(date).format('YYYY-MM-DD')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </BoxLayout>
  )
}

export default InfoPersonItem
