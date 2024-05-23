import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Home } from '@mui/icons-material'
import { Box, Button, Divider, Stack, SxProps } from '@mui/material'
import { ReactElement } from 'react'
import styles from './style.module.scss'

interface IBreadcrumbItem {
  icon: ReactElement
  title: string
}

interface IProjectHeader {
  sxBox?: SxProps
  title: string
  list?: IBreadcrumbItem[]
}

const ProjectHeader = ({ sxBox, title, list }: IProjectHeader) => {
  return (
    <Stack>
      <Box component={'div'} className={styles.step_header} sx={{ ...sxBox }}>
        <Box component={'div'} className={styles.title}>
          <Typography
            cate='title_60'
            sx={{
              fontSize: convertToRem(30)
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box component={'div'} className={styles.title}>
          <Button startIcon={<Home stroke='#ffffff' />}>프로젝트 Home</Button>
          {list?.map((item: IBreadcrumbItem) => (
            <Button key={item.title} startIcon={item.icon}>
              {item.title}
            </Button>
          ))}
        </Box>
      </Box>
      <Divider
        flexItem
        orientation='horizontal'
        sx={{
          marginBottom: convertToRem(40)
        }}
      />
    </Stack>
  )
}

export default ProjectHeader
