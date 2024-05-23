import CloseCircleIcon from '@/assets/icons/close-circle'
import ParkIcon from '@/assets/icons/park'
import { Typography } from '@/elements'
import { Box, IconButton, useTheme } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'

type TCardItem = {
  item: any
  index: number
  onDelete: (item: any) => void
}
function CardItem({ item, onDelete, index }: TCardItem) {
  const {
    palette: { home }
  } = useTheme()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { ...item }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <Box
      sx={style}
      bgcolor={isDragging ? home.dark_blue700 : home.gray300}
      my='10px'
      p={2}
      position='relative'
      borderRadius='10px'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      gap={2}
      maxHeight={56}
      width='100%'
    >
      <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
        <IconButton {...attributes} {...listeners} ref={setNodeRef}>
          <ParkIcon pathProps={{ stroke: home.gray50, fill: home.gray50 }} />
        </IconButton>
        <Typography cate='body_30' color={home.gray50}>{item?.content}</Typography>
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50
        }}
        onClick={() => {
          onDelete(index)
        }}
      >
        <ClearBoxIcon pathProps={{ stroke: home.gray0 }} rectProps={{ fill: home.gray400}} />
      </IconButton>
    </Box>
  )
}

export default CardItem
