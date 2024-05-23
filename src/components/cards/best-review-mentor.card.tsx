import { BaseImage, Divider, EllipsisText, Typography } from '@/elements'
import { TMentor } from '@/types/community/mentoring.type'
import { Box } from '@mui/material'
import Link from 'next/link'
import { Card } from '..'

type BestMentorCardProps = {
  mentor: TMentor
  bestReview: string
  reviewerName: string
}

const BestMentorCard = ({ mentor, bestReview, reviewerName }: BestMentorCardProps) => {
  const { avatar } = mentor?.user || {}
  const { nameOfAffiliation = '', username = '', id } = mentor || ({} as TMentor)

  return (
    <Link href={`expert-mentoring/${id}`}>
      <Card sx={{ p: 3 }}>
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Box height={80} width={80}>
              <BaseImage
                height={80}
                width={80}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '80px'
                }}
                src={avatar?.url}
                alt={`expert`}
              />
            </Box>
            <Box display={'flex'} gap={1} flexDirection={'column'}>
              <Typography cate='title_40' plainColor='sub.teal400'>
                {nameOfAffiliation}
              </Typography>
              <Box display={'flex'} gap={1}>
                <Typography cate='title_40' plainColor='main_grey.gray100'>
                  {username}
                </Typography>
                <Typography cate='title_40' plainColor='main_grey.gray100'>
                  멘토
                </Typography>
              </Box>
            </Box>
          </Box>
          <EllipsisText height={190} ellipsisLine={8} cate='body_30' plainColor='main_grey.gray100'>
            {bestReview}
          </EllipsisText>
          <Box display={'flex'} gap={1}>
            <Typography cate='caption_20' plainColor='main_grey.gray400'>
              작성자
            </Typography>
            <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500' }} />
            <Typography cate='caption_20' plainColor='main_grey.gray400'>
              {reviewerName}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  )
}

export default BestMentorCard
