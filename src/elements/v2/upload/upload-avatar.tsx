'use client'

// @mui
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { UploadProps } from '@/types/upload'
import ImageIcon from '@/assets/icons/image'
import Image from 'next/image'
import { ButtonBase } from '../button'
import { useEffect, useMemo, useState } from 'react'
import InventoryImages from '@/components/inventory-image'
import { get } from 'react-hook-form'
import { Stack } from '@mui/material'
import { useLanguage } from '@/hooks/use-language'
//

// ----------------------------------------------------------------------

export default function UploadAvatar({
  disabled,
  sxButtonChange,
  sx,
  multiple = false,
  styleImage,
  form,
  name,
  onUpdateImage
}: UploadProps) {
  const { dict } = useLanguage()
  const [open, setOpen] = useState(false)

  const value = form.watch(name)

  const renderPreview = value && (
    <Image
      width={200}
      height={200}
      alt='avatar'
      src={value}
      style={{
        width: '100%',
        objectFit: 'cover',
        height: '100%',
        border: 'none',
        outline: 'none',
        ...styleImage
      }}
    />
  )

  const renderPlaceholder = (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing={1}
      className='upload-placeholder'
      onClick={() => {
        setOpen(true)
      }}
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        borderRadius: '50%',
        position: 'absolute',
        color: 'text.disabled',
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter
          }),
        '&:hover': {
          opacity: 0.72
        },
        ...(value && {
          color: 'error.main',
          bgcolor: 'error.lighter'
        }),
        ...(value && {
          zIndex: 9,
          opacity: 0,
          color: 'common.white'
        })
      }}
    >
      <ImageIcon />
      <Typography variant='caption'>{dict.select_image}</Typography>
    </Stack>
  )

  const renderButton = (
    <ButtonBase
      sx={{
        position: 'absolute',
        fontWeight: 'bold',
        bottom: '0',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9,
        maxHeight: 36,
        maxWidth: 144,
        width: 'fit-content',
        whiteSpace: 'nowrap',
        padding: '8px 20px',
        color: (theme) => theme.palette.main.white,
        borderColor: 'main.white',
        backgroundColor: (theme) => `${theme.palette.home.alpha_darkpurple_60}`,
        '&:hover': {
          backgroundColor: (theme) => `${theme.palette.home.alpha_darkpurple_60}`,
          borderColor: 'main.white'
        },
        borderRadius: '8px',
        ...sxButtonChange
      }}
      variant='outlined'
      size='medium'
      onClick={() => {
        setOpen(true)
      }}
    >
      {dict.change_image}
    </ButtonBase>
  )

  // const renderContent = useMemo(
  //   () => (
  //     <Box
  //       sx={{
  //         width: 1,
  //         height: 1,
  //         overflow: 'hidden',
  //         position: 'relative'
  //       }}
  //     >
  //       {renderPreview}
  //       {!value ? renderPlaceholder : renderButton}
  //     </Box>
  //   ),
  //   [value]
  // )

  const renderContent = useMemo(
    () => (
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {renderPreview}
        {!value ? renderPlaceholder : renderButton}
      </Box>
    ),
    [value, dict]
  )


  return (
    <>
      <Box
        sx={{
          m: 'auto',
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '10px',
          border: (theme) => `2px solid ${alpha(theme.palette.home.blue300, 1)}`,
          backgroundColor: (theme) => theme.palette.home.dark_blue700,
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none'
          }),
          ...(value && {
            border: 'none'
          }),
          ...(form.formState.errors[name] && {
            borderColor: (theme) => theme.palette.home.red500
          }),
          ...sx
        }}
      >
        <Box
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {renderContent}
          <InventoryImages
            open={open}
            onClose={() => setOpen(false)}
            setImages={(newImage: string[]) => {
              onUpdateImage && onUpdateImage(newImage)
              setOpen(false)
            }}
          />
        </Box>
      </Box>
    </>
  )
}
