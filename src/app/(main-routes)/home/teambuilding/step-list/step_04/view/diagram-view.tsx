import { useEffect, useMemo } from 'react'
import ReactFlow, { Background, ConnectionLineType, useReactFlow } from 'reactflow'

import { NodeView as CustomeNode } from '../editor/custom-node'

import { isEmpty } from '@/utils/object'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import 'reactflow/dist/style.css'
import { CustomEdgeView } from '../editor/edge'
import TreeOrganzation from '../tree-organizaion'
import { useTeambuildingData } from '../../../use-teambuilding'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { STEP } from '@/constants/common.constant'

const nodeTypes = { custom: CustomeNode }

const edgeTypes = {
  'custom-edge': CustomEdgeView
}

function DiagramsView({ sxBox }: { sxBox?: SxProps<Theme> }) {
  const {
    palette: { home, main }
  } = useTheme()

  const { fitView } = useReactFlow()
  const { data, isLoading } = useTeambuildingData<any>(STEP.STEP_FOUR, TEAMBUILDING_QUERY_KEY.GET_DATA_S4)

  const newEdges = useMemo(() => {
    if (!isEmpty(data?.data)) {
      return data?.data?.edges.map((edge: any) => {
        const { animated, ...rest } = edge
        return rest
      })
    } else {
      return []
    }
  }, [data?.data])

  useEffect(() => {
    requestAnimationFrame(() => {
      fitView()
    })
  }, [data?.data])

  return (
    <Box
      width={1}
      height={1}
      component={'div'}
      sx={{
        ...sxBox
      }}
    >
      {!isLoading ? (
        <ReactFlow
          nodeTypes={nodeTypes}
          hidden={isEmpty(data?.data?.nodes)}
          nodes={data?.data?.nodes}
          edgeTypes={edgeTypes}
          connectionLineStyle={{
            stroke: home.blue500,
            strokeWidth: 2
          }}
          connectionLineContainerStyle={{
            stroke: home.blue500,
            strokeWidth: 2
          }}
          style={{
            backgroundColor: main.white,
            pointerEvents: 'none',
            padding: '20px',
            borderRadius: '10px',
            width: '100%',
            maxHeight: '500x',
            height: '500px',
            overflow: 'hidden'
          }}
          draggable={false}
          zoomOnDoubleClick={false}
          disableKeyboardA11y
          nodesDraggable={false}
          fitView
          fitViewOptions={{ maxZoom: 1 }}
          zoomOnScroll={false}
          connectionRadius={50}
          connectionLineType={ConnectionLineType.Step}
          edges={newEdges}
          defaultViewport={{ x: 100, y: 100, zoom: 1 }}
          maxZoom={2}
        >
          <Background color={home.base_white} />
        </ReactFlow>
      ) : (
        <TreeOrganzation />
      )}
    </Box>
  )
}

export default DiagramsView
