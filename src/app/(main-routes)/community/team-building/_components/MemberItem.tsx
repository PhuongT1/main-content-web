import Typography from '@/elements/typography'
import { ICategory } from '@/types/category.type'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

type MemberItemProps = {
  avatar: IFile
  name: string
  categories: ICategory[]
  introduction: string
}

const MemberItem = ({ avatar, name, categories, introduction }: MemberItemProps) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')

  return (
    <Section
      display={'flex'}
      sx={{
        width: mdUp ? convertToRem(236) : '100%'
      }}
      flexWrap={'nowrap'}
      gap={convertToRem(20)}
    >
      <Avatar
        sx={{
          width: convertToRem(64),
          height: convertToRem(64),
          flexShrink: 0
        }}
        src={avatar?.url ? avatar.url : '/images/blank-user.png'}
      />
      <Box display={'flex'} flexDirection={'column'} rowGap={0.5}>
        <Typography
          cate='title_40'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
          color={theme.palette.main_grey.gray100}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
          cate='body_20'
          color={theme.palette.sub.teal400}
        >
          {introduction}
        </Typography>
        <Typography
          cate='body_20'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
          color={theme.palette.main_grey.gray100}
        >
          {categories?.map((i: ICategory) => i.name)?.join(', ') || ''}
        </Typography>
      </Box>
    </Section>
  )
}

export default MemberItem
