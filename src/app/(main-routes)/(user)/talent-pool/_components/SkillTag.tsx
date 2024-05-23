import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Chip, ChipProps, GridProps, IconButton, styled, useTheme } from '@mui/material'

type SkillTagCustom = GridProps & {
  title?: string
  onDelete?: any
}

const Tag = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '0.8rem 1.5rem',
  border: '1px solid ' + theme.palette.main_grey.gray500,
  color: theme.palette.main_grey.gray300,
  borderRadius: convertToRem(250),
  height: 'auto',
  fontSize: convertToRem(12),
  '.MuiChip-label': {
    padding: 0
  },
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main_grey.gray700
  }
}))

const SkillTag = ({ title, onDelete }: SkillTagCustom) => {
  const theme = useTheme()
  return (
    <Box position={'relative'}>
      <Tag
        label={
          <Box display='flex' alignItems={'center'} position='relative'>
            <Typography cate='caption_1_semibold' color={theme.palette.main_grey.gray300} textAlign={'center'}>
              {title}
            </Typography>
          </Box>
        }
      />
      <IconButton
        onClick={() => {
          onDelete?.()
        }}
        sx={{
          padding: 0,
          position: 'absolute',
          top: -3,
          right: -2,
          backgroundColor: theme.palette.main_grey.gray800
        }}
      >
        <CloseCircleSmIcon />
      </IconButton>
    </Box>
  )
}
export default SkillTag
