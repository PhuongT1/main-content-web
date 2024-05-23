import {
  GhostBorderButton,
  OutlineBlue300Chip,
  PrimaryButton,
  PrimarySwitch,
  ResponsiveBox,
  Typography
} from '@/elements'
import { TEAM_BUILDING_RECRUITMENT_STATUS } from '@/types/team-building.type'
import { Box } from '@mui/material'

type RecruitmentCardProps = {
  disabled?: boolean
  recruitField: string
  skills: string[]
  description: string
  date: string
  numberOfRecruits: number
  status: TEAM_BUILDING_RECRUITMENT_STATUS
  onswitch: (checked: boolean) => void
  ondelete: () => void
  onupdate: () => void
}

const RecruitmentCard = ({
  disabled,
  skills,
  description,
  date,
  numberOfRecruits,
  onswitch,
  ondelete,
  onupdate,
  recruitField
}: RecruitmentCardProps) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      p={3}
      gap={2}
      borderRadius={4}
      bgcolor={'main_grey.gray800'}
      position={'relative'}
    >
      {disabled && (
        <Box
          borderRadius={4}
          position={'absolute'}
          top={0}
          bottom={0}
          right={0}
          left={0}
          bgcolor={'rgba(31, 31, 41, 0.7)'}
        />
      )}
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <ResponsiveBox
          alignItems={'center'}
          display={'flex'}
          gap={1.5}
          breakpoints={{
            md: {
              flexDirection: 'column',
              gap: 2,
              alignItems: 'flex-start'
            }
          }}
        >
          <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
            {recruitField}
          </Typography>
          <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {skills.map((i) => (
              <OutlineBlue300Chip key={i} label={i} />
            ))}
          </Box>
        </ResponsiveBox>
        <ResponsiveBox breakpoints={{ md: { height: '100%' } }}>
          <PrimarySwitch
            checked={!disabled}
            action={(_, checked) => {
              onswitch(checked)
            }}
          />
        </ResponsiveBox>
      </Box>
      <Typography cate='body_30' plainColor='main_grey.gray300'>
        {description}
      </Typography>
      <ResponsiveBox
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        breakpoints={{
          md: {
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start'
          }
        }}
      >
        <Typography cate='body_20' plainColor='main_grey.gray100'>
          {date} / {numberOfRecruits}명 모집
        </Typography>
        <ResponsiveBox
          display={'flex'}
          gap={1}
          breakpoints={{
            md: {
              width: '100%'
            }
          }}
        >
          <ResponsiveBox height={36} breakpoints={{ md: { width: '100%' } }}>
            <PrimaryButton
              onClick={onupdate}
              sx={{ borderRadius: '1000px !important', py: '9px', px: 3 }}
              fullWidth
              btnSize='full'
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                수정하기
              </Typography>
            </PrimaryButton>
          </ResponsiveBox>
          <ResponsiveBox height={36} breakpoints={{ md: { width: '100%' } }}>
            <GhostBorderButton
              onClick={ondelete}
              sx={{ borderRadius: '1000px !important', py: '9px', px: 3 }}
              fullWidth
              btnSize='full'
            >
              <Typography cate='button_20' plainColor='main_grey.gray200'>
                삭제하기
              </Typography>
            </GhostBorderButton>
          </ResponsiveBox>
        </ResponsiveBox>
      </ResponsiveBox>
    </Box>
  )
}

export default RecruitmentCard
