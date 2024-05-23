import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useReactFlow, Node } from 'reactflow'
import { Box, IconButton, useTheme } from '@mui/material'
import { selectedCompetitorNodeSelector, toolbarEditorSelector } from '@/atoms/home/competitor-analysis'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import ImageUploadIcon from '@/assets/icons/team-building/image-upload'
import TrashIcon from '@/assets/icons/team-building/trash'
import TwoWayArrowIcon from '@/assets/icons/team-building/arrow-two-way'
import { convertToRem } from '@/utils/convert-to-rem'
import { defaultNodeCompetitor } from './../data'
import InventoryImages from '@/components/inventory-image'
import SelectFont from './font-select'
import BoldText from './bold-text'
import ShapePicker from './shape-picker'
import ColorPicker from './color-picker'
import styles from './style.module.scss'

type TToolbarProps = {}
function Toolbars({}: TToolbarProps) {
  const styleDisabled = { cursor: 'default', opacity: 0.4 }
  const { palette } = useTheme()
  const { setNodes } = useReactFlow()
  const [selectedNode, setSelectNode] = useRecoilState(selectedCompetitorNodeSelector)
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)
  const [showInventory, setToggleShowInventory] = useState(false)

  // =====
  const onClearNode = () => {
    if (!selectedNode) return
    setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode))
    setSelectNode('')
  }

  const handleUploadImageComplete = (urlImageLogo = '') => {
    setDataToolbar((prev) => ({ ...prev, color: '', fontSize: '16px', fontWeight: 'normal' }))
    setNodes((prev: Node<EditorNodeList>[]) => {
      return [
        ...prev,
        {
          ...defaultNodeCompetitor,
          id: `${prev.length + 1}`,
          position: { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) },
          data: {
            ...defaultNodeCompetitor.data,
            colorLogo: dataToolbar.color || '#252629',
            fontSizeInputLogo: dataToolbar.fontSize || '16px',
            fontWeightInputLogo: dataToolbar.fontWeight || 'normal',
            urlLogo: urlImageLogo || ''
          }
        }
      ]
    })
  }

  // =====
  return (
    <>
      <Box className={styles.toolbar} sx={{ backgroundColor: palette.home.gray50 }}>
        <Box
          className={styles.toolbar_item}
          sx={{ paddingLeft: convertToRem(8), '.MuiButtonBase-root': { ...styleDisabled } }}
        >
          <ShapePicker />
        </Box>
        <Box className={styles.toolbar_item} sx={{ paddingLeft: convertToRem(8) }}>
          <ColorPicker />
        </Box>

        <Box className={styles.toolbar_item}>
          <SelectFont />
        </Box>

        <Box className={styles.toolbar_item}>
          <BoldText />
        </Box>

        <Box className={styles.toolbar_item}>
          <IconButton sx={{ ...styleDisabled }}>
            <TwoWayArrowIcon />
          </IconButton>
          <IconButton component='label' onClick={() => setToggleShowInventory(true)}>
            <ImageUploadIcon />
          </IconButton>
          <IconButton onClick={onClearNode}>
            <TrashIcon />
          </IconButton>
        </Box>
      </Box>

      <InventoryImages
        multiple={false}
        open={showInventory}
        onClose={() => setToggleShowInventory(false)}
        setImages={(images: string[]) => {
          images?.[0] && handleUploadImageComplete(images[0])
          setToggleShowInventory(false)
        }}
      />
    </>
  )
}

export default Toolbars
