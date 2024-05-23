import Button from '@/elements/button'
import Typography from '@/elements/typography'
import { getTextStyles } from '@/themes/get-design-tokens'
import { ICategory } from '@/types/category.type'
import { Box, BoxProps, Chip, styled, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { MouseEvent } from 'react'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main_grey.gray700,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

type RecruitmentItemProps = {
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void
  category: ICategory
  skills?: string[]
  description?: string
  fromDate?: Date
  toDate?: Date
  numberOfRecruits: number
  isOwner?: boolean
}

const RecruitmentItem = ({
  onClick,
  category,
  skills,
  description,
  fromDate,
  toDate,
  numberOfRecruits,
  isOwner
}: RecruitmentItemProps) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  return (
    <Section>
      <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'column'}
          width={'100%'}
          gap={2}
        >
          <Box
            display={'flex'}
            alignItems={mdUp ? 'center' : 'flex-start'}
            width={'100%'}
            flexDirection={mdUp ? 'row' : 'column'}
            gap={mdUp ? 0 : 1}
          >
            <Typography cate='caption_1_semibold' flexShrink={0} color={theme.palette.main.gray10}>
              {category?.name || ''}
            </Typography>
            <Box display={'flex'} gap={1} flexShrink={0} width={'100%'} ml={mdUp ? 1.5 : 0} flexWrap={'wrap'}>
              {skills?.map((i: string, index: number) => (
                <Chip
                  key={index}
                  label={i}
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.palette.main_primary.blue300,
                    padding: '0.5rem 1rem',
                    border: '1px solid ' + theme.palette.main_primary.blue300,
                    background: 'transparent',
                    borderRadius: '250rem',
                    '.MuiChip-label': {
                      padding: 0
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          <Typography
            cate='caption_1'
            color={theme.palette.main.gray30}
            sx={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {description}
          </Typography>
          <Box
            display={'flex'}
            alignItems={mdUp ? 'center' : 'flex-start'}
            justifyContent={mdUp ? 'space-between' : 'flex-start'}
            width='100%'
            flexDirection={mdUp ? 'row' : 'column'}
          >
            <Typography cate='body_20' color={theme.palette.main_grey.gray100}>
              {moment(fromDate).format('YYYY.MM.DD')} - {moment(fromDate).format('YYYY.MM.DD')} / {numberOfRecruits}명
              모집
            </Typography>
            <Button
              cate='primary'
              customType={'active'}
              rounded={true}
              onClick={onClick}
              disabled={isOwner}
              sx={{
                flexShrink: 0,
                ...getTextStyles(14, 125, 600, 0),
                padding: '9px 24px',
                width: mdUp ? 'auto' : '100%',
                height: 'auto',
                mt: mdUp ? 0 : 2
              }}
              title='참여요청'
            />
          </Box>
        </Box>
      </Box>
    </Section>
  )
}

export default RecruitmentItem
