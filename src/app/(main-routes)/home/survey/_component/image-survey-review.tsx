'use client'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import Image, { ImageProps } from 'next/image'

const ImageSurveyReView: FC<ImageProps> = ({ style, ...props }) => {
  return (
    <Image
      width={320}
      height={262}
      style={{
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        // maxHeight: '400px',
        objectFit: 'contain',
        borderRadius: remConvert('10px'),
        objectPosition: 'left',
        aspectRatio: 'unsetƒ',
        ...style
      }}
      {...props}
      alt='preview-survey'
    />
  )
}
export default ImageSurveyReView
