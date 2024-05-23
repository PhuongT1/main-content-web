import { UploadAvatar } from '@/form/upload'
import { useUploadImageApi } from '@/hooks/use-upload-image-api'
import { SxProps } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface EditImageProps {
  imgURL: string
  sxBtnProps?: SxProps
  onChangeImage: (imgURL: string) => void
}

const EditImage: React.FC<EditImageProps> = ({ imgURL, sxBtnProps, onChangeImage }) => {
  const form = useForm<{ image: string }>({
    defaultValues: {
      image: imgURL
    }
  })
  const image = form.watch('image')

  useEffect(() => {
    console.log(image)
    image !== imgURL && onChangeImage(image)
  }, [image])

  return (
    <UploadAvatar
      sxButtonChange={{
        top: '28px',
        left: '100%',
        right: '16px',
        transform: 'translateX(calc(-100% - 16px))',
        ...sxBtnProps
      }}
      formProps={form}
      name={'image'}
      defaultValue=''
    />
  )
}

export default EditImage
