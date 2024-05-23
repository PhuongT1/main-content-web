import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Box,
  useTheme,
  MenuItem,
  FormControlLabel
} from '@mui/material'
import { default as MuiTable } from '@mui/material/Table'
import { PrimaryPillRadio } from '@/elements/v2/radio'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { convertToRem } from '@/utils/convert-to-rem'
import { IFormValuesStepThree, ICompetitorComparisonItem } from '@/types/competitor-analysis.type'
import PlusIcon from '@/assets/icons/plus'
import TextareaItem from '@/form/textarea'
import SelectInput from '@/form/select/select-input'
import { ButtonItem } from '@/components/home/button'
import { FIELD_TYPE, MAXLENGTH_INPUT } from '../utils'
import { DATA_SELECT_PROMOTION, DATA_SELECT_STRUCTURE } from './../../data'
import { TableItemRow, TableItemChip, RadioGroupItem, SliderItem } from '../table_item'

interface TableDragProps {
  form: UseFormReturn<IFormValuesStepThree>
  headers: string[]
  data: ICompetitorComparisonItem[]
  fieldArray: UseFieldArrayReturn<IFormValuesStepThree, 'rowList'>
  onDelete: (index: number) => void
  onAddDifference: () => void
}

const TableDrag: React.FC<TableDragProps> = ({
  headers,
  data,
  onDelete,
  onAddDifference,
  fieldArray: { move },
  form
}) => {
  const { palette } = useTheme()

  const handleRenderContentTable = (fields: ICompetitorComparisonItem[]) => {
    return fields?.map((field: ICompetitorComparisonItem, index) => {
      switch (field?.type) {
        case FIELD_TYPE.TARGET_CUSTOMER:
        case FIELD_TYPE.DIFFERENT_CHARACTERISTICS:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key, value]) => [
              key,
              <Box key={key} display='flex' gap={convertToRem(5)} justifyContent='center' flexWrap={'wrap'}>
                {Array.isArray(value) &&
                  value?.map((value: string, indexCol: number) => (
                    <TableItemChip key={indexCol} index={indexCol} text={value} />
                  ))}
              </Box>
            ])
          )
        case FIELD_TYPE.TEXT:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key]) => [
              key,
              <Box key={key}>
                <TextareaItem
                  control={form.control}
                  name={`rowList.${index}.data.${key}`}
                  textFieldProps={{
                    required: true,
                    placeholder: '내용입력',
                    multiline: true
                  }}
                  maxLength={MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS_TEXT}
                  sxInput={{
                    '.MuiInputBase-root': { minHeight: convertToRem(45), padding: convertToRem(12) },
                    '.MuiInputBase-input': { padding: `0 0 ${convertToRem(4)}` }
                  }}
                />
              </Box>
            ])
          )
        case FIELD_TYPE.OPTION:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key]) => [
              key,
              <Box key={key} sx={{ '.MuiFormGroup-root': { flexDirection: 'row', justifyContent: 'center' } }}>
                <RadioGroupItem rules={{ required: true }} control={form.control} name={`rowList.${index}.data.${key}`}>
                  <FormControlLabel value='있음' control={<PrimaryPillRadio />} label='있음' />
                  <FormControlLabel value='없음' control={<PrimaryPillRadio />} label='없음' />
                </RadioGroupItem>
              </Box>
            ])
          )
        case FIELD_TYPE.SLIDE:
          return Object.fromEntries(
            Object.entries(field?.data).map(([key]) => [
              key,
              <Box key={key} paddingX={convertToRem(20)} paddingTop={convertToRem(20)}>
                <SliderItem
                  control={form.control}
                  name={`rowList.${index}.data.${key}`}
                  sliderProps={{ min: 1, max: 3, step: 1 }}
                />
              </Box>
            ])
          )
        case FIELD_TYPE.SELECT_PROMOTION:
        case FIELD_TYPE.SELECT_STRUCTURE:
          const dataSelect = field?.type === FIELD_TYPE.SELECT_PROMOTION ? DATA_SELECT_PROMOTION : DATA_SELECT_STRUCTURE
          return Object.fromEntries(
            Object.entries(field?.data).map(([key]) => [
              key,
              <Box key={key}>
                <SelectInput
                  inputProps={{
                    placeholder: '직접 입력',
                    inputProps: { maxLength: MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS_TEXT }
                  }}
                  control={form.control}
                  name={`rowList.${index}.data.${key}`}
                  textFieldProps={{
                    required: true,
                    placeholder: '선택'
                  }}
                  sxBox={{
                    '.MuiFormLabel-root': { lineHeight: convertToRem(18), color: palette.home.gray100 },
                    '.MuiSelect-select': {
                      padding: convertToRem(8),
                      lineHeight: convertToRem(24),
                      textAlign: 'left'
                    },
                    '.MuiInputBase-root': { maxHeight: `${convertToRem(48)} !important` },
                    '.MuiBox-root > svg': {
                      width: convertToRem(24),
                      height: convertToRem(24)
                    }
                  }}
                >
                  {dataSelect.map((val) => (
                    <MenuItem key={val?.name} value={val?.name}>
                      {val?.name}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Box>
            ])
          )
        default:
          return field.data
      }
    })
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    move(active?.data?.current?.sortable.index, over?.data?.current?.sortable.index)
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={data as any}>
        <TableContainer
          component={Paper}
          sx={{ backgroundImage: 'unset', borderRadius: convertToRem(10), border: `1px solid ${palette.home.gray200}` }}
        >
          <MuiTable sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                {['구 분', ...headers].map((header, index) => (
                  <TableCell
                    align='center'
                    key={`header-${header}`}
                    sx={{
                      width: index ? '100%' : convertToRem(216),
                      fontWeight: 600,
                      color: palette.home.gray50,
                      background: palette.home.gray400,
                      borderColor: palette.home.gray200,
                      '&:not(:first-child)': { borderLeftWidth: '1px', borderLeftStyle: 'solid' },
                      '&:nth-child(2), &:nth-child(3)': {
                        borderLeftColor: palette.home.blue500,
                        borderLeftWidth: '2px'
                      },
                      '&:nth-child(2)': { boxShadow: `0 2px 0 ${palette.home.blue500} inset` }
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleRenderContentTable(data)?.map((field, index) => (
                <TableItemRow
                  index={index}
                  key={data?.[index]?.id}
                  inputProps={{ control: form.control }}
                  item={data?.[index]}
                  onDelete={
                    [FIELD_TYPE.TARGET_CUSTOMER, FIELD_TYPE.DIFFERENT_CHARACTERISTICS].includes(data?.[index]?.type)
                      ? undefined
                      : (index: number) => onDelete(index)
                  }
                >
                  <>
                    {headers?.map((header) => (
                      <TableCell
                        align='center'
                        height={90}
                        key={`content-${header}`}
                        sx={{
                          borderColor: palette.home.gray200,
                          borderLeftWidth: '2px',
                          borderLeftStyle: 'solid',
                          '&:not(:first-child)': { borderLeftWidth: '1px', borderLeftStyle: 'solid' },
                          '&:nth-child(2), &:nth-child(3)': {
                            borderLeftColor: palette.home.blue500,
                            borderLeftWidth: '2px'
                          }
                        }}
                      >
                        {field?.[header]}
                      </TableCell>
                    ))}
                  </>
                </TableItemRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell
                  align='center'
                  colSpan={10}
                  sx={{ padding: convertToRem(32), background: palette.home.gray400, border: 'none' }}
                >
                  <ButtonItem
                    onClick={onAddDifference}
                    disableRipple
                    sx={{ color: palette.home.blue500, padding: 0, '&:hover': { background: 'unset', opacity: 0.75 } }}
                    startIcon={<PlusIcon pathProps={{ stroke: palette.home.blue500 }} />}
                  >
                    경쟁사 비교분석 항목 추가
                  </ButtonItem>
                </TableCell>
              </TableRow>
            </TableFooter>
          </MuiTable>
        </TableContainer>
      </SortableContext>
    </DndContext>
  )
}

export default TableDrag
