import { useCallback } from 'react'
import { EdgeProps, useStore, SmoothStepEdge, StraightEdge } from 'reactflow'

interface IRenderEdge extends EdgeProps {
  EdgeComponent: typeof SmoothStepEdge | typeof StraightEdge
}
function RenderEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  targetPosition,
  sourcePosition,
  markerEnd,
  EdgeComponent
}: IRenderEdge) {
  const GRAY_DOT = '#C3C3C5'
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]))
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]))
  if (!sourceNode || !targetNode) return null

  return (
    <g>
      <defs>
        <marker
          id='circleEdge'
          markerWidth='6'
          markerHeight='6'
          refX='2.5'
          refY='2.5'
          orient='auto'
          markerUnits='strokeWidth'
        >
          <circle cx='2.5' cy='2.5' r='2.5' fill={GRAY_DOT} />
        </marker>
      </defs>

      <EdgeComponent
        id={id}
        style={{ strokeWidth: 2, stroke: GRAY_DOT }}
        source={source}
        target={target}
        targetPosition={targetPosition}
        sourcePosition={sourcePosition}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        markerStart={'url(#circleEdge)'}
        markerEnd={markerEnd}
      />
    </g>
  )
}

export function CustomEdgeView(props: EdgeProps) {
  return RenderEdge({ ...props, EdgeComponent: SmoothStepEdge })
}

export function CustomEdgeStraightView(props: EdgeProps) {
  return RenderEdge({ ...props, EdgeComponent: StraightEdge })
}
