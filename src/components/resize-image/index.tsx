import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ResizeImageProps, IFileSize } from './image.type'
import { Box, useMediaQuery } from '@mui/material'

const ResizeImage = ({ placeholderSrc, src, baseWidth = 694, baseHeight, ...props }: ResizeImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSize, setImageSize] = useState<IFileSize>({
    width: 'auto',
    height: 'auto'
  })

  const lgDown = useMediaQuery('(max-width: 992px)')
  const mdDown = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const img = new Image()
    img.onload = (event) => {
      try {
        const imageWidth = img?.width || 0
        const imageHeight = img?.height || 0
        const windowWidth = window.innerWidth - (mdDown ? 40 : lgDown ? 64 : 0)
        if (!!baseHeight) {
          setImageSize({
            width: (imageWidth * baseHeight) / imageHeight,
            height: baseHeight
          })
        } else {
          let compareWidth = baseWidth
          if ((windowWidth || 0) < baseWidth) {
            compareWidth = windowWidth || 0
          }

          if (imageWidth <= compareWidth) {
            setImageSize({ width: imageWidth, height: imageHeight })
          } else {
            setImageSize({ width: compareWidth, height: 'auto' })
          }
        }

        setImgSrc(src)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    img.src = src
  }, [src])

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc && !isLoaded
      ? styles['progressive-image-loading']
      : styles['progressive-image-loaded']

  return (
    <>
      {!isLoaded && (
        <Box component='div' sx={{ ...props.sx }} className={`${customClass} ${props.className}`} style={props.style} />
      )}
      {isLoaded && (
        <Box
          component='img'
          {...{
            src: imgSrc,
            data: imgSrc,
            ...props
          }}
          sx={{ objectFit: 'contain', ...props.sx }}
          style={{ ...imageSize }}
          alt={props.alt || ''}
          className={`${customClass} ${props.className}`}
        />
      )}
    </>
  )
}
export default ResizeImage
