import { Box, MenuItem, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { IFormValuesMarketingPlans } from '@/types/advertisement-marketing.type'
import { remConvert } from '@/utils/convert-to-rem'
import SelectItem from '@/form/select'
import CustomInputWithText from './input'
import CustomButtonAddMonth from './buttonAdd'
import { DATA_MARKETING_CURRENCY } from './../../data'

interface IMarketingPlanFilter {}
function MarketingPlanFilter({}: IMarketingPlanFilter) {
  const { palette } = useTheme()

  const form = useFormContext<IFormValuesMarketingPlans>()
  const { control, watch, setValue } = form
  const startMonth = watch('startMonth')
  const unitCurrency = watch('unitCurrency')
  const remainBudget = watch('remainBudget')
  const isNegativeBudget = Boolean(parseFloat(remainBudget?.replace(/,/g, '')) < 0)

  // =====
  return (
    <Box my={remConvert('20px')} display={'flex'} gap={remConvert('20px')} justifyContent={'flex-end'}>
      <SelectItem
        defaultValue={DATA_MARKETING_CURRENCY[0].value}
        control={control}
        name={'unitCurrency'}
        sxBox={{
          width: remConvert('100px'),
          '.MuiInputBase-root': { height: remConvert('44px') },
          '.MuiSelect-select': { padding: remConvert('10px') }
        }}
      >
        {DATA_MARKETING_CURRENCY.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </SelectItem>

      <CustomInputWithText form={form} title={'총 예산'} name={'totalBudget'} unit={unitCurrency} />

      <CustomInputWithText
        form={form}
        title={'남은 예산'}
        name={'remainBudget'}
        unit={unitCurrency}
        sxInputBase={{ color: `${isNegativeBudget ? palette.home.red500 : palette.home.blue500}!important` }}
        sxTypography={{ color: isNegativeBudget ? palette.home.red500 : palette.home.blue500 }}
      />

      <CustomButtonAddMonth defaultValue={startMonth} handleSelectMonth={(month) => setValue('startMonth', month)} />
    </Box>
  )
}

export default MarketingPlanFilter
