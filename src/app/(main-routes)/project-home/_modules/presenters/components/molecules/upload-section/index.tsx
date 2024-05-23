'use client'
import dynamic from 'next/dynamic'
import { Box, Stack, useTheme } from '@mui/material'
import { BaseImage, Typography, Upload } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '@/elements/button'
import { SolidTrashIcon } from '@/assets/icons'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

const ContentUploadCard = dynamic(() => import('../content-upload-card'))

interface IUploadSection {
  title: string
  imageUrl?: string
  width?: number
  error?: string
  onChange: (file: FileList) => void
  onClear: () => void
}

export const UploadSection = ({ imageUrl, title, width = 280, error, onChange, onClear }: IUploadSection) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const ref = useRef<HTMLInputElement>()
  const [imageInit, setImageInit] = useState<string>()
  const [files, setFiles] = useState<FileList | undefined>()

  const onChangeInputData = (value: FileList) => {
    setFiles(value)
    setImageInit(undefined)
    onChange(value)
  }

  useEffect(() => {
    setImageInit(imageUrl)
  }, [imageUrl])

  const imgUrl = useMemo(() => {
    return files?.length ? URL.createObjectURL(files[0]) : imageInit
  }, [files, imageInit])

  return (
    <Box display='flex' flexDirection='column' gap={convertToRem(20)} maxWidth={convertToRem(width)}>
      <Typography cate='subtitle_1_semibold' color={palette.home.gray100}>
        {title}
      </Typography>
      <Stack gap={convertToRem(8)}>
        <S.WrapUpload
          width={width}
          sx={{
            '&:hover .wrap-image': {
              top: '0'
            }
          }}
        >
          <Upload
            ref={ref}
            onChange={onChangeInputData}
            value={files}
            multiple={false}
            accept='.jpg, .jpeg, .png, .JPG, .JPEG, .PNG'
          />
          <Upload ref={ref} onChange={onChangeInputData} value={files} accept='.jpg, .jpeg, .png, .JPG, .JPEG, .PNG' />
          {imgUrl ? (
            <>
              <BaseImage
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                src={imgUrl}
                alt={files?.[0]?.name || 'image'}
              />
              <S.BoxOverlay className='wrap-image'>
                <Box className='wrap-image-inner'>
                  <S.Overlay />
                  <S.BoxContent>
                    <S.ContentInner>
                      <S.BoxIcon
                        onClick={() => {
                          setImageInit(undefined)
                          setFiles(undefined)
                          onClear()
                        }}
                      >
                        <SolidTrashIcon pathProps={{ fill: palette.home.gray50 }} />
                      </S.BoxIcon>
                      <Button
                        title={dict.project_home_select_image}
                        type='button'
                        cate='contained'
                        customSize={'sm'}
                        sx={{
                          color: palette.home.mint500,
                          borderColor: palette.home.gray400,
                          backgroundColor: palette.home.gray400,
                          paddingX: convertToRem(24),
                          paddingY: convertToRem(10),
                          '&:hover, &:focus': {
                            backgroundColor: palette.home.gray300,
                            borderColor: 'rgba(144, 202, 249, 0.04)'
                          }
                        }}
                        onClick={() => {
                          if (ref && ref.current) {
                            ref.current.click()
                          }
                        }}
                      />
                    </S.ContentInner>
                  </S.BoxContent>
                </Box>
              </S.BoxOverlay>
            </>
          ) : (
            <ContentUploadCard
              width={width}
              sx={
                error
                  ? {
                      borderColor: palette.home.red500
                    }
                  : {}
              }
              onClick={() => {
                if (ref && ref.current) {
                  ref.current.click()
                }
              }}
            />
          )}
        </S.WrapUpload>
        <Typography cate='caption_1' color={error ? palette.home.red500 : palette.home.gray100} lineHeight='1.5'>
          {dict.project_home_upload_description}
        </Typography>
      </Stack>
    </Box>
  )
}
export default UploadSection
