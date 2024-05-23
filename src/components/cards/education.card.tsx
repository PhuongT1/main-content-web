import { Stack, SxProps } from '@mui/material'
import { RoundedSolidIconButton, SecondaryActiveChip, Typography } from '@/elements'
import CardBox from '@/components/cards/card-box'
import { IEducation, SchoolForm } from '@/types/pool.type'
import moment from 'moment'
import { convertToRem } from '@/utils/styles'
import TrashIcon from '@/assets/icons/trash'

type EducationCardProps = {
  education: SchoolForm | IEducation
  onDelete?: () => void
  sx?: SxProps
}

const EducationCard = ({ education, onDelete, sx }: EducationCardProps) => {
  return (
    <CardBox gap={2} sx={{ ...sx }}>
      <Stack justifyContent={{ md: 'space-between', sm: 'flex-start' }} direction={{ md: 'row', sm: 'column' }} gap={1}>
        <Typography cate='button_40'>
          {education.schoolName} · {education.majors}
        </Typography>
        <Stack direction={'row'} gap={1}>
          <SecondaryActiveChip
            label={
              <Typography cate='caption_20' plainColor='sub.teal600'>
                {education.schoolType}
              </Typography>
            }
            padding={false}
            sx={{
              width: 'fit-content',
              paddingX: convertToRem(12),
              borderColor: 'sub.teal600',
              borderRadius: '1000px'
            }}
          />
          <SecondaryActiveChip
            label={
              <Typography cate='caption_20' plainColor='sub.orange600'>
                {education.graduationType}
              </Typography>
            }
            padding={false}
            sx={{
              width: 'fit-content',
              paddingX: convertToRem(12),
              bgcolor: '#241915',
              borderColor: 'sub.orange600',
              borderRadius: '1000px'
            }}
          />
        </Stack>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography cate='body_30'>
          {moment(education.startDateAt).format('YYYY.MM')} -{' '}
          {education.isCurrentlyStudying ? '재학중' : moment(education.endDateAt).format('YYYY.MM')} (
          {moment(education.endDateAt).diff(education.startDateAt, 'year')}년)
        </Typography>
        {onDelete ? (
          <RoundedSolidIconButton
            sx={{
              padding: 0.5
            }}
            onClick={() => onDelete?.()}
          >
            <TrashIcon pathProps={{ stroke: '#9F9EA4' }} />
          </RoundedSolidIconButton>
        ) : null}
      </Stack>
    </CardBox>
  )
}

export default EducationCard
