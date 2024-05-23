'use client'
import { getBannerByType } from '@/actions/apis/banner.action'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { Box, CircularProgress, Stack, SxProps, useMediaQuery } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export type BannerProps = {
  type: BANNER_TYPE
  subType?: BANNER_SUBTYPE
  sx?: SxProps
}

const Banner = ({ type, sx, subType }: BannerProps) => {
  const mdDown = useMediaQuery('(max-width: 768px)')

  const { data, isFetching } = useQuery({
    queryKey: [`banner`, type, subType],
    queryFn: async () => await getBannerByType({ type, subType }),
    select: (data) => {
      return data.data
    }
  })

  return !isFetching ? (
    data && data.length > 0 ? (
      <Box
        borderRadius={2}
        bgcolor={'main_grey.gray700'}
        height={mdDown ? 212 : 106}
        position={'relative'}
        sx={{
          overflow: 'hidden',
          display: { md: data[0].pcImage ? 'block' : 'none', sm: data[0].mobileImage ? 'block' : 'none' },
          ...sx
        }}
      >
        {!mdDown ? (
          <Image
            src={data[0] && data[0].pcImage ? data[0].pcImage.url : ''}
            alt={'banner-pc-image'}
            fill
            objectFit='cover'
          />
        ) : (
          <Image
            src={data[0] && data[0].mobileImage ? data[0].mobileImage.url : ''}
            alt={'banner-mobile-image'}
            fill
            objectFit='cover'
          />
        )}
      </Box>
    ) : null
  ) : (
    <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress color='primary' />
    </Stack>
  )
}

export { Banner }
