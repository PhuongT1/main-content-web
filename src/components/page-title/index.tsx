import { ResponsiveBox } from '@/elements'
import Typography from '@/elements/typography'
import { RequireChildren } from '@/types/types.type'
import { SxProps } from '@mui/material'

type HeaderTitleProps = {
  subTitle?: string
  containerSx?: SxProps
} & RequireChildren

const PageTitle = ({ children, subTitle = '', containerSx }: HeaderTitleProps) => {
  return (
    <ResponsiveBox sx={{ ...containerSx }}>
      <Typography cate='large_title' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray50'>
        {children}
      </Typography>
      {subTitle && (
        <Typography mt={1.5} cate='body_2'>
          {subTitle}
        </Typography>
      )}
    </ResponsiveBox>
  )
}

export default PageTitle
