import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useLanguage } from '@/hooks/use-language'
import { Box, MenuItem, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { generateYearsArray } from './../../data'
import SelectItem from '@/form/select'
import TableAnnualSales from './table'
import ChartAnnualSales from './chart'

function AnnualSales() {
  const { palette } = useTheme()
  const { dict } = useLanguage()
  const { control } = useFormContext()

  const DATA_YEARS = useMemo(() => {
    return generateYearsArray().map((year) => ({ label: year, value: year }))
  }, [])

  // =====
  return (
    <>
      <Box display={'flex'} gap={remConvert('20px')} alignItems={'center'} mb={remConvert('20px')}>
        <Typography color={palette.home.gray50}>{dict.profit_select_startYear}</Typography>
        <SelectItem
          control={control}
          name={'startYear'}
          textFieldProps={{ placeholder: dict.common_select }}
          sxBox={{
            width: remConvert('200px'),
            '.MuiInputBase-root': { height: remConvert('56px') },
            '.MuiSelect-select': { padding: remConvert('10px'), color: palette.home.gray100 }
          }}
        >
          {DATA_YEARS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </SelectItem>
      </Box>

      <TableAnnualSales />

      <ChartAnnualSales />
    </>
  )
}

export default AnnualSales
