import HeartSmIcon from '@/assets/icons/heart-sm'
import { CardBadge } from '@/elements'
import BookmarkCheckButton from '@/elements/bookmark-checkbox'
import Typography from '@/elements/typography'
import { ReferenceRoom } from '@/types/startup/toolkit.type'
import { formatCurrency } from '@/utils/format-currency'
import { Box, CardActionArea, ChipProps as MChipProps, Stack, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CONTENT_TYPE } from '../../_client-components/data-room-table'

export type ChipProps = MChipProps & {
  type?: string
}

type SideCardReferentProps = {
  item: ReferenceRoom
  onBookmark: any
}

export default function SideCardReferent({ item, onBookmark }: SideCardReferentProps) {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Card
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backgroundImage: 'none',
        margin: { sm: 0 }
      }}
    >
      <CardActionArea
        onClick={() => {
          router.push('/startup/referent-room/' + item.id)
        }}
        sx={{
          paddingBottom: 2
        }}
      >
        <Stack direction={'column'} gap={2}>
          <Box
            sx={{
              width: '100%',
              paddingTop: 'calc((9.5 / 10.2) * 100%)',
              height: 'auto',
              position: 'relative'
            }}
          >
            <Image
              src={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
              alt={item?.thumbnail?.name}
              fill={true}
              style={{
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
          </Box>

          <Stack gap={1.25}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                cate='body_20'
                plainColor={'sub.teal600'}
              >
                {item.category.name}
              </Typography>
              <CardBadge
                label={item.type === CONTENT_TYPE.FREE ? '무료' : '프리미엄'}
                state={item.type === CONTENT_TYPE.FREE ? 'FREE' : 'PREMIUM'}
              />
            </Stack>
            <Typography cate='body_20' plainColor={'main_grey.gray200'}>
              {item.title}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
      <Stack direction={'row'} alignItems='center' justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <HeartSmIcon stroke={theme.palette.main.white} />
          </Box>
          <Typography
            cate='body_10'
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
            {formatCurrency(item.totalView)}
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
