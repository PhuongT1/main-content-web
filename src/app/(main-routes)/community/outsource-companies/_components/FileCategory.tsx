import Typography from '@/elements/typography'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled, useTheme } from '@mui/material'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  display: 'flex',
  fieldset: {
    border: 0
  }
}))

type FileCategoryProps = {
  item?: IFile
}

const FileCategory = ({ item }: FileCategoryProps) => {
  const theme = useTheme()

  return (
    <Section>
      <Typography cate='body_2' width={convertToRem(100)} sx={{ flexShrink: 0 }}>
        기업소개서
      </Typography>
      <Typography cate='body_2' sx={{ lineBreak: 'anywhere' }} ml={2}>
        코드블라썸 기업 소개서.pdf
      </Typography>
    </Section>
  )
}

export default FileCategory
