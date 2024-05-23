import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import BookmarkFilledIcon from '@/assets/icons/bookmark-sm-filled'
import HeartFilledIcon from '@/assets/icons/heart-filled'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  Box,
  CardActionArea,
  IconButton,
  Chip as MChip,
  ChipProps as MChipProps,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
import { useState } from 'react'
import { GraySolidIconButton } from '../v2/icon-button'
import { BookMarkIcon, HeartIcon } from '@/assets/icons'
import { IRecruit, ITeamBuilding } from '@/types/team-building.type'
import { formatCurrency } from '@/utils/format-currency'
import { displayTimeDiff } from '@/utils/display-time-diff'
export type ChipProps = MChipProps & {
  type?: string
}

type CardCommunityTeamBuildingProps = {
  item: ITeamBuilding
  onClick: any
  onBookmark: any
}

export default function CardCommunityTeamBuilding({ item, onClick, onBookmark }: CardCommunityTeamBuildingProps) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')

  return (
    <Card
      sx={{
        // maxWidth: convertToRem(335),
        height: convertToRem(389),
        // width: md ? '100%' : convertToRem(335),
        backgroundColor: theme.palette.main.gray80,
        borderRadius: convertToRem(16),
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          zIndex: 1,
          height: '100%',
          backgroundColor: theme.palette.main.gray80
        }}
      >
        <Box
          sx={{
            padding: convertToRem(16),
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box display='flex' width='100%' justifyContent='flex-start'>
              <Image
                alt='img'
                src={item.thumbnail ? item.thumbnail.url : '/images/test-img.png'}
                width={88}
                height={88}
                style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={'100%'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              zIndex={2}
              gap={1}
              my={3}
            >
              <Typography
                cate='body_20'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
                color={theme.palette.sub.teal400}
              >
                {item.name}
              </Typography>
              <Typography
                cate='sub_title_30'
                color={theme.palette.main_grey.gray100}
                zIndex={2}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {item.slogan}
              </Typography>
              <Typography
                cate='body_20'
                color={theme.palette.main_grey.gray300}
                zIndex={2}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {item.introduction}
              </Typography>

              <Box display='flex' flexDirection={'column'} gap={1} mt={1} height={convertToRem(41.6)}>
                {item?.recruits && item.recruits.length > 0 ? (
                  item.recruits.length > 2 ? (
                    item.recruits.slice(0, 2).map((i: any) => (
                      <Typography
                        key={i.id}
                        cate='caption_1_semibold'
                        color={theme.palette.main.primary_light}
                        zIndex={2}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {i.category.name}: {i.numberOfRecruits}명 모집
                      </Typography>
                    ))
                  ) : (
                    item.recruits.map((i: IRecruit) => (
                      <Typography
                        key={i.id}
                        cate='caption_1_semibold'
                        color={theme.palette.main.primary_light}
                        zIndex={2}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {i.category.name}: {i.numberOfRecruits}명 모집
                      </Typography>
                    ))
                  )
                ) : (
                  <Typography
                    cate='caption_1_semibold'
                    color={theme.palette.main.primary_light}
                    zIndex={2}
                    mt={1}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    참여한 프로젝트가 없습니다.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
            <Box display={'flex'} gap={0.5} alignItems={'center'}>
              <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
              <Typography plainColor='main_grey.gray200' cate='caption_10'>
                {formatCurrency(item.totalFavorites)} · {displayTimeDiff(item.createdAt)}
              </Typography>
            </Box>
            <Box>
              <GraySolidIconButton
                onClick={(e: any) => {
                  e.stopPropagation()
                  onBookmark()
                }}
                btnSize='p8'
              >
                <BookMarkIcon
                  pathProps={{
                    fill: item?.isBookmark ? theme.palette.main_primary.blue500 : 'none',
                    stroke: item?.isBookmark ? theme.palette.main_primary.blue500 : theme.palette.main_grey.gray100
                  }}
                />
              </GraySolidIconButton>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
