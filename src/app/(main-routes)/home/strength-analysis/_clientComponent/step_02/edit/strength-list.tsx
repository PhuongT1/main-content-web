import { TTypesSA } from '@/types/strength-analysis.type'
import { Grid, useTheme } from '@mui/material'
import React from 'react'
import CardItemStrength from './components/card'
import { checkItemSelectedIndex } from '../../use-sa'
import { Typography } from '@/elements'
import GoldIcon from '@/assets/icons/strength-analysis/gold'
import SilverIcon from '@/assets/icons/strength-analysis/silver'
import CopperIcon from '@/assets/icons/strength-analysis/copper'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'
import InspiritIcon from '@/assets/icons/strength-analysis/inspirit'

type Props = {
  list: TTypesSA[]
  onClickSelect: (item: TTypesSA) => void
  selectActiveList: TTypesSA[][]
}

const StrenghtList = ({ list, onClickSelect, selectActiveList }: Props) => {
  const {
    breakpoints,
    palette: { home }
  } = useTheme()

  const renderContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Typography
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            gap={'8px'}
            cate='title_50'
            color={'#FFF49E'}
          >
            <GoldIcon />
            1위
          </Typography>
        )

      case 1:
        return (
          <Typography
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            gap={'8px'}
            cate='title_50'
            color={home.gray50}
          >
            <SilverIcon />
            2위
          </Typography>
        )

      case 2:
        return (
          <Typography
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            gap={'8px'}
            cate='title_50'
            color={'#D59256'}
          >
            <CopperIcon />
            3위
          </Typography>
        )
      case 3:
        return (
          <Typography
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            gap={'8px'}
            cate='title_50'
            color={home.gray50}
          >
            <InspiritIcon />
            4위
          </Typography>
        )

      default:
        return null
    }
  }

  return (
    <Grid container spacing={'20px'}>
      {list.map((item, index) => {
        const selectedIndex = checkItemSelectedIndex(item, selectActiveList)
        return (
          <Grid
            item
            key={item.strengthType}
            xs={12}
            sx={{
              [breakpoints.up(1601)]: {
                flexBasis: 'calc(100% / 5)',
                maxWidth: 'calc(100% / 5)'
              },
              [breakpoints.down(1600)]: {
                flexBasis: 'calc(100% / 4)',
                maxWidth: 'calc(100% / 4)'
              },
              [breakpoints.up(1200)]: {
                flexBasis: 'calc(100% / 2)',
                maxWidth: 'calc(100% / 2)'
              }
            }}
          >
            <CardItemStrength
              type={STRENGTH_TYPE.strength}
              isSelected={selectedIndex >= 0}
              content={renderContent(selectedIndex)}
              item={item}
              buttonProps={{
                onClick: () => onClickSelect(item)
              }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default StrenghtList