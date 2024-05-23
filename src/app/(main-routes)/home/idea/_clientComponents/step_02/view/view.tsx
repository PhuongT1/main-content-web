import { Method } from '@/constants/idea.constant'
import React from 'react'
import styles from './view.module.scss'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import CardIdeaItem from '../edit/cards-idea/card-item'
import { TooltipItem, TooltipTitle } from '@/components/home/tooltip-item'
import { ExpandItem } from '@/components/home/tip-item'

type TMethodPreviewProps = {
  icon: React.ReactNode | React.ReactElement
  title: React.ReactNode
  description: React.ReactNode
  duplicateNode: React.ReactNode
  sectionTitle: React.ReactNode
}

function MethodView({ icon, title, description, duplicateNode, sectionTitle }: TMethodPreviewProps) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        border: `1px solid ${home.gray200}`
      }}
      className={styles.preview}
    >
      <Box component={'div'} sx={{ backgroundColor: home.gray300 }} className={styles.preview_top}>
        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
          {icon}
          <Typography component={'div'} className={styles.preview_top_left_text} color={home.gray50}>
            {sectionTitle}
          </Typography>
        </Box>
        <Divider sx={{ height: '60px', alignSelf: 'center', borderColor: home.gray200 }} orientation='vertical' flexItem />
        <Box
          height={1}
          flex={'1 0 0'}
          justifyContent={'space-between'}
          display={'flex'}
          alignItems={'center'}
          gap={'16px'}
        >
          <Box display={'flex'} height={1} justifyContent={'start'} flexDirection={'column'} flex={1} gap={'10px'}>
            {title}
            <ExpandItem line={2} content={<>{description}</>} />
          </Box>
        </Box>
      </Box>
      <Box
        width={1}
        component={'div'}
        display={'flex'}
        gap={'40px'}
        alignItems={'start'}
        justifyContent={'space-between'}
      >
        <CardIdeaItem />
        <Box component={'div'} alignSelf={'center'}>
          {React.cloneElement(icon as React.ReactElement, {
            svgProps: { width: 48, height: 48 }
          })}
        </Box>
        {duplicateNode}
      </Box>
    </Box>
  )
}

export default MethodView
