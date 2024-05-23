import { useEffect } from 'react'
import ReactFlow, { Edge, Background, useNodesState, useEdgesState, ConnectionLineType } from 'reactflow'
import { useRecoilState } from 'recoil'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import { dataDiagramCompetitorSelector } from '@/atoms/home/competitor-analysis'
import InputNode from './inputNode'
import LogoNode from './logoNode'
import { initialEdges, initialNodes } from './data'
import 'reactflow/dist/style.css'

const nodeTypes = { inputNode: InputNode, logoNode: LogoNode }
function EditorFlow() {
  const [diagramsData] = useRecoilState(dataDiagramCompetitorSelector)
  const [nodes, setNodes] = useNodesState<EditorNodeList>(initialNodes)
  const [edges, setEdges] = useEdgesState<Edge>(initialEdges)

  // =====
  useEffect(() => {
    const { nodes = [] } = diagramsData || {}
    if (nodes?.length > 4) {
      setNodes(nodes ?? [])
    }
  }, [diagramsData.nodes?.length])

  // =====
  return (
    <ReactFlow
      fitView
      maxZoom={2}
      fitViewOptions={{ maxZoom: 2 }}
      defaultViewport={{ x: 200, y: 200, zoom: 1 }}
      connectionLineType={ConnectionLineType.Straight}
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      onNodesChange={undefined}
      onEdgesChange={undefined}
      onConnect={undefined}
      nodesDraggable={false}
      nodesConnectable={false}
      draggable={false}
      disableKeyboardA11y
    >
      <Background />
    </ReactFlow>
  )
}

export default EditorFlow
