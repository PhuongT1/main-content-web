'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { BookMarkIcon } from '@/assets/icons'
import ShareSmIcon from '@/assets/icons/share-sm'
import { Card } from '@/components'
import DownloadCard from '@/components/cards/download.card'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { RES_MESSAGE } from '@/constants/common.constant'
import { EVENT_APPLICATION_TYPE, EVENT_STATUS_RECRUITMENT } from '@/constants/community/educational-event.constant'
import { BaseImage, Divider, Typography } from '@/elements'
import { DesignedPrimaryButton, RoundedButton } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { getActiveEducationalEventDetail } from '@/services/educational-event.service'
import { PageParams, ResponseMessage } from '@/types/types.type'
import { res2ui } from '@/utils/date'
import getCurrentUrl from '@/utils/get-current-url'
import { formatCurrency } from '@/utils/string'
import { isNumber } from '@/utils/types'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import EventSideList from '../../_components/event-side-list'

const EducationalEventDetail = ({ params: { id } }: PageParams<{ id: string }>) => {
  const router = useRouter()
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const { open, onClose, onOpen } = useDialog()

  const { data: event, refetch } = useQuery({
    queryKey: [`event-detail`, id],
    queryFn: () => {
      return getActiveEducationalEventDetail(+id)
    }
  })
  const isApplied = event?.data?.applicationType === EVENT_APPLICATION_TYPE.APPLICANT
  const isDisabledApplyBtn = isApplied || event?.data?.statusRecruitment === EVENT_STATUS_RECRUITMENT.FINISH

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async (data: ResponseMessage) => {
      if (data.data.data.message === RES_MESSAGE.SUCCESS) {
        await refetch()
      }
    }
  })

  const bookmark = (id?: number) => {
    if (id) {
      bookmarkAct.mutate({
        type: BOOKMARK_TYPE.EVENT,
        id
      })
    }
  }

  const navigateToPayment = async () => {
    router.push(`/community/educational-event-and-support-project/educational-event-list/${id}/payment`)
  }

  useEffect(() => {
    if (!isNumber(id)) {
      router.push(`/community/educational-event-and-support-project/educational-event-list`)
    }
  }, [id])

  const WebEventDetail = () => {
    return (
      <Card>
        <Box display={'flex'} gap={3} justifyContent={'space-between'} alignItems={'center'}>
          <Box>
            <Typography cate='body_30' plainColor='sub.teal400'>
              {event?.data?.category?.name}
            </Typography>
            <Typography mt={1} cate='title_60' plainColor='main_grey.gray100'>
              {event?.data?.title}
            </Typography>
          </Box>
          <Box display={'flex'} gap={1}>
            <Box width={121}>
              <RoundedButton onClick={onOpen} fullWidth sx={{ mt: 2 }}>
                <ShareSmIcon />
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  공유하기
                </Typography>
              </RoundedButton>
            </Box>
            <Box width={121}>
              <RoundedButton onClick={() => bookmark(event?.data?.id)} fullWidth sx={{ mt: 2 }}>
                <BookMarkIcon
                  pathProps={{
                    ...(event?.data?.isBookmark && {
                      fill: theme.palette.main_primary.blue500,
                      stroke: theme.palette.main_primary.blue500
                    })
                  }}
                />
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  북마크
                </Typography>
              </RoundedButton>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 3, bgcolor: 'main_grey.gray700' }} />
        <Box my={7.5} display={'flex'} justifyContent={'center'}>
          <Box maxWidth={480} maxHeight={669}>
            <BaseImage
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8
              }}
              src={event?.data?.thumbnail.baseUrl || ''}
              alt={`educational-event-${0}`}
            />
          </Box>
        </Box>
        <Box>
          <Typography cate='body_30' plainColor='main_grey.gray300'>
            접수기간 : {res2ui(event?.data?.startTimeRegistration || '')} ~{' '}
            {res2ui(event?.data?.endTimeRegistration || '')} 20시까지
          </Typography>
          <Typography cate='body_30' plainColor='main_grey.gray300'>
            행사기간 : {res2ui(event?.data?.startTime || '')} ~ {res2ui(event?.data?.endTime || '')} 20시까지
          </Typography>
          <Box component={'br'} />
          <Typography component={'div'} cate='body_30' plainColor='main_grey.gray300'>
            <Box dangerouslySetInnerHTML={{ __html: event?.data?.content || '' }} />
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography cate='title_50' plainColor='main_primary.blue300'>
            가격: {formatCurrency(event?.data?.price || 0)}
          </Typography>
        </Box>
      </Card>
    )
  }

  const MobileEventDetail = () => {
    return (
      <Card
        sx={{
          px: 2,
          pt: 2,
          pb: {
            md: 2,
            xs: 3
          }
        }}
      >
        <Box>
          <Box maxWidth={480} maxHeight={669}>
            <BaseImage
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8
              }}
              src={event?.data?.thumbnail.baseUrl || ''}
              alt={`educational-event-${0}`}
            />
          </Box>
        </Box>
        <Box display={'flex'} gap={2} my={4} flexDirection={'column'}>
          <Box>
            <Typography cate='body_30' plainColor='sub.teal400'>
              {event?.data?.category?.name}
            </Typography>
            <Typography mt={1} cate='title_60' plainColor='main_grey.gray100'>
              {event?.data?.title}
            </Typography>
          </Box>
          <Box display={'flex'} gap={1} justifyContent={'flex-end'}>
            <Box width={121}>
              <RoundedButton onClick={onOpen} fullWidth>
                <ShareSmIcon />
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  공유하기
                </Typography>
              </RoundedButton>
            </Box>
            <Box width={121}>
              <RoundedButton onClick={() => bookmark(event?.data?.id)} fullWidth>
                <BookMarkIcon
                  pathProps={{
                    ...(event?.data?.isBookmark && {
                      fill: theme.palette.main_primary.blue500,
                      stroke: theme.palette.main_primary.blue500
                    })
                  }}
                />
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  북마크
                </Typography>
              </RoundedButton>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 3, mb: 4, bgcolor: 'main_grey.gray700' }} />
        <Box>
          <Typography cate='body_30' plainColor='main_grey.gray300'>
            접수기간 : {res2ui(event?.data?.startTimeRegistration || '')} ~{' '}
            {res2ui(event?.data?.endTimeRegistration || '')} 20시까지
          </Typography>
          <Typography cate='body_30' plainColor='main_grey.gray300'>
            행사기간 : {res2ui(event?.data?.startTime || '')} ~ {res2ui(event?.data?.endTime || '')} 20시까지
          </Typography>
          <Box component={'br'} />
          <Typography component={'div'} cate='body_30' plainColor='main_grey.gray300'>
            <Box dangerouslySetInnerHTML={{ __html: event?.data?.content || '' }} />
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography cate='title_50' plainColor='main_primary.blue300'>
            가격: {formatCurrency(event?.data?.price || 0)}
          </Typography>
        </Box>
      </Card>
    )
  }

  return (
    <Box
      display={'flex'}
      gap={4}
      flex={'1 80%'}
      sx={{
        mt: {
          md: 0,
          xs: 4
        },
        flexDirection: {
          xl: 'row',
          xs: 'column'
        }
      }}
    >
      <Box flexGrow={1}>
        <Box>
          {mdMatches ? <MobileEventDetail /> : <WebEventDetail />}
          <Box
            mt={2}
            display={'flex'}
            justifyContent={'space-between'}
            sx={{
              flexDirection: {
                md: 'row',
                xs: 'column'
              },
              gap: {
                md: 4,
                xs: 1
              },
              mb: {
                md: 2,
                xs: 1
              }
            }}
          >
            <Box
              display={'flex'}
              sx={{
                gap: {
                  md: 2,
                  xs: 1
                }
              }}
              flexWrap={'wrap'}
            >
              {event?.data?.attachments.map((i) => (
                <DownloadCard
                  sx={{
                    width: {
                      md: 'fit-content',
                      xs: '100%'
                    }
                  }}
                  key={i.id}
                  name={i.name}
                  url={i.baseUrl || ''}
                  size={i.fileSize || 0}
                />
              ))}
            </Box>
            <DesignedPrimaryButton
              disabled={isApplied || isDisabledApplyBtn}
              sx={{
                width: {
                  md: 160,
                  xs: '100%'
                }
              }}
              onClick={navigateToPayment}
              btnSize='designed-md'
            >
              {isApplied ? '신청완료' : '신청하기'}
            </DesignedPrimaryButton>
          </Box>
        </Box>
      </Box>
      <Box
        flexShrink={0}
        sx={{
          minWidth: {
            xl: 366,
            xs: '100%'
          }
        }}
      >
        <EventSideList id={+id} />
      </Box>
      {/* Popup */}
      <SharePopup open={open} onCancel={onClose} url={getCurrentUrl()} />
    </Box>
  )
}

export default EducationalEventDetail
