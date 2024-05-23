import { MarkerType } from 'reactflow'
import { TYPE_NODE, TYPE_EDGE } from '@/constants/profit-structure.constant'
import { ProfitDiagramType } from '@/types/profit-structure.type'

//  ====== Diagram Data ======
const defaultOptionsEdges = { type: TYPE_EDGE.customEdge, markerEnd: { type: MarkerType.Arrow, width: 16, height: 16 } }
export const initialEdges = {
  [ProfitDiagramType.DirectSelling]: [
    {
      ...defaultOptionsEdges,
      id: 'e1-3-custom-diagram1',
      source: '1',
      target: '3-custom-diagram1',
      sourceHandle: 'c',
      targetHandle: 'd'
    },
    {
      ...defaultOptionsEdges,
      id: 'e3-custom-diagram1-2',
      source: '3-custom-diagram1',
      target: '2',
      sourceHandle: 'b',
      targetHandle: 'c'
    },
    { ...defaultOptionsEdges, id: 'e2-1', source: '2', target: '1', sourceHandle: 'd', targetHandle: 'b' }
  ],
  [ProfitDiagramType.Platform]: [
    {
      ...defaultOptionsEdges,
      id: 'e1-2-custom-diagram2',
      source: '1',
      target: '2-custom-diagram2',
      sourceHandle: 'b',
      targetHandle: 'd'
    },
    {
      ...defaultOptionsEdges,
      id: 'e2-custom-diagram2-3',
      source: '2-custom-diagram2',
      target: '3',
      sourceHandle: 'b',
      targetHandle: 'd'
    },
    {
      ...defaultOptionsEdges,
      id: 'e4-2-custom-diagram2',
      source: '4',
      target: '2-custom-diagram2',
      sourceHandle: 'c',
      targetHandle: 'a'
    },

    {
      ...defaultOptionsEdges,
      id: 'e3-3-1-custom-diagram2',
      source: '3',
      target: '3-1-custom-diagram2',
      sourceHandle: 'c',
      targetHandle: 'a'
    },
    {
      ...defaultOptionsEdges,
      id: 'e3-1-1-custom-diagram2',
      source: '3-1-custom-diagram2',
      target: '1',
      sourceHandle: 'a',
      targetHandle: 'c'
    }
  ],
  [ProfitDiagramType.Brokerage]: [
    { ...defaultOptionsEdges, id: 'e4-2', source: '4', target: '2', sourceHandle: 'd', targetHandle: 'a40' },
    { ...defaultOptionsEdges, id: 'e2-3', source: '2', target: '3', sourceHandle: 'b', targetHandle: 'd' },
    { ...defaultOptionsEdges, id: 'e3-4', source: '3', target: '4', sourceHandle: 'a60', targetHandle: 'b' },
    {
      ...defaultOptionsEdges,
      id: 'e4-1',
      source: '4',
      target: '1-custom-diagram3',
      sourceHandle: 'c',
      targetHandle: 'a'
    },

    {
      ...defaultOptionsEdges,
      type: 'customEdgeStraight',
      id: 'e1-custom-diagram3-2',
      source: '1-custom-diagram3',
      target: '2',
      sourceHandle: 'd',
      targetHandle: 'a60'
    },
    {
      ...defaultOptionsEdges,
      type: 'customEdgeStraight',
      id: 'e1-custom-diagram3-3',
      source: '1-custom-diagram3',
      target: '3',
      sourceHandle: 'b',
      targetHandle: 'a40'
    }
  ]
}

export const initialNodes = {
  [ProfitDiagramType.DirectSelling]: [
    {
      id: '1',
      type: TYPE_NODE.input,
      position: { x: 0, y: 0 },
      data: {
        name: '',
        placeholder: '회사명 입력'
      }
    },
    {
      id: '2',
      type: TYPE_NODE.input,
      position: { x: 800, y: 0 },
      data: {
        name: '',
        placeholder: '고객'
      }
    },
    {
      id: '3-custom-diagram1',
      type: TYPE_NODE.input,
      position: { x: 400, y: 220 },
      data: {
        name: '',
        placeholder: '제품/서비스명 입력'
      }
    },

    {
      id: '1-3',
      type: TYPE_NODE.inputNote,
      position: { x: 166, y: 180 },
      data: {
        name: '',
        icon: 'info',
        placeholder: '생산 방식 입력'
      }
    },
    {
      id: '3-2',
      type: TYPE_NODE.inputNote,
      position: { x: 702, y: 180 },
      data: {
        name: '',
        icon: 'check',
        placeholder: '유통 채널 입력'
      }
    },
    {
      id: '2-1',
      type: TYPE_NODE.inputNote,
      position: { x: 432, y: -40 },
      data: {
        name: '',
        icon: 'check',
        placeholder: '₩ 구입비용'
      }
    }
  ],
  [ProfitDiagramType.Platform]: [
    {
      id: '1',
      type: TYPE_NODE.input,
      position: { x: -500, y: 0 },
      data: {
        name: '',
        placeholder: '회사명 입력'
      }
    },
    {
      id: '2-custom-diagram2',
      type: TYPE_NODE.input,
      position: { x: 0, y: 0 },
      data: {
        name: '',
        placeholder: '플랫폼 서비스 명'
      }
    },
    {
      id: '3',
      type: TYPE_NODE.input,
      position: { x: 500, y: 0 },
      data: {
        name: '',
        placeholder: '고객'
      }
    },
    {
      id: '4',
      type: TYPE_NODE.input,
      position: { x: 0, y: -250 },
      data: {
        name: '',
        placeholder: '공급자'
      }
    },

    {
      id: '4-2',
      type: TYPE_NODE.inputNote,
      position: { x: 32, y: -115 },
      data: {
        name: '',
        placeholder: '제공 내역 입력'
      }
    },
    {
      id: '1-2',
      type: TYPE_NODE.inputNote,
      position: { x: -218, y: 62 },
      data: {
        name: '',
        placeholder: '생산 방식 입력'
      }
    },
    {
      id: '2-3',
      type: TYPE_NODE.inputNote,
      position: { x: 285, y: 62 },
      data: {
        name: '',
        placeholder: '유통 채널 입력'
      }
    },
    {
      id: '3-1-custom-diagram2',
      type: TYPE_NODE.inputNote,
      position: { x: 34, y: 250 },
      data: {
        name: '',
        icon: 'check',
        styles: { top: '-38px' },
        placeholder: '구입 비용'
      }
    }
  ],
  [ProfitDiagramType.Brokerage]: [
    {
      id: '1-custom-diagram3',
      type: TYPE_NODE.input,
      position: { x: 0, y: 0 },
      data: {
        name: '',
        placeholder: '플랫폼 서비스 명'
      }
    },
    {
      id: '2',
      type: TYPE_NODE.input,
      position: { x: -340, y: 240 },
      data: {
        name: '',
        placeholder: '공급자'
      }
    },
    {
      id: '3',
      type: TYPE_NODE.input,
      position: { x: 340, y: 240 },
      data: {
        name: '',
        placeholder: '고객'
      }
    },
    {
      id: '4',
      type: TYPE_NODE.input,
      position: { x: 0, y: -240 },
      data: {
        name: '',
        placeholder: '회사명 입력'
      }
    },

    {
      id: '2-3',
      type: TYPE_NODE.inputNote,
      position: { x: 30, y: 300 },
      data: {
        name: '',
        placeholder: '제공 내역 입력'
      }
    },
    {
      id: '4-1',
      type: TYPE_NODE.inputNote,
      position: { x: 145, y: -112 },
      data: {
        name: '',
        placeholder: '생산 방식 입력'
      }
    },
    {
      id: '4-2',
      type: TYPE_NODE.inputNote,
      position: { x: -440, y: -60 },
      data: {
        name: '',
        icon: 'check',
        styles: { left: 'unset', right: '-50px', bottom: '5px' },
        placeholder: '수수료 내용'
      }
    },
    {
      id: '3-4',
      type: TYPE_NODE.inputNote,
      position: { x: 506, y: -60 },
      data: {
        name: '',
        icon: 'check',
        styles: { left: '-24px', bottom: '5px' },
        placeholder: '구입 비용'
      }
    },
    {
      id: '1-2',
      type: TYPE_NODE.inputNote,
      position: { x: -172, y: 120 },
      data: {
        name: '',
        placeholder: '유통 채널 입력'
      }
    },
    {
      id: '1-3',
      type: TYPE_NODE.inputNote,
      position: { x: 240, y: 120 },
      data: {
        name: '',
        placeholder: '유통 채널 입력'
      }
    }
  ]
}
