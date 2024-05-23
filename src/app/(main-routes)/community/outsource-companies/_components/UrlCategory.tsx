import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Grid, styled, useTheme } from '@mui/material'
import Link from 'next/link'

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

type UrlCategoryProps = {
  item?: string
}

const UrlCategory = ({ item }: UrlCategoryProps) => {
  const theme = useTheme()

  return (
    <Section>
      <Typography cate='body_2' width={convertToRem(100)} flexShrink={0}>
        포트폴리오
      </Typography>
      <Grid gap={1} ml={2} display='flex' flexWrap={'wrap'}>
        <Link href={'www.asdfasdgfdadg.com'}>
          <Typography
            cate='body_2'
            sx={{ textDecoration: 'underline', lineBreak: 'anywhere' }}
            color={theme.palette.main.primary_light}
          >
            www.asdfasdgfdadg.com
          </Typography>
        </Link>
      </Grid>
    </Section>
  )
}

export default UrlCategory
