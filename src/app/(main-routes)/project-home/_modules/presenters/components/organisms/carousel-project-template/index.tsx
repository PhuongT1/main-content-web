'use-client'
import { useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { convertToRem } from '@/utils/convert-to-rem'
import { RoundedSolidIconButton } from '@/elements'
import { IProjectTemplate } from '../../../../domain'
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { RecommendProjectTemplate } from '../../molecules'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import * as S from './style'

interface ICarouselProjectTemplate {
  onSelect: (item: IProjectTemplate) => void
  projectTemplates: IProjectTemplate[]
  isFreeUser: boolean
}

const responsive = {
  xxl: {
    breakpoint: { max: 3000, min: 1701 },
    items: 2.5,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1700, min: 769 },
    items: 2.5,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1.5,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export const CarouselProjectTemplate = ({ onSelect, projectTemplates, isFreeUser }: ICarouselProjectTemplate) => {
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const { palette } = useTheme()
  const carouselRef = useRef<Carousel>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  const commonArrowStyle = useMemo(() => {
    return {
      width: convertToRem(44),
      height: convertToRem(44),
      borderRadius: '50%',
      backgroundColor: palette.home.gray300,
      border: `1px solid ${palette.home.gray200}`,
      display: mdDown ? 'none' : 'flex',
      position: 'absolute',
      zIndex: 5,
      top: '50%',
      transform: `translateY(-50%)`,
      '&:hover': {
        backgroundColor: 'rgba(25, 26, 29, 0.6)'
      }
    }
  }, [mdDown, palette])

  return (
    <S.TemplatesBlock gap={convertToRem(20)}>
      {isLoading ? (
        <S.SkeletonTemplate />
      ) : (
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          autoPlay={false}
          infinite={false}
          showDots={false}
          slidesToSlide={1}
          renderButtonGroupOutside={false}
          customTransition='transform 300ms ease-in-out'
          containerClass='wrap-templates'
          itemClass='template-item'
          sliderClass='slider-list'
          customLeftArrow={
            <RoundedSolidIconButton
              sx={{
                ...commonArrowStyle,
                left: 0
              }}
            >
              <ChevronLeftIcon svgProps={{ stroke: palette.main_grey.gray100 }} />
            </RoundedSolidIconButton>
          }
          customRightArrow={
            <RoundedSolidIconButton
              sx={{
                ...commonArrowStyle,
                right: 0
              }}
            >
              <ChevronRightIcon svgProps={{ stroke: palette.main_grey.gray100 }} />
            </RoundedSolidIconButton>
          }
        >
          {projectTemplates.map((project) => {
            return (
              <RecommendProjectTemplate
                project={project}
                isFreeUser={isFreeUser}
                onSelect={onSelect}
                key={project.id}
              />
            )
          })}
        </Carousel>
      )}
    </S.TemplatesBlock>
  )
}

export default CarouselProjectTemplate
