import { Box, BoxProps } from '@mui/material'

type TSvgIconProps = {
  svg?: TrustedHTML | string
} & BoxProps
function SvgIcon({ svg, ...rest }: TSvgIconProps) {
  return (
    <Box
      component={'div'}
      flexShrink={0}
      display={'inline-flex'}
      alignItems={'center'}
      {...rest}
      dangerouslySetInnerHTML={{ __html: svg as TrustedHTML }}
    ></Box>
  )
}

export default SvgIcon
