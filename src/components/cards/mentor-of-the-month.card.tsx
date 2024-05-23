'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BookMarkIcon, RocketIcon } from '@/assets/icons'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { BaseImage, Divider, EllipsisText, Gray700Chip, GraySolidIconButton, Typography } from '@/elements'
import { TMentor } from '@/types/community/mentoring.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { Card } from '..'

type MentorOfTheMonthCardProps = {
  mentor: TMentor
  refetch?: () => void
}

const MentorDetailMd = ({ mentor, refetch }: MentorOfTheMonthCardProps) => {
  const theme = useTheme()

  const { avatar } = mentor?.user || {}
  const {
    nameOfAffiliation = '',
    username = '',
    totalReviews = 0,
    totalApplications = 0,
    id,
    isBookmark,
    categories = []
  } = mentor || ({} as TMentor)

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: () => {
      refetch?.()
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
    <Box display='flex' gap={3}>
      <Box height={88} width={88} flexShrink={0}>
        <BaseImage
          height={88}
          width={88}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '88px'
          }}
          src={avatar?.baseUrl}
          alt={`expert`}
        />
      </Box>
      <Box flexGrow={1}>
        {nameOfAffiliation && (
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography cate='title_40' plainColor='sub.teal400'>
              {nameOfAffiliation}
            </Typography>
            <Box>
              <GraySolidIconButton onClick={onBookmark} btnSize='p8'>
                <BookMarkIcon
                  pathProps={{
                    ...(isBookmark && {
                      fill: theme.palette.main_primary.blue500,
                      stroke: theme.palette.main_primary.blue500
                    })
                  }}
                />
              </GraySolidIconButton>
            </Box>
          </Box>
        )}
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box mt={0.5} display={'flex'} gap={1}>
            <Typography cate='title_40' plainColor='main_grey.gray100'>
              {username} 멘토
            </Typography>
          </Box>
          {!nameOfAffiliation && (
            <Box>
              <GraySolidIconButton onClick={onBookmark} btnSize='p8'>
                <BookMarkIcon
                  pathProps={{
                    ...(isBookmark && {
                      fill: theme.palette.main_primary.blue500,
                      stroke: theme.palette.main_primary.blue500
                    })
                  }}
                />
              </GraySolidIconButton>
            </Box>
          )}
        </Box>
        <Box my={1} display={'flex'} gap={0.75} alignItems={'center'}>
          <RocketIcon
            svgProps={{ width: 24, height: 24, viewBox: '0 0 24 24' }}
            rectProps={{ fill: 'none' }}
            pathProps={{
              stroke: theme.palette.main_grey.gray300,
              d: 'M12 15L9 12M12 15C13.3968 14.4687 14.7369 13.7987 16 13M12 15V20C12 20 15.03 19.45 16 18C17.08 16.38 16 13 16 13M9 12C9.53214 10.6194 10.2022 9.29607 11 8.05C12.1652 6.18699 13.7876 4.65305 15.713 3.5941C17.6384 2.53514 19.8027 1.98637 22 2C22 4.72 21.22 9.5 16 13M9 12H4C4 12 4.55 8.97 6 8C7.62 6.92 11 8 11 8M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02131 16.219 6.50929 16.0046 5.97223 15.988C5.43516 15.9714 4.91088 16.1537 4.5 16.5Z'
            }}
          />
          <Box display={'flex'} gap={1}>
            <Typography cate='caption_20' plainColor='main_primary.blue300'>
              {totalApplications}번의 멘토링
            </Typography>
            <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500' }} />
            <Typography cate='caption_20' plainColor='main_grey.gray200'>
              {totalReviews}개의 후기
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
          {categories.map((i) => (
            <Gray700Chip key={i.id} label={i.name} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const MentorDetailXs = ({ mentor, refetch }: MentorOfTheMonthCardProps) => {
  const theme = useTheme()

  const { avatar } = mentor?.user || {}
  const {
    nameOfAffiliation = '',
    username = '',
    totalReviews = 0,
    totalApplications = 0,
    id,
    isBookmark,
    categories = []
  } = mentor || ({} as TMentor)

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: () => {
      refetch?.()
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
    <Box>
      <Box display='flex' justifyContent={'space-between'}>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <Box height={88} width={88} flexShrink={0}>
            <BaseImage
              height={88}
              width={88}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '88px'
              }}
              src={avatar?.url}
              alt={`expert`}
            />
          </Box>
          <Box>
            <Typography cate='title_40' plainColor='sub.teal400'>
              {nameOfAffiliation}
            </Typography>
            <Box display={'flex'} gap={1} mt={0.5}>
              <Typography cate='title_40' plainColor='main_grey.gray100'>
                {username} 멘토
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <GraySolidIconButton onClick={onBookmark} btnSize='p8'>
            <BookMarkIcon
              pathProps={{
                ...(isBookmark && {
                  fill: theme.palette.main_primary.blue500,
                  stroke: theme.palette.main_primary.blue500
                })
              }}
            />
          </GraySolidIconButton>
        </Box>
      </Box>
      <Box my={1} display={'flex'} gap={0.75} alignItems={'center'}>
        <RocketIcon
          svgProps={{ width: 24, height: 24, viewBox: '0 0 24 24' }}
          rectProps={{ fill: 'none' }}
          pathProps={{
            stroke: theme.palette.main_grey.gray300,
            d: 'M12 15L9 12M12 15C13.3968 14.4687 14.7369 13.7987 16 13M12 15V20C12 20 15.03 19.45 16 18C17.08 16.38 16 13 16 13M9 12C9.53214 10.6194 10.2022 9.29607 11 8.05C12.1652 6.18699 13.7876 4.65305 15.713 3.5941C17.6384 2.53514 19.8027 1.98637 22 2C22 4.72 21.22 9.5 16 13M9 12H4C4 12 4.55 8.97 6 8C7.62 6.92 11 8 11 8M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02131 16.219 6.50929 16.0046 5.97223 15.988C5.43516 15.9714 4.91088 16.1537 4.5 16.5Z'
          }}
        />
        <Box display={'flex'} gap={1}>
          <Typography cate='caption_20' plainColor='main_primary.blue300'>
            {totalApplications}번의 멘토링
          </Typography>
          <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500' }} />
          <Typography cate='caption_20' plainColor='main_grey.gray200'>
            {totalReviews}개의 후기
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={1} flexWrap={'wrap'}>
        {categories.map((i) => (
          <Gray700Chip key={i.id} label={i.name} />
        ))}
      </Box>
    </Box>
  )
}

const MentorOfTheMonthCard = ({ mentor, refetch }: MentorOfTheMonthCardProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const mentorId = mentor.id

  return (
    <Link href={`/community/expert-mentoring/${mentorId}`}>
      <Card sx={{ p: 3, bgcolor: 'main_grey.gray800' }}>
        {mdMatches ? (
          <MentorDetailXs mentor={mentor} refetch={refetch} />
        ) : (
          <MentorDetailMd mentor={mentor} refetch={refetch} />
        )}
        <EllipsisText height={48} ellipsisLine={2} mt={3} cate='body_30' plainColor='main_grey.gray100'>
          {mentor?.otherInformation}
        </EllipsisText>
        {mentor?.extraKeyword && (
          <Box
            borderRadius={1}
            mt={1}
            p={2}
            sx={{
              bgcolor: 'main_grey.gray700'
            }}
          >
            <EllipsisText height={48} ellipsisLine={2} cate='body_30' plainColor='main_primary.blue300'>
              “{mentor?.extraKeyword}”
            </EllipsisText>
          </Box>
        )}
      </Card>
    </Link>
  )
}

export default MentorOfTheMonthCard
