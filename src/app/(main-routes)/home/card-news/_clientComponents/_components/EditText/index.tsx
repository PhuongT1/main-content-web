import TextareaItem from '@/form/textarea'
import React, { CSSProperties } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SubmitButton } from '@/components/home/button'
import { Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from '@/services/yup.service'
import { remConvert } from '@/utils/convert-to-rem'

interface EditTextProps {
  initialValue: string
  onSave: (value: string) => void
  onClose: () => void
}

const EditText: React.FC<EditTextProps> = ({ initialValue, onSave, onClose }) => {
  const form = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object({
        text: yup.string()
      })
    ),
    defaultValues: {
      text: initialValue
    }
  })
  const { control } = form

  const handleSubmit = () => {
    const value = form.getValues('text')
    if (!value.trim()) {
      onClose()
      return
    }
    onSave(value)
  }

  return (
    <FormProvider {...form}>
      <TextareaItem control={control} name='text' textFieldProps={{ multiline: true, maxRows: 10 }} />
      <Box component='div' display='flex' justifyContent='center'>
        <SubmitButton onClick={handleSubmit} sx={{ marginTop: remConvert('16px'), maxHeight: '36px' }} />
      </Box>
    </FormProvider>
  )
}

export default EditText
