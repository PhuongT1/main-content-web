import { Typography } from '@/elements'
import { Box, Grid, useTheme } from '@mui/material'
import InputItem from '@/form/input'
import { UploadAvatar } from '@/form/upload'
import SelectItem from '@/form/select'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import {
  dropdownAge,
  dropdownFamilySituation,
  dropdownGender,
  dropdownIncomeLevel,
  dropdownJob,
  dropdownMBTI,
  dropdownRegion
} from './select-data'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import SelectInput from '@/form/select/select-input'

export interface TProfilePersonItem {
  markText: string
}

const ProfilePersonItem = ({ markText }: TProfilePersonItem) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<VirtualTargetCustomer>()
  const { control } = form

  return (
    <BoxLayoutOulined
      header={
        <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} width='100%'>
          <Typography cate='title_50'>
            <span style={{ color: home.mint500 }}>* </span> {markText}
          </Typography>
        </Box>
      }
      style={{ marginBottom: '20px' }}
    >
      <Box flexWrap={'wrap'} display='flex' justifyContent='space-between' gap={'20px'} width='100%'>
        <Box display='flex' height={300} width={240}>
          <UploadAvatar formProps={form} name={'customer.path'} />
        </Box>
        <Grid container flex={1} alignItems='end' spacing={remConvert('20px')}>
          <Grid item xs={4} md={4}>
            <InputItem
              maxLength={15}
              control={control}
              textFieldProps={{
                placeholder: '이름'
              }}
              label='이름'
              name='customer.name'
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectItem
              control={control}
              menus={{ options: dropdownAge }}
              textFieldProps={{ placeholder: '선택' }}
              label='나이'
              name={'customer.age'}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectItem
              control={control}
              menus={{ options: dropdownGender }}
              textFieldProps={{ placeholder: '선택' }}
              label='성별'
              name='customer.gender'
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectItem
              control={control}
              menus={{ options: dropdownRegion }}
              textFieldProps={{ placeholder: '선택' }}
              label='지역/거주지'
              name='customer.region'
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectInput
              control={control}
              menus={{ options: dropdownJob }}
              textFieldProps={{ placeholder: '선택' }}
              label='직업'
              name='customer.job'
              inputProps={{
                placeholder: '직접 입력',
                inputProps: {
                  maxLength: 30
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectInput
              control={control}
              menus={{ options: dropdownIncomeLevel }}
              textFieldProps={{ placeholder: '선택' }}
              label='소득수준'
              name='customer.incomeLevel'
              inputProps={{
                placeholder: '직접 입력'
              }}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectInput
              control={control}
              menus={{ options: dropdownFamilySituation }}
              textFieldProps={{ placeholder: '선택' }}
              label='가족상황'
              name='customer.familySituation'
              inputProps={{
                placeholder: '직접 입력'
              }}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <SelectItem
              control={control}
              menus={{ options: dropdownMBTI }}
              textFieldProps={{ placeholder: '선택' }}
              label='MBTI'
              name='customer.mbti'
            />
          </Grid>
        </Grid>
      </Box>
    </BoxLayoutOulined>
  )
}

export default ProfilePersonItem
