import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Box, useTheme } from '@mui/material'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import InputNodeDiagram from '../../../_components/input_node_diagram'
import styles from './style.module.scss'

function InputNode({ data, id }: NodeProps<EditorNodeList>) {
  const circleStyle = { width: 6, height: 6 }
  const { palette } = useTheme()

  return (
    <Box className={styles.node_wrapper} sx={{ background: palette.home.gray50, borderColor: palette.home.gray100 }}>
      {data?.position === 'top' && (
        <Handle style={{ ...circleStyle, bottom: '-4%' }} type='source' position={Position.Bottom} />
      )}
      {data?.position === 'left' && (
        <Handle style={{ ...circleStyle, right: '-2px' }} type='source' position={Position.Right} />
      )}

      <InputNodeDiagram className={styles.node_input} name={'name'} value={data?.name} id={id} isAutoResize={false} />

      {data?.position === 'bottom' && (
        <Handle style={{ ...circleStyle, top: '-4%' }} type='target' position={Position.Top} />
      )}
      {data?.position === 'right' && (
        <Handle style={{ ...circleStyle, left: '-2px' }} type='target' position={Position.Left} />
      )}
    </Box>
  )
}

export default memo(InputNode)
