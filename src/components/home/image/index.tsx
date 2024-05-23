import { Skeleton } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import React from 'react'

function ImageItem({ isLoading, width, height, src, ...rest }: ImageProps & { isLoading?: boolean }) {
  if (isLoading || !src) return <Skeleton variant='rounded' width={width} height={height} />
  return (
    <Image
      width={width}
      height={height}
      quality={90}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '10px'
      }}
      src={src}
      {...rest}
      alt='image'
    />
  )
}

export default ImageItem
