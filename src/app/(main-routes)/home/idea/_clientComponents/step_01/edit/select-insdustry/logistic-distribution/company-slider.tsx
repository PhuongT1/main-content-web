import { Box, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import DirectIcon from '@/assets/icons/idea/direct'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Carousel, { ButtonGroupProps, StateCallBack } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getCompetitiveCompanies } from '@/services/competitor-analysis.service'
import { useRecoilValue } from 'recoil'
import { filterRelatedCompanySelector } from '@/atoms/home/idea'
import Image from 'next/image'
import styles from './logistic-distribution.module.scss'
import Link from 'next/link'
import BuildingIcon from '@/assets/icons/idea/building'
import { isEmpty } from '@/utils/object'
import { useMemo, useState } from 'react'
import { useLanguage } from '@/hooks/use-language'

const responsive = {
  xxl: {
    breakpoint: { max: 3000, min: 1701 },
    items: 4,
    slidesToSlide: 2
  },
  desktop: {
    breakpoint: { max: 1700, min: 1440 },
    items: 3,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1439, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}

function RelateCompany() {
  const { getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const filtersRelative = useRecoilValue(filterRelatedCompanySelector)

  const { fetchNextPage, isLoading, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ['companyList', filtersRelative],
    queryFn: ({ pageParam }) => {
      return getCompetitiveCompanies({ ...filtersRelative, page: Number(pageParam?.page ?? pageParam) })
    },
    initialPageParam: filtersRelative,
    enabled: !isEmpty(filtersRelative),
    getNextPageParam: (lastPage: any, _, lastPageParams) => {
      const totalPages = lastPage?.metaData?.totalPages
      const currentPage = lastPage?.metaData?.currentPage

      if (currentPage === totalPages) {
        return null
      }
      return currentPage + 1
    }
  })

  const data_pages = useMemo(() => {
    return data?.pages.reduce((memo: any, page) => [...memo, ...page.result], []) ?? []
  }, [data])

  if (isLoading)
    return (
      <Stack overflow={'scroll'} maxWidth={1} direction={'row'} gap={'10px'} mb={'10px'}>
        <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
        <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
        <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
        <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
      </Stack>
    )

  return (
    <Box sx={{ position: 'relative' }} component={'div'} width={'100%'} id={styles.relate_company_slider}>
      <Carousel
        // autoPlay
        itemClass={styles.carousel_item}
        customRightArrow={<></>}
        customLeftArrow={<></>}
        customButtonGroup={<ButtonGroup isFetching={isFetching} show={hasNextPage} onFetchNextPage={fetchNextPage} />}
        renderButtonGroupOutside
        partialVisible={false}
        draggable
        swipeable
        customTransition=''
        responsive={responsive}
        pauseOnHover
        showDots={false}
      >
        {data_pages?.length! > 0 ? (
          data_pages.map((item: any, index: number) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: home.gray400
              }}
              component={'div'}
              id={styles.relate_company_slider_card}
            >
              <Box
                height={'32px'}
                width={1}
                component={'div'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box component={'div'} display={'flex'} gap={'8px'} alignItems={'center'}>
                  {item.companyImageUrl ? (
                    <Image
                      alt={item?.name}
                      src={(item?.companyImageUrl as string) ?? ''}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Box
                      component={'div'}
                      sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: home.gray200
                      }}
                    >
                      <BuildingIcon svgProps={{ width: 14, height: 14 }} />
                    </Box>
                  )}
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: '150%',
                      color: home.gray50
                    }}
                  >
                    {getValueLanguage(item, 'name')}
                  </Typography>
                </Box>
                {item.websiteUrl ? (
                  <Link
                    prefetch={false}
                    passHref
                    target='_blank'
                    href={item?.websiteUrl.startsWith('http') ? item.websiteUrl : 'https://' + item.websiteUrl}
                  >
                    <DirectIcon />
                  </Link>
                ) : null}
              </Box>
              <Typography color={home.gray100}>{getValueLanguage(item, 'description')}</Typography>
            </Box>
          ))
        ) : (
          <div />
        )}
      </Carousel>
    </Box>
  )
}

export default RelateCompany

const ButtonGroup = ({
  next,
  previous,
  goToSlide,
  carouselState,
  onFetchNextPage,
  isFetching,
  show
}: ButtonGroupProps & { onFetchNextPage: VoidFunction; show: boolean; isFetching: boolean }) => {
  const {
    palette: { home }
  } = useTheme()
  const { currentSlide, totalItems, slidesToShow } = carouselState as StateCallBack

  const isCanNextSlide = totalItems >= currentSlide || currentSlide - totalItems <= slidesToShow * 1.5

  const handleNext = () => {
    if (isCanNextSlide) {
      goToSlide?.(currentSlide + 2)
    }
    if (totalItems - currentSlide < slidesToShow * 1.5 && show) {
      onFetchNextPage?.()
    }
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          top: '-78px',
          width: 'calc(100% + 40px)',
          left: -20,
          right: -20
        }}
      >
        <IconButton
          disableRipple
          className={styles.arrow}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            visibility: currentSlide === 0 ? 'hidden' : 'visible',
            width: 40,
            height: 40,
            backgroundColor: home.gray200
          }}
          onClick={previous}
        >
          <ArrowBackIos viewBox='-8 -5 37 35' className={styles.left} fontSize='small' />
        </IconButton>
        <IconButton
          disableRipple
          disabled={isFetching}
          className={styles.arrow}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: home.gray200,
            visibility: !isCanNextSlide ? 'hidden' : 'visible'
          }}
          onClick={handleNext}
        >
          <ArrowForwardIos viewBox='-8 -5 37 35' className={styles.right} fontSize='small' />
        </IconButton>
      </div>
    </>
  )
}
