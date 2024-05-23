import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Box, useTheme, Typography } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import MinusIcon from '@/assets/icons/minus'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'
import { ICompetitiveCompaniesResponse, IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { optionTruncateOneLine } from '@/utils/styles'
import { CompetitorAnalyzingCard } from '@/components/cards/competitor-analyzing-card'
import styles from './style.module.scss'

interface ICardInputCheckbox {
  index: number
  form: UseFormReturn<IFormValuesStepTwo>
  item: ICompetitiveCompaniesResponse
  isHighlight?: boolean
  activeCard?: number
  setActiveCard?: () => void
  onClickInputIcon?: (indexCard: number, indexInput: number) => void
}
const CardInputCheckbox = ({
  item,
  index,
  form,
  isHighlight,
  activeCard,
  setActiveCard,
  onClickInputIcon
}: ICardInputCheckbox) => {
  const {
    palette: { home }
  } = useTheme()

  if (!item?.name) return
  return (
    <>
      <Box
        onClick={setActiveCard && setActiveCard}
        sx={activeCard === index ? { border: `2px solid ${home.blue500}`, borderRadius: convertToRem(10) } : {}}
      >
        <CompetitorAnalyzingCard
          subTitle='타깃고객'
          item={item}
          sxCard={isHighlight ? { backgroundColor: home.alpha_blue_10 } : {}}
        >
          {Array.from({ length: 3 }, (v, indexCol) => {
            const valueSelected = form.watch(`data.${index}.differentCharacteristics.${indexCol}`)
            const color = !!valueSelected ? FIELD_SELECTED_COLORS?.[indexCol as 0 | 1 | 2] : ''
            return (
              <Box key={indexCol} position='relative'>
                <Box className={styles.box_wrapper} sx={{ background: color, borderColor: color }}>
                  <Typography sx={{ ...optionTruncateOneLine() }} color={valueSelected?.name ? '#fff' : '#9498A3'}>
                    {valueSelected?.name ? valueSelected.name : `차별화 ${indexCol + 1}`}
                  </Typography>
                </Box>
                <Box
                  position='absolute'
                  top={10}
                  right={8}
                  zIndex={9}
                  onClick={() => onClickInputIcon?.(index, indexCol)}
                  sx={{ svg: { path: { stroke: home.gray85 } } }}
                >
                  {valueSelected ? (
                    <MinusIcon />
                  ) : (
                    <PlusOutlineIcon
                      svgProps={{ width: convertToRem(24), height: convertToRem(24) }}
                      rectProps={{ fill: 'transparent' }}
                    />
                  )}
                </Box>
              </Box>
            )
          })}
        </CompetitorAnalyzingCard>
      </Box>
    </>
  )
}

export default CardInputCheckbox
