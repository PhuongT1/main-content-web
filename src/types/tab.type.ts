export type SnapType = 'start' | 'center' | 'end' | 'none'

export interface SnapListProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: 'horizontal' | 'vertical'
  disableScroll?: boolean
  snapType?: 'mandatory' | 'proximity'
  width?: string
  height?: string
  scrollPadding?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  hideScrollbar?: boolean
  disabled?: boolean
  className?: string
}
export interface SnapItemProps {
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  width?: string
  height?: string
  snapAlign: SnapType
  forceStop?: boolean
  className?: string
}
