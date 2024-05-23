import { UseFormReturn } from 'react-hook-form'
import { Box, useTheme, Divider, Typography, MenuItem } from '@mui/material'
import { IItemMarketingGoal, IFormValuesMarketingKpiList } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { MarketingStrategiesSelect } from '@/components/cards/marketing-strategies-select'
import InputNumberWithText from '@/components/input/input-number-with-text'
import TextareaItem from '@/form/textarea'
import SelectInput from '@/form/select/select-input'
import SelectItem from '@/form/select'
import { formatCurrencyKorean } from '@/utils/format-currency'
import { DATA_MARKETING_KPI, DATA_MARKETING_CURRENCY } from './../../data'

interface ICardInputKpiWrapper<T> {
  form: UseFormReturn<IFormValuesMarketingKpiList>
  index: number
  item: IItemMarketingGoal
  activeCard?: number
  setActiveCard?: () => void
  prevDataList?: { title: string; data: string[] }[]
}
const CardInputKpiWrapper = <T,>({
  form,
  item,
  index,
  activeCard,
  setActiveCard,
  prevDataList = []
}: ICardInputKpiWrapper<T>) => {
  const { palette } = useTheme()
  const { control, getValues, watch } = form
  const isActive = Boolean(activeCard === index)
  const unitCurrency = watch('unitCurrency')

  const handleShowCurrency = (index: number): string => {
    const currency = getValues(`data.${index}.budget`)?.toString()?.replace(/,/g, '')
    return currency ? formatCurrencyKorean(Number(currency), unitCurrency) : `0${unitCurrency}`
  }

  if (!item?.name) return
  return (
    <Box
      onClick={setActiveCard && setActiveCard}
      sx={isActive ? { border: `2px solid ${palette.home.blue500}`, borderRadius: convertToRem(10) } : {}}
    >
      <MarketingStrategiesSelect
        isActive={isActive}
        url={item?.url}
        name={item?.name}
        prevDataList={prevDataList}
        isChildrenCustom={false}
      >
        <>
          <Divider sx={{ mb: convertToRem(12), bgcolor: 'main_grey.gray800' }} />
          <Box padding={convertToRem(8)} display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
            <Typography fontWeight={600}>{'KPI 설정'}</Typography>
            <SelectInput
              control={control}
              textFieldProps={{ placeholder: '선택' }}
              inputProps={{ placeholder: '직접입력', inputProps: { maxLength: 30 } }}
              menus={{ options: DATA_MARKETING_KPI }}
              name={`data.${index}.title`}
              paperPropsSx={{ '.MuiMenuItem-root:first-child': { background: 'initial !important' } }}
              sxBox={{ '.MuiSelect-select': { padding: convertToRem(10) } }}
            />
            <TextareaItem
              control={control}
              textFieldProps={{ multiline: true, inputProps: { maxLength: 100 }, placeholder: '내용을 입력해주세요.' }}
              name={`data.${index}.description`}
              sxInput={{
                '.MuiInputBase-root': { minHeight: convertToRem(100), alignItems: 'initial' },
                '.MuiInputBase-input': { padding: convertToRem(10) }
              }}
            />
          </Box>

          <Divider sx={{ my: convertToRem(12), bgcolor: 'main_grey.gray800' }} />
          <Box
            padding={convertToRem(8)}
            pb={convertToRem(4)}
            display={'flex'}
            flexDirection={'column'}
            gap={convertToRem(10)}
          >
            <Typography fontWeight={600}>{'홍보마케팅 예산 배정'}</Typography>
            <Box display={'flex'} gap={convertToRem(10)}>
              <Box flex={'1'}>
                <InputNumberWithText
                  unitText=''
                  form={form}
                  maxLength={15}
                  placeholder='숫자를 입력해주세요.'
                  name={`data.${index}.budget`}
                  sxInput={{ '.MuiInputBase-input': { padding: convertToRem(10), textOverflow: 'ellipsis' } }}
                />
              </Box>
              <SelectItem
                control={control}
                sxBox={{
                  width: convertToRem(100),
                  '.MuiSelect-select': { padding: convertToRem(10), color: palette.home.gray100 },
                  '@media only screen and (max-width: 1440px)': { width: convertToRem(80) }
                }}
                defaultValue={DATA_MARKETING_CURRENCY[0]?.value}
                name={`unitCurrency`}
              >
                {DATA_MARKETING_CURRENCY.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Box>
          </Box>
          <Box paddingX={convertToRem(8)}>
            <Typography fontSize={14} fontWeight={600} color={palette.home.gray100} whiteSpace={'nowrap'}>
              {handleShowCurrency(index)}
            </Typography>
          </Box>
        </>
      </MarketingStrategiesSelect>
    </Box>
  )
}

export default CardInputKpiWrapper
