import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { FilledTabStack, FillTabItem } from '@/components/tabs'
import TabPanel from '@/elements/tab-panel'
import { tabBrandCustomer } from '../card-data-customer'
import { SyntheticEvent, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CustomerPurchasing } from '@/types/customer-service.type'
import InputItem from '@/form/input'
import { Typography } from '@/elements'
import BrandTab from './brand'
import CardMultiple from '../../../_components/card-multiple'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import ErrorMessage from '@/form/ErrorMessage'
import { errorMax3Message } from '@/constants/customer-service.constant'

const TabBrand = () => {
  const {
    palette: { home }
  } = useTheme()

  const {
    watch,
    setValue,
    control,
    formState: { errors }
  } = useFormContext<CustomerPurchasing>()

  const activeTab = watch('activeTab')

  const fieldArray = useFieldArray({
    control,
    name: 'selectedItem'
  })

  const { fields, remove } = fieldArray
  const [isErrorMax, setErrorMax] = useState<Boolean>(false)

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => setValue('activeTab', newValue)

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 3000)
  }

  return (
    <Box component={'div'} display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
      <Box component={'div'} bgcolor={home.gray400} padding={remConvert('20px 24px')} borderRadius={remConvert('10px')}>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={remConvert('20px')}
        >
          <Typography cate='button_2_semibold' color={home.gray0} display={'inline'}>
            브랜드
          </Typography>
          <InputItem
            sxBox={{ maxWidth: remConvert('310px') }}
            control={control}
            name='name'
            maxLength={20}
            textFieldProps={{
              placeholder: '검색어를 입력해주세요.',
              type: 'search'
            }}
          />
        </Stack>
        <FilledTabStack
          value={`${activeTab}` ?? false}
          onChange={handleChangeTab}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50,
            maxHeight: remConvert('64px'),
            padding: convertToRem('12px 24px'),
            '.MuiButtonBase-root': {
              backgroundColor: home.gray200,
              '&.Mui-selected': { backgroundColor: home.blue500 }
            },
            '.MuiTabs-flexContainer': { gap: convertToRem(12) },
            '.MuiTabs-indicator': { backgroundColor: home.blue500 }
          }}
          variant='scrollable'
          aria-label='Tab for brand'
        >
          {tabBrandCustomer.map((item, index) => (
            <FillTabItem
              label={
                <Typography component={'span'} cate='link_30' color={home.gray50}>
                  {item.label} {Number(activeTab) === index && Number(watch('lengthItemTab') ?? 0)}
                </Typography>
              }
              value={`${index}`}
              key={index}
              sx={{ padding: remConvert('6px 20px') }}
            />
          ))}
        </FilledTabStack>
        {tabBrandCustomer.map((item, index) => (
          <TabPanel key={index} index={index} value={Number(activeTab)}>
            <BrandTab fieldArray={fieldArray} type={item.value} overQuantity={overQuantity} />
          </TabPanel>
        ))}
      </Box>
      {(isErrorMax || errors.selectedItem?.message) && (
        <Box component={'div'}>
          <ErrorMessage isHide message={errors.selectedItem?.message || errorMax3Message(5)} />
        </Box>
      )}
      <BoxLayoutOulined
        header={
          <Typography cate='title_50' color={home.gray0}>
            브랜드{' '}
            <Typography component={'span'} cate='sub_title_30' color={home.mint500}>
              {`${fields.length || 0}개`}
            </Typography>
          </Typography>
        }
        style={{ padding: remConvert('24px 20px') }}
      >
        <CardMultiple height={'auto'} dataList={fields} maxSelected={5} onRemoveCard={(index) => remove(index)} />
      </BoxLayoutOulined>
    </Box>
  )
}

export default TabBrand
