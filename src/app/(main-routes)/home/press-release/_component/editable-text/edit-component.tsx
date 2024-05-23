import { SubmitButton } from '@/components/home/button'
import TextareaItem from '@/form/textarea'
import yup from '@/services/yup.service'
import { remConvert } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

interface EditTextProps {
  initialValue: string
  onSave: (value: string) => void
}

const EditTextComponent = ({ initialValue, onSave }: EditTextProps) => {
  const form = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object({
        text: yup.string().required()
      })
    ),
    defaultValues: {
      text: initialValue
    }
  })
  const {
    control,
    formState: { isValid }
  } = form

  const handleSubmit = () => {
    if (!isValid) return
    onSave(form.getValues('text'))
  }

  return (
    <FormProvider {...form}>
      <TextareaItem control={control} name='text' textFieldProps={{ multiline: true, required: true, maxRows: 5 }} />
      <Box component='div' display='flex' justifyContent='center'>
        <SubmitButton onClick={handleSubmit} sx={{ marginTop: remConvert('16px'), maxHeight: '36px' }} />
      </Box>
    </FormProvider>
  )
}

export default EditTextComponent
