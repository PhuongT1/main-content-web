'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import DownloadCircleIcon from '@/assets/icons/download-circle'
import HeartSmIcon from '@/assets/icons/heart-sm'
import Link03 from '@/assets/icons/link-03'
import { Typography } from '@/elements'
import { RoundedButton } from '@/elements/v2/button'
import { BLOG_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import getURL from '@/utils/get-url'
import { Stack, useTheme } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type ShareBottomProps<T extends { totalView: number; createdAt: string; type: string; isBookmark: boolean }> = {
  data: T
  download?: () => void
  bookmark: () => void
  showTimeAgo?: boolean
  url: string
  align?: boolean
}

const ShareBottom = <
  T extends {
    totalView: number
    createdAt: string
    type: string
    isBookmark: boolean
  }
>({
  data,
  download,
  bookmark,
  showTimeAgo = true,
  url,
  align = false
}: ShareBottomProps<T>) => {
  const theme = useTheme()
  const pathName = usePathname()
  const [showShare, setShowShare] = useState<boolean>(false)

  return (
    <>
      <Stack
        direction={{ sm: align ? 'row' : 'column', md: 'row' }}
        sx={{
          justifyContent: { sm: 'flex-start', md: 'space-between' },
          alignItems: { sm: align ? 'center' : 'flex-start', md: 'center' },
          borderBottom: '1px solid ' + theme.palette.main.gray60
        }}
        mt={{ md: 2, xs: 3 }}
        pb={{ md: 2.5, xs: 3 }}
      >
        <Stack direction={'row'} alignItems={'center'} mb={{ sm: align ? 0 : 2, md: 0 }}>
          <HeartSmIcon stroke={theme.palette.main.white} />
          {data && (
            <Typography cate='caption_2' color={theme.palette.main.white} ml={1} mr={3}>
              {formatCurrency(data.totalView)} {showTimeAgo ? '·' + displayTimeDiff(data.createdAt || '') : null}
            </Typography>
          )}
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} gap={1} width={'100%'}>
          <RoundedButton
            btnSize='sm'
            onClick={() => {
              setShowShare(true)
            }}
            sx={{
              width: convertToRem(97)
            }}
          >
            <Link03 />
            <Typography cate='button_20' color={theme.palette.main.white}>
              공유
            </Typography>
          </RoundedButton>
          {data.type === BLOG_TYPE.CARD_NEWS && (
            <RoundedButton
              btnSize='sm'
              onClick={() => download?.()}
              sx={{
                width: convertToRem(121)
              }}
            >
              <DownloadCircleIcon />
              <Typography cate='button_20' color={theme.palette.main.white}>
                다운로드
              </Typography>
            </RoundedButton>
          )}
          <RoundedButton
            btnSize='sm'
            sx={{
              width: convertToRem(110)
            }}
            onClick={bookmark}
          >
            {!data.isBookmark ? (
              <BookmarkUncheckIcon />
            ) : (
              <BookmarkUncheckIcon
                pathProps={{
                  stroke: '#2D68FE',
                  fill: '#2D68FE'
                }}
              />
            )}
            <Typography cate='button_20' color={theme.palette.main.white}>
              북마크
            </Typography>
          </RoundedButton>
        </Stack>
      </Stack>
      <SharePopup
        open={showShare}
        onCancel={() => setShowShare(false)}
        url={url.includes(pathName) ? getURL(pathName) : url}
      />
    </>
  )
}

export default ShareBottom
