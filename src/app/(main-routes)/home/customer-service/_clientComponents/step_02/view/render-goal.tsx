import Box from '@mui/material/Box'
import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { Goal } from '@/types/customer-service.type'

export interface RenderGoalProps {
  item: Goal
}

const RenderGoal = ({ item }: RenderGoalProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Grid item xs={12} alignItems='center' display={'flex'}>
      <Box
        sx={{
          wordBreak: 'break-word',
          bgcolor: home.gray300,
          borderRadius: remConvert('10px'),
          padding: remConvert('14px 20px'),
          display: 'flex',
          flex: 1,
          alignItems: 'center'
        }}
      >
        <Box
          component={'div'}
          display={'inline-flex'}
          alignItems={'center'}
          columnGap={remConvert('12px')}
          justifyContent={'space-between'}
          flex={'1 0 0'}
        >
          <Typography
            bgcolor={home.blue500}
            padding={remConvert('4px 10px')}
            borderRadius={remConvert('6px')}
            fontWeight={600}
          >
            {item.selectCategory}
          </Typography>
          <TooltipTitle title={item.inputGoal} />
        </Box>
      </Box>
    </Grid>
  )
}
export default RenderGoal
