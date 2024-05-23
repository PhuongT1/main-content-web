'use client'
import LockRedIcon from '@/assets/icons/dialog-icons/lock-red'
import { IMAGE_TYPES } from '@/constants/common.constant'
import AlertPopup from '@/elements/alert-popup'
import { useDialog } from '@/hooks/use-dialog'
import { checkFileSize } from '@/utils/file'
import { Box, SxProps } from '@mui/material'
import { ComponentProps, forwardRef, useState } from 'react'

type UploadProps = {
  value?: FileList
  merge?: boolean
  maxFile?: number
  additionalListFileLength?: number
  limitSize?: number
  convertType?: 'file' | 'imageUrl'
  checkFileType?: boolean
  onChange?: (files: FileList) => void
  sx?: SxProps
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>

const Upload = forwardRef<HTMLInputElement | null | undefined, UploadProps>(
  (
    {
      children,
      onChange,
      additionalListFileLength = 0,
      merge,
      maxFile,
      limitSize = 5,
      value,
      checkFileType = true,
      sx,
      ...rest
    },
    ref
  ) => {
    const [key, setKey] = useState(Math.random().toString())
    const { open: sizeWarning, onClose: sizeWarningClose, onOpen: sizeWarningOpen } = useDialog()
    const { open: limitWarning, onClose: limitWarningClose, onOpen: limitWarningOpen } = useDialog()
    const { open: invalidTypeWarning, onClose: invalidTypeWarningClose, onOpen: invalidTypeWarningOpen } = useDialog()

    const onUpload = (files: FileList, pres?: FileList) => {
      let temp = files
      const newFileArr = Array.from(files)
      const curFileArr = pres ? Array.from(pres) : []
      const isInvalidFileType = newFileArr.some((file) => {
        return !(rest.accept || IMAGE_TYPES).includes(file?.name?.split('.')?.pop() || '')
      })
      if (checkFileType && isInvalidFileType) {
        invalidTypeWarningOpen()
        return pres
      }
      if (maxFile) {
        const isOverMaxFile = newFileArr.length + curFileArr.length + additionalListFileLength > maxFile
        if (isOverMaxFile) {
          limitWarningOpen()
          return pres
        }
      }
      if (limitSize) {
        const isOverSize = newFileArr.some((file) => {
          return checkFileSize(file, limitSize)
        })
        if (isOverSize) {
          sizeWarningOpen()
          return pres
        }
      }
      if (merge) {
        // Convert to array
        // Merge two array
        const mergedArray = [...newFileArr, ...curFileArr]
        // Create data transfer
        const dataTransfer = new DataTransfer()
        // Transfer mergedArray to FileList type
        mergedArray.forEach((file) => dataTransfer.items.add(file))
        temp = dataTransfer.files
      }
      onChange?.(temp as any)
    }

    return (
      <>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            zIndex: 10,
            '&:hover': {
              cursor: 'pointer'
            },
            ...sx
          }}
          accept={IMAGE_TYPES}
          key={key} //Reset input form in case user delete and upload the same file
          onChange={(event: any) => {
            const {
              target: { files }
            } = event
            if (files.length > 0) {
              onUpload(files, value)
              setKey(Math.random().toString())
            }
          }}
          component='input'
          type='file'
          {...rest}
          ref={ref}
        />
        <AlertPopup
          onCancel={sizeWarningClose}
          title={`파일 용량은 ${limitSize}MB까지 허용됩니다. 다시 확인해주세요.`}
          icon={<LockRedIcon />}
          // description={}
          open={sizeWarning}
        />
        <AlertPopup
          onCancel={limitWarningClose}
          title={'Limit number of images'}
          icon={<LockRedIcon />}
          description={`File exceeds ${maxFile}`}
          open={limitWarning}
        />
        <AlertPopup
          onCancel={invalidTypeWarningClose}
          title={'지원하지 않는 파일 형식입니다.'}
          icon={<LockRedIcon />}
          description={`다시 확인해 주세요.`}
          open={invalidTypeWarning}
        />
      </>
    )
  }
)

export { Upload }
