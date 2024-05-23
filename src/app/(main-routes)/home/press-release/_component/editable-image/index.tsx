import { MockImageUploadIcon } from '@/assets/icons'
import InventoryImages from '@/components/inventory-image'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { editPressRelease } from '../../press-release.atom'

interface EditableImageProps {
  imgUrl: string
  onChangeImage: (newUrl: string) => void
}

const EditableImage = forwardRef(({ imgUrl, onChangeImage }: EditableImageProps, ref) => {
  const enableEdit = useRecoilValue(editPressRelease)
  const [open, setOpen] = useState(false)
  const editRef = useRef(null)

  useImperativeHandle(ref, () => ({
    editImageRef: editRef.current
  }))

  return (
    <>
      <Box
        ref={editRef}
        width={'100%'}
        height={convertToRem(320)}
        sx={{
          borderRadius: convertToRem(10),
          cursor: enableEdit ? 'pointer' : undefined,
          overflow: 'hidden'
        }}
        position={'relative'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        onClick={
          enableEdit
            ? () => {
                setOpen(true)
              }
            : undefined
        }
      >
        {imgUrl === '' ? (
          <Stack
            width={'inherit'}
            height={'inherit'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
            sx={{
              border: '1px solid',
              borderColor: 'main.blue',
              backgroundColor: 'main_primary.colors_overlay_blue',
              borderRadius: convertToRem(10)
            }}
          >
            <MockImageUploadIcon
              pathProps={{
                fill: '#3C82F9'
              }}
            />
            <Typography cate='body_3_semibold' plainColor={'main.blue'}>
              이미지 선택
            </Typography>
          </Stack>
        ) : (
          <Image
            src={imgUrl}
            alt={'press-thumbnail'}
            style={{
              objectFit: 'contain'
            }}
            fill
          />
        )}
      </Box>
      <InventoryImages
        open={open}
        onClose={() => setOpen(false)}
        setImages={(newImage: string[]) => {
          onChangeImage && onChangeImage(newImage[0])
          setOpen(false)
        }}
      />
    </>
  )
})

export default EditableImage
