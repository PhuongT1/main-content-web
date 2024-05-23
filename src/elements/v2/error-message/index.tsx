import { Typography } from '@/elements'
import { TypographyProps } from '@/elements/typography/typography.type'
import { RequireChildren } from '@/types/types.type'

type ErrorMessageProps = {} & RequireChildren & TypographyProps

const ErrorMessage = ({ children, ...rest }: ErrorMessageProps) => {
  return (
    <Typography cate='caption_10' plainColor='sub.error_red' {...rest}>
      {children}
    </Typography>
  )
}

export { ErrorMessage }
