'use client'
import { Dispatch, useEffect, useRef, useState } from 'react'
// import Carousel from 'react-material-ui-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import ResizeImage from '@/components/resize-image'
import { ResponsiveBox } from '@/elements'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, IconButton, LinearProgress, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Carousel as CCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type CarouselType<T> = {
  setSpaceOfCategory?: Dispatch<number>
  images: T[]
  showIndicator?: boolean
}

function Carousel<T>({ images, setSpaceOfCategory, showIndicator }: CarouselType<T>) {
  const [currentItem, setCurrentItem] = useState(1)
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const carouselRef = useRef<CCarousel>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setSpaceOfCategory?.((carouselRef.current as any)?.carouselWrapperRef?.clientHeight + 140 || 0)
    }
  })

  return (
    <>
      <ResponsiveBox breakpoints={{ md: { bgcolor: 'main_grey.gray900' } }}>
        <CCarousel
          // autoPlay={true}
          ref={carouselRef}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          // infiniteLoop={true}
          showArrows={mdDown ? false : true}
          onChange={(current) => {
            setCurrentItem(Number(current) + 1)
          }}
          renderArrowNext={(clickHandler) => (
            <IconButton
              sx={{
                width: '3.3rem',
                height: '3.3rem',
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main.gray60,
                alignItems: 'center',
                justifyContent: 'center',
                display: mdDown ? 'none' : 'flex',
                position: 'absolute',
                zIndex: 5,
                top: '50%',
                right: 0
              }}
              onClick={clickHandler}
            >
              <ChevronRightIcon svgProps={{ stroke: theme.palette.main.gray10 }} />
            </IconButton>
          )}
          renderArrowPrev={(clickHandler) => (
            <IconButton
              sx={{
                width: '3.3rem',
                height: '3.3rem',
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main.gray60,
                alignItems: 'center',
                justifyContent: 'center',
                display: mdDown ? 'none' : 'flex',
                position: 'absolute',
                zIndex: 5,
                top: '50%',
                left: 0
              }}
              onClick={clickHandler}
            >
              <ChevronLeftIcon
                pathProps={{
                  stroke: theme.palette.main.gray10
                }}
              />
            </IconButton>
          )}
        >
          {images.map((i, index) => (
            <Item key={index} item={(i as any).url} isCurrent={index === currentItem - 1} />
          ))}
        </CCarousel>
        {showIndicator && (
          <LinearProgress
            variant='determinate'
            sx={{
              background: theme.palette.main.gray80,
              height: '0.5rem',
              '.MuiLinearProgress-barColorPrimary': {
                background: theme.palette.main.danger
              }
            }}
            value={(currentItem / (images?.length || 1)) * 100}
          />
        )}
        <Stack
          direction={'row'}
          justifyContent={mdDown ? 'space-between' : 'center'}
          alignItems={'center'}
          py={1}
          width={'100%'}
        >
          {mdDown && (
            <IconButton
              onClick={() => {
                carouselRef?.current?.onClickPrev()
              }}
              sx={{
                width: '3.3rem',
                height: '3.3rem',
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main.gray60,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <ChevronLeftIcon
                pathProps={{
                  stroke: theme.palette.main.gray10
                }}
              />
            </IconButton>
          )}

          <Typography color={theme.palette.main.gray30} cate='body_2_semibold'>
            {currentItem}/{images?.length || 1}
          </Typography>
          {mdDown && (
            <IconButton
              onClick={() => {
                carouselRef?.current?.onClickNext()
              }}
              sx={{
                width: '3.3rem',
                height: '3.3rem',
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main.gray60,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <ChevronRightIcon svgProps={{ stroke: theme.palette.main.gray10 }} />
            </IconButton>
          )}
        </Stack>
      </ResponsiveBox>
    </>
  )
}

function Item({ item, isCurrent }: { isCurrent: boolean; item: string }) {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        opacity: isCurrent ? 1 : 0
      }}
    >
      <ResizeImage src={item} placeholderSrc={item} />
    </Box>
  )
}

export default Carousel
