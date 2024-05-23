import HeartSmIcon from '@/assets/icons/heart-sm'
import BookmarkCheckButton from '@/elements/bookmark-checkbox'
import ProgressiveImage from '@/elements/progressive-image'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import {
  Box,
  CardActionArea,
  Chip as MChip,
  ChipProps as MChipProps,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from '@mui/material/Card'
import { useRouter } from 'next/navigation'
export type ChipProps = MChipProps & {
  type?: string
}

type SideCardNewsProps = {
  item: IBlog
  onBookmark: any
}

export default function SideCardNews({ item, onBookmark }: SideCardNewsProps) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const router = useRouter()
  return (
    <Card
      sx={{
        height: 'auto',
        width: '100%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backgroundImage: 'none',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 0,
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        onClick={() => {
          router.push('/blogs/' + item.id)
        }}
        sx={{
          zIndex: 1,
          height: 'auto',
          width: '100%',
          display: 'flex',
          borderRadius: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            width: '100%',
            paddingTop: 'calc((9.5 / 10.2) * 100%)',
            height: 'auto',
            position: 'relative'
          }}
        >
          <ProgressiveImage
            src={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
            placeholderSrc={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
            alt={item?.thumbnail?.name}
            style={{
              cursor: 'pointer',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 8
            }}
          />
          <Box position={'absolute'} zIndex={3} bottom={8} right={8}>
            <MChip
              size='small'
              label={item.images?.length + ' slides'}
              sx={{ backgroundColor: theme.palette.main_grey.gray800, fontSize: 12 }}
            />
          </Box>
        </Box>
      </CardActionArea>
      <Stack direction={'row'} alignItems='center' justifyContent={'space-between'} width={'100%'} zIndex={2} mt={2}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box
            sx={{
              alignSelf: 'center'
            }}
          >
            <HeartSmIcon stroke={theme.palette.main.white} />
          </Box>
          <Typography
            cate='caption_2'
            color={theme.palette.main.white}
            ml={1}
            mr={3}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {formatCurrency(item.totalView)} · {displayTimeDiff(item.createdAt)}
          </Typography>
        </Stack>
        <BookmarkCheckButton
          isBookmark={item.isBookmark}
          onBookmark={onBookmark}
          small={true}
          plainColor='main_grey.gray700'
        />
      </Stack>
    </Card>
  )
}
