import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Box, MenuItem, useTheme } from '@mui/material'
import SelectItem from '@/form/select'
import SelectInput from '@/form/select/select-input'
import { convertToRem } from '@/utils/convert-to-rem'
import { FIELD_SELECTED_COLORS } from '@/constants/competitor-analysis'
import { ICompetitiveCompaniesResponse, IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { CompetitorAnalyzingCard } from '@/components/cards/competitor-analyzing-card'
import { DATA_AGE, DATA_GENDER, DATA_JOB } from './../../step_02/data'
import { MAXLENGTH_INPUT } from './../utils'

interface ICardInputSelect {
  index: number
  form: UseFormReturn<IFormValuesStepTwo>
  item: ICompetitiveCompaniesResponse
  isHighlight?: boolean
  activeCard?: number
  setActiveCard?: () => void
}
const CardInputSelect = ({ item, index, form, isHighlight, activeCard, setActiveCard }: ICardInputSelect) => {
  const {
    palette: { home }
  } = useTheme()

  const ageSelected = form.watch(`data.${index}.age`)
  const genderSelected = form.watch(`data.${index}.gender`)
  const jobSelected = form.watch(`data.${index}.job`)
  const sxBoxSelect = {
    '.MuiFormLabel-root': { lineHeight: convertToRem(16), color: home.gray100, left: convertToRem(8) },
    '.MuiSelect-select': { padding: convertToRem(8), lineHeight: convertToRem(24) },
    '.MuiOutlinedInput-notchedOutline': { borderColor: home.gray200 },
    '.MuiBox-root > svg': { width: convertToRem(24), height: convertToRem(24) },
    '.MuiBox-root.MuiSelect-icon': { right: convertToRem(10) }
  }

  if (!item?.name) return
  return (
    <Box
      onClick={setActiveCard && setActiveCard}
      sx={activeCard === index ? { border: `2px solid ${home.blue500}`, borderRadius: convertToRem(10) } : {}}
    >
      <CompetitorAnalyzingCard
        subTitle='타깃고객'
        item={item}
        sxCard={isHighlight ? { backgroundColor: home.alpha_blue_10 } : {}}
      >
        <SelectItem
          textFieldProps={{ required: true, placeholder: '연령층' }}
          control={form.control}
          name={`data.${index}.age`}
          sxBox={{
            ...sxBoxSelect,
            '.MuiInputBase-root': {
              maxHeight: `${convertToRem(44)} !important`,
              backgroundColor: !!ageSelected ? `${FIELD_SELECTED_COLORS?.[0]} !important` : '',
              '.MuiSelect-select': { paddingLeft: convertToRem(14) }
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: !!ageSelected ? `${FIELD_SELECTED_COLORS?.[0]} !important` : ''
            }
          }}
        >
          {DATA_AGE.map(({ name, value }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </SelectItem>
        <SelectItem
          textFieldProps={{ required: true, placeholder: '성별' }}
          control={form.control}
          name={`data.${index}.gender`}
          sxBox={{
            ...sxBoxSelect,
            '.MuiInputBase-root': {
              maxHeight: `${convertToRem(44)} !important`,
              backgroundColor: !!genderSelected ? `${FIELD_SELECTED_COLORS?.[1]} !important` : '',
              '.MuiSelect-select': { paddingLeft: convertToRem(14) }
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: !!genderSelected ? `${FIELD_SELECTED_COLORS?.[1]} !important` : ''
            }
          }}
        >
          {DATA_GENDER.map(({ name, value }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </SelectItem>

        <SelectInput
          inputProps={{
            placeholder: '직업군',
            inputProps: { maxLength: MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS_TEXT }
          }}
          control={form.control}
          textFieldProps={{
            required: true,
            placeholder: '직업군'
          }}
          name={`data.${index}.job`}
          sxBox={{
            '.MuiFormLabel-root': { lineHeight: convertToRem(16), color: home.gray100, left: convertToRem(8) },
            '.MuiSelect-select': {
              padding: convertToRem(8),
              paddingLeft: convertToRem(14),
              lineHeight: convertToRem(24),
              textAlign: 'left'
            },
            '.MuiInputBase-root': {
              maxHeight: `${convertToRem(44)} !important`,
              backgroundColor: !!jobSelected ? `${FIELD_SELECTED_COLORS?.[2]} !important` : ''
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: !!jobSelected ? `${FIELD_SELECTED_COLORS?.[2]} !important` : ''
            },
            '.MuiBox-root > svg': { width: convertToRem(24), height: convertToRem(24) },
            '.MuiBox-root.MuiSelect-icon': { right: convertToRem(10) }
          }}
        >
          {DATA_JOB.map(({ name, value }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </SelectInput>
      </CompetitorAnalyzingCard>
    </Box>
  )
}

export default CardInputSelect
