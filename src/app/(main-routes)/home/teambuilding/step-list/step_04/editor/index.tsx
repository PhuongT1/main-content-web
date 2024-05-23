import { Box, useTheme } from '@mui/material'

import styles from './editor.module.scss'

import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import OverviewFlow from './flow'

function OrganizationEditor({ onDispatchMessage }: { onDispatchMessage: VoidFunction }) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component={'div'} className={styles.editor_container} sx={{ backgroundColor: home.base_white }}>
      <ReactFlowProvider>
        <OverviewFlow onDispatchMessage={onDispatchMessage} />
      </ReactFlowProvider>
    </Box>
  )
}

export default OrganizationEditor
