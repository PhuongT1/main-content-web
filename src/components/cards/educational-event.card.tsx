'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BookMarkIcon } from '@/assets/icons'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { EDUCATIONAL_EVENT_TYPE, EVENT_APPLICATION_TYPE } from '@/constants/community/educational-event.constant'
import { BaseImage, DesignedPrimaryButton, DesignedSecondaryButton, SecondaryIconButton, Typography } from '@/elements'
import { TEvent } from '@/types/community/educational-event.type'
import { ResponseMessage } from '@/types/types.type'
import { formatCurrency } from '@/utils/string'
import { isNumber } from '@/utils/types'
import { Box, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type EducationalEventCardProps = {
  refetch: (id: number, data?: ResponseMessage) => void
  disabledApplyBtn?: boolean
  item: TEvent
  isBookmarkPage?: boolean
}

const EducationalEventCard = ({
  refetch,
  item,
  isBookmarkPage,
  disabledApplyBtn = false
}: EducationalEventCardProps) => {
  const theme = useTheme()
  const router = useRouter()

  const {
    price = 0,
    applicationType,
    id,
    url,
    type,
    thumbnail: { baseUrl } = { baseUrl: '' },
    category: { name } = { name: '' },
    deadlineDate,
    title,
    numberOfParticipants,
    isBookmark
  } = item || {}

  const isFree = price === 0
  const isInternal = type === EDUCATIONAL_EVENT_TYPE.INTERNAL
  const isApplied = applicationType === EVENT_APPLICATION_TYPE.APPLICANT
  const bookmarked = isBookmark || isBookmarkPage
  const bookmarkSvgColor = theme.palette.main_primary.blue500

  const onApply = () => {
    router.push(`/community/educational-event-and-support-project/educational-event-list/${id}/payment`)
  }

  const onDetail = () => {
    isInternal
      ? router.push(`/community/educational-event-and-support-project/educational-event-list/${id}`)
      : url && window.open(url, '_blank')
  }

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: (data: ResponseMessage) => {
      refetch(id, data)
    }
  })

  const bookmark = (id: number) => {
    if (isNumber(id)) {
      bookmarkAct.mutate({
        type: BOOKMARK_TYPE.EVENT,
        id
      })
    }
  }

  return (
    <Box
      display={'flex'}
      p={2}
      width={'100%'}
      flexDirection={'column'}
      gap={2}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
    >
      <Box height={304}>
        <BaseImage
          height={304}
          width={500}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 8
          }}
          src={baseUrl}
          alt={`book-mark-${0}`}
        />
      </Box>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography cate='body_30' plainColor='sub.teal600'>
            {name}
          </Typography>
          {deadlineDate && (
            <Box
              display={'flex'}
              py={0.625}
              px={1.5}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'99px'}
              border={'1px solid'}
              borderColor={'sub.orange600'}
              bgcolor={'sub.pink100'}
            >
              <Typography cate='caption_20' plainColor='sub.orange600'>
                {deadlineDate}
              </Typography>
            </Box>
          )}
        </Box>
        <Box mt={1}>
          <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
            {title}
          </Typography>
        </Box>
        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
          <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
            {isFree ? '무료' : formatCurrency(price)}
          </Typography>
          {isInternal && (
            <Typography cate='sub_title_30' plainColor='main_grey.gray200'>
              {numberOfParticipants}
            </Typography>
          )}
        </Box>
      </Box>
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <DesignedSecondaryButton onClick={onDetail} fullWidth btnSize='designed-sm'>
          자세히 보기
        </DesignedSecondaryButton>
        {isInternal && (
          <DesignedPrimaryButton
            disabled={isApplied || disabledApplyBtn}
            onClick={onApply}
            fullWidth
            btnSize='designed-sm'
          >
            {isApplied ? '신청완료' : '신청하기'}
          </DesignedPrimaryButton>
        )}
        <SecondaryIconButton
          active={bookmarked}
          onClick={() => bookmark(id)}
          btnSize='md'
          sx={{ height: 44, width: 44 }}
        >
          <BookMarkIcon
            pathProps={{
              ...(bookmarked && { fill: bookmarkSvgColor, stroke: bookmarkSvgColor })
            }}
          />
        </SecondaryIconButton>
      </Box>
    </Box>
  )
}

export default EducationalEventCard
