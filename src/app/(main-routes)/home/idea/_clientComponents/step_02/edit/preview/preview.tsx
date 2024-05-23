import { Method } from '@/constants/idea.constant'
import React from 'react'
import styles from './preview.module.scss'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { modeCalculationIdeaSelector } from '@/atoms/home/idea'
import { CaculationModeEnum } from '@/types/idea.type'
import { ExpandItem } from '@/components/home/tip-item'
import CardIdeaItem from '../cards-idea/card-item'
import { useLanguage } from '@/hooks/use-language'

type TMethodPreviewProps = {
  icon: React.ReactNode | React.ReactElement
  method: keyof typeof Method
  title: React.ReactNode
  description: React.ReactNode
  duplicateNode: React.ReactNode
  sectionTitle: React.ReactNode
}

function MethodPreview({ icon, title, description, duplicateNode, sectionTitle, method }: TMethodPreviewProps) {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const [, setActiveMode] = useRecoilState(modeCalculationIdeaSelector)

  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: home.gray300,
        // borderColor: home.gray200
      }}
      className={styles.preview}
    >
      <Box
        sx={{
          backgroundColor: home.gray300
        }}
        component={'div'}
        className={styles.preview_top}
      >
        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
          {icon}
          <Typography component={'div'} className={styles.preview_top_left_text} color={home.gray50}>
            {sectionTitle}
          </Typography>
        </Box>
        <Divider sx={{ height: '60px', alignSelf: 'center', bgcolor: home.gray200, borderColor: home.gray200 }} orientation='vertical' flexItem />
        <Box flex={'1 0 0'} justifyContent={'space-between'} display={'flex'} alignItems={'center'} gap={'16px'}>
          <Box display={'flex'} flexDirection={'column'} flex={1} gap={'10px'}>
            {title}

            <ExpandItem line={2} content={<>{description}</>} />
          </Box>
          <Button
            size='small'
            onClick={() => setActiveMode((prev) => ({ ...prev, [method]: CaculationModeEnum.EDIT }))}
            sx={{
              backgroundColor: home.gray200,
              color: home.gray50
            }}
            className={styles.preview_edit_button}
          >
            {dict.idea_edit}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ alignSelf: 'center', width: 'calc(100% - 40px)', bgcolor: home.gray200, borderColor: home.gray200 }} orientation='horizontal' flexItem />
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

export default MethodPreview
