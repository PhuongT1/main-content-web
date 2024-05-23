'use client'
import { ChevronRightIcon, LineDashesIcon } from '@/assets/icons'
import { Dialog, ExceedingAlert as RejectRegisterAlert } from '@/components'
import { DesignedPrimaryButton, Title, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { getMyMentorProfile } from '@/services/mentoring.service'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import ProfessionalSelectionDialog from '../professional-selection-dialog'
import RegisterGuideline from '../register-guideline'

const BeMentor = () => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('lg'))
  const { open: openSelection, onClose: onCloseSelection, onOpen: onOpenSelection } = useDialog()
  const { onOpen: onOpenRejectRegister, open: openRejectRegister, onClose: onCloseRejectRegister } = useDialog()

  const { data: myMentorProfile } = useQuery({
    queryKey: [`mentor-profile-info`],
    queryFn: getMyMentorProfile,
    retry: false
  })

  const onClickRegister = () => {
    const mentorRegistered = !myMentorProfile?.error?.message
    mentorRegistered ? onOpenRejectRegister() : onOpenSelection()
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      gap={3}
      flexDirection={{
        xl: 'row',
        xs: 'column'
      }}
    >
      <Box>
        <Title>멘토로 활동하기</Title>
        <Typography
          cate='title_70'
          plainColor='main_grey.gray100'
          mt={4}
          sx={{
            mt: {
              lg: 4,
              xs: 3
            }
          }}
        >
          오늘도 성장의 기회를 탐색하는
        </Typography>
        <Typography cate='title_70' breakpoints={{ lg: 'title_60' }} plainColor='main_grey.gray100'>
          00명의 멘티들에게 당신의 지식과 경험을 나눠주세요.
        </Typography>
        <Typography cate='title_50' breakpoints={{ lg: 'body_30' }} plainColor='main_grey.gray100' mt={1.5}>
          담당 매니저가 멘토 등록부터 멘토링 활동 참여까지 도움을 드립니다.
        </Typography>
        {/* Button for lg screen */}
        <DesignedPrimaryButton
          onClick={onClickRegister}
          btnSize='designed-lg'
          sx={{
            mt: '43px',
            display: {
              lg: 'flex',
              xs: 'none'
            }
          }}
        >
          <Typography cate={'button_40'} plainColor='main_grey.gray100'>
            멘토로 활동하기
          </Typography>
          <ChevronRightIcon
            svgProps={{
              width: 24,
              height: 24,
              viewBox: '0 0 24 28'
            }}
          />
        </DesignedPrimaryButton>
      </Box>
      <Box>
        <Box
          display={'flex'}
          position={'relative'}
          py={5}
          flexDirection={{
            lg: 'row',
            xs: 'column'
          }}
          gap={{
            lg: 1.5,
            xs: 2
          }}
          pr={{
            lg: 7.5,
            xs: 0
          }}
        >
          <Box
            zIndex={1}
            display={'flex'}
            alignItems={'center'}
            sx={{
              gap: 3,
              flexDirection: {
                lg: 'column',
                xs: 'row'
              }
            }}
          >
            <RegisterGuideline
              sx={{
                flexShrink: 0
              }}
            >
              <Typography cate='title_40' breakpoints={{ md: 'sub_title_30' }} plainColor='main_primary.blue500'>
                STEP 1
              </Typography>
              <Typography cate='title_60' breakpoints={{ md: 'title_40' }} plainColor='main_grey.gray100'>
                신청하기
              </Typography>
            </RegisterGuideline>
            <Box textAlign={{ lg: 'center', xs: 'left' }}>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                아래 ‘멘토풀 등록하기’ 버튼을
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                눌러 필요한 정보를
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                구체적으로 기재해 주세요.
              </Typography>
            </Box>
          </Box>
          <Box
            zIndex={1}
            display={'flex'}
            alignItems={'center'}
            sx={{
              gap: 3,
              flexDirection: {
                lg: 'column',
                xs: 'row'
              }
            }}
          >
            <RegisterGuideline
              sx={{
                flexShrink: 0
              }}
            >
              <Typography cate='title_40' breakpoints={{ md: 'sub_title_30' }} plainColor='main_primary.blue500'>
                STEP 2
              </Typography>
              <Typography cate='title_60' breakpoints={{ md: 'title_40' }} plainColor='main_grey.gray100'>
                승인 대기
              </Typography>
            </RegisterGuideline>
            <Box textAlign={{ lg: 'center', xs: 'left' }}>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                슘페터에서 신청서를 꼼꼼히
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                확인 후 영업일 기준 7일
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                이내에 연락을 드립니다.
              </Typography>
            </Box>
          </Box>
          <Box
            zIndex={1}
            display={'flex'}
            alignItems={'center'}
            sx={{
              gap: 3,
              flexDirection: {
                lg: 'column',
                xs: 'row'
              }
            }}
          >
            <RegisterGuideline
              sx={{
                flexShrink: 0
              }}
            >
              <Typography cate='title_40' breakpoints={{ md: 'sub_title_30' }} plainColor='main_primary.blue500'>
                STEP 3
              </Typography>
              <Typography cate='title_60' breakpoints={{ md: 'title_40' }} plainColor='main_grey.gray100'>
                활동 시작
              </Typography>
            </RegisterGuideline>
            <Box textAlign={{ lg: 'center', xs: 'left' }}>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                협의된 내용을 토대로 멘토링을
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                시작하거나 본격적인 활동을
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                시작합니다.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              left: {
                lg: 0,
                md: 85,
                xs: '54px'
              },
              top: {
                lg: '114px',
                xs: '40px'
              }
            }}
            position={'absolute'}
          >
            {mdMatches ? <LineDashesIcon cate={'vertical'} /> : <LineDashesIcon cate={'horizontal'} />}
          </Box>
        </Box>
        {/* Button for xs screen */}
        <DesignedPrimaryButton
          onClick={onClickRegister}
          fullWidth={mdMatches}
          btnSize='designed-lg'
          sx={{
            display: {
              lg: 'none',
              xs: 'flex'
            }
          }}
        >
          <Typography cate={'button_40'} plainColor='main_grey.gray100'>
            멘토로 활동하기
          </Typography>
          <ChevronRightIcon
            svgProps={{
              width: 24,
              height: 24,
              viewBox: '0 0 24 28'
            }}
          />
        </DesignedPrimaryButton>
      </Box>
      <Dialog
        mdFullScreen
        onClose={onCloseSelection}
        open={openSelection}
        PaperProps={{ sx: { maxWidth: 560, width: '100%' } }}
      >
        <ProfessionalSelectionDialog onClose={onCloseSelection} />
      </Dialog>
      <RejectRegisterAlert
        title='이미 멘토 권한이 있습니다.'
        description='멘토 권한이 없는 사용자만 멘토 신청을 할 수 있습니다.'
        onSubmit={() => {
          onCloseRejectRegister()
        }}
        open={openRejectRegister}
        submitTxt='확인'
      />
    </Box>
  )
}

export default BeMentor
