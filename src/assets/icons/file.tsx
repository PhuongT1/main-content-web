import React, { ComponentProps } from 'react'
import { PropsArray } from '@/utils/types'
import { SvgComponentProps } from '@/types/types.type'

type IFileIconProps = {
  pathProps2: PropsArray<ComponentProps<'path'>, 1>
} & SvgComponentProps

const FileIcon = ({ pathProps, pathProps2 }: IFileIconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M13.9999 7.33333C12.2221 7.33333 11.3333 6.44444 11.3333 4.66667V2H5.99992C4.22214 2 3.33325 2.88889 3.33325 4.66667V15.3333C3.33325 17.1111 4.22214 18 5.99992 18H13.9999C15.7777 18 16.6666 17.1111 16.6666 15.3333V7.33333H13.9999Z'
        fill='#9498A3'
        {...pathProps}
      />
      <path
        d='M13.9997 7.33333H16.6663L11.333 2V4.66667C11.333 6.44444 12.2219 7.33333 13.9997 7.33333Z'
        fill='#37393E'
        {...pathProps2}
      />
    </svg>
  )
}

export default FileIcon
