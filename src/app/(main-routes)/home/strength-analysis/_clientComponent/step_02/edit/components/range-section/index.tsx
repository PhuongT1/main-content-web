import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, styled, useTheme } from '@mui/material'
import React, { Fragment } from 'react'
import { EmptyCard, PlusCard, TitleCard } from '../box-place'
import GoldIcon from '@/assets/icons/strength-analysis/gold'
import { Typography } from '@/elements'
import SilverIcon from '@/assets/icons/strength-analysis/silver'
import CopperIcon from '@/assets/icons/strength-analysis/copper'
import InspiritIcon from '@/assets/icons/strength-analysis/inspirit'
import { KeyStrengthType, TFormValuesRangeType, TTypesSA } from '@/types/strength-analysis.type'
import CardItemStrength from '../card'
import { get, useFormContext } from 'react-hook-form'
import { useResponsive } from '@/hooks/use-responsive'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'

type Props = {
  description?: React.ReactNode
  handleClick?: (rangeIndex: number, indexBox: number) => void
  onRemove?: (rangeIndex: number, indexBox: number, type: KeyStrengthType) => void
  currentActive?: number[]
  selectActiveList: TTypesSA[][]
  type: KeyStrengthType
  isHover?: boolean
  isView?: boolean
}

const GridItem = styled(Grid)(({ theme: { breakpoints } }) => ({
  [breakpoints.up(1401)]: {
    flexBasis: 'calc(100% / 4)',
    maxWidth: 'calc(100% / 4)'
  },
  [breakpoints.down(1400)]: {
    flexBasis: 'calc(100% / 2)',
    maxWidth: 'calc(100% / 2)'
  }
}))

const RangeSection = ({
  description,
  handleClick,
  isHover,
  currentActive = [],
  selectActiveList = [],
  type,
  isView,
  onRemove
}: Props) => {
  const {
    palette: { home }
  } = useTheme()

  const lgUp = useResponsive('up', 1700)

  const {
    formState: { errors }
  } = useFormContext<TFormValuesRangeType>()

  const equalsCheck = (a: number[], b: number[]) => {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  const renderItem = (rangeIndex: number, index: number) => {
    if (rangeIndex < 0 || index < 0 || !type) return <></>

    return selectActiveList?.[rangeIndex]?.[index]?.id ? (
      <CardItemStrength
        type={type}
        onRemove={() => onRemove && onRemove(rangeIndex, index, type)}
        isHover={isHover}
        isSelected={false}
        item={selectActiveList[rangeIndex][index]}
        {...(type === STRENGTH_TYPE.weakness && {
          sxBox: {
            backgroundColor: home.alpha_gray_50,
            border: `1px solid ${home.gray300}`
          }
        })}
      />
    ) : (
      <PlusCard
        active={equalsCheck(currentActive, [rangeIndex, index])}
        error={!!get(errors, type)}
        onClick={() => handleClick && handleClick(rangeIndex, index)}
      />
    )
  }

  const renderLastItem = () => {
    const lastIndex = 3
    return (
      <>
        {Array(4)
          .fill('')
          .map((_, index) => {
            if (selectActiveList.length === lastIndex + 1) {
              return <Fragment key={index}>{renderItem(lastIndex, index)}</Fragment>
            }
            return <EmptyCard key={index} />
          })}
      </>
    )
  }

  return (
    <Box
      component={'div'}
      sx={{
        padding: remConvert('20px'),
        borderRadius: remConvert('10px'),
        backgroundColor: isView ? home.gray300 : home.gray400,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid container spacing={lgUp ? remConvert('120px') : remConvert('20px')}>
        <GridItem item xs={12}>
          <Box
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={remConvert('20px')}
          >
            <TitleCard
              {...(isView && {
                sxBox: {
                  backgroundColor: home.gray400
                }
              })}
              icon={<GoldIcon />}
              title={
                <Box component={'div'} display={'flex'} alignItems={'center'} gap={remConvert('6px')}>
                  <Typography cate='title_50' color={'#FFF49E'}>
                    1위
                  </Typography>
                  <Typography component={'span'} cate='body_30' color={home.gray100}>
                    (선택 1개)
                  </Typography>
                </Box>
              }
            />
            {renderItem(0, 0)}
            {description}
          </Box>
        </GridItem>
        <GridItem item xs={12}>
          <Box
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={remConvert('20px')}
          >
            <TitleCard
              {...(isView && {
                sxBox: {
                  backgroundColor: home.gray400
                }
              })}
              icon={<SilverIcon />}
              title={
                <Box component={'div'} display={'flex'} alignItems={'center'} gap={remConvert('6px')}>
                  <Typography cate='title_50' color={home.gray50}>
                    2위
                  </Typography>
                  <Typography component={'span'} cate='body_30' color={home.gray100}>
                    (선택 2개)
                  </Typography>
                </Box>
              }
            />
            {renderItem(1, 0)}
            {renderItem(1, 1)}
          </Box>
        </GridItem>
        <GridItem item xs={12}>
          <Box
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={remConvert('20px')}
          >
            <TitleCard
              {...(isView && {
                sxBox: {
                  backgroundColor: home.gray400
                }
              })}
              icon={<CopperIcon />}
              title={
                <Box component={'div'} display={'flex'} alignItems={'center'} gap={remConvert('6px')}>
                  <Typography cate='title_50' color={'#D59256'}>
                    3위
                  </Typography>
                  <Typography component={'span'} cate='body_30' color={home.gray100}>
                    (선택 3개)
                  </Typography>
                </Box>
              }
            />
            {renderItem(2, 0)}
            {renderItem(2, 1)}
            {renderItem(2, 2)}
          </Box>
        </GridItem>
        <GridItem item xs={12}>
          <Box
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={remConvert('20px')}
          >
            <TitleCard
              {...(isView && {
                sxBox: {
                  backgroundColor: home.gray400
                }
              })}
              icon={<InspiritIcon />}
              title={
                <Box component={'div'} display={'flex'} alignItems={'center'} gap={remConvert('6px')}>
                  <Typography cate='title_50' color={home.gray50}>
                    4위
                  </Typography>
                  <Typography component={'span'} cate='body_30' color={home.gray100}>
                    (자동 분류)
                  </Typography>
                </Box>
              }
            />
            {renderLastItem()}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default RangeSection
