import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import HeartSmIcon from '@/assets/icons/heart-sm'
import YoutubeIcon from '@/assets/icons/youtube-logo'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
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
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { useRef, useState } from 'react'
import { RoundedSolidIconButton } from '../v2/icon-button'
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
  item: IBlog
}
export default function CardSlide({ onClick, onBookmark, item }: CardSlideProps) {
  const imageRef = useRef<any>()
  const theme = useTheme()
  const isNew = moment().diff(moment(item.createdAt), 'days') < 7
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
        <CardContent
          sx={{
            paddingBottom: 0
          }}
        >
          <Stack
            direction={'row'}
            alignItems='center'
            justifyContent={'space-between'}
            sx={{
              width: '100%',
              height: convertToRem(height),
              position: 'relative'
            }}
          >
            <Box position={'absolute'} zIndex={2} left={'43%'}>
              <YoutubeIcon />
            </Box>
            <Box position={'absolute'} zIndex={2} bottom={8} right={8}>
              <MChip
                size='small'
                label={!!item.duration ? item.duration : '00:00'}
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
                src={item?.thumbnail?.url}
                alt={item?.thumbnail?.name}
                fill={true}
                style={{
                  objectFit: 'cover',
                  borderRadius: convertToRem(8)
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction={'column'}
            sx={{
              marginTop: convertToRem(16),
              height: convertToRem(103)
            }}
            gap={0.5}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography cate='sub_title_20' color={theme.palette.main.point}>
                {item?.category?.name}
              </Typography>

              {isNew ? (
                <Chip
                  type='error'
                  size='small'
                  label='new'
                  sx={{
                    height: convertToRem(17)
                  }}
                />
              ) : item.isHot ? (
                <Chip
                  type='warning'
                  size='small'
                  label='hot'
                  sx={{
                    height: convertToRem(17)
                  }}
                />
              ) : (
                <></>
              )}
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              {!!item?.instructorThumbnail?.url ? (
                <Avatar
                  sx={{
                    width: convertToRem(24),
                    height: convertToRem(24)
                  }}
                  alt='Remy Sharp'
                  src={item?.instructorThumbnail?.url}
                />
              ) : (
                <></>
              )}

              {!!item?.instructorName ? (
                <Typography
                  cate='body_10'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical'
                  }}
                  color={theme.palette.main.gray20}
                  ml={!!item?.instructorThumbnail?.url ? 1 : 0}
                >
                  {item?.instructorName}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
            <Typography
              cate='body_40'
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
              {item?.title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: `${convertToRem(4)} ${convertToRem(16)} ${convertToRem(16)} ${convertToRem(16)}`
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <HeartSmIcon stroke={theme.palette.main.white} />
          <Typography cate='caption_10' plainColor={'main_grey.gray200'} ml={1} mr={3}>
            {formatCurrency(item?.totalView)} · {displayTimeDiff(item.createdAt)}
          </Typography>
        </Stack>
        <RoundedSolidIconButton
          btnSize='p8'
          onClick={() => {
            onBookmark?.()
          }}
        >
          {item?.isBookmark ? (
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
