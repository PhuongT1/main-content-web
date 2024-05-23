import { SxProps } from '@mui/material'
import { BoxProps } from '@mui/system'
import React from 'react'
export type ResizeImageProps = BoxProps & {
  placeholderSrc: string
  src: string
  baseWidth?: number
  baseHeight?: number
} & React.ImgHTMLAttributes<HTMLImageElement>

export interface IFileSize {
  width: number | string
  height: number | string
}
