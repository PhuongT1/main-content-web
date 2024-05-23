import { ImageProps } from 'next/image'
export interface ProgressiveImageProps extends ImageProps {
  placeholderSrc: string
  src: string
  cache?: boolean
}
