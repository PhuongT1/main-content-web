import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { useReactFlow, Node } from 'reactflow'
import { useRecoilState } from 'recoil'
import { ColorResult, TwitterPicker } from 'react-color'
import ArrowDownIcon from '@/assets/icons/arrow-down'
import ColorIcon from '@/assets/icons/team-building/color'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import { toolbarEditorSelector, selectedCompetitorNodeSelector } from '@/atoms/home/competitor-analysis'
import styles from './style.module.scss'

const colors = ['#34A853', '#9B65F2', '#F8BA1A', '#3C82F9', '#EA3939']

type TColorPicker = {}
function ColorPicker({}: TColorPicker) {
  const [isShowColorPicker, setShowColorPicker] = useState(false)
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)
  const [selectedNode] = useRecoilState(selectedCompetitorNodeSelector)
  const { setNodes } = useReactFlow()

  // =====
  const handleChangeColor = (color: ColorResult) => {
    const { hex } = color
    setDataToolbar((prev) => ({ ...prev, color: hex }))
    setNodes((prev: Node<EditorNodeList>[]) => {
      return [...prev]?.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              data: { ...node.data, colorLogo: hex }
            }
          : node
      )
    })
  }

  // =====
  return (
    <Box component={'div'}>
      <IconButton className={styles.toolbar_color_wrapper} onClick={() => setShowColorPicker((prev) => !prev)}>
        {dataToolbar.color ? (
          <Box width={21} height={20} borderRadius={'6px'} bgcolor={dataToolbar.color} />
        ) : (
          <ColorIcon svgProps={{ width: 21, height: 20 }} />
        )}
        <ArrowDownIcon svgProps={{ width: 10, height: 6 }} pathProps={{ strokeWidth: 1 }} />
      </IconButton>

      {isShowColorPicker && (
        <Box onMouseLeave={() => setShowColorPicker(false)} className={styles.toolbar_color_picker}>
          <TwitterPicker colors={colors} onChange={handleChangeColor} />
        </Box>
      )}
    </Box>
  )
}

export default ColorPicker
