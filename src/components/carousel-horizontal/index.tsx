'use client'
import NavigationLeftIcon from '@/assets/icons/navigation-left'
import NavigationRightIcon from '@/assets/icons/navigation-right'
import { useHydrate } from '@/hooks/use-hydrate'
import { RequireChildren } from '@/types/types.type'
import { getNormalizedScrollLeft } from '@/utils/handle-horizontal-scroll'
import { IconButton, SxProps, debounce, ownerWindow, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type CourseHorizontalProps = {
  fetchNextPage?: Function
  listContainerSx?: SxProps
  containerSx?: SxProps
} & RequireChildren

export default function CarouselHorizontal({
  fetchNextPage,
  children,
  listContainerSx,
  containerSx
}: CourseHorizontalProps) {
  const contentWrapper = useRef<any>()
  const contentContainer = useRef<any>()
  const { ref, inView } = useInView()
  const { hydrated } = useHydrate()
  const [hideLeftNavigation, setHideLeftNavigation] = useState(true)
  const [hideRightNavigation, setHideRightNavigation] = useState(false)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  // const fetchingRef = useRef<boolean>(false)
  const sideScroll = (element: HTMLDivElement, speed: number, distance: number, step: number) => {
    let scrollAmount = 0
    const slideTimer = setInterval(() => {
      contentWrapper.current.scrollLeft += step

      if (contentWrapper.current.scrollLeft === 0) {
        setHideLeftNavigation(true)
      } else {
        setHideLeftNavigation(false)
      }

      if (
        contentWrapper.current.scrollWidth - contentWrapper.current.scrollLeft ==
        contentWrapper.current.clientWidth
      ) {
        setHideRightNavigation(true)
      } else {
        setHideRightNavigation(false)
      }
      scrollAmount += Math.abs(step)
      if (scrollAmount >= distance) {
        clearInterval(slideTimer)
      }
    }, speed)
  }

  const scrollApp = async (event: any) => {
    if (event.target.scrollLeft === 0) {
      setHideLeftNavigation(true)
    } else {
      setHideLeftNavigation(false)
    }
    if (contentWrapper.current.scrollWidth - event.target.scrollLeft == contentWrapper.current.clientWidth) {
      setHideRightNavigation(true)
    } else {
      setHideRightNavigation(false)
    }

    // if (!fetchingRef.current && event.target.scrollWidth - event.target.scrollLeft <= event.target.clientWidth * 1.5) {
    //   fetchingRef.current = true
    //   if (hasNextPage) await fetchNextPage?.()
    //   fetchingRef.current = false
    // }
  }

  useEffect(() => {
    if (inView) fetchNextPage?.()
  }, [inView])

  useEffect(() => {
    if (contentContainer.current?.clientWidth <= contentWrapper.current?.scrollWidth) {
      setHideRightNavigation(true)
      setHideLeftNavigation(true)
    }
  }, [])

  const updateScrollButtonState = useCallback(() => {
    const isRtl = theme.direction === 'rtl'

    const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = contentWrapper.current
    let showStartScroll
    let showEndScroll

    const scrollLeft = getNormalizedScrollLeft(contentWrapper.current, theme.direction)
    // use 1 for the potential rounding error with browser zooms.
    showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1
    showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1
    if (showStartScroll !== !hideLeftNavigation || showEndScroll !== !hideRightNavigation) {
      setHideLeftNavigation(!showStartScroll)
      setHideRightNavigation(!showEndScroll)
    }
  }, [hideLeftNavigation, hideRightNavigation, theme.direction, children])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (contentWrapper.current) {
        updateScrollButtonState()
      }
    })
    const win = ownerWindow(contentWrapper.current)
    win.addEventListener('resize', handleResize)
    let resizeObserver: any
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      if (contentWrapper?.current?.children) {
        Array.from(contentWrapper.current.children).forEach((child) => {
          resizeObserver.observe(child)
        })
      }
    }
    return () => {
      handleResize.clear()
      win.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [updateScrollButtonState])

  return (
    <Box
      sx={{
        width: 'auto',
        overflow: 'hidden',
        position: 'relative',
        px: 2,
        mx: -2,
        ...containerSx
      }}
      ref={contentContainer}
    >
      {!hideLeftNavigation && !mdMatches && (
        <IconButton
          onClick={() => {
            sideScroll(contentWrapper?.current, 15, 232, -10)
          }}
          sx={{
            position: 'absolute',
            zIndex: 3,
            left: '-8px',
            top: '33%'
          }}
        >
          <NavigationLeftIcon />
        </IconButton>
      )}

      {children && (
        <List
          component={Stack}
          ref={contentWrapper}
          direction='row'
          gap={2}
          onScroll={scrollApp}
          sx={{
            py: 0,
            width: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
              width: '0 !important'
            },
            paddingBottom: 0,
            ...listContainerSx
          }}
        >
          {children}
        </List>
      )}

      {!hideRightNavigation && !mdMatches && (
        <IconButton
          onClick={() => {
            sideScroll(contentWrapper?.current, 15, 232, 10)
          }}
          sx={{
            position: 'absolute',
            zIndex: 3,
            right: '-8px',
            top: '33%'
          }}
        >
          <NavigationRightIcon />
        </IconButton>
      )}
    </Box>
  )
}
