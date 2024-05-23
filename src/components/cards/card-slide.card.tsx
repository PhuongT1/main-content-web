'use client'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import HeartSmIcon from '@/assets/icons/heart-sm'
import YoutubeIcon from '@/assets/icons/youtube-logo'
import { RoundedSolidIconButton } from '@/elements'
import Typography from '@/elements/typography'
import { TImage } from '@/types/types.type'
import { BLOG_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import {
  Avatar,
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  Chip as MChip,
  ChipProps as MChipProps,
  Stack,
  debounce,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { useRef, useState } from 'react'
export type ChipProps = MChipProps & {
  type?: string
}
const Chip = styled(MChip)<ChipProps>(({ theme, type }) => ({
  backgroundColor:
    type === 'error' ? theme.palette.main.danger : type === 'warning' ? '#FC7900' : theme.palette.main.primary,
  padding: '1px 5px 2px 5px',
  color: theme.palette.main.white,
  borderRadius: '2px',
  fontSize: convertToRem(12),
  '.MuiChip-label': {
    padding: 0
  },
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  }
}))

type CardSlideProps = {
  onClick?: Function
  onBookmark?: Function
  createdAt?: string
  duration?: string
  thumbnail?: TImage
  categoryName?: string
  isHot?: boolean
  isAdvertisement?: boolean
  instructorThumbnail?: TImage
  instructorName?: string
  title?: string
  totalView?: number
  isBookmark?: boolean
  type?: string
  numberOfImage?: string | number
}
export default function CardSlide({
  onClick,
  onBookmark,
  createdAt = '',
  duration = '',
  thumbnail,
  categoryName = '',
  isHot = false,
  isAdvertisement = false,
  instructorThumbnail,
  title = '',
  instructorName = '',
  totalView = 0,
  isBookmark = false,
  type = BLOG_TYPE.VIDEO,
  numberOfImage = 0
}: CardSlideProps) {
  const imageRef = useRef<any>()
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const isNew = moment().diff(moment(createdAt), 'days') < 10
  const [height, setHeight] = useState(171)

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setHeight((imageRef.current.clientWidth * 171) / 304)
    })
    imageRef?.current?.addEventListener('resize', handleResize)
    let resizeObserver: any
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      Array.from(imageRef.current.children).forEach((child) => {
        resizeObserver.observe(child)
      })
    }
    return () => {
      handleResize.clear()
      imageRef?.current?.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <Card
      sx={{
        color: theme.palette.main_grey.gray800,
        borderRadius: convertToRem(8),
        position: 'relative'
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
        <CardContent>
          <Box
            display={'flex'}
            alignItems='center'
            justifyContent={'space-between'}
            component='div'
            sx={{
              width: '100%',
              height: convertToRem(height),
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            {type === BLOG_TYPE.VIDEO && (
              <Box position={'absolute'} zIndex={2} left={'43%'}>
                <YoutubeIcon />
              </Box>
            )}
            <Box position={'absolute'} zIndex={2} bottom={8} right={8}>
              <MChip
                size='small'
                label={type === BLOG_TYPE.CARD_NEWS ? numberOfImage + ' slides' : !!duration ? duration : '00:00'}
                sx={{ backgroundColor: theme.palette.main.gray80 }}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems='center'
              justifyContent={'space-between'}
              component='div'
              ref={imageRef}
              sx={{
                width: '100%',
                height: convertToRem(height),
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <Image
                src={thumbnail?.url || ''}
                alt={thumbnail?.name || ''}
                fill={true}
                style={{
                  objectFit: 'cover',
                  borderRadius: convertToRem(8)
                }}
              />
            </Box>
          </Box>
          <Stack
            direction={'column'}
            sx={{
              marginTop: convertToRem(16),
              height: convertToRem(103)
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{
                cursor: 'pointer'
              }}
            >
              <Typography cate='caption_1_semibold' color={theme.palette.main.point}>
                {categoryName}
              </Typography>

              {isNew ? (
                <Chip type='error' size='small' label='new' />
              ) : isHot ? (
                <Chip type='warning' size='small' label='hot' />
              ) : (
                <Box />
              )}

              {/* {isAdvertisement ? (
                <Chip type='primary' size='small' label='광고' />
              ) : isNew ? (
                <Chip type='error' size='small' label='new' />
              ) : isHot ? (
                <Chip type='warning' size='small' label='hot' />
              ) : (
                <Box />
              )} */}
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              {!!instructorThumbnail?.url ? (
                <Avatar
                  sx={{
                    width: convertToRem(24),
                    height: convertToRem(24)
                  }}
                  alt='Remy Sharp'
                  src={instructorThumbnail?.url}
                />
              ) : (
                <></>
              )}

              {!!instructorName ? (
                <Typography
                  cate='caption_1'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical'
                  }}
                  color={theme.palette.main.gray20}
                  ml={!!instructorThumbnail?.url ? 1 : 0}
                >
                  {instructorName}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
            <Typography
              cate='body_2'
              color={theme.palette.main.white}
              sx={{
                marginTop: convertToRem(4),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: convertToRem(16)
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <HeartSmIcon stroke={theme.palette.main.white} />
          <Typography cate='caption_1_semibold' color={'#C3C3C3'} ml={1} mr={3}>
            {formatCurrency(totalView)} · {displayTimeDiff(createdAt)}
          </Typography>
        </Stack>
        <RoundedSolidIconButton
          btnSize='p8'
          onClick={() => {
            onBookmark?.()
          }}
        >
          {isBookmark ? (
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
