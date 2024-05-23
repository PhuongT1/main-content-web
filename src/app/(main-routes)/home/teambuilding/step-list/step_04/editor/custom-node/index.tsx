import { selectedNodeSelector, toolbarEditorSelector } from '@/atoms/home/teambuilding'
import MenuPopover from '@/components/home/menu-popover'
import { EDGE_DOT, EDITOR } from '@/constants/teambuilding/teambuilding.constant'
import { IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import { CSSProperties, ChangeEvent, useState } from 'react'
import { Handle, NodeProps, Position, Node as TNode, useReactFlow } from 'reactflow'
import { useRecoilState, useRecoilValue } from 'recoil'

import ColorIcon from '@/assets/icons/team-building/color'
import { EditorNodeList } from '@/types/teambuilding/index.type'
import { MAXLENGTH_VALIDATE } from '../../../../utils/validate'
import SelectTToolbar from '../toolbar/font-select'
import styles from './custom-node.module.scss'
import BoldText from '../toolbar/bold-text'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'

export const Node = ({ data, id, targetPosition, isConnectable, sourcePosition }: NodeProps<EditorNodeList>) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { setNodes } = useReactFlow()
  const [open, setOpen] = useState<'ROW_1' | 'ROW_2' | 'ROW_3' | string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null)

  const [selectdNode, setSelectNode] = useRecoilState(selectedNodeSelector)

  const editorToolbar = useRecoilValue(toolbarEditorSelector)

  const onClose = () => {
    setOpen('')
  }

  const updateData = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
    const inputVal = (evt.target as HTMLInputElement).value
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [key]: inputVal
            }
          }
        }
        return node
      })
    )
  }

  const updateStyleRow = ({ style, id, indexOfRow = 0 }: { style: CSSProperties; id: string; indexOfRow: number }) => {
    setNodes((nodes: TNode<EditorNodeList>[]) => {
      const currentNodeIndex = nodes.findIndex((node) => node.id === id)
      if (currentNodeIndex === -1) {
        return nodes
      }
      const newNodes = nodes.map((node) => {
        const newStyles = [...node.data.styles]
        newStyles[indexOfRow] = { ...node.data.styles[indexOfRow], ...style }
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              styles: newStyles
            }
          }
        }
        return node
      })

      return newNodes
    })
  }

  const onSelectedNode = (e: React.MouseEvent<HTMLTableElement>) => {
    // if (e.target === e.currentTarget) {
    setSelectNode(id)
    // }
  }
  return (
    <div style={{ width: EDITOR.WIDTH_TABLE, height: EDITOR.HEIGHT_TABLE * 3 }}>
      <Handle
        style={{
          bottom: '-12%',
          width: EDGE_DOT,
          height: EDGE_DOT
        }}
        type='target'
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <table onClick={onSelectedNode} className={`${styles.table_node} ${selectdNode === id ? styles.active : ''}`}>
        <tbody>
          <tr>
            <td width={'100%'}>
              <Tooltip placement='top-end' title='오른쪽 마우스를 클릭 하여 컬러를 바꿔보세요'>
                <input
                  maxLength={MAXLENGTH_VALIDATE.ROLE}
                  className={styles.node_input}
                  onContextMenu={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    e.preventDefault()
                    setAnchorEl(e.currentTarget)
                    setOpen('ROW_1')
                  }}
                  value={data.position}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateData(e, 'position')}
                  style={{
                    fontSize: remConvert('16px'),
                    height: EDITOR.HEIGHT_TABLE,
                    color: home.base_white,
                    // borderWidth: 1.5,
                    // borderStyle: 'solid',
                    // borderColor: data.position ? 'transparent' : home.red500,
                    ...data.styles?.[0]
                  }}
                />
              </Tooltip>
              <MenuPopover
                onClose={onClose}
                sx={{ backgroundColor: home.base_white, height: 'auto', width: 'auto' }}
                disabledArrow
                anchorEl={anchorEl}
                open={open === 'ROW_1'}
              >
                <Stack alignItems={'center'} direction={'row'} gap={'10px'}>
                  <Tooltip placement='top-end' title='Cell Background'>
                    <IconButton
                      sx={{
                        color: home.base_black
                      }}
                      onClick={() => {
                        updateStyleRow({
                          id,
                          indexOfRow: 0,
                          style: {
                            backgroundColor: editorToolbar.color
                          }
                        })
                        onClose()
                      }}
                    >
                      <ColorIcon />
                    </IconButton>
                  </Tooltip>
                  <BoldText onClose={onClose} updateStyleRow={updateStyleRow} id={id} data={data} indexOfRow={0} />
                  <SelectTToolbar
                    onClose={onClose}
                    updateStyleRow={updateStyleRow}
                    id={id}
                    data={data}
                    indexOfRow={0}
                  />
                </Stack>
              </MenuPopover>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip placement='right-start' title='오른쪽 마우스를 클릭 하여 컬러를 바꿔보세요'>
                <input
                  onContextMenu={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    e.preventDefault()
                    setAnchorEl(e.currentTarget)
                    setOpen('ROW_2')
                  }}
                  maxLength={MAXLENGTH_VALIDATE.NAME}
                  className={styles.node_input}
                  value={data.name}
                  onChange={(e) => updateData(e, 'name')}
                  style={{
                    color: '#252629',
                    height: EDITOR.HEIGHT_TABLE,
                    backgroundColor: home.base_gray50
                    // borderWidth: 1.5,
                    // borderStyle: 'solid',
                    // borderColor: data.name ? 'transparent' : home.red500
                  }}
                />
              </Tooltip>
              <MenuPopover
                onClose={onClose}
                sx={{ backgroundColor: home.base_white, height: 'auto', width: 'auto' }}
                disabledArrow
                anchorEl={anchorEl}
                open={open === 'ROW_2'}
              >
                <Stack alignItems={'center'} direction={'row'} gap={'10px'}>
                  <BoldText onClose={onClose} updateStyleRow={updateStyleRow} id={id} data={data} indexOfRow={1} />

                  <SelectTToolbar
                    onClose={onClose}
                    updateStyleRow={updateStyleRow}
                    id={id}
                    data={data}
                    indexOfRow={1}
                  />
                </Stack>
              </MenuPopover>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip title='오른쪽 마우스를 클릭 하여 컬러를 바꿔보세요'>
                <input
                  onContextMenu={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    e.preventDefault()
                    setAnchorEl(e.currentTarget)
                    setOpen('ROW_3')
                  }}
                  className={styles.node_input}
                  maxLength={30}
                  value={data.desc}
                  onChange={(e) => updateData(e, 'desc')}
                  placeholder={dict.input_placeholders}
                  style={{
                    color: '#9498A3',
                    height: EDITOR.HEIGHT_TABLE,
                    backgroundColor: home.base_gray50
                  }}
                />
              </Tooltip>
              <MenuPopover
                onClose={onClose}
                sx={{ backgroundColor: home.base_white, height: 'auto', width: 'auto' }}
                disabledArrow
                anchorEl={anchorEl}
                open={open === 'ROW_3'}
              >
                <Stack alignItems={'center'} direction={'row'} gap={'10px'}>
                  <BoldText onClose={onClose} updateStyleRow={updateStyleRow} id={id} data={data} indexOfRow={2} />
                  <SelectTToolbar
                    onClose={onClose}
                    updateStyleRow={updateStyleRow}
                    id={id}
                    data={data}
                    indexOfRow={2}
                  />
                </Stack>
              </MenuPopover>
            </td>
          </tr>
        </tbody>
      </table>
      <Handle
        style={{
          width: EDGE_DOT,
          height: EDGE_DOT,
          top: '-6%'
        }}
        type='source'
        position={Position.Top}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export const NodeView = ({ data, id, targetPosition, isConnectable, sourcePosition }: NodeProps<EditorNodeList>) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <div style={{ width: EDITOR.WIDTH_TABLE, height: EDITOR.HEIGHT_TABLE * 3 }}>
      <Handle
        style={{
          bottom: '-12%',
          width: EDGE_DOT,
          height: EDGE_DOT
        }}
        type='target'
        position={Position.Bottom}
        isConnectable={false}
      />
      <table className={styles.table_node}>
        <tbody>
          <tr>
            <td width={'100%'}>
              <input
                maxLength={MAXLENGTH_VALIDATE.ROLE}
                className={styles.node_input}
                disabled
                value={data.position}
                style={{
                  fontSize: '16px',
                  // fontWeight: 'bold',1
                  height: EDITOR.HEIGHT_TABLE,
                  color: home.base_white,
                  ...data.styles?.[0]
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                disabled
                maxLength={MAXLENGTH_VALIDATE.NAME}
                className={styles.node_input}
                value={data.name}
                style={{
                  color: '#252629',
                  height: EDITOR.HEIGHT_TABLE,
                  backgroundColor: home.base_gray50
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                disabled
                className={styles.node_input}
                maxLength={30}
                value={data.desc}
                placeholder={dict.input_placeholders}
                style={{
                  color: '#9498A3',
                  height: EDITOR.HEIGHT_TABLE,
                  backgroundColor: home.base_gray50
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Handle
        style={{
          width: EDGE_DOT,
          height: EDGE_DOT,
          top: '-4%'
        }}
        type='source'
        position={Position.Top}
        isConnectable={false}
      />
    </div>
  )
}
