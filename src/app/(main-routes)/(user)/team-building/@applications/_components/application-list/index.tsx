import { getTeamApplications, getTeamBuildingServer } from '@/actions/apis/team-building.action'
import { BlankUser } from '@/assets/images'
import { PaginationList, TalentPoolCard } from '@/components'
import { createFormData } from '@/utils/object'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'

let showData
const PATH = `/team-building`
export const revalidate = 0

type ApplicationListProps = {
  page?: string
}
const ApplicationList = async ({ page }: ApplicationListProps) => {
  const fetchNext = async () => {
    'use server'
    const newPage = page && +page ? +page + 1 : 1
    redirect(`${PATH}?page=${newPage}`)
  }

  const teambuilding = await getTeamBuildingServer()

  const fetchPage = page && +page ? +page : 1
  const getStampsFD = createFormData({
    page: fetchPage,
    limit: 16,
    teambuildingId: teambuilding?.data?.id
  })

  const data = await getTeamApplications(getStampsFD)
  const { data: { metaData, result = [] } = {} } = data
  showData = result

  return (
    <Box height={'100%'} width={'100%'}>
      <PaginationList
        itemWidth={696}
        gap={24}
        isEmpty={!showData || showData.length <= 0}
        responsiveListProps={{ minBreakpoints: { md: [292, 24] } }}
        curPage={fetchPage}
        totalPage={metaData?.totalPages}
        onPageChange={fetchNext}
        emptyTxt='현재 신청자가 없습니다.'
      >
        {showData.map((i, idx) => (
          <TalentPoolCard
            profileImage={i.userContact?.avatar?.url || BlankUser.src}
            name={i.userContact.nickname}
            totalExperiences={i.talentPool?.yearsOfExperience || '신입'}
            skillsAndCertificate={i.talentPool?.skills || []}
            applicationField={i.teamBuildingRecruit.category.name}
            introduction={i.talentPool?.title || ''}
            key={idx}
          />
        ))}
      </PaginationList>
    </Box>
  )
}

export default ApplicationList
