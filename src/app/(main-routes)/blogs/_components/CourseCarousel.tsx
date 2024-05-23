import { ChevronLeftIcon, ChevronLeftSmIcon, ChevronRightIcon, ChevronRightSmIcon } from '@/assets/icons'
import ResizeImage from '@/components/resize-image'
import { ResponsiveBox, RoundedSolidIconButton } from '@/elements'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, LinearProgress, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type CourseCarouselType = {
  item?: IBlog
  setSpaceOfCategory: Dispatch<number>
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 992, min: 576 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5
  }
}

function CourseCarousel({ item, setSpaceOfCategory }: CourseCarouselType) {
  const [currentItem, setCurrentItem] = useState(1)
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const carouselRef = useRef<Carousel>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setSpaceOfCategory((carouselRef.current as any)?.carouselWrapperRef?.clientHeight + 140 || 0)
    }
  })

  return (
    <>
      <ResponsiveBox breakpoints={{ md: { bgcolor: 'main_grey.gray900' } }}>
        <Carousel
          ref={carouselRef}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          showArrows={mdDown ? false : true}
          onChange={(current) => {
            setCurrentItem(Number(current) + 1)
          }}
          renderArrowNext={(clickHandler) => (
            <RoundedSolidIconButton
              sx={{
                width: convertToRem(52.8),
                height: convertToRem(52.8),
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main_grey.gray600,
                display: mdDown ? 'none' : 'flex',
                position: 'absolute',
                zIndex: 5,
                top: '50%',
                right: 0
              }}
              onClick={clickHandler}
            >
              <ChevronRightIcon svgProps={{ stroke: theme.palette.main_grey.gray100 }} />
            </RoundedSolidIconButton>
          )}
          renderArrowPrev={(clickHandler) => (
            <RoundedSolidIconButton
              sx={{
                width: convertToRem(52.8),
                height: convertToRem(52.8),
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main_grey.gray600,
                display: mdDown ? 'none' : 'flex',
                position: 'absolute',
                zIndex: 5,
                top: '50%',
                left: 0
              }}
              onClick={clickHandler}
            >
              <ChevronLeftIcon svgProps={{ stroke: theme.palette.main_grey.gray100 }} />
            </RoundedSolidIconButton>
          )}
        >
          {item?.images.map((i, index) => (
            <Item key={i.id} item={i} isCurrent={index === currentItem - 1} />
          ))}
        </Carousel>
        <LinearProgress
          variant='determinate'
          sx={{
            background: theme.palette.main_grey.gray800,
            height: '0.2rem',
            '.MuiLinearProgress-barColorPrimary': {
              background: theme.palette.main.danger
            }
          }}
          value={(currentItem / (item?.images?.length || 1)) * 100}
        />
        <Stack
          direction={'row'}
          justifyContent={mdDown ? 'space-between' : 'center'}
          alignItems={'center'}
          py={1}
          px={3}
          width={'100%'}
        >
          {mdDown && (
            <RoundedSolidIconButton
              onClick={() => {
                carouselRef?.current?.onClickPrev()
              }}
              sx={{
                width: convertToRem(32),
                height: convertToRem(32),
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main_grey.gray600,
                '&:hover': {
                  backgroundColor: theme.palette.main_grey.gray600
                },
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <ChevronLeftSmIcon svgProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 2 }} />
            </RoundedSolidIconButton>
          )}

          <Typography color={theme.palette.main_grey.gray300} cate='sub_title_40'>
            {currentItem}/{item?.images?.length || 1}
          </Typography>
          {mdDown && (
            <RoundedSolidIconButton
              onClick={() => {
                carouselRef?.current?.onClickNext()
              }}
              sx={{
                width: convertToRem(32),
                height: convertToRem(32),
                borderRadius: convertToRem(250),
                backgroundColor: theme.palette.main_grey.gray600,
                '&:hover': {
                  backgroundColor: theme.palette.main_grey.gray600
                },
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <ChevronRightSmIcon svgProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 2 }} />
            </RoundedSolidIconButton>
          )}
        </Stack>
      </ResponsiveBox>
    </>
  )
}

function Item({ item, isCurrent }: { isCurrent: boolean; item: IFile }) {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        maxHeight: convertToRem(560),
        opacity: isCurrent ? 1 : 0
      }}
    >
      <ResizeImage
        src={item.url}
        placeholderSrc={item.url}
        sx={{
          maxHeight: convertToRem(560)
        }}
      />
    </Box>
  )
}

export default CourseCarousel
