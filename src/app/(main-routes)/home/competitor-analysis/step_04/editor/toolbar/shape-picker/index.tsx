import { Box, IconButton } from '@mui/material'
import ArrowDownIcon from '@/assets/icons/arrow-down'
import RoudedIcon from '@/assets/icons/team-building/rounded'
import styles from './style.module.scss'

type TShapePicker = {}
function ShapePicker({}: TShapePicker) {
  return (
    <Box component={'div'}>
      <IconButton className={styles.toolbar_shape_wrapper}>
        <RoudedIcon svgProps={{ width: 20, height: 20 }} />
        <ArrowDownIcon svgProps={{ width: 10, height: 6 }} pathProps={{ strokeWidth: 1 }} />
      </IconButton>
    </Box>
  )
}

export default ShapePicker
