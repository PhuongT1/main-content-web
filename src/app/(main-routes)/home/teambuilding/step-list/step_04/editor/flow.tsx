import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  ConnectionLineType,
  ControlButton,
  Controls,
  CoordinateExtent,
  Edge,
  MarkerType,
  Node,
  Panel,
  Viewport,
  addEdge,
  getViewportForBounds,
  useEdgesState,
  useNodesState,
  useOnViewportChange,
  useViewport
} from 'reactflow'

// Utils

// Styles
import 'reactflow/dist/style.css'
import Toolbars from './toolbar'

import { Node as CustomeNode } from './custom-node'

import { diagramDataSelector, getStep, getStepData, toolbarEditorSelector } from '@/atoms/home/teambuilding'
import { EventNameTBuidlding, TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { ROLE_TEAMBUILDING, ROLE_TYPE } from '@/mock/teambuilding/data'
import { EditorNodeList, TFormValue } from '@/types/teambuilding/index.type'
import { listenEvent, sendEvent } from '@/utils/events'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState } from 'recoil'
import CustomEdge from './edge'
import { isEmpty } from '@/utils/object'
import { STEP } from '@/constants/common.constant'
import { useTheme } from '@mui/material'
import { useLanguage } from '@/hooks/use-language'
import { useTeambuildingData } from '../../../use-teambuilding'
import { remConvert } from '@/utils/convert-to-rem'

const BASE_WIDTH = 934
const BASE_HEIGHT = 592
const BASE_CORRDINATE_X1 = 370
const BASE_CORRDINATE_X2 = 180
const BASE_CORRDINATE_Y1 = 570
const BASE_CORRDINATE_Y2 = 340
const BASE_CORRDINATE_TOP = 30

const initialEdges: Edge[] = []

const nodeTypes = { custom: CustomeNode }

const edgeTypes = {
  'custom-edge': CustomEdge
}

const OverviewFlow = ({ onDispatchMessage }: { onDispatchMessage: VoidFunction }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<EditorNodeList>([])

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)

  const [, setDiagramsData] = useRecoilState(diagramDataSelector)
  const resetToolbar = useResetRecoilState(toolbarEditorSelector)

  const { data: dataStep01 } = useTeambuildingData<TFormValue[]>(STEP.STEP_ONE, TEAMBUILDING_QUERY_KEY.GET_DATA_S1)
  const { data: dataStep02 } = useTeambuildingData<TFormValue[]>(STEP.STEP_TWO, TEAMBUILDING_QUERY_KEY.GET_DATA_S2)
  const { data: dataStep04 } = useTeambuildingData<{ nodes: Node<EditorNodeList>[]; edges: Edge[] }>(
    STEP.STEP_FOUR,
    TEAMBUILDING_QUERY_KEY.GET_DATA_S4
  )

  const initNodes = useCallback(
    (isGetDataFromApi: boolean) => {
      const newNodes: Node<EditorNodeList>[] = []

      if (dataStep04 && !isEmpty(dataStep04?.data.nodes) && !isEmpty(dataStep04?.data.edges) && isGetDataFromApi) {
        setNodes(dataStep04?.data.nodes)
        setEdges(dataStep04?.data.edges)
        return
      }

      if (isEmpty(dataStep01?.data) && isEmpty(dataStep02?.data)) {
        setNodes([])
        setEdges([])
        return
      }

      const list = [] as TFormValue[]
      if (dataStep01 && !isEmpty(dataStep01?.data)) {
        list.push(...dataStep01.data)
      }
      if (dataStep02 && !isEmpty(dataStep02?.data)) {
        list.push(...dataStep02.data)
      }

      list.forEach((person: TFormValue, index: number) => {
        const findCurrentRoleType =
          ROLE_TEAMBUILDING.find((role) => role.nameEn === person.role)?.type ?? ROLE_TYPE.MASTER
        const node = {
          id: `${index + 1}`,
          type: 'custom',
          data: {
            name: person.name,
            position: person.role,
            role: findCurrentRoleType,
            desc: '',
            styles: [
              {
                backgroundColor: home.gray300,
                fontSize: remConvert('16px')
              },
              {
                fontSize: remConvert('16px')
              },
              {
                fontSize: remConvert('14px')
              }
            ]
          }
        }
        switch (findCurrentRoleType) {
          case ROLE_TYPE.MASTER:
            newNodes.push({
              ...node,
              position: { x: 150 + 250 * index, y: -100 }
            })
            break
          case ROLE_TYPE.MEMBER:
            newNodes.push({
              ...node,
              position: { x: 100 + (index - 3) * 250, y: 120 }
            })
            break
          default:
            newNodes.push({
              ...node,
              position: { x: 200 + Math.floor(Math.random() * 100), y: 100 + Math.floor(Math.random() * 100) }
            })
            break
        }
      })
      setNodes(newNodes)
    },
    [dataStep01, dataStep02, dataStep04]
  )

  useEffect(() => {
    initNodes(true)
  }, [dataStep01, dataStep02])

  useEffect(() => {
    listenEvent(EventNameTBuidlding.RESET_TBUIDLING_ST4, () => {
      resetToolbar()
      if (nodes.length > 0) {
        initNodes(false)
      }
      if (edges.length > 0) {
        setEdges([])
      }
    })
  }, [nodes])

  useEffect(() => {
    setDiagramsData((prev) => ({ ...prev, nodes: [...nodes] }))
  }, [nodes])

  useEffect(() => {
    setDiagramsData((prev) => ({ ...prev, edges: [...edges] }))
  }, [edges])

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((els) =>
        addEdge(
          {
            ...params,
            type: 'custom-edge',

            className: 'normal-edge',
            markerEnd: {
              type: MarkerType.ArrowClosed
            },
            markerStart: {
              type: MarkerType.ArrowClosed,
              orient: 'auto-start-reverse'
            },
            animated: true
          },
          els
        )
      )
    },
    [setEdges]
  )

  const nodesExtends = useMemo(() => {
    if (!wrapperRef.current)
      return [
        [0, 0],
        [0, 0]
      ]

    // const height =
    //   wrapperRef.current.clientHeight - BASE_HEIGHT === 0
    //     ? BASE_CORRDINATE_TOP
    //     : wrapperRef.current.clientHeight - BASE_HEIGHT
    const width = (wrapperRef.current.clientWidth - BASE_WIDTH) / 2

    return [
      [-1 * (BASE_CORRDINATE_X1 + width), -150],
      [BASE_CORRDINATE_Y1 + width, 265]
    ]
  }, [wrapperRef.current])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Toolbars onDispatchMessage={onDispatchMessage} />
      <ReactFlow
        nodes={nodes}
        edgeTypes={edgeTypes}
        ref={wrapperRef}
        connectionLineStyle={{
          stroke: home.blue500,
          strokeWidth: 2
        }}
        connectionLineContainerStyle={{
          stroke: home.blue500,
          strokeWidth: 2
        }}
        style={{
          flex: 1
        }}
        fitView
        // onEdgeMouseMove={(e, edge) => {
        //   if (e.currentTarget === e.target) {
        //     sendEvent('HOVER_EDGE', { event: e.target, action: 'MOVE' })
        //   }
        // }}
        // onEdgeMouseLeave={(e) => {
        //   sendEvent('HOVER_EDGE', { event: e, action: 'LEAVE' })
        // }}
        defaultViewport={{ x: 200, y: 200, zoom: 1 }}
        fitViewOptions={{ maxZoom: 1 }}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        zoomOnScroll={false}
        translateExtent={
          [
            [-200, -140],
            [400, 300]
          ] as CoordinateExtent
        }
        nodeExtent={nodesExtends as CoordinateExtent}
        connectionLineType={ConnectionLineType.Step}
        snapToGrid={true}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background color={home.base_white} />
      </ReactFlow>
    </div>
  )
}

export default OverviewFlow
