'use client'
import { Edit05Icon, HeartIcon, Trash03Icon, UShareIcon } from '@/assets/icons'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import CommentActionMenu from '@/elements/v2/more'
import { formatCurrency } from '@/utils/format-currency'

type TCardWriting = {
  title: string
  subTitle: string
  content: string
  likeCount: number
  dateText: string
  handleDelete: () => void
  handleEdit: () => void
  url: string
  onClickCard: () => void
}

const CardWriting = ({
  title,
  subTitle,
  content,
  likeCount,
  dateText,
  handleDelete,
  url,
  handleEdit,
  onClickCard
}: TCardWriting) => {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      sx={{
        borderRadius: convertToRem(8),
        backgroundColor: theme.palette.main_grey.gray800,
        cursor: 'pointer'
      }}
      p={isMobile ? 2 : 3}
      onClick={onClickCard}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography className='truncate-text-2' cate='body_20' plainColor='sub.teal400'>
          {title}
        </Typography>
      </Box>

      <Typography className='truncate-text-2' cate='title_40' plainColor='main_grey.gray100' my={2}>
        {subTitle}
      </Typography>
      <Typography className='truncate-text-2' cate='body_30' plainColor='main_grey.gray300'>
        {content}
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        gap={0.5}
        alignItems={'center'}
        sx={{
          gap: convertToRem(16)
        }}
        mt={3}
      >
        <Box display={'flex'} justifyContent={'flex-end'} gap={0.5} alignItems={'center'}>
          <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
          <Typography plainColor='main_grey.gray200' cate='caption_10'>
            {`${formatCurrency(likeCount)} · ${dateText}`}
          </Typography>
        </Box>
        {/* <CommentActionMenu handleDelete={handleDelete} handleEdit={handleEdit} isOwn={true} commentId={1} url={url} /> */}
      </Box>
    </Box>
  )
}

export default CardWriting
