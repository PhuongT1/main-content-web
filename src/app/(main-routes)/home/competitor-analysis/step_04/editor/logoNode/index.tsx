import { memo } from 'react'
import { useRecoilState } from 'recoil'
import Image from 'next/image'
import { Box, useTheme } from '@mui/material'
import { NodeProps } from 'reactflow'
import { EditorNodeList } from '@/types/competitor-analysis.type'
import { selectedCompetitorNodeSelector, toolbarEditorSelector } from '@/atoms/home/competitor-analysis'
import InputNodeDiagram from '../../../_components/input_node_diagram'
import styles from './style.module.scss'

function LogoNode({ data, id }: NodeProps<EditorNodeList>) {
  const [dataToolbar, setDataToolbar] = useRecoilState(toolbarEditorSelector)
  const [selectedNode, setSelectedNode] = useRecoilState(selectedCompetitorNodeSelector)
  const { palette } = useTheme()

  // =====
  const handleClickNode = () => {
    setSelectedNode(id)
    setDataToolbar({
      ...dataToolbar,
      color: data?.colorLogo || '',
      fontSize: data?.fontSizeInputLogo || '16px',
      fontWeight: data?.fontWeightInputLogo || 'normal'
    })
  }

  // =====
  return (
    <Box
      onClick={handleClickNode}
      sx={{ background: palette.home.gray0, borderColor: palette.home.gray100 }}
      className={`custom-drag-logo ${styles.logo_wrapper} ${selectedNode === id ? styles.logo_active : ''}`}
    >
      <Box display={'flex'} justifyContent={'center'}>
        <Image width={60} height={60} src={data?.urlLogo ?? ''} alt={`logo-${data?.urlLogo ?? ''}`} />
      </Box>
      <Box
        className={styles.logo_text}
        sx={{ input: { fontSize: data.fontSizeInputLogo, fontWeight: data.fontWeightInputLogo } }}
      >
        <Box className={styles.logo_circle} sx={{ background: data.colorLogo }} />
        <InputNodeDiagram
          className={styles.logo_input}
          placeholder='내용 입력'
          value={data?.name}
          name={'name'}
          id={id}
        />
      </Box>
    </Box>
  )
}

export default memo(LogoNode)
