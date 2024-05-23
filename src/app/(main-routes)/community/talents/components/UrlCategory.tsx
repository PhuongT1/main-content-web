import Typography from '@/elements/typography'
import { Box, BoxProps, styled, useTheme } from '@mui/material'
import Link from 'next/link'

type UrlCategoryProps = {
  item: string
}

const UrlCategory = ({ item }: UrlCategoryProps) => {
  const theme = useTheme()

  return (
    <Link href={item} target='_blank' legacyBehavior>
      <Typography
        cate='caption_20'
        sx={{
          textDecoration: 'under',
          lineBreak: 'anywhere',
          cursor: 'pointer'
        }}
        color={theme.palette.main.primary_light}
      >
        {item}
      </Typography>
    </Link>
  )
}

export default UrlCategory
