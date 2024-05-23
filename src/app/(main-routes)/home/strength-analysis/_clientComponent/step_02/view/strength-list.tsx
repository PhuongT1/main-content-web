import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import ChipSA from '../../components/label'
import { TFormValuesType, TTypesSA } from '@/types/strength-analysis.type'
import CardType from '../../components/card'
import { useFormContext } from 'react-hook-form'

type Props = {
  list: TTypesSA[]
}

const StrenghtList = ({ list }: Props) => {
  const theme = useTheme()
  const {
    palette: { home }
  } = theme

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
      <Typography cate='title_3' fontWeight={700}>
        나와 어울리는 장점유형
      </Typography>
      <Box
        borderRadius={remConvert('10px')}
        padding={remConvert('16px 20px')}
        component={'div'}
        display={'flex'}
        flexWrap={'wrap'}
        gap={remConvert('16px')}
        bgcolor={home.gray300}
      >
        {list.map((item) => (
          <ChipSA key={item.id} item={item} isActive />
        ))}
      </Box>
      <Grid container display={'flex'} flexWrap={'wrap'} spacing={remConvert('20px')}>
        {list.map((item: TTypesSA) => (
          <Grid
            item
            key={item.strengthType}
            sx={{
              [theme.breakpoints.up(1601)]: {
                flexBasis: 'calc(100% / 4)',
                maxWidth: 'calc(100% / 4)'
              },
              [theme.breakpoints.down(1600)]: {
                flexBasis: 'calc(100% / 3)',
                maxWidth: 'calc(100% / 3)'
              },
              [theme.breakpoints.up(1200)]: {
                flexBasis: 'calc(100% / 2)',
                maxWidth: 'calc(100% / 2)'
              }
            }}
          >
            <CardType
              item={item}
              icon='checked'
              checkedProps={{
                rectProps: {
                  fill: home.purple
                }
              }}
              isActive
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default StrenghtList
