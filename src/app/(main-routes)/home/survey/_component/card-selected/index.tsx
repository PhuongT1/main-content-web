import React, { FC, memo } from 'react'
import styles from './card-selected.module.scss'
import { Box, IconButton, SxProps, Theme, useTheme } from '@mui/material'
import DeleteIcon from '@/assets/icons/delete'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ParkIcon from '@/assets/icons/park'
import { remConvert } from '@/utils/convert-to-rem'
import PictureIcon from '@/assets/icons/picture'
import Image from 'next/image'
import { OptionsMultiChoiceType } from '@/types/survey.type'
import InventoryImages from '@/components/inventory-image'
import useToggle from '@/hooks/use-toggle'

type CardSelectedProps = {
  label: string
  imageUrl: string
  isView?: boolean
  data: OptionsMultiChoiceType
  onUpdate: (data: OptionsMultiChoiceType) => void
  onRemove?: () => void
  sx?: SxProps<Theme>
  sxIcon?: React.SVGProps<SVGSVGElement>
  idDnd?: string
}

const CardSelectedBox: FC<CardSelectedProps> = ({
  data,
  label,
  onUpdate,
  onRemove,
  sx,
  sxIcon,
  isView = false,
  idDnd,
  imageUrl
}) => {
  const {
    palette: { home }
  } = useTheme()
  const { setNodeRef, listeners, transform, transition, attributes } = useSortable({ id: idDnd || '' })
  const [showInventory, , setToggleShowInventory] = useToggle()

  const stylesSort = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <Box
      ref={setNodeRef}
      display={'flex'}
      flexDirection={'column'}
      gap={remConvert('16px')}
      sx={{
        backgroundColor: isView ? home.gray300 : home.gray400,
        color: home.gray50,
        borderRadius: remConvert('10px'),
        padding: remConvert('8px 16px'),
        ...sx
      }}
      style={stylesSort}
    >
      <Box className={styles.selected_item}>
        <IconButton {...attributes} {...listeners} sx={{ margin: remConvert('-10px') }}>
          <ParkIcon pathProps={{ fill: home.gray50, stroke: home.gray50 }} />
        </IconButton>
        <p className={styles.content}>{label}</p>
        <IconButton
          sx={{ margin: remConvert('-10px') }}
          disabled={!!imageUrl}
          onClick={() => setToggleShowInventory(true)}
        >
          <PictureIcon
            gProps={{ opacity: imageUrl ? 0.2 : 1 }}
            pathProps={{ fill: home.gray50, stroke: home.gray50 }}
          />
        </IconButton>
        {onRemove && (
          <IconButton onClick={() => onRemove()} className={styles.remove_icon}>
            <DeleteIcon fill={home.gray60} stroke={home.gray50} {...sxIcon} />
          </IconButton>
        )}
      </Box>
      {imageUrl && (
        <Box width={200} height={100} position={'relative'}>
          <Image
            width={200}
            height={100}
            alt='avatar'
            src={imageUrl}
            style={{
              objectFit: 'cover',
              borderRadius: remConvert('10px')
            }}
          ></Image>
          <IconButton
            onClick={() => onUpdate({ ...data, imageUrl: '' })}
            className={styles.remove_icon}
            sx={{ position: 'absolute', right: remConvert('0px'), top: remConvert('0px') }}
          >
            <DeleteIcon fill={home.gray400} stroke={home.gray50} opacity={0.2} {...sxIcon} />
          </IconButton>
        </Box>
      )}
      <InventoryImages
        open={showInventory}
        onClose={() => setToggleShowInventory(false)}
        setImages={(newImage: string[]) => {
          newImage[0] &&
            onUpdate({
              ...data,
              imageUrl: newImage[0]
            })
          setToggleShowInventory(false)
        }}
      />
    </Box>
  )
}

export default memo(CardSelectedBox)
