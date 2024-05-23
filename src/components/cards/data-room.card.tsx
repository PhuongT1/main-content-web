'use client'
import { CONTENT_TYPE } from '@/app/(public)/startup/referent-room/_client-components/data-room-table'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import HeartSmIcon from '@/assets/icons/heart-sm'
import { CardBadge, RoundedSolidIconButton } from '@/elements'
import Typography from '@/elements/typography'
import { ReferenceRoom } from '@/types/startup/toolkit.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import { Box, CardActionArea, CardActions, CardContent, Stack, debounce, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type DataRoomCardProps = {
  onClick?: Function
  onBookmark?: Function
  item: ReferenceRoom
}

export default function DataRoomCard({ onClick, onBookmark, item }: DataRoomCardProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 300, height: 300 })

  useEffect(() => {
    const handleResize = debounce(() => {
      const screenWidth = window.innerWidth

      // Set the height based on the screen width
      if (imageRef.current) {
        setSize({
          width: screenWidth >= 768 ? 300 : imageRef.current.clientWidth,
          height: screenWidth >= 768 ? 300 : (imageRef.current.clientWidth * 300) / 300
        })
      }
    })

    // Listen for window resize
    window.addEventListener('resize', handleResize)

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      // Create a ResizeObserver instance with a callback
      resizeObserver = new ResizeObserver(handleResize)

      // Observe each child of imageRef
      Array.from(imageRef.current!.children).forEach((child) => {
        resizeObserver!.observe(child)
      })
    }

    // Initial resize on mount
    handleResize()

    return () => {
      // Cleanup: remove event listener and disconnect ResizeObserver
      window.removeEventListener('resize', handleResize)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [imageRef.current])

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.main_grey.gray800,
        backgroundImage: 'none',
        borderRadius: convertToRem(8),
        padding: convertToRem(16)
      }}
    >
      <CardActionArea
        disableRipple
        sx={{
          color: theme.palette.main.gray80,
          '&:hover': {
            color: theme.palette.main.gray80
          }
        }}
        onClick={() => {
          onClick?.()
        }}
      >
        <CardContent
          sx={{
            padding: 0
          }}
        >
          <Stack direction={'column'} gap={2} width={'100%'}>
            <Box
              ref={imageRef}
              sx={{
                width: '100%',
                height: convertToRem(size.height),
                position: 'relative'
              }}
            >
              <Image
                src={item.thumbnail?.url || ''}
                alt={item.thumbnail?.name || ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                  borderRadius: convertToRem(10)
                }}
              />
            </Box>
            <Stack
              direction={'column'}
              gap={1.25}
              sx={{
                height: convertToRem(76)
              }}
            >
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography cate='title_40' plainColor='sub.teal600'>
                  {item?.category?.name || ''}
                </Typography>
                <CardBadge
                  state={item.type === CONTENT_TYPE.FREE ? 'FREE' : 'PREMIUM'}
                  label={item.type === CONTENT_TYPE.FREE ? '무료' : '프리미엄'}
                />
              </Stack>
              <Typography cate='title_40'>{item.title}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: 0,
          marginTop: convertToRem(16)
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <HeartSmIcon stroke={theme.palette.main.white} />
          <Typography cate='caption_1_semibold' color={'#C3C3C3'} ml={1} mr={3}>
            {formatCurrency(item.totalView)}
          </Typography>
        </Stack>
        <RoundedSolidIconButton
          btnSize='p8'
          onClick={() => {
            onBookmark?.()
          }}
        >
          {item.isBookmark ? (
            <BookmarkUncheckIcon
              pathProps={{ stroke: theme.palette.main_primary.blue500, fill: theme.palette.main_primary.blue500 }}
            />
          ) : (
            <BookmarkUncheckIcon pathProps={{ stroke: theme.palette.main.white }} />
          )}
        </RoundedSolidIconButton>
      </CardActions>
    </Card>
  )
}
