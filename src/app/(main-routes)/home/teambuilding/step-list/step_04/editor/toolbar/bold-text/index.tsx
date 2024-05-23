import BoldIcon from '@/assets/icons/team-building/bold'
import { EditorNodeList } from '@/types/teambuilding/index.type'
import { IconButton, Tooltip } from '@mui/material'
import React, { CSSProperties } from 'react'

type TBoldTextProps = {
  data: EditorNodeList
  indexOfRow: number
  updateStyleRow: ({ style, id, indexOfRow }: { style: CSSProperties; id: string; indexOfRow: number }) => void
  id: string
  onClose: VoidFunction
}

function BoldText({ data, updateStyleRow, id, onClose, indexOfRow }: TBoldTextProps) {
  const isBold = data.styles?.[indexOfRow]?.fontWeight === 'bold'
  return (
    <Tooltip title='Bold'>
      <IconButton
        sx={{
          backgroundColor: isBold ? '#ccc' : '#fff',
          p: 0,
          width: 30,
          height: 30,
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: isBold ? '#ccc' : '#fff'
          }
        }}
        onClick={() => {
          updateStyleRow({
            id,
            indexOfRow,
            style: {
              fontWeight: isBold ? 'normal' : 'bold'
            }
          })
          onClose()
        }}
      >
        <BoldIcon svgProps={{ width: 30, height: 30 }} />
      </IconButton>
    </Tooltip>
  )
}

export default BoldText
