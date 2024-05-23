import { Typography, Upload } from '@/elements'
import { Alert, Box, InputLabel, MenuItem, useTheme } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import TextareaItem from '@/form/textarea'
import PlusIcon from '@/assets/icons/plus'
import Image from 'next/image'
import BlueImageUploadIcon from '@/assets/icons/culture/blue-image-upload'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from '@/services/file.service'
import InputItem from '@/form/input'
import WarningAppend from '../../warning-append'
import { useLanguage } from '@/hooks/use-language'
const ProductsServices = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(
    _.isEmpty(cultureForms.products_services) ? 'wip' : 'completed'
  )
  const [imageUploadActive, setImageUploadActive] = useState<any>(null)
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (!!cultureForms.products_services) {
      setValue('products_services', cultureForms.products_services?.products_services)
    }
  }, [cultureForms])

  const yups = yup.object().shape({
    products_services: yup
      .array(
        yup.object().shape({
          name: yup.string().required(''),
          details: yup.string().required(''),
          imageUpload: yup.string().required('')
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      products_services: cultureForms.products_services?.products_services || [
        { name: '', details: '', imageUpload: '' }
      ]
    }
  })

  const { control, handleSubmit, reset, getValues, setValue } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'products_services'
  })
  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, products_services: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      products_services: [{ name: '', details: '', imageUpload: '' }]
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.products_services
    setCultureForms(data)
  }

  const { mutate: onUploadImage } = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: async (file: File) => {
      const { data, error } = await uploadFile({ file, folder: 'culture' })
      return { data, error }
    },
    onSuccess: (data) => {
      setValue(`products_services.${imageUploadActive}.imageUpload`, data.data.url)
    }
  })
  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Typography
        cate='body_20'
        color={home.gray50}
        sx={{
          paddingTop: '10px',
          paddingBottom: '24px',
          borderBottom: `1px solid ${home.gray200}`,
          marginBottom: '24px'
        }}
      >
        {dict.products_services}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
        {fields.map((item: any, index: number) => (
          <Box
            key={item.id}
            width={'100%'}
            borderTop={index > 0 ? `1px solid ${home.gray200}` : ''}
            paddingTop={index > 0 ? '16px' : ''}
            sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Typography cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
                {dict.products_services_form_number} 0{index + 1}
              </Typography>

              {index > 0 && currentFormState !== 'completed' && (
                <Typography
                  onClick={() => remove(index)}
                  cate='sub_title_20'
                  sx={{ color: home.gray100, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {dict.delete_form}
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel sx={{ mb: '10px', color: home.gray50, fontWeight: 600 }}>
                <span style={{ color: home.mint500 }}>* </span>
                {dict.products_services_imageUpload}
              </InputLabel>
              <Box sx={{ height: '133px', width: '200px' }} flexShrink={0} position={'relative'}>
                {!!getValues(`products_services.${index}.imageUpload`) && (
                  <Image
                    height={194}
                    width={194}
                    priority
                    style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
                    src={getValues(`products_services.${index}.imageUpload`)}
                    alt='logo_team'
                  />
                )}

                {!getValues(`products_services.${index}.imageUpload`) && (
                  <>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      gap={1}
                      position={'absolute'}
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      border={`1px solid ${home.blue300}`}
                      borderRadius={'8px'}
                      sx={{ backgroundColor: home.alpha_blue_10 }}
                    >
                      <BlueImageUploadIcon />
                      <Typography cate='button_30' color={home.gray85}>
                        {dict.culture_imageUpload_placeholder}
                      </Typography>
                    </Box>
                  </>
                )}
                <Upload
                  disabled={currentFormState === 'completed'}
                  onChange={(e: any) => {
                    onUploadImage(e[0]), setImageUploadActive(index)
                  }}
                />
              </Box>
            </Box>
            <InputItem
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.products_services_name}
              name={`products_services.${index}.name`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.products_services_name_placeholder,
                inputProps: {
                  maxLength: 20
                }
              }}
            />
            <TextareaItem
              multiLine={3}
              disabled={currentFormState === 'completed'}
              control={control}
              label={dict.products_services_details}
              name={`products_services.${index}.details`}
              sxInput={{
                '.MuiOutlinedInput-input': {
                  '&.MuiInputBase-input': {
                    padding: '16px 0 16px 16px'
                  }
                }
              }}
              textFieldProps={{
                required: true,
                placeholder: dict.products_services_details_placeholder,
                rows: 1.84,
                multiline: true,
                inputProps: {
                  maxLength: 80
                }
              }}
            />
          </Box>
        ))}

        {fields.length < 3 && currentFormState !== 'completed' && (
          <Box>
            <Box textAlign={'center'}>
              <ButtonItem
                onClick={() => append({ name: '', details: '', imageUpload: '' })}
                disableRipple
                sx={{
                  color: home.blue500,
                  background: home.alpha_blue_10,
                  border: `1px solid ${home.blue500}`,
                  height: '46px'
                }}
                startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
              >
                {dict.products_services_addMore}
              </ButtonItem>
            </Box>

            <WarningAppend text={dict.products_services_WarningAppend} />
          </Box>
        )}

        {currentFormState === 'completed' ? (
          <Box
            component={'div'}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
          >
            <EditButton
              onClick={() => setCurrentFormState('wip')}
              title={dict.culture_edit}
              style={{ width: '100%' }}
            />
            <DeleteButton onClick={toggleShowDialog} title={dict.culture_delete} style={{ width: '100%' }} />
          </Box>
        ) : (
          <ButtonItem
            sx={{
              height: '48px',
              color: home.gray500,
              backgroundColor: home.blue500,
              '&:hover': {
                bgcolor: 'main_primary.blue300'
              }
            }}
            variant='contained'
            type='submit'
          >
            {dict.culture_submit}
          </ButtonItem>
        )}
      </Box>
      <DeleteDeck
        title={dict.delete_deck_title}
        description={dict.delete_deck_description}
        submitTxt={dict.delete_deck_submitTxt}
        cancelTxt={dict.delete_deck_cancelTxt}
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => onDeleteForm()}
      />
    </Box>
  )
}

export default ProductsServices
