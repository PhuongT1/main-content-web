'use client'
import { Edit05Icon, HeartIcon, Trash03Icon } from '@/assets/icons'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import CommentActionMenu from '@/elements/v2/more'
import { formatCurrency } from '@/utils/format-currency'

export type TCardAnswer = {
  title: string
  subTitle: string
  content: string
  likeCount: number
  dateText: string
  dateAnswer: string
  name: string
  avatar: string
  subContent: string
  handleDelete: () => void
  handleEdit: () => void
  url: string
  onClickCard: () => void
}

const CardAnswer = ({
  title,
  subTitle,
  content,
  likeCount,
  dateText,
  name,
  avatar,
  dateAnswer,
  subContent,
  handleDelete,
  handleEdit,
  url,
  onClickCard
}: TCardAnswer) => {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      sx={{
        borderRadius: convertToRem(8),
        backgroundColor: theme.palette.main_grey.gray800,
        cursor: 'pointer'
      }}
      p={isMobile ? 2 : 4}
      onClick={onClickCard}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography className='truncate-text-2' cate='body_20' plainColor='sub.teal400'>
          {title}
        </Typography>
      </Box>
      <Typography
        className='truncate-text-2'
        cate='title_40'
        plainColor='main_grey.gray100'
        mb={isMobile ? 2 : 3}
        mt={2}
      >
        {subTitle}
      </Typography>
      <Typography className='truncate-text-2' cate='body_30' plainColor='main_grey.gray300'>
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mt={3}>
        <Box sx={{ display: 'flex', gap: convertToRem(6), alignItems: 'center' }}>
          <Box>
            <Box
              component='img'
              src={avatar}
              alt={'avatar'}
              sx={{
                width: convertToRem(32),
                height: convertToRem(32),
                borderRadius: convertToRem(999),
                objectFit: 'cover'
              }}
            />
          </Box>
          <Typography plainColor='main.grayf7' cate='caption_20'>
            {name}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'} gap={0.5} alignItems={'center'}>
          <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
          <Typography plainColor='main_grey.gray200' cate='caption_10'>
            {`${formatCurrency(likeCount)} · ${dateText}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: convertToRem(1),
          backgroundColor: theme.palette.main_grey.gray700
        }}
        my={isMobile ? 2 : 3}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: convertToRem(16),
          background: theme.palette.main_grey.gray700,
          borderRadius: convertToRem(16)
        }}
        p={2}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end', gap: convertToRem(7) }}>
          <Typography plainColor='main_grey.gray400' cate='caption_10'>
            {`${dateAnswer}`}
          </Typography>
          {/* <CommentActionMenu
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isOwn={false}
            commentId={1}
            url={url}
          /> */}
        </Box>
        <Typography className='truncate-text-2' plainColor='main.gray30' cate='body_30'>
          {subContent}
        </Typography>
      </Box>
    </Box>
  )
}

export default CardAnswer
