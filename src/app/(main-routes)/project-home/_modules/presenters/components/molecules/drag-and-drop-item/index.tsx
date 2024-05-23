import { Box } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { useDndMonitor, useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

interface IDragAndDropItem {
  id: string
  setCurrentDropExplorer: (id: string | null) => void
  children: React.ReactNode
}

export const DragAndDropItem = ({ id, setCurrentDropExplorer, children }: IDragAndDropItem) => {
  const [active, setActive] = useState<string | null>(null)
  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: dragSetNodeRef,
    isDragging
  } = useDraggable({
    id
  })

  const {
    attributes: dropAttributes,
    listeners: dropListeners,
    setNodeRef: dropSetNodeRef
  } = useSortable({
    id
  })

  useDndMonitor({
    onDragOver(event) {
      setActive((event.over?.id || null) as string | null)
    }
  })

  useEffect(() => {
    setCurrentDropExplorer(active)
  }, [active])

  return (
    <Box
      ref={(node: HTMLElement | null) => {
        dragSetNodeRef(node)
        dropSetNodeRef(node)
      }}
      sx={{
        opacity: isDragging ? 0.6 : 1
      }}
      className='drag-and-drop'
      {...dragAttributes}
      {...dragListeners}
      {...dropAttributes}
      {...dropListeners}
    >
      {children}
    </Box>
  )
}

export default DragAndDropItem
