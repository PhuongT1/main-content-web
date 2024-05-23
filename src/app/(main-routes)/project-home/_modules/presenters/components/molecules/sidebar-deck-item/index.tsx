'use client'
import Drag from '@/assets/icons/drag'
import Close from '@/assets/icons/close'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, useTheme } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { ProjectDeckItem } from '../../../../domain'
import * as S from './style'

interface ISidebarDeckItem {
  deckItem: ProjectDeckItem
  onDelete: (deckItem: ProjectDeckItem) => void
}

export const SidebarDeckItem = ({ deckItem, onDelete }: ISidebarDeckItem) => {
  const { palette } = useTheme()
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, isDragging } = useSortable({
    id: (deckItem?.id || '') as string
  })

  return (
    <S.SidebarDeckItem
      ref={setNodeRef}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      padding={convertToRem(16)}
      borderRadius={convertToRem(10)}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1
      }}
      {...attributes}
    >
      <Stack flexDirection='row' gap={convertToRem(14)} alignItems='center'>
        <S.DragIcon ref={setActivatorNodeRef} {...listeners}>
          <Drag color={palette.home.gray50} />
        </S.DragIcon>

        <Typography cate='body_3_semibold' color={palette.home.gray50} lines={1}>
          {deckItem.name}
        </Typography>
      </Stack>

      <S.CloseIcon onClick={() => onDelete(deckItem)}>
        <Close width={20} height={20} color={palette.main_grey.gray_scale_50} />
      </S.CloseIcon>
    </S.SidebarDeckItem>
  )
}
