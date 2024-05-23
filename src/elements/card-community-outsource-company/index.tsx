import { BookMarkIcon, HeartIcon } from '@/assets/icons'
import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import BookmarkSmFilledIcon from '@/assets/icons/bookmark-sm-filled'
import HeartFilledIcon from '@/assets/icons/heart-filled'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
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
import { IFile } from '@/types/user.type'
import { ICategory } from '@/types/category.type'
import { formatCurrency } from '@/utils/format-currency'
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

type CardCommunityOutsourceCompanyProps = {
  onClick?: Function
  onBookmark?: Function
  thumbnail: IFile
  categories: ICategory[]
  name: string
  shortIntroduction: string
  totalView?: number
  isBookmark: boolean
}
export default function CardCommunityOutsourceCompany({
  onClick,
  onBookmark,
  thumbnail,
  categories,
  name,
  shortIntroduction,
  totalView,
  isBookmark
}: CardCommunityOutsourceCompanyProps) {
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.main.gray80,
        borderRadius: convertToRem(16),
        position: 'relative',
        height: convertToRem(343),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        onClick={() => {
          onClick?.()
        }}
        sx={{
          zIndex: 1,
          height: convertToRem(343),
          backgroundColor: theme.palette.main.gray80,
          padding: convertToRem(16),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <Box
          component={'img'}
          src={thumbnail?.url ? thumbnail?.url : '/images/blank-thumbnail.png'}
          alt={thumbnail?.name ? thumbnail.name : 'blank-thumbnail.'}
          sx={{
            objectFit: 'cover',
            width: '100%',
            position: 'relative',
            height: convertToRem(171),
            borderRadius: convertToRem(8)
          }}
        />
        <Box display={'flex'} flexDirection='column' alignItems={'flex-start'} width='100%' gap={0.5} mt={2}>
          <Typography cate='caption_10' color={theme.palette.sub.teal400}>
            {categories?.map((i: ICategory) => i.name)?.join('/')}
          </Typography>
          <Typography cate='sub_title_30' color={theme.palette.main_grey.gray100}>
            {name}
          </Typography>

          <Typography
            cate='body_20'
            color={theme.palette.main_grey.gray300}
            zIndex={2}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: 42,
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {shortIntroduction}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} mt={0.3}>
          <Box display={'flex'} gap={0.5} alignItems={'center'}>
            <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
            <Typography plainColor='main_grey.gray200' cate='caption_10'>
              {formatCurrency(totalView) || 0}
            </Typography>
          </Box>
          <Box>
            <GraySolidIconButton
              btnSize='p8'
              onClick={(e: any) => {
                e.stopPropagation()
                onBookmark?.()
              }}
            >
              <BookMarkIcon
                pathProps={{
                  fill: isBookmark ? theme.palette.main_primary.blue500 : 'none',
                  stroke: isBookmark ? theme.palette.main_primary.blue500 : theme.palette.main_grey.gray100
                }}
              />
            </GraySolidIconButton>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
