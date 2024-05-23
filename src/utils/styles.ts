import { BORDER_VALUE } from '@/constants/common.constant'
import { BorderStyles } from '@/types/types.type'
import { removeFalsy } from './array'

export const getBorderStyles = (borderStyle: BorderStyles) => {
  return BORDER_VALUE.get(borderStyle)
}

export const cx = (...classNames: string[]) => removeFalsy(classNames).join(' ')

export const convertToRem = (value: any) => {
  if (value && !isNaN(value)) {
    return value / 16 + 'rem'
  }
  return value
}

export const optionTruncateOneLine = () => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}

export const optionsTruncate = (line: number = 1) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical'
  }
}

type TOptionAutoFillItems = { minWidth?: number; maxColumn?: number; mediaQuery?: number; gap?: number }
export const optionAutoFillItems = ({
  minWidth = 208,
  maxColumn = 4,
  mediaQuery = 1600,
  gap = 20
}: TOptionAutoFillItems) => {
  return {
    display: 'grid',
    gap: convertToRem(gap),
    padding: convertToRem(2),
    gridTemplateColumns: `repeat(auto-fill, minmax(${convertToRem(minWidth)}, 1fr))`,
    [`@media only screen and (min-width: ${mediaQuery}px)`]: {
      gridTemplateColumns: `repeat(${maxColumn}, 1fr)`
    }
  }
}

export const getColorAlpha = (color: string = '', alpha: string) => {
  return `${color}${alpha}`
}
