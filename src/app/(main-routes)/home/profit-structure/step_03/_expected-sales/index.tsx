import { useFormContext } from 'react-hook-form'
import { Box, MenuItem, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import SelectItem from '@/form/select'
import { Typography } from '@/elements'
import { DATA_UNIT_CURRENCY } from './../../data'
import TableExpectedSales from './table'

function ExpectedSales() {
  const { palette } = useTheme()
  const { control } = useFormContext()
  const { dict, lang } = useLanguage()
  const currentDataUnitCurrency = DATA_UNIT_CURRENCY[lang || 'kr'] || []

  // =====
  return (
    <>
      <Box display={'flex'} gap={remConvert('20px')} alignItems={'center'} mb={remConvert('20px')}>
        <Typography color={palette.home.gray50}>{dict.profit_currency_unit}</Typography>
        <SelectItem
          defaultValue={currentDataUnitCurrency[0].value}
          control={control}
          name={'currency'}
          sxBox={{
            width: remConvert('200px'),
            '.MuiInputBase-root': { height: remConvert('56px') },
            '.MuiSelect-select': { padding: remConvert('10px'), color: palette.home.gray100 }
          }}
        >
          {currentDataUnitCurrency.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </SelectItem>
      </Box>

      <TableExpectedSales />
    </>
  )
}

export default ExpectedSales
