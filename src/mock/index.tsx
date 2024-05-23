'use client'
import VariantIcon from '@/assets/icons/variant'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, SolidInput } from '@/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface SignupProps {
  username: string
}

const TestForm = () => {
  const schema = yup.object({
    username: yup.string().required('사용할 수 없는 아이디입니다.')
  })

  const defaultValues = {
    username: ''
  }

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (value: SignupProps) => {
    console.log(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 items-center'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <SolidInput inputSize='sm' placeholder='banana' startAdornment={<VariantIcon />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' sx={{ mt: 100 }}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default TestForm
