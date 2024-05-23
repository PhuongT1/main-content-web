import { Box, useTheme, Typography } from '@mui/material'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'
import { IItemMarketingGoal } from '@/types/advertisement-marketing.type'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import MinusIcon from '@/assets/icons/minus'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionTruncateOneLine } from '@/utils/styles'
import { MarketingStrategiesSelect } from '@/components/cards/marketing-strategies-select'
import styles from '@/app/(main-routes)/home/competitor-analysis/_components/card_input_checkbox/style.module.scss'

interface ICardInputCheckbox<T> {
  index: number
  item: IItemMarketingGoal
  title?: string
  activeCard?: number
  setActiveCard?: () => void
  onClickInputIcon?: (indexCard: number, indexInput: number) => void
  formValueSelected: T[]
  prevDataList?: { title: string; data: string[] }[]
}
const CardInputCheckbox = <T,>({
  item,
  index,
  title = '마케팅 전략',
  activeCard,
  setActiveCard,
  onClickInputIcon,
  formValueSelected = [],
  prevDataList = []
}: ICardInputCheckbox<T>) => {
  const {
    palette: { home, main }
  } = useTheme()
  const isActive = Boolean(activeCard === index)

  if (!item?.name) return
  return (
    <>
      <Box
        onClick={setActiveCard && setActiveCard}
        sx={isActive ? { border: `2px solid ${home.blue500}`, borderRadius: convertToRem(10) } : {}}
      >
        <MarketingStrategiesSelect
          isActive={isActive}
          url={item?.url}
          name={item?.name}
          subTitle={title}
          prevDataList={prevDataList}
        >
          {Array.from({ length: 3 }, (v, indexCol) => {
            const valueSelected = formValueSelected?.[indexCol] as { name: string }
            const color = !!valueSelected?.name ? FIELD_SELECTED_COLORS?.[indexCol as 0 | 1 | 2] : ''
            return (
              <Box key={indexCol} position='relative'>
                <Box className={styles.box_wrapper} sx={{ background: color, borderColor: color }}>
                  <Typography
                    sx={{ ...optionTruncateOneLine() }}
                    color={valueSelected?.name ? main.white : home.gray100}
                  >
                    {valueSelected?.name ? valueSelected.name : `${title} ${indexCol + 1}`}
                  </Typography>
                </Box>
                <Box
                  position='absolute'
                  top={10}
                  right={8}
                  zIndex={9}
                  onClick={() => onClickInputIcon?.(index, indexCol)}
                  sx={{ svg: { path: { stroke: valueSelected ? home.gray50 : home.gray85 } } }}
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
        </MarketingStrategiesSelect>
      </Box>
    </>
  )
}

export default CardInputCheckbox
