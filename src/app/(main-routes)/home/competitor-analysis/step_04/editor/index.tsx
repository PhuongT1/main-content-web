import { useEffect } from 'react'
import ReactFlow, {
  Edge,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useRecoilState } from 'recoil'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import {
  dataDiagramCompetitorSelector,
  selectedCompetitorNodeSelector,
  toolbarEditorSelector
} from '@/atoms/home/competitor-analysis'
import { listenEvent } from '@/utils/events'
import { EventNameCompetitorAnalysis, TYPE_NODE } from '@/constants/competitor-analysis'
import Toolbar from './toolbar'
import InputNode from './inputNode'
import LogoNode from './logoNode'
import { initialEdges, initialNodes } from './data'

const nodeTypes = { inputNode: InputNode, logoNode: LogoNode }
function EditorFlow() {
  const [diagramsData, setDiagramsData] = useRecoilState(dataDiagramCompetitorSelector)
  const [nodes, setNodes, onNodesChange] = useNodesState<EditorNodeList>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [, setSelectedNode] = useRecoilState(selectedCompetitorNodeSelector)
  const [, setDataToolbar] = useRecoilState(toolbarEditorSelector)

  // =====
  useEffect(() => {
    const { nodes = [] } = diagramsData || {}
    if (nodes?.length > 4) {
      setNodes(nodes ?? [])
    }
  }, [diagramsData.nodes?.length])

  useEffect(() => {
    listenEvent(EventNameCompetitorAnalysis.RESET_STEP4, () => {
      if (nodes.length > 0) {
        // reset data diagrams
        setNodes((nodes) => {
          const filteredNodes = nodes?.filter((node) => node?.type === TYPE_NODE.input) || []
          return filteredNodes.map((node) => ({ ...node, data: { ...node.data, name: '' } }))
        })
      }
    })
  }, [nodes])

  useEffect(() => {
    setDiagramsData((prev) => ({ ...prev, nodes: [...nodes] }))
  }, [nodes])

  useEffect(() => {
    setDiagramsData((prev) => ({ ...prev, edges: [...edges] }))
  }, [edges])

  // handle click outside nodes
  const onPaneClick = () => {
    setSelectedNode('')
    setDataToolbar({ color: '', fontSize: '16px', fontWeight: 'normal' })
  }

  // =====
  return (
    <ReactFlowProvider>
      <Toolbar />

      <ReactFlow
        style={{ flex: 1 }}
        fitView
        maxZoom={2}
        fitViewOptions={{ maxZoom: 1 }}
        defaultViewport={{ x: 200, y: 200, zoom: 1 }}
        connectionLineType={ConnectionLineType.Straight}
        nodes={nodes}
        panOnDrag={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        zoomOnScroll={false}
        snapToGrid={true}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={undefined}
        onConnect={undefined}
        onPaneClick={onPaneClick}
        nodesConnectable={false}
      >
        <Background />
      </ReactFlow>
    </ReactFlowProvider>
  )
}

export default EditorFlow
