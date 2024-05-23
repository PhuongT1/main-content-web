import { DialogTitle } from '@/components'
import { MENTORING_COURSE_NAME } from '@/constants/community/mentoring.constant'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { BaseImage, Divider, PrimaryTextarea, SelectStack, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { TMentor } from '@/types/community/mentoring.type'
import { formatCurrency } from '@/utils/string'
import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

type RequestMentorDialogProps = {
  onClose: () => void
  onNavigate: (id: number, description: string) => void
  mentor: TMentor
  selectedCourseId?: number
}

const RequestMentorDialog = ({ onClose, onNavigate, mentor, selectedCourseId }: RequestMentorDialogProps) => {
  const [selectedCourse, setSelectedCourse] = useState<number>()
  const [request, setRequest] = useState('')

  const { avatar } = mentor.user || {}
  const {
    nameOfAffiliation = '',
    username = '',
    totalReviews = 0,
    totalApplications = 0,
    otherInformation = '',
    categories = [],
    productContents = []
  } = mentor

  const isDisableSendBtn = !request || !selectedCourse
  const productContentsOnSale = productContents.filter((i) => i.product.isSale)
  const courseList = productContentsOnSale.map((i) => {
    const courseName = MENTORING_COURSE_NAME.get(i.product.name as MENTOR_PRODUCT_TYPE) || ''
    const label = `${courseName} (${formatCurrency(i.product.price)})`
    return {
      label,
      value: i.id
    }
  })
  const coursePrice = productContents.find((i) => i.id === selectedCourse)?.product?.price || 0

  const onPayment = () => {
    if (selectedCourse) {
      onNavigate(selectedCourse, request)
    }
  }

  useEffect(() => {
    setSelectedCourse(selectedCourseId)
  }, [selectedCourseId])
  return (
    <>
      <DialogTitle>
        <Typography cate='title_70' plainColor='popup.general.title'>
          멘토링 요청하기
        </Typography>
      </DialogTitle>
      <Box mt={5}>
        <Box
          display={'flex'}
          gap={3}
          justifyContent={'space-between'}
          flexDirection={{
            md: 'row',
            xs: 'column-reverse'
          }}
        >
          <Stack gap={2}>
            <Box>
              <Typography cate='title_40' plainColor='popup.general.highlight.teal'>
                {nameOfAffiliation}
              </Typography>
              <Typography mt={0.5}>
                <Box display={'flex'} gap={1}>
                  <Typography cate='title_60' plainColor='popup.general.title'>
                    {username}
                  </Typography>
                  <Typography cate='title_60' plainColor='popup.general.title'>
                    멘토
                  </Typography>
                </Box>
              </Typography>
              <Box display={'flex'} gap={1} mt={0.5}>
                <Typography alignSelf={'center'} cate='sub_title_30' plainColor='popup.general.highlight.blue'>
                  {totalApplications}번의 멘토링
                </Typography>
                <Divider cate='vertical' sx={{ bgcolor: 'main_grey.gray500', my: 0.55 }} />
                <Typography alignSelf={'center'} cate='body_30' plainColor='popup.general.subtitle'>
                  {totalReviews}개의 후기
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography cate='sub_title_30' plainColor='popup.general.title'>
                소개
              </Typography>
              <Typography mt={0.5} cate='body_30' plainColor='popup.general.subtitle'>
                {otherInformation}
              </Typography>
            </Box>
            <Box>
              <Typography cate='sub_title_30' plainColor='popup.general.title'>
                전문분야
              </Typography>
              <Typography mt={0.5} cate='body_30' plainColor='popup.general.highlight.blue'>
                {categories.map((i) => i.name).join(', ')}
              </Typography>
            </Box>
          </Stack>
          <Box
            height={{
              md: 160,
              xs: 120
            }}
            width={{
              md: 160,
              xs: 120
            }}
            alignSelf={{
              md: 'flex-start',
              xs: 'center'
            }}
            flexShrink={0}
          >
            <BaseImage
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 99
              }}
              src={avatar?.url}
              alt={`mentoring-${0}`}
            />
          </Box>
        </Box>
        <SelectStack
          onChange={(e) => setSelectedCourse(e.target.value as number)}
          sx={{ mt: 3 }}
          value={selectedCourse}
          placeholder='멘토링 옵션을 선택해 주세요.'
          list={courseList}
        />
        <PrimaryTextarea
          maxLength={500}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder='요청 사항을 500자 이내로 입력해 주세요.'
          sx={{ width: '100%', mt: 2 }}
        />
        <Box mt={2} p={2} borderRadius={2} border={'1px solid'} borderColor={'popup.general.stroke_divider'}>
          <Typography cate='sub_title_30' plainColor='popup.general.title'>
            안내사항
          </Typography>
          <Typography mt={1} cate='body_20' plainColor='popup.general.subtitle'>
            해당 요청사항은 멘토에게 메일로 개인 연락처(이름, 연락처, 이메일)를 공개하여 연락이 됩니다.
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'popup.general.stroke_divider', mt: 5, mb: 3 }} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography cate='subtitle_1' plainColor='popup.general.title'>
          총 결제금액
        </Typography>
        <Typography cate='title_60' plainColor='popup.general.title'>
          {formatCurrency(coursePrice)}
        </Typography>
      </Box>
      <Box mt={3} display={'flex'} justifyContent={'flex-end'}>
        <Box
          display={'flex'}
          gap={1}
          width={{
            md: 'fit-content',
            xs: '100%'
          }}
        >
          <SecondaryGrayButton
            onClick={onClose}
            sx={{
              bgcolor: 'popup.button_neutral_bg',
              width: {
                md: 120,
                xs: '100%'
              },
              height: 44
            }}
          >
            <Typography cate='button_30' plainColor='main_grey.gray400'>
              취소
            </Typography>
          </SecondaryGrayButton>
          <DesignedPrimaryButton
            disabled={isDisableSendBtn}
            onClick={onPayment}
            sx={{
              width: {
                md: 120,
                xs: '100%'
              },
              height: 44
            }}
            btnSize={'designed-sm'}
          >
            결제하기
          </DesignedPrimaryButton>
        </Box>
      </Box>
    </>
  )
}

export default RequestMentorDialog
