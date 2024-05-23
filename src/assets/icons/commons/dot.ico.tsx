import { SvgComponentProps } from '@/types/types.type'
import { Box } from '@mui/material'

const DotIcon = ({ svgProps, rectProps, pathProps, circleProps }: SvgComponentProps) => {
  return (
    <svg width='3' height='3' viewBox='0 0 3 3' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <circle cx='1.5' cy='1.5' r='1.5' transform='rotate(90 1.5 1.5)' fill='#F7F8FA' {...circleProps} />
    </svg>
  )
}

const ThreeDotIcon = ({ svgProps, circleProps }: SvgComponentProps) => {
  return (
    <Box display={'flex '} gap={0.2}>
      {[1, 2, 3].map((i) => (
        <svg
          key={i}
          width='3'
          height='3'
          viewBox='0 0 3 3'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...svgProps}
        >
          <circle cx='1.5' cy='1.5' r='1.5' transform='rotate(90 1.5 1.5)' fill='#F7F8FA' {...circleProps} />
        </svg>
      ))}
    </Box>
  )
}
export { DotIcon, ThreeDotIcon }
