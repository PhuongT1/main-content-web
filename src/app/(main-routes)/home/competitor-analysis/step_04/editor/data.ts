import { TYPE_NODE } from '@/constants/competitor-analysis'

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e3-4', source: '3', target: '4' }
]

export const initialNodes = [
  {
    id: '1',
    type: TYPE_NODE.input,
    dragHandle: '.custom-drag-input',
    position: { x: 400, y: 0 },
    data: {
      name: '',
      position: 'top'
    }
  },
  {
    id: '2',
    type: TYPE_NODE.input,
    dragHandle: '.custom-drag-input',
    position: { x: 400, y: 500 },
    data: {
      name: '',
      position: 'bottom'
    }
  },
  {
    id: '3',
    type: TYPE_NODE.input,
    dragHandle: '.custom-drag-input',
    position: { x: 0, y: 250 },
    data: {
      name: '',
      position: 'left'
    }
  },
  {
    id: '4',
    type: TYPE_NODE.input,
    dragHandle: '.custom-drag-input',
    position: { x: 800, y: 250 },
    data: {
      name: '',
      position: 'right'
    }
  }
]

export const defaultNodeCompetitor = {
  type: 'logoNode',
  dragHandle: '.custom-drag-logo',
  data: {
    name: '',
    position: '',
    colorLogo: '',
    urlLogo: '',
    fontSizeInputLogo: '16px',
    fontWeightInputLogo: 'normal'
  }
}
