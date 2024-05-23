'use client'
import { ChevronLeftIcon } from '@/assets/icons'
import { Dialog, PageTitle } from '@/components'
import { Divider, Typography } from '@/elements'
import { SecondaryButton } from '@/elements/v2/button'
import { ProductDetailWrapper } from '@/hocs'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getMentor } from '@/services/mentoring.service'
import { TMentor } from '@/types/community/mentoring.type'
import { PageParams, SearchParams } from '@/types/types.type'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import MentorDetailLeft from '../_components/mentor-detail-left'
import MentorDetailRight from '../_components/mentor-detail-right'
import RequestMentorDialog from '../_components/request-mentor-dialog'

const ExpertMentorDetail = ({
  params: { id },
  searchParams
}: PageParams<{ id: string }> & { searchParams: SearchParams<{ courseId: string }> }) => {
  const router = useRouter()
  const { user } = useUserProfile()
  const searchParam = new URLSearchParams(useSearchParams())
  const theme = useTheme()
  const { open, onClose, onOpen } = useDialog()

  const { data: mentorData, refetch } = useQuery({
    queryKey: [`mentor-detail-${id}`],
    queryFn: getMentor.bind(null, +id)
  })

  const mentor = (mentorData as any)?.data || ({} as TMentor)
  const { isPossibleApply } = mentor
  const isMe = user?.uuid === (mentorData as any)?.data?.user.uuid
  const isDisabledButton = !isPossibleApply || isMe
  const selectedCourseId = searchParams?.courseId ? +searchParams.courseId : undefined

  const back = () => {
    router.back()
  }

  const onCloseDialog = () => {
    searchParam.delete('courseId')
    router.push(`?${searchParam}`, { scroll: false })
    onClose()
  }

  const onNavigate = (courseId: number, description: string) => {
    router.push(`${id}/payment/${courseId}?description=${description}`)
  }

  return (
    <Box>
      <PageTitle>전문가 멘토링</PageTitle>
      <SecondaryButton
        action={back}
        btnSize='sm'
        sx={{
          borderRadius: '99px !important',
          width: 121,
          mt: 6,
          display: {
            md: 'flex',
            xs: 'none'
          }
        }}
      >
        <ChevronLeftIcon
          svgProps={{ width: 16, height: 16 }}
          pathProps={{
            stroke: theme.palette.main_grey.gray200
          }}
        />
        <Typography plainColor='main_grey.gray200' cate='button_20'>
          이전으로
        </Typography>
      </SecondaryButton>
      <Divider
        sx={{
          my: 6,
          borderColor: 'main_grey.gray700',
          display: {
            md: 'block',
            xs: 'none'
          }
        }}
      />
      <Box
        display={'flex'}
        mt={{
          md: 0,
          xs: 3
        }}
        gap={3}
        flexDirection={{
          lg: 'row',
          xs: 'column-reverse'
        }}
      >
        <Box flexGrow={1} display={'flex'} flexDirection={'column'} gap={2}>
          <MentorDetailLeft {...{ onOpen, id, mentor, isDisabledButton }} />
        </Box>
        <Box
          flexShrink={0}
          width={{
            lg: 336,
            xs: '100%'
          }}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
        >
          <MentorDetailRight refetch={() => refetch()} {...{ onOpen, id, mentor, isDisabledButton }} />
        </Box>
      </Box>
      <Dialog mdFullScreen onClose={onCloseDialog} open={open} PaperProps={{ sx: { maxWidth: 560 } }}>
        <RequestMentorDialog onClose={onCloseDialog} {...{ onNavigate, mentor, selectedCourseId }} />
      </Dialog>
    </Box>
  )
}

export default ProductDetailWrapper({ component: ExpertMentorDetail })
