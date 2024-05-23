'use client'
import { getTeamBuildingServer } from '@/actions/apis/team-building.action'
import { ThreeDotIcon } from '@/assets/icons'
import EditIcon from '@/assets/icons/edit'
import { CardHorizontalSlide, PaginationList, RecruitmentCard } from '@/components'
import { TrashAlert } from '@/components/dialog'
import { BaseChip, Divider, ResponsiveBox, SecondaryButton, Typography } from '@/elements'
import { OutlineBlue300Button } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { getRecruitmentList, updateRecruitment } from '@/services/team-building.service'
import { IMember, Recruitment, TEAM_BUILDING_RECRUITMENT_STATUS } from '@/types/team-building.type'
import { IFile } from '@/types/user.type'
import { res2ui } from '@/utils/date'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type MyTeamProfileProps = {
  thumbnail: IFile
  slogan: string
  introduction: string
  members: IMember[]
  awardHistory: string[]
  activityImages?: IFile[]
}

const MyTeamProfile = ({
  thumbnail,
  slogan,
  introduction,
  members,
  awardHistory,
  activityImages
}: MyTeamProfileProps) => {
  const [limitAdward, setLimitAward] = useState(4)
  const [limitService, setLimitService] = useState(4)

  return (
    <>
      <Box>
        <ResponsiveBox display={'flex'} gap={5} breakpoints={{ md: { flexDirection: 'column', gap: 2 } }}>
          <ResponsiveBox height={148} width={148} breakpoints={{ md: { height: 120, width: 120 } }} flexShrink={0}>
            <Image
              height={148}
              width={148}
              style={{ borderRadius: 10, objectFit: 'cover', height: '100%', width: '100%' }}
              src={thumbnail.url}
              alt='logo_team'
            />
          </ResponsiveBox>
          <ResponsiveBox breakpoints={{ md: { mt: 1 } }}>
            <Typography cate='body_40' plainColor='main_grey.gray50'>
              {slogan}
            </Typography>
            <Typography mt={1} cate='body_20' plainColor='main_grey.gray300'>
              {introduction}
            </Typography>
            <ResponsiveBox mt={2} display={'flex'} gap={3} breakpoints={{ md: { flexDirection: 'column', gap: 3 } }}>
              <Box>
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  팀원현황
                </Typography>
                <Box mt={1} display={'flex'} gap={1} flexWrap={'wrap'}>
                  {members.map((i, idx) => (
                    <Box key={i.id}>
                      {idx <= limitService && (
                        <BaseChip
                          onClick={
                            idx === limitService
                              ? () => {
                                  setLimitService(members.length - 1)
                                }
                              : undefined
                          }
                          label={
                            idx === limitService && limitService !== members.length - 1 ? (
                              <ThreeDotIcon />
                            ) : (
                              `${i.name + ' ' + (i?.categories[0]?.name || '')}`
                            )
                          }
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  수상이력
                </Typography>
                <Box mt={1} display={'flex'} gap={1} flexWrap={'wrap'}>
                  {awardHistory.map((i, idx) => (
                    <Box key={idx}>
                      {idx <= limitAdward && (
                        <BaseChip
                          onClick={
                            idx === limitAdward
                              ? () => {
                                  setLimitAward(awardHistory.length - 1)
                                }
                              : undefined
                          }
                          label={idx === limitAdward && awardHistory.length - 1 !== limitAdward ? <ThreeDotIcon /> : i}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </ResponsiveBox>
          </ResponsiveBox>
        </ResponsiveBox>
      </Box>
      <Box sx={{ mt: { md: 7, xs: 3 } }}>
        <CardHorizontalSlide>
          {(activityImages || []).map((i) => (
            <Box height={200} key={i.id} width={264} flexShrink={0}>
              <Image
                height={200}
                width={264}
                style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
                src={i.url}
                alt='logo_team'
              />
            </Box>
          ))}
        </CardHorizontalSlide>
      </Box>
    </>
  )
}

type RecruitmentFieldProps = {
  i: Recruitment
  onSwitch: (checked: boolean) => void
  onDelete: () => void
  onUpdate: () => void
}

const RecruitmentField = ({ i, onSwitch, onDelete, onUpdate }: RecruitmentFieldProps) => {
  const { open, onClose, onOpen } = useDialog()
  const { EXPIRED, HIDED } = TEAM_BUILDING_RECRUITMENT_STATUS

  return (
    <>
      <RecruitmentCard
        status={i.status}
        recruitField={i.category.name || ''}
        onswitch={onSwitch}
        ondelete={() => {
          onOpen()
        }}
        onupdate={() => {
          onUpdate()
        }}
        disabled={[EXPIRED, HIDED].includes(i.status)}
        numberOfRecruits={i.numberOfRecruits}
        skills={i.skills}
        date={`${res2ui(i.fromDate)} ~ ${res2ui(i.toDate)}`}
        description={i.description}
        key={i.id}
      />
      <TrashAlert
        title='정말 삭제하시겠습니까?'
        onCancel={onClose}
        onSubmit={() => {
          onClose()
          onDelete()
        }}
        open={open}
        submitTxt='확인'
        cancelTxt='취소'
      />
    </>
  )
}

const TeamBuilding = () => {
  const [page, setPage] = useState(1)
  const theme = useTheme()
  const router = useRouter()

  const updateRecruitmentAct = useMutation({
    mutationFn: updateRecruitment,
    onSuccess: (data) => {
      if (data?.data?.id) {
        refetch()
      }
    }
  })

  const { data: teamData } = useQuery({
    queryKey: ['team-building'],
    queryFn: () => {
      return getTeamBuildingServer()
    }
  })

  const { data: recruitments, refetch } = useQuery({
    queryKey: ['recruitments', teamData?.data, page],
    queryFn: () => {
      if (teamData?.data.id) {
        return getRecruitmentList({ id: teamData?.data.id, params: { page, limit: 16 } })
      }
      return Promise.reject()
    }
  })

  const fetchNext = (page: number) => {
    setPage(page)
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography breakpoints={{ md: 'title_50' }} cate='title_70' plainColor='main_grey.gray100'>
          팀 프로필 관리
        </Typography>
        <ResponsiveBox height={56} breakpoints={{ md: { height: 40 } }}>
          <OutlineBlue300Button
            onClick={() => router.push('team-building/team-register')}
            btnSize='full'
            fullWidth
            sx={{
              py: 2.25,
              px: 3,
              alignItems: 'center',
              borderColor: 'main_primary.blue300',
              [theme.breakpoints.down('md')]: {
                px: 1.5,
                py: 2.25
              }
            }}
          >
            <Typography plainColor='main_grey.gray100' cate='button_30'>
              {teamData?.data?.id ? '팀 프로필 수정하기' : '팀 프로필 등록하기'}
            </Typography>
            <EditIcon />
          </OutlineBlue300Button>
        </ResponsiveBox>
      </Box>
      <Divider sx={{ mt: 2, mb: { md: 6, xs: 3 } }} />
      {teamData?.data ? (
        <MyTeamProfile {...teamData.data} />
      ) : (
        <ResponsiveBox
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={347}
          breakpoints={{ md: { height: 141 } }}
        >
          <Typography cate='body_40' plainColor='main_grey.gray400'>
            등록된 팀 프로필 정보가 없습니다.
          </Typography>
        </ResponsiveBox>
      )}
      <Box mt={6}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
            모집 공고
          </Typography>
          <ResponsiveBox height={56} breakpoints={{ md: { height: 40 } }}>
            <SecondaryButton
              disabled={!teamData?.data}
              onClick={() => router.push(`team-building/${teamData?.data.id}/recruitment`)}
              active
              btnSize='full'
              fullWidth
              sx={{
                py: 2.25,
                px: 3,
                alignItems: 'center',
                borderColor: 'main_primary.blue300',
                [theme.breakpoints.down('md')]: {
                  px: 1.5,
                  py: 2.25
                }
              }}
            >
              <Typography plainColor='main_grey.gray100' cate='button_30'>
                모집공고 등록하기
              </Typography>
              <EditIcon />
            </SecondaryButton>
          </ResponsiveBox>
        </Box>
        <Divider sx={{ mt: 2, mb: { md: 6, xs: 3 } }} />
        <PaginationList
          itemWidth={696}
          gap={24}
          isEmpty={!recruitments || recruitments?.data.result.length === 0}
          responsiveListProps={{ minBreakpoints: { md: [300, 10] } }}
          curPage={page}
          scrollTop={false}
          totalPage={recruitments?.data.metaData?.totalPages}
          onPageChange={fetchNext}
          emptyTxt='등록된 모집 공고가 없습니다.'
        >
          {(recruitments?.data.result || []).length > 0 &&
            recruitments?.data.result.map((i) => {
              const { HIDED, ACTIVE, REMOVED } = TEAM_BUILDING_RECRUITMENT_STATUS
              return (
                <>
                  <RecruitmentField
                    i={i}
                    onSwitch={(checked) =>
                      updateRecruitmentAct.mutateAsync({
                        id: teamData?.data.id || 0,
                        recruitId: i.id,
                        payload: { status: checked ? ACTIVE : HIDED }
                      })
                    }
                    onDelete={() =>
                      updateRecruitmentAct.mutateAsync({
                        id: teamData?.data.id || 0,
                        recruitId: i.id,
                        payload: { status: REMOVED }
                      })
                    }
                    onUpdate={() => {
                      router.push(`team-building/${teamData?.data.id}/recruitment/${i.id}`)
                    }}
                  />
                </>
              )
            })}
        </PaginationList>
      </Box>
    </Box>
  )
}

export default TeamBuilding
