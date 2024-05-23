import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  PrimaryCheckbox,
  PrimaryTextarea,
  SelectStack
} from '@/elements'
import Typography from '@/elements/typography'
import { color_gray } from '@/themes/system-palette'
import { Grid, Stack, StackProps, useMediaQuery, useTheme } from '@mui/material'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

const PRICE_LIST = {
  [MENTOR_PRODUCT_TYPE.TWENTY_MINUTES]: [
    { label: '30,000 원', value: 30000 },
    { label: '40,000 원', value: 40000 },
    { label: '50,000 원', value: 50000 }
  ],
  [MENTOR_PRODUCT_TYPE.FORTY_MINUTES]: [
    { label: '50,000 원', value: 50000 },
    { label: '60,000 원', value: 60000 },
    { label: '70,000 원', value: 70000 }
  ],
  [MENTOR_PRODUCT_TYPE.AN_HOUR]: [
    { label: '70,000 원', value: 70000 },
    { label: '100,000 원', value: 100000 },
    { label: '150,000 원', value: 150000 }
  ]
}

type EditOptionCardProps = StackProps & {
  name: string
  price: number
  description: string
  isSale?: boolean
}

const defaultValues = {
  enabled: false,
  description: '',
  price: 0
}

const EditOptionCard = forwardRef(({ name, description, price, isSale, ...rest }: EditOptionCardProps, ref) => {
  const theme = useTheme()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const form = useForm({
    defaultValues
    // resolver: yupResolver(schema)
  })

  useEffect(() => {
    form.reset({
      description: description,
      enabled: !!isSale && isSale === true ? true : false,
      price: price
    })
    // form.setValue('description', description)
    // form.setValue('enabled', description || isSale === true ? true : false)
    // form.setValue('price', price)
  }, [name, description, price])

  const enabled = form.watch('enabled')

  useImperativeHandle(ref, () => ({
    getValue: () => {
      if (!enabled) {
        return {
          name: name,
          enabled: false,
          isDirty: form.formState.isDirty || enabled !== isSale
        }
      } else if (!form.getValues('price') || !form.getValues('description')) {
        return {
          name: name,
          isValid: false
        }
      } else {
        return {
          name: name,
          price: form.getValues('price'),
          description: form.getValues('description'),
          isDirty: form.formState.isDirty || enabled !== isSale
        }
      }
    }
  }))

  return (
    <Stack
      p={2}
      bgcolor={enabled ? color_gray[800] : color_gray['800_disabled']}
      borderRadius={2}
      gap={2}
      direction={'column'}
      {...rest}
    >
      <Form {...form}>
        <Stack justifyContent={'space-between'} direction='row'>
          <Grid item xs={mdDown ? 6 : undefined} display={'flex'} direction={'row'} alignItems={'center'}>
            <PrimaryCheckbox
              onClick={() => {
                form.setValue('enabled', !enabled)
              }}
              checked={enabled}
            />
            <Typography cate={mdDown ? 'sub_title_40' : 'sub_title_30'}>
              {name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
                ? '20분 화상 멘토링'
                : name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
                ? '40분 화상 멘토링'
                : '1시간 대면 멘토링'}
            </Typography>
          </Grid>
        </Stack>
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem
              style={{
                flex: 1,
                width: '100%'
              }}
            >
              <FormLabel>
                <Typography cate='body_3' sx={{}}>
                  금액
                </Typography>
              </FormLabel>
              <FormControl mt={1}>
                <SelectStack
                  sx={
                    enabled
                      ? {}
                      : {
                          borderColor: color_gray['700_disabled'],
                          fieldset: {
                            backgroundColor: color_gray['700_disabled']
                          }
                        }
                  }
                  disabled={!enabled}
                  placeholder='금액을 선택해주세요.'
                  list={PRICE_LIST[name as keyof typeof PRICE_LIST]}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem
              style={{
                flex: 1,
                width: '100%'
              }}
            >
              <FormLabel>
                <Typography cate='body_3' sx={{}}>
                  소개
                </Typography>
              </FormLabel>
              <FormControl mt={1}>
                <PrimaryTextarea
                  disabled={!enabled}
                  sx={{
                    height: '48px !important',
                    [theme.breakpoints.down('md')]: {
                      height: '100px !important'
                    },
                    width: '100%',
                    borderColor: enabled ? color_gray[700] : color_gray['700_disabled'],
                    backgroundColor: enabled ? undefined : color_gray['700_disabled'],
                    padding: 2
                  }}
                  placeholder='옵션에 대한 설명을 20자 이내로 작성해주세요.'
                  maxLength={200}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </Stack>
  )
})

export default EditOptionCard
