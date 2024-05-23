import HeartSmIcon from '@/assets/icons/heart-sm'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import {
  Box,
  CardActionArea,
  CardActions,
  Chip as MChip,
  ChipProps as MChipProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BookmarkCheckButton from '../bookmark-checkbox'
export type ChipProps = MChipProps & {
  type?: string
}

export default function CardHorizontalSlide({
  item,
  onBookmark,
  meta
}: {
  item: IBlog
  onBookmark: Function
  meta?: {
    hideImage?: boolean
  }
}) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const router = useRouter()

  return (
    <Card
      sx={{
        height: convertToRem(276),
        width: convertToRem(232),
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backgroundImage: 'none',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        onClick={() => {
          router.push('/blogs/' + item.id)
        }}
        sx={{
          maxWidth: convertToRem(232),
          zIndex: 1,
          height: convertToRem(264),
          width: convertToRem(232),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box position={'absolute'} zIndex={1} bottom={14} right={8}>
          <MChip
            size='small'
            label={item.images?.length + ' slides'}
            sx={{
              backgroundColor: theme.palette.main.gray80
            }}
          />
        </Box>
        <Box
          display={'flex'}
          alignItems='center'
          justifyContent={'space-between'}
          component='div'
          sx={{
            width: convertToRem(232),
            height: convertToRem(232),
            position: 'relative'
          }}
        >
          {!meta?.hideImage && (
            <Image
              src={item?.thumbnail?.url}
              height={232}
              width={100}
              style={{
                objectFit: 'cover',
                width: '100%',
                position: 'relative',
                borderRadius: convertToRem(16)
              }}
              alt='test'
            />
          )}
        </Box>
      </CardActionArea>
      <CardActions
        sx={{
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <HeartSmIcon stroke={theme.palette.main.white} />
          <Typography cate='caption_2' color={theme.palette.main.white} ml={1} mr={3}>
            {formatCurrency(item.totalView)} · {displayTimeDiff(item.createdAt)}
          </Typography>
        </Box>
        <BookmarkCheckButton
          isBookmark={item.isBookmark}
          onBookmark={onBookmark}
          small={true}
          plainColor='main_primary.blue900'
        />
      </CardActions>
    </Card>
  )
}

// <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'100%'} zIndex={2} mt={2} pb={2}>
//   <Box display={'flex'} alignItems={'center'}>
//     <HeartSmIcon stroke={theme.palette.main.white} />
//     <Typography cate='caption_2' color={theme.palette.main.white} ml={1} mr={3}>
//       {formatCurrency(item.totalView)} · {displayTimeDiff(item.createdAt)}
//     </Typography>
//   </Box>
//   <IconButton
//     size='medium'
//     onClick={() => {
//       onBookmark?.()
//     }}
//   >
//     {item?.isBookmark ? (
//       <BookmarkCheckIcon stroke={theme.palette.main.primary_light} />
//     ) : (
//       <BookmarkUncheckIcon svgProps={{ stroke: theme.palette.main.white }} />
//     )}
//   </IconButton>
// </Box>
