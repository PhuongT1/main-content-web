import ReactFlow from 'reactflow'
import { Edge, ReactFlowProvider, useNodesState, useEdgesState, ConnectionLineType, ConnectionMode } from 'reactflow'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Box, useTheme } from '@mui/material'
import { EditorNodeList, ProfitDiagramType } from '@/types/profit-structure.type'
import { dataDiagramProfitStructureSelector } from '@/atoms/home/profit-structure'
import { initialEdges, initialNodes } from './data'
import { CustomEdgeView, CustomEdgeStraightView } from './edge'
import InputNode, { InputNoteNode } from './inputNode'
import { remConvert } from '@/utils/convert-to-rem'
import 'reactflow/dist/style.css'

const edgeTypes = { customEdge: CustomEdgeView, customEdgeStraight: CustomEdgeStraightView }
const nodeTypes = { inputNode: InputNode, inputNoteNode: InputNoteNode }
interface IEditorFlow {
  type: string
  isView?: boolean
  isChangeTypeDiagram?: boolean
}
function EditorFlow({ type, isView, isChangeTypeDiagram }: IEditorFlow) {
  const { palette } = useTheme()
  const isLightMode = palette.mode === 'light'
  const [diagramsData, setDiagramsData] = useRecoilState(dataDiagramProfitStructureSelector)
  const [nodes, setNodes, onNodesChange] = useNodesState<EditorNodeList>([])
  const [edges, setEdges] = useEdgesState<Edge>([])
  const [isLoading, setIsLoading] = useState(false)

  // =====
  useEffect(() => {
    setIsLoading(true)
    const loadingTimeout = setTimeout(() => setIsLoading(false), 100)

    const redrawDiagram = () => {
      if (type) {
        const shouldUseDiagramsData = diagramsData?.nodes?.length > 0 && !isChangeTypeDiagram
        if (shouldUseDiagramsData) {
          setNodes(diagramsData?.nodes)
          setEdges(diagramsData?.edges)
        } else {
          setNodes(initialNodes?.[type as ProfitDiagramType] || [])
          setEdges(initialEdges?.[type as ProfitDiagramType] || [])
        }
      }
    }

    redrawDiagram()
    return () => clearTimeout(loadingTimeout)
  }, [type])

  useEffect(() => {
    !isView && setDiagramsData((prev) => ({ ...prev, nodes: [...nodes] }))
  }, [nodes])

  useEffect(() => {
    setDiagramsData((prev) => ({ ...prev, edges: [...edges] }))
  }, [edges])

  // =====
  return (
    <Box
      width={'100%'}
      mt={remConvert('20px')}
      height={remConvert('800px')}
      padding={remConvert('24px')}
      borderRadius={remConvert('10px')}
      sx={{
        backgroundColor: isView ? palette.home.gray300 : palette.home.gray400,
        overflow: 'hidden',

        // custom style when view
        ...(isView && {
          '.react-flow__node-inputNoteNode > .MuiBox-root': {
            background: palette.home.gray100,
            borderColor: palette.home.gray100,
            input: { color: `${isLightMode ? palette.home.base_gray50 : palette.home.base_black}!important` }
          },
          '.react-flow__node-inputNode > .MuiBox-root': {
            borderColor: palette.home.blue500
          },
          '.react-flow__node-inputNode[data-id="1-custom-diagram3"], .react-flow__node-inputNode[data-id="2-custom-diagram2"], .react-flow__node-inputNode[data-id="3-custom-diagram1"]':
            {
              '> .MuiBox-root': {
                background: palette.home.blue500,
                input: { color: `${palette.home.base_gray50}!important` }
              }
            }
        }),

        // custom node do spacing
        '.react-flow__panel': { display: 'none' },
        '.react-flow__handle-top': { top: '-16px' },
        '.react-flow__handle-left': { left: '-16px' },
        '.react-flow__handle-right': { right: '-16px' },
        '.react-flow__handle-bottom': { bottom: '-16px' },

        // custom node inputs for only diagram2
        '.react-flow__node[data-id="3-1-custom-diagram2"]': {
          transform: 'translate(34px, 188px) !important',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: '-16px',
            width: '100%',
            height: '24px',
            background: isView ? palette.home.gray300 : palette.home.gray400
          }
        },

        // custom node edges for only diagram3
        '.react-flow__node[data-id="1-custom-diagram3"]': {
          '.react-flow__handle-left, .react-flow__handle-right': { top: '100%' }
        }
      }}
    >
      {!isLoading && (
        <ReactFlowProvider>
          <ReactFlow
            fitView
            maxZoom={2}
            style={{ flex: 1 }}
            fitViewOptions={{ maxZoom: 1 }}
            defaultViewport={{ x: 200, y: 200, zoom: 1 }}
            edges={isView ? diagramsData?.edges : edges}
            nodes={isView ? diagramsData?.nodes : nodes}
            zoomOnDoubleClick={false}
            zoomOnPinch={false}
            zoomOnScroll={false}
            snapToGrid={true}
            edgesUpdatable={false}
            nodesDraggable={false}
            nodesConnectable={false}
            draggable={false}
            panOnDrag={!isView}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            connectionLineType={ConnectionLineType.Step}
            connectionMode={ConnectionMode.Loose}
          />
        </ReactFlowProvider>
      )}
    </Box>
  )
}

export default EditorFlow
