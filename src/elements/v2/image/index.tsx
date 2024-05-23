import { BlankUser } from '@/assets/images'
import { ImageProps as NImageProps, StaticImageData, getImageProps } from 'next/image'

type ImageProps = {
  srcDark?: string | StaticImageData
} & NImageProps

const BaseImage = ({ src, srcDark, alt, ...rest }: ImageProps) => {
  const common = { alt: alt || 'default', width: 800, height: 400, ...rest } as NImageProps
  const {
    props: { srcSet: dark }
  } = getImageProps({ ...common, src: srcDark || src || BlankUser })
  const {
    props: { srcSet: light, ...imageRest }
  } = getImageProps({ ...common, src: src || BlankUser })

  return (
    <picture>
      <source media='(prefers-color-scheme: dark)' srcSet={dark} />
      <source media='(prefers-color-scheme: light)' srcSet={light} />
      <img alt='default' {...imageRest} />
    </picture>
  )
}

export default BaseImage
