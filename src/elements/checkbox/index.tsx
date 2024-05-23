'use client'
import { CheckRoundIcon as CheckRoundIconFill } from '@/assets/icons'
import CheckIcon from '@/assets/icons/check'
import CheckFilledIcon from '@/assets/icons/check-filled'
import CheckRoundIcon from '@/assets/icons/check-round'
import Typography from '@/elements/typography'
import { Box, Checkbox as MCheckbox, useTheme } from '@mui/material'
import { CheckboxProps } from './checkbox.type'

const Checkbox = ({
  title,
  sx: customSx = {},
  rounded = false,
  type: customType = 'default',
  label,
  labelProps,
  ...rest
}: CheckboxProps) => {
  const theme = useTheme()
  let style = ''

  return (
    <Box display={'flex'} alignItems='center'>
      <MCheckbox
        className={style}
        checkedIcon={
          customType === 'borderless' ? (
            <CheckIcon svgProps={{ stroke: theme.palette.main.primary }} />
          ) : rounded ? (
            <CheckRoundIconFill />
          ) : (
            <CheckFilledIcon />
          )
        }
        icon={customType === 'borderless' ? <CheckIcon /> : rounded ? <CheckRoundIcon /> : undefined}
        sx={{
          color: theme.palette.main.gray40,
          borderRadius: rounded ? '250rem' : '0.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          lineHeight: '120%',
          fontFamily: 'Pretendard',
          padding: '0',
          ...customSx,
          width: 20,
          height: 20
        }}
        {...rest}
      />
      {!!label && (
        <Typography
          cate={'body_2'}
          onClick={(e: any) => {
            rest?.onChange?.(e, !rest.checked)
          }}
          color={theme.palette.main_grey.gray900}
          ml={2}
          {...labelProps}
        >
          {label}
        </Typography>
      )}
    </Box>
  )
}

export default Checkbox
