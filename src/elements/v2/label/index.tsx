import { Typography } from '@/elements'
import { TypographyProps } from '@/elements/typography/typography.type'
import { RequireChildren } from '@/types/types.type'
import { ComponentProps } from 'react'

export type LabelProps = {
  ref?: any
  required?: boolean
} & ComponentProps<'label'> &
  TypographyProps

const Label = ({ children, required, cate, ...rest }: LabelProps) => {
  return (
    <Typography
      cate={cate || 'title_60'}
      plainColor='main_grey.gray100'
      breakpoints={{ md: 'title_50' }}
      component={'label'}
      {...rest}
    >
      {children}{' '}
      {required && (
        <Typography cate={cate || 'title_60'} component={'span'} plainColor='sub.red500'>
          *
        </Typography>
      )}
    </Typography>
  )
}

const Title = ({ children, ...rest }: RequireChildren & TypographyProps) => {
  return (
    <Typography cate='title_70' plainColor='main_grey.gray100' breakpoints={{ md: 'title_50' }} {...rest}>
      {children}
    </Typography>
  )
}

const BlackLabel = ({ ...rest }: LabelProps) => {
  return <Label cate='body_30' plainColor='main_grey.gray950' {...rest} />
}

const EmptyText = ({ children, ...rest }: RequireChildren & TypographyProps) => {
  return (
    <Typography cate='body_40' plainColor='main_grey.gray400' {...rest}>
      {children}
    </Typography>
  )
}

export type EllipsisTextProps = RequireChildren & TypographyProps & { ellipsisLine?: number | string }

const EllipsisText = ({ children, ellipsisLine = 1, sx, ...rest }: EllipsisTextProps) => {
  return (
    <Typography
      cate='body_40'
      plainColor='main_grey.gray400'
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: ellipsisLine,
        WebkitBoxOrient: 'vertical',
        ...sx
      }}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export { BlackLabel, EllipsisText, EmptyText, Label, Title }
