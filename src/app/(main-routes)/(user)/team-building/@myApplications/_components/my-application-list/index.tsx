import { deleteMyApplication, getMyApplications } from '@/actions/apis/team-building.action'
import { MyApplicationCard, PaginationList } from '@/components'
import { createFormData } from '@/utils/object'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'

const PATH = `/team-building`
export const revalidate = 0

type MyApplicationListProps = {
  page?: string
}

const MyApplicationList = async ({ page }: MyApplicationListProps) => {
  const fetchNext = async (page: number) => {
    'use server'
    redirect(`${PATH}?page=${page}`)
  }

  const ondelete = async (teambuildingId: number, recruitId: number, applicationId: number) => {
    'use server'
    const getMyApplcationsFD = createFormData({
      teambuildingId,
      recruitId,
      applicationId
    })
    await deleteMyApplication(getMyApplcationsFD)
  }

  const fetchPage = page && +page ? +page : 1
  const getMyApplcationsFD = createFormData({
    page: fetchPage,
    limit: 16
  })

  const data = await getMyApplications(getMyApplcationsFD)
  const { data: { metaData, result = [] } = {} } = data
  const showData = result || []

  return (
    <Box>
      <PaginationList
        itemWidth={696}
        gap={24}
        isEmpty={!showData || showData.length <= 0}
        responsiveListProps={{ minBreakpoints: { md: [292, 24] } }}
        curPage={fetchPage}
        totalPage={metaData?.totalPages}
        onPageChange={fetchNext}
        emptyTxt='신청한 모집 공고가 없습니다.'
      >
        {(showData || []).map((i, idx) => {
          const { teamBuildingRecruit, teamBuilding } = i
          const deleteItem = async () => {
            'use server'
            return ondelete(i.teamBuildingId, i.teamBuildingRecruitId, i.id)
          }
          return (
            <MyApplicationCard
              ondelete={deleteItem}
              teamThumbnail={teamBuilding?.thumbnail?.url || ''}
              teamIntroduction={teamBuilding.introduction}
              teamSlogan={teamBuilding.slogan}
              recruitDescription={teamBuildingRecruit.description}
              recruitNumber={teamBuildingRecruit.numberOfRecruits}
              recruitRole={teamBuildingRecruit.category.name}
              recruitSkills={teamBuildingRecruit.skills}
              fromDate={teamBuildingRecruit.fromDate}
              toDate={teamBuildingRecruit.toDate}
              showIsHiring={!(teamBuildingRecruit.totalApplications >= teamBuildingRecruit.numberOfRecruits)}
              key={idx}
            />
          )
        })}
      </PaginationList>
    </Box>
  )
}

export default MyApplicationList
