import { SvgComponentProps } from '@/types/types.type'

const LineDashesIcon = ({
  svgProps,
  pathProps,
  cate = 'horizontal'
}: SvgComponentProps & { cate?: 'vertical' | 'horizontal' }) => {
  return (
    <>
      {cate === 'vertical' ? (
        <svg xmlns='http://www.w3.org/2000/svg' width='2' height='362' viewBox='0 0 2 362' fill='none'>
          <path d='M1 362L1 -2.86102e-06' stroke='#2D68FE' stroke-dasharray='2 2' />
        </svg>
      ) : (
        <svg width='453' height='1' viewBox='0 0 453 1' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
          <path d='M0.5 0.5H452.5' stroke='#2D68FE' stroke-dasharray='2 2' {...pathProps} />
        </svg>
      )}
    </>
  )
}

export default LineDashesIcon
