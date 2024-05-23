'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BookMarkIcon } from '@/assets/icons'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { BaseImage, EllipsisText, Gray700Chip, GraySolidIconButton, Typography } from '@/elements'
import { TMentor } from '@/types/community/mentoring.type'
import { ResponseMessage } from '@/types/types.type'
import { Box, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import MentorAchievement from '../expert-mentoring/mentor-achievement'

type ExpertMentoringCardProps = {
  mentor: TMentor
  refetch?: (id: number, data?: ResponseMessage) => void
}

const ExpertMentoringCard = ({ mentor, refetch }: ExpertMentoringCardProps) => {
  const theme = useTheme()
  const svgBookmarkColor = theme.palette.main_primary.blue500

  const { avatar } = mentor.user
  const {
    nameOfAffiliation = '',
    username = '',
    otherInformation = '',
    totalReviews = 0,
    totalApplications = 0,
    id,
    isBookmark,
    categories = []
  } = mentor

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: (data: ResponseMessage) => {
      refetch?.(id, data)
    }
  })

  const onBookmark = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    bookmarkAct.mutateAsync({
      type: BOOKMARK_TYPE.MENTORING,
      id
    })
  }

  return (
    <Link href={`/community/expert-mentoring/${id}`} style={{ width: '100%' }}>
      <Box
        display={'flex'}
        py={{
          md: 3,
          xs: 2
        }}
        px={2}
        flexDirection={'column'}
        gap={2}
        borderRadius={2}
        bgcolor={'main_grey.gray800'}
      >
        <Box height={160} width={160} alignSelf={'center'}>
          <BaseImage
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 99
            }}
            src={avatar?.url}
            alt={`expert-avatar-${id}`}
          />
        </Box>
        <Box alignSelf={'center'} textAlign={'center'}>
          <Typography cate='title_40' plainColor='sub.teal400'>
            {nameOfAffiliation}
          </Typography>
          <Box display={'flex'} gap={1} justifyContent={'center'}>
            <Typography cate='title_60' plainColor='main_grey.gray100' mt={0.5}>
              {username}
            </Typography>
            <Typography cate='title_60' plainColor='main_grey.gray100' mt={0.5}>
              멘토
            </Typography>
          </Box>
          <EllipsisText height={48} ellipsisLine={2} cate='body_3' plainColor='main_grey.gray100' mt={1.5}>
            {otherInformation}
          </EllipsisText>
          <Box mt={1.5} display={'flex'} gap={1} justifyContent={'center'} flexWrap={'wrap'}>
            {categories.map((i) => (
              <Gray700Chip
                sx={{
                  span: {
                    px: 0
                  }
                }}
                label={i.name}
                key={i.id}
              />
            ))}
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <MentorAchievement {...{ totalApplications, totalReviews }} />
          <Box>
            <GraySolidIconButton onClick={onBookmark} btnSize='p8'>
              <BookMarkIcon
                pathProps={{
                  ...(isBookmark && { fill: svgBookmarkColor, stroke: svgBookmarkColor })
                }}
              />
            </GraySolidIconButton>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default ExpertMentoringCard
