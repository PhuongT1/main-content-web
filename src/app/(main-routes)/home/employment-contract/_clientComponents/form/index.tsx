import { PrimaryPillRadio, Typography } from '@/elements'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import DatePicker from '@/libs/datepicker/DatePicker'
import { Box, FormControlLabel, Grid, Stack, useTheme } from '@mui/material'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import moment from 'moment'
import { DATE_FORMAT } from '@/constants/common.constant'
import { RadioGroupItem } from '../../../competitor-analysis/_components/table_item'
import SelectItem from '@/form/select'
import CheckboxGroupItem from '@/form/multicheckbox'
import { ICardNewsInputOverride } from '../../contractDetailsForm2'
import { Checkbox } from '@/form/checkbox'
import InputNumberWithText from '@/components/input/input-number-with-text'
import { formatCurrencyKorean } from '@/utils/format-currency'
import ErrorMessage from '@/form/ErrorMessage'
import { parseNumber } from '@/utils/string'
import { number } from 'yup'
import { PAYMENT_TYPE } from '../../contractDetailsForm6'
import { calculatePaymentNumber } from '../../utils'

type FormProps = {
  field: ICardNewsInputOverride
  control: any
  form: any
}

const Form: React.FC<FormProps> = ({ field, control, form }) => {
  const {
    palette: { home }
  } = useTheme()
  const { setValue, formState } = form

  const fieldValue = form.watch(field.name)
  const errorMessage = formState.errors[field.name]

  if (field.slot) return
  return (
    <Grid item xs={12} md={field.column || 12} key={field.name} sx={field.customSx}>
      {field.groupTitle ? (
        <Typography
          cate='body_3_semibold'
          color='home.mint500'
          marginBottom={remConvert('16px')}
          minHeight={remConvert('24px')}
        >
          {field.groupTitle}
        </Typography>
      ) : null}
      {(field.type === 'input' || field.type === 'inputHidden') && (
        <InputItem
          name={field.name}
          label={field.label}
          subLabel={field.subLabel}
          control={control}
          textFieldProps={{
            ...field.inputProps,
            InputProps: field.InputProps,
            inputProps: field.inputProps
          }}
          sxLabel={{
            fontSize: remConvert('16px'),
            marginBottom: field.subLabel ? '2px' : '8px',
            color: home.gray0
          }}
          sxSubLabel={{
            color: home.gray100,
            fontSize: remConvert('12px'),
            marginTop: 0,
            textOverflow: 'initial',
            overflow: 'initial',
            whiteSpace: 'initial'
          }}
          onChangeInput={(newValue: string) => {
            if (field.type === 'inputHidden') {
              form.setValue(field.name, newValue.substring(0, 7) + '*******'.substring(0, newValue.length - 7))
            }
            if (field.onChangeInput) field.onChangeInput(newValue, form)
          }}
          regex={field.inputProps?.regex}
        />
      )}
      {field.type === 'textarea' && (
        <TextareaItem
          name={field.name}
          label={field.label}
          subLabel={field.subLabel}
          control={control}
          textFieldProps={{
            ...field.inputProps,
            InputProps: field.InputProps,
            inputProps: field.inputProps
          }}
          sxLabel={{
            fontSize: remConvert('16px'),
            marginBottom: field.subLabel ? '2px' : '8px',
            color: home.gray0
          }}
          sxSubLabel={{
            color: home.gray100,
            fontSize: remConvert('12px'),
            marginTop: 0,
            textOverflow: 'initial',
            overflow: 'initial',
            whiteSpace: 'initial'
          }}
        />
      )}
      {field.type === 'date' && (
        <InputItem
          name={field.name}
          control={control}
          label={field.label}
          sxLabel={{ color: home.gray0 }}
          textFieldProps={{
            ...field.inputProps,
            InputProps: field.InputProps,
            inputProps: field.inputProps
          }}
          // defaultValue={moment().format(field.inputProps?.dateFormat || DATE_FORMAT.DASH_REV)}
          renderInput={({ field: inputField }) => (
            <DatePicker
              {...inputField}
              labelProps={{
                label: ''
              }}
              placeholder={field.inputProps?.placeholder}
              onDateChange={(date: Date) => {
                setValue(field.name, moment(date).format(field.inputProps?.dateFormat || DATE_FORMAT.DASH_REV), {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                })
              }}
              format={field.inputProps?.dateFormat}
            />
          )}
        />
      )}

      {field.type === 'radio' && (
        <RadioGroupItem
          control={control}
          name={field.name}
          sx={{ display: 'flex', flexDirection: field.flowDirection || 'row' }}
          onChangeInput={
            field.onChangeInput
              ? (value) => {
                  field.onChangeInput && field.onChangeInput(value, form)
                }
              : undefined
          }
        >
          {field.data?.map((item) => (
            <FormControlLabel key={item.value} value={item.value} control={<PrimaryPillRadio />} label={item.label} />
          ))}
        </RadioGroupItem>
      )}
      {field.type === 'select' && (
        <SelectItem
          label={field.label}
          textFieldProps={{
            ...field.inputProps,
            InputProps: field.InputProps
          }}
          control={control}
          name={field.name}
          sxBox={{ display: 'flex', flexDirection: field.flowDirection || 'column' }}
          menus={{ options: field.data || [], value: 'value', label: 'label' }}
          onChangeCustom={
            field.onChangeInput
              ? (value) => {
                  if (field.onChangeInput) {
                    field.onChangeInput(value.target?.value, form)
                  }
                }
              : undefined
          }
        />
      )}
      {field.type === 'checkboxGroup' && (
        <Stack gap={'8px'} direction={'column'}>
          <CheckboxGroupItem
            control={control}
            name={field.name}
            list={{ options: field.data, label: 'label', value: 'value' }}
            sxFormGroup={{ display: 'flex', flexDirection: 'row' }}
            defaultValue={fieldValue}
          ></CheckboxGroupItem>
          {errorMessage && <ErrorMessage message={errorMessage.message} />}
        </Stack>
      )}
      {field.type === 'checkbox' && (
        <Checkbox
          {...field}
          name={field.name}
          label={field.label}
          control={control}
          sxLabelProps={{
            alignItems: 'flex-start',
            marginLeft: '0',
            '& .MuiFormControlLabel-label': {
              paddingLeft: '10px'
            }
          }}
          formControllerProps={{
            checked: fieldValue,
            label: field.label
          }}
        />
      )}
      {field.type === 'inputNumberWithText' && (
        <InputNumberWithText
          form={form}
          name={field.name}
          label={field.label as string}
          unitText=' 원'
          sxInput={{ '.MuiInputBase-input': { padding: convertToRem(10), textOverflow: 'ellipsis' } }}
          placeholder={field.inputProps?.placeholder}
          textFieldProps={{
            InputProps: {
              endAdornment: (
                <Typography
                  paddingRight={convertToRem(10)}
                  fontSize={14}
                  fontWeight={600}
                  color={home.gray100}
                  whiteSpace={'nowrap'}
                  sx={{
                    textWrap: 'nowrap'
                  }}
                >
                  {'연 '}
                  {formatCurrencyKorean(
                    parseNumber(
                      `${
                        calculatePaymentNumber(
                          fieldValue,
                          field.prefixEndAdornment ? field.prefixEndAdornment(form) : ''
                        ) ||
                        field.inputProps?.placeholderEndAdornment ||
                        ''
                      }`
                    )
                  )}
                </Typography>
              )
            }
          }}
          handleChangeInput={(value: string) => {
            setValue(field.name, Number(value || 0), { shouldValidate: true, shouldDirty: true, shouldTouch: true })
          }}
        />
      )}
      {field.extends && field.extends.type === 'checkbox' && (
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
            // marginTop: '8px'
          }}
        >
          <Checkbox
            name={field.extends.name}
            label={field.extends.label}
            control={control}
            sxLabelProps={{
              alignItems: 'flex-start',
              margin: '8px 0 0',
              '& .MuiFormControlLabel-label': {
                paddingLeft: '10px'
              }
            }}
            formControllerProps={{
              checked: form.watch(field.extends.name),
              label: field.extends.label
            }}
          />
        </Box>
      )}
      {field.extends && field.extends.type === 'custom' && field.extends.render(form)}
    </Grid>
  )
}

export default Form
