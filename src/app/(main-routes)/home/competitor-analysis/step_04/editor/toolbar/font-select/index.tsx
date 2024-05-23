import { useRecoilState } from 'recoil'
import { useReactFlow, Node } from 'reactflow'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { toolbarEditorSelector, selectedCompetitorNodeSelector } from '@/atoms/home/competitor-analysis'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import ArrowDownIcon from '@/assets/icons/arrow-down'
import { convertToRem } from '@/utils/convert-to-rem'

type TFontSelect = {}
function FontSelect({}: TFontSelect) {
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)
  const [selectedNode] = useRecoilState(selectedCompetitorNodeSelector)
  const { setNodes } = useReactFlow()

  // =====
  const handleChangeSelectFont = (e: SelectChangeEvent) => {
    const fontSize = e.target.value || ''
    setDataToolbar({ ...dataToolbar, fontSize })
    setNodes((prev: Node<EditorNodeList>[]) => {
      return [...prev]?.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              data: { ...node.data, fontSizeInputLogo: fontSize }
            }
          : node
      )
    })
  }

  // =====
  return (
    <Select
      disableUnderline
      sx={{
        color: '#000',
        '.MuiSelect-select': { fontSize: convertToRem(14), paddingRight: `4px !important` },
        '&:hover': { border: 'none' }
      }}
      onChange={handleChangeSelectFont}
      value={dataToolbar.fontSize}
      variant='standard'
      IconComponent={() => <ArrowDownIcon svgProps={{ width: 12 }} pathProps={{ strokeWidth: 1 }} />}
    >
      <MenuItem value='18px'>Large text</MenuItem>
      <MenuItem value='16px'>Normal text</MenuItem>
      <MenuItem value='14px'>Small text</MenuItem>
    </Select>
  )
}

export default FontSelect
