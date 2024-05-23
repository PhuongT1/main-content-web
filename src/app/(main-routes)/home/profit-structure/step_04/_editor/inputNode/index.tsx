import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { Box, useTheme } from '@mui/material'
import { EditorNodeList } from '@/types/profit-structure.type'
import InputNodeDiagram from '@/app/(main-routes)/home/competitor-analysis/_components/input_node_diagram'
import CircleCheckIcon from '@/assets/icons/circle-check'
import CircleInfoIcon from '@/assets/icons/circle-info'
import styles from './style.module.scss'

const circleStyle = { width: 0, height: 0, border: 0, background: 'transparent' }
function InputNode({ data, id }: NodeProps<EditorNodeList>) {
  const { palette } = useTheme()

  return (
    <Box
      className={styles.node_wrapper}
      sx={{
        background: palette.home.base_white,
        borderColor: palette.main.point,
        input: { '&::placeholder': { color: `${palette.home.gray100} !important`, opacity: 1 } }
      }}
    >
      {/* Handled Top Left Right Bottom */}
      <Handle type='source' position={Position.Top} id='a' style={{ ...circleStyle }} />
      <Handle type='source' position={Position.Right} id='b' style={{ ...circleStyle }} />
      <Handle type='source' position={Position.Bottom} id='c' style={{ ...circleStyle }} />
      <Handle type='source' position={Position.Left} id='d' style={{ ...circleStyle }} />

      <Handle type='source' position={Position.Top} id='a40' style={{ ...circleStyle, left: '40%' }} />
      <Handle type='source' position={Position.Top} id='a60' style={{ ...circleStyle, left: '60%' }} />

      {/* Input Node */}
      <InputNodeDiagram
        id={id}
        isAutoResize={false}
        className={styles.node_input}
        name={'name'}
        value={data?.name}
        placeholder={data?.placeholder}
      />
    </Box>
  )
}
export default memo(InputNode)

export const InputNoteNode = ({ data, id }: NodeProps<EditorNodeList>) => {
  const { palette } = useTheme()
  return (
    <Box
      position={'relative'}
      className={styles.node_note_wrapper}
      sx={{
        background: palette.home.base_white,
        borderColor: palette.main.primary_light,
        input: { '&::placeholder': { color: `${palette.home.gray100} !important`, opacity: 1 } }
      }}
    >
      <Handle type='source' position={Position.Top} id='a' style={{ ...circleStyle }} />

      <InputNodeDiagram
        id={id}
        isAutoResize={false}
        className={styles.node_note_input}
        name={'name'}
        value={data?.name}
        placeholder={data?.placeholder}
      />

      {data?.icon && (
        <Box
          position={'absolute'}
          sx={{ left: '50%', bottom: '-42px', transform: 'translate(-50%, 0)', ...data?.styles }}
        >
          {data?.icon === 'check' && <CircleCheckIcon />}
          {data?.icon === 'info' && <CircleInfoIcon />}
        </Box>
      )}
    </Box>
  )
}
