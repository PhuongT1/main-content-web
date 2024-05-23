import { Box, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import styles from './step_04.module.scss'
import treeIMageDark from '../../../../../../assets/images/team-buiding/tree_dark.png'
import treeIMageLight from '../../../../../../assets/images/team-buiding/tree_light.png'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { THEME_MODE } from '@/constants/common.constant'

function TreeOrganzation() {
  const {
    palette: { home }
  } = useTheme()
  const { themeMode } = useThemeMode()

  return (
    <Box
      my={'50px'}
      width={'100%'}
      component={'div'}
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={'55px'}
    >
      <Image
        width={312}
        height={117}
        alt=''
        quality={100}
        style={{
          objectFit: 'cover'
        }}
        src={themeMode === THEME_MODE.DARK ? treeIMageDark.src : treeIMageLight.src}
      />
      <Typography
        sx={{
          color: home.gray100
        }}
        className={styles.tree_organization_title}
      >
        Step 4 조직도 실습을 생략합니다.
      </Typography>
    </Box>
  )
}

export default TreeOrganzation
