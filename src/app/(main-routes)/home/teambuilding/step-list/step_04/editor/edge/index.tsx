import {
  EdgeLabelRenderer,
  EdgeProps,
  SmoothStepEdge,
  getStraightPath,
  useReactFlow
} from 'reactflow'

import styles from './edge.module.scss'
import { useTheme } from '@mui/material'
import { EDGE_DOT } from '@/constants/teambuilding/teambuilding.constant'

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  targetPosition,
  sourcePosition
}: EdgeProps) {
  const {
    palette: { home }
  } = useTheme()
  const { setEdges } = useReactFlow()
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY
  })

  return (
    <>
      <SmoothStepEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetPosition={targetPosition}
        sourcePosition={sourcePosition}
        style={{ strokeWidth: 2, stroke: home.blue500 }}
        source={source}
        target={target}
        targetX={targetX}
        targetY={targetY}
        // markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <button
          style={{
            // visibility: 'hidden',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`
          }}
          id={`button_${id}`}
          className={styles.button_disconnect}
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id))
          }}
        >
          ×
        </button>
      </EdgeLabelRenderer>
    </>
  )
}
export function CustomEdgeView({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  targetPosition,
  sourcePosition
}: EdgeProps) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <>
      <SmoothStepEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY + EDGE_DOT}
        targetPosition={targetPosition}
        sourcePosition={sourcePosition}
        style={{ strokeWidth: 2, stroke: home.blue500 }}
        source={source}
        target={target}
        targetX={targetX}
        targetY={targetY - EDGE_DOT}
      />
    </>
  )
}
