'use client'
import { uploadFile } from '@/actions/apis/file.action'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import { useHydrate } from '@/hooks/use-hydrate'
import { Box, SxProps, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useMemo, useRef } from 'react'
import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type QuillProps = {
  sx?: SxProps
  containerSx?: SxProps
  value?: string
} & Omit<ReactQuillProps, 'value'>
const Quill = ({ sx, containerSx = {}, ...rest }: QuillProps) => {
  const ref = useRef()
  const { hydrated } = useHydrate()
  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import('react-quill')
          return ({ forwardRef, ...props }: QuillProps & { forwardRef?: any }) => <RQ ref={forwardRef} {...props} />
        },
        {
          ssr: false
        }
      ),
    [hydrated]
  )
  const theme = useTheme()

  const uploadImageAct = useMutation({
    mutationFn: uploadFile
  })

  const imageHandler = async () => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      var file: any = input && input.files ? input.files[0] : null
      var formData = new FormData()
      formData.append('fileUpload', file)
      formData.append('folderName', IMAGE_FOLDER.COMMON)
      let quillObj = (ref?.current as any).getEditor()
      const { data } = await uploadImageAct.mutateAsync(formData)
      if (data.id) {
        const range = quillObj?.getSelection()?.index ?? 0
        quillObj?.insertEmbed(range, 'image', data.baseUrl)
      }
    }
  }

  const quill_modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler
        }
      },
      clipboard: {
        matchVisual: false
      }
    }),
    []
  )
  return (
    <Box
      sx={{
        '& .quill': {
          bgcolor: 'main_grey.gray700',
          borderRadius: 2,
          p: 1.5,
          height: '100%'
        },
        '& .ql-toolbar': {
          border: 0,
          bgcolor: 'main_grey.gray600',
          borderRadius: 2
        },
        '& .ql-container': {
          border: 0,
          ...containerSx
        } as any,
        '& .ql-picker-label': {
          color: 'main_grey.gray100'
        },
        '& .ql-stroke, .ql-fill': {
          stroke: theme.palette.main_grey.gray100
        },
        ...sx
      }}
    >
      {hydrated && <ReactQuill forwardRef={ref} modules={quill_modules} {...rest} />}
    </Box>
  )
}

export default Quill
