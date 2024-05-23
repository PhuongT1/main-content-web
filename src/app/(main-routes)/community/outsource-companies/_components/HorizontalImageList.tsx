import NavigationLeftIcon from '@/assets/icons/navigation-left'
import NavigationRightIcon from '@/assets/icons/navigation-right'
import ResizeImage from '@/components/resize-image'
import { IFile } from '@/types/user.type'
import { getNormalizedScrollLeft } from '@/utils/handle-horizontal-scroll'
import { IconButton, debounce, ownerWindow, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import { useEffect, useRef, useState } from 'react'

type HorizontalImageListProps = {
  data: IFile[]
}

export default function HorizontalImageList({ data }: HorizontalImageListProps) {
  const contentWrapper = useRef<any>()
  const contentContainer = useRef<any>()
  const [hideLeftNavigation, setHideLeftNavigation] = useState(true)
  const [hideRightNavigation, setHideRightNavigation] = useState(false)
  const fetchingRef = useRef<boolean>(false)
  const theme = useTheme()
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
  }
  useEffect(() => {
    if (contentContainer.current?.clientWidth >= contentWrapper.current?.scrollWidth) {
      setHideRightNavigation(true)
      setHideLeftNavigation(true)
    }
  }, [contentWrapper.current, contentContainer.current])

  useEffect(() => {
    // const handleResize = () => {
    //   console.log('alo');
    // };
    // contentContainer.current.addEventListener('resize', handleResize, false);
    // return () => {
    //   contentContainer.current.removeEventListener(
    //     'resize',
    //     handleResize,
    //     false
    //   );
    // };
  }, [])

  const updateScrollButtonState = () => {
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
  }

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
      Array.from(contentWrapper.current.children).forEach((child) => {
        resizeObserver.observe(child)
      })
    }
    return () => {
      handleResize.clear()
      win.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [updateScrollButtonState])

  // const handleTabsScroll = useMemo(() => debounce(() => {
  //   updateScrollButtonState();
  // }), [updateScrollButtonState]);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
      ref={contentContainer}
    >
      {!hideLeftNavigation && (
        <IconButton
          onClick={() => {
            sideScroll(contentWrapper?.current, 25, 100, -10)
          }}
          sx={{
            position: 'absolute',
            zIndex: 3,
            left: '-8px',
            top: '45%'
          }}
        >
          <NavigationLeftIcon />
        </IconButton>
      )}
      <List
        component={Stack}
        ref={contentWrapper}
        direction='row'
        gap={2}
        onScroll={scrollApp}
        sx={{
          width: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: '0 !important'
          }
        }}
      >
        {data.map((i: IFile) => {
          return (
            <ListItem disablePadding key={i.id} sx={{ width: 'auto' }}>
              <ResizeImage baseHeight={320} src={i.url} placeholderSrc={i.url} alt={i.name} />
            </ListItem>
          )
        })}
      </List>
      {!hideRightNavigation && (
        <IconButton
          onClick={() => {
            sideScroll(contentWrapper?.current, 25, 100, 10)
          }}
          sx={{
            position: 'absolute',
            zIndex: 3,
            right: '-8px',
            top: '45%'
          }}
        >
          <NavigationRightIcon />
        </IconButton>
      )}
    </Box>
  )
}
