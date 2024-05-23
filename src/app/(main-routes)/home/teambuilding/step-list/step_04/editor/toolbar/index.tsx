import React, { CSSProperties, Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import styles from './toolbar.module.scss'
import { Box, Button, IconButton, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import TableIcon from '@/assets/icons/team-building/table'
import PlusIcon from '@/assets/icons/plus'
import RoudedIcon from '@/assets/icons/team-building/rounded'
import ArrowDownIcon from '@/assets/icons/arrow-down'
import BoldIcon from '@/assets/icons/team-building/bold'
import TwoWayArrowIcon from '@/assets/icons/team-building/arrow-two-way'
import ImageIcon from '@/assets/icons/image'
import ImageUploadIcon from '@/assets/icons/team-building/image-upload'
import TrashIcon from '@/assets/icons/team-building/trash'
import ColorPicker from './color-picker'
import { EditorNodeList, MODE_TOOLBAR, TMode } from '@/types/teambuilding/index.type'
import Table from './table'
import { Edge, Node, useReactFlow, useUpdateNodeInternals } from 'reactflow'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedNodeSelector, toolbarEditorSelector } from '@/atoms/home/teambuilding'

type TToolbarProps = {
  onDispatchMessage: VoidFunction
  // setNodes: Dispatch<SetStateAction<Node<EditorNodeList>[]>>
  // setEdges: Dispatch<SetStateAction<Edge[]>>
}

function Toolbars({ onDispatchMessage }: TToolbarProps) {
  const {
    palette: { home }
  } = useTheme()

  const { setNodes, setEdges } = useReactFlow()

  const [editorToolbar, setEditorToolbar] = useRecoilState(toolbarEditorSelector)
  const [selectedNode, setSelectNode] = useRecoilState(selectedNodeSelector)

  const [mode, setMode] = useState<TMode | string>('')

  const handleClickOpen = (mode: TMode) => {
    setMode(mode)
  }

  const onClose = () => {
    setMode('')
  }

  const onClear = () => {
    if (!selectedNode) return
    setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode))
    setEdges((edges: Edge[]) =>
      edges.filter((edge: Edge) => edge.source !== selectedNode || edge.target !== selectedNode)
    )
    setSelectNode('')
  }

  return (
    <Box component={'div'} className={styles.toolbar} sx={{ backgroundColor: home.base_gray50 }}>
      <Box className={styles.toolbar_item}>
        <Table onDispatchMessage={onDispatchMessage} setNodes={setNodes} />
      </Box>

      <Box component={'div'} className={styles.toolbar_item}>
        <ColorPicker onClose={onClose} handleClickOpen={handleClickOpen} mode={mode} />
      </Box>
      <Box component={'div'} className={styles.toolbar_item}>
        <Select
          disableUnderline
          sx={{
            color: home.base_black,
            '& .MuiSelect-select': {
              paddingRight: '8px!important'
            },
            '&:hover': {
              border: 'none'
            }
          }}
          onChange={(e: SelectChangeEvent) => {
            setEditorToolbar({
              ...editorToolbar,
              fontSize: e.target.value
            })
          }}
          value={editorToolbar.fontSize}
          variant='standard'
          IconComponent={() => <ArrowDownIcon svgProps={{ width: 14 }} />}
        >
          <MenuItem value='18px'>Large text</MenuItem>
          <MenuItem value='16px'>Normal text</MenuItem>
          <MenuItem value='14px'>Small text</MenuItem>
        </Select>
      </Box>
      {/* <Box component={'div'} className={styles.toolbar_item}>
        <IconButton onClick={onBold}>
          <BoldIcon />
        </IconButton>
      </Box> */}
      {/* <Box component={'div'} className={styles.toolbar_item}>
        <TwoWayArrowIcon />
      </Box>
      <Box component={'div'} className={styles.toolbar_item}>
        <ImageUploadIcon />
      </Box> */}
      <Box component={'div'} className={styles.toolbar_item}>
        <IconButton onClick={onClear}>
          <TrashIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Toolbars
