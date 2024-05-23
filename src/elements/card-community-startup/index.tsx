import Typography from '@/elements/typography'
import { IPool } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, CardActionArea, Chip, ChipProps as MChipProps, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import { GraySolidIconButton } from '..'
import { BookMarkIcon, HeartIcon } from '@/assets/icons'
import CommentActionMenu from './CommentActionMenu'
import { ICategory } from '@/types/category.type'
import { IUser } from '@/types/user.type'
import { formatCurrency } from '@/utils/format-currency'
import { displayTimeDiff } from '@/utils/display-time-diff'
export type ChipProps = MChipProps & {
  type?: string
}

type CartStartupTalkProps = {
  category: ICategory
  title: string
  content: string
  user: IUser
  totalView: number
  createdAt: Date
  id: number
  isBookmark: boolean
  isOwner: boolean
  onBookmark: any
  onClick: any
  onDelete: any
  refetch: any
  isReport: boolean
}

export default function CardCommunityStartup({
  onClick,
  category,
  title,
  content,
  user,
  totalView,
  createdAt,
  id,
  isBookmark,
  onBookmark,
  onDelete,
  isOwner,
  isReport,
  refetch
}: CartStartupTalkProps) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const [bookmark, setBookmark] = useState(false)

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.main.gray80,
        borderRadius: convertToRem(16)
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          zIndex: 1,
          height: '100%',
          padding: md ? 2 : 3,
          width: '100%',
          backgroundColor: theme.palette.main.gray80,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={2}>
          <Box display={'flex'} justifyContent='space-between' alignItems={'center'} width={'100%'}>
            <Typography
              cate='body_20'
              color={theme.palette.sub.teal400}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {category?.name || ''}
            </Typography>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <GraySolidIconButton
                onClick={(e: any) => {
                  e.stopPropagation()
                  onBookmark?.()
                }}
                btnSize='p8'
              >
                <BookMarkIcon
                  pathProps={{
                    fill: isBookmark ? theme.palette.main_primary.blue500 : 'none',
                    stroke: isBookmark ? theme.palette.main_primary.blue500 : theme.palette.main_grey.gray100
                  }}
                />
              </GraySolidIconButton>
              {md && (
                <CommentActionMenu
                  isOwn={isOwner}
                  handleDelete={onDelete}
                  commentId={id}
                  isReport={isReport}
                  refetch={refetch}
                />
              )}
            </Box>
          </Box>

          <Typography cate='title_40' color={theme.palette.main_grey.gray100} mb={0}>
            {title || ''}
          </Typography>
          <Typography
            cate='body_30'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'pre-line',
              height: convertToRem(48)
            }}
            color={theme.palette.main_grey.gray300}
            mb={0}
          >
            {content || ''}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent='space-between' alignItems={'center'} width={'100%'}>
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <Avatar
              sx={{
                width: convertToRem(32),
                height: convertToRem(32)
              }}
              alt='Remy Sharp'
              src={!!user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
            />
            <Typography cate='caption_20' color={theme.palette.main_grey.gray100}>
              {user.nickname}
            </Typography>
          </Box>
          <Box display={'flex'} gap={0.5} alignItems={'center'}>
            <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
            <Typography plainColor='main_grey.gray200' cate='caption_10' mr={1.5}>
              {formatCurrency(totalView)} · {displayTimeDiff(createdAt)}
            </Typography>
            {!md && (
              <CommentActionMenu
                isOwn={isOwner}
                refetch={refetch}
                handleDelete={onDelete}
                isReport={isReport}
                commentId={id}
              />
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
