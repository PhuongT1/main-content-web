import { useRecoilState } from 'recoil'
import { IconButton } from '@mui/material'
import { useReactFlow, Node } from 'reactflow'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import { selectedCompetitorNodeSelector, toolbarEditorSelector } from '@/atoms/home/competitor-analysis'
import BoldIcon from '@/assets/icons/team-building/bold'

type TBoldTextProps = {}
function BoldText({}: TBoldTextProps) {
  const { setNodes } = useReactFlow()
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)
  const [selectedNode] = useRecoilState(selectedCompetitorNodeSelector)
  const isBold = Boolean(dataToolbar.fontWeight === 'bold')

  // =====
  const handleClickFontWeightText = () => {
    const fontWeight = isBold ? 'normal' : 'bold'
    setDataToolbar({ ...dataToolbar, fontWeight })
    setNodes((prev: Node<EditorNodeList>[]) => {
      return [...prev]?.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              data: { ...node.data, fontWeightInputLogo: fontWeight }
            }
          : node
      )
    })
  }

  // =====
  return (
    <IconButton
      sx={{
        backgroundColor: isBold ? '#ccc' : 'transparent',
        '&:hover': {
          backgroundColor: isBold ? '#ccc' : 'transparent'
        },
        p: 0,
        width: 30,
        height: 30,
        borderRadius: '4px'
      }}
      onClick={handleClickFontWeightText}
    >
      <BoldIcon svgProps={{ width: 20, height: 20 }} />
    </IconButton>
  )
}

export default BoldText
