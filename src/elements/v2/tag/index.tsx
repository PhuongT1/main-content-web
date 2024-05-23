import { Typography } from '@/elements'
import { RequireChildren } from '@/types/types.type'

type TagProps = {
  href?: string
}

const Tag = ({ children, href = '/' }: TagProps & RequireChildren) => {
  return (
    <Typography component={'a'} cate='body_3' plainColor='main_primary.blue300'>
      #{children}
    </Typography>
  )
}

export { Tag }
