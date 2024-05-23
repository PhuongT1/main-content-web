import { RequireChildren } from '@/types/types.type'
import { Box } from '@mui/material'

type SideListProps = { fetchNext: () => {} } & RequireChildren
const SideList = ({ children }: SideListProps) => {
  return <Box>{children}</Box>
}

export default SideList
