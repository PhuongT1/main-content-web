import DownloadIcon from '@/assets/icons/download'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Chip, ChipProps, GridProps, styled, useTheme } from '@mui/material'

type FileTagCustom = GridProps & {
  title?: string
  onClick?: any
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

const FileTag = ({ title, onClick }: FileTagCustom) => {
  const theme = useTheme()
  return (
    <Tag
      sx={{ cursor: 'pointer' }}
      label={
        <Box display='flex' alignItems={'center'} onClick={onClick}>
          <Typography cate='caption_1_semibold' color={theme.palette.main_grey.gray300} mr={1}>
            {title}
          </Typography>
          <DownloadIcon />
        </Box>
      }
    />
  )
}
export default FileTag
