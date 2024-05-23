'use client'
import { BOOKMARK_TYPE, THUMBNAIL_TYPE } from '@/constants/bookmark.constant'
import { ResponsiveBox } from '@/elements'
import Typography from '@/elements/typography'
import { IBookmark } from '@/types/bookmark.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, debounce, ownerWindow, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
type BookmarkGroupBoxProps = {
  title: string
  length: number
  bookmarks: IBookmark[]
  type: THUMBNAIL_TYPE
}

const BookmarkGroupBox = ({ title, length, bookmarks, type }: BookmarkGroupBoxProps) => {
  const [bookmardData, setBookmarkData] = useState<IBookmark[]>([])
  const [height, setHeight] = useState<number>(140)
  const [width, setWidth] = useState<number>(140)
  const smDown = useMediaQuery('(max-width: 576px)')
  const theme = useTheme()
  const contentWrapper = useRef<any>()
  useEffect(() => {
    if (bookmarks?.length > 0 && bookmarks?.length < 4) {
      const newBookmarkData: any[] = [...bookmarks]
      Array.from(Array(4 - bookmarks.length).keys()).forEach((_, index) => {
        newBookmarkData.push({
          item: null,
          id: -index,
          uuid: ''
        })
      })
      setBookmarkData(newBookmarkData)
    } else {
      setBookmarkData(bookmarks)
    }
  }, [bookmarks])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (contentWrapper.current) {
        setWidth((contentWrapper.current.clientWidth - (smDown ? 8 : 16)) / 2)
        setHeight((contentWrapper.current.clientWidth - (smDown ? 8 : 16)) / 2)
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
  }, [])
  return (
    <Box p={2.5} borderRadius={2.5} bgcolor={'main_grey.gray800'}>
      <Typography cate='title_3_semibold' breakpoints={{ md: 'title_40' }}>
        {title}
      </Typography>
      <Typography mt={1} plainColor='main.gray40' breakpoints={{ md: 'body_20' }}>
        북마크 · {length}
      </Typography>
      <Box
        display='grid'
        gap={smDown ? 1 : 1.5}
        mt={2.5}
        gridTemplateColumns={bookmardData && bookmardData?.length === 0 ? 'auto' : 'auto auto'}
        ref={contentWrapper}
      >
        {bookmardData?.length === 0 ? (
          <Box
            height={height * 2 + (smDown ? 8 : 16)}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
          >
            <Typography mt={1} plainColor='main.gray40' textAlign={'center'}>
              북마크 리스트가 없습니다.
            </Typography>
          </Box>
        ) : (
          bookmardData?.map((i: IBookmark, index) => {
            return i.item === null && i.uuid === '' ? (
              <ResponsiveBox height={height} width={width}>
                <></>
              </ResponsiveBox>
            ) : i.type === BOOKMARK_TYPE.STARTUP_TALK ? (
              <ResponsiveBox
                key={index}
                width={width}
                height={height}
                display='flex'
                flexDirection={'column'}
                justifyContent='space-between'
                sx={{ backgroundColor: theme.palette.main_grey.gray700, borderRadius: convertToRem(8), padding: 1.5 }}
              >
                <Box display='flex' flexDirection={'column'} gap={1}>
                  <Typography
                    cate='caption_5'
                    plainColor='sub.teal400'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {i.item?.category?.name}
                  </Typography>
                  <Typography
                    cate='body_20'
                    plainColor='main_grey.gray100'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {i.item?.title}
                  </Typography>
                </Box>
                <Box display='flex' flexDirection={'row'} alignItems={'center'} gap={0.5}>
                  <Avatar
                    sx={{
                      width: convertToRem(32),
                      height: convertToRem(32)
                    }}
                    alt='Remy Sharp'
                    src={!!i.item?.user?.avatar?.url ? i.item?.user?.avatar?.url : '/images/blank-user.png'}
                  />
                  <Typography
                    cate='body_10'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {i.item?.user?.nickname}
                  </Typography>
                </Box>
              </ResponsiveBox>
            ) : (
              <ResponsiveBox key={index} height={height}>
                <Image
                  height={height}
                  width={width}
                  style={{
                    objectFit: 'cover',
                    borderRadius: type === THUMBNAIL_TYPE.SQUARE ? 8 : '999px'
                  }}
                  src={
                    i.type === BOOKMARK_TYPE.PORTFOLIO
                      ? i.item?.user?.avatar?.url || '/images/blank-user.png'
                      : i.item?.thumbnail?.url || i.item?.user?.avatar?.url || '/images/blank-user.png'
                  }
                  alt={`book-mark-${index}`}
                />
              </ResponsiveBox>
            )
          })
        )}
      </Box>
    </Box>
  )
}

export default BookmarkGroupBox
