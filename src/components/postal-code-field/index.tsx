'use client'
import { CustomInput, PrimaryButton, Typography } from '@/elements'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/elements/v2/form'
import { LabelProps } from '@/elements/v2/label'
import useMapDialog from '@/hooks/use-map-dialog'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import DaumEmbedDialog from '../dialog/daum-embed-dialog'

type PostalCodeFieldProps<T> = {
  form: UseFormReturn<{ address: string; postalCode: string }>
  labelProps?: LabelProps
}

const PostalCodeField = <T,>({ form, labelProps }: PostalCodeFieldProps<T>) => {
  const { addressData, isDialogOpen, openDialog, closeDialog, handleComplete } = useMapDialog()

  // const watchingPostal = form.watch('postCode')

  useEffect(() => {
    if (addressData) {
      form.setValue('address', `${addressData.address}`)
      form.setValue('postalCode', `${addressData.postcode}`)
    }
  }, [addressData])

  return (
    <Box>
      <FormField
        control={form?.control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel {...labelProps}>지번/도로명</FormLabel>
            <FormControl display={'flex'} gap={1}>
              <CustomInput type='text' fullWidth placeholder='Postal Code' {...field} readOnly />
              <PrimaryButton
                outlined
                onClick={openDialog}
                sx={{ flexShrink: 0, minWidth: { md: convertToRem(160), sm: convertToRem(100) } }}
                btnSize='md-np'
              >
                <Typography cate='button_30' plainColor='main_grey.gray100'>
                  검색
                </Typography>
              </PrimaryButton>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DaumEmbedDialog open={isDialogOpen} handleComplete={handleComplete} handleClose={closeDialog} />
    </Box>
  )
}

export default PostalCodeField
