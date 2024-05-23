import { Typography, Upload } from '@/elements'
import InputItem from '@/form/input'
import { Box, InputLabel, useTheme } from '@mui/material'
import { ValidationMode, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import BlueImageUploadIcon from '@/assets/icons/culture/blue-image-upload'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from '@/services/file.service'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import TextareaItem from '@/form/textarea'
import { useLanguage } from '@/hooks/use-language'

const BrandDefinition = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(
    _.isEmpty(cultureForms.brand_definition) ? 'wip' : 'completed'
  )
  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    keySentence: cultureForms.brand_definition?.keySentence || '',
    detail: cultureForms.brand_definition?.detail || '',
    imageUpload: cultureForms.brand_definition?.imageUpload || ''
  }

  const schema = yup
    .object({
      keySentence: yup.string().required(),
      detail: yup.string().required(),
      imageUpload: yup.string().required()
    })
    .required()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }

  const {
    handleSubmit,
    formState: { isValid },
    control,
    setValue,
    getValues,
    reset
  } = useForm<any>(formOptions)

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, brand_definition: data })
    setCurrentFormState('completed')
  }

  const { mutate: onUploadImage } = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: async (file: File) => {
      const { data, error } = await uploadFile({ file, folder: 'culture' })
      return { data, error }
    },
    onSuccess: (data) => {
      setValue('imageUpload', data.data.url)
    }
  })

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({ keySentence: '', detail: '', imageUpload: '' })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.brand_definition
    setCultureForms(data)
  }

  return (
    <Box>
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
        {dict.brand_definition}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'16px'} component={'form'}>
        <Box width={'100%'}>
          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.brand_definition_keySentence}
            name='keySentence'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.brand_definition_keySentence_placeholder,
              inputProps: {
                maxLength: 20
              }
            }}
          />
        </Box>

        <Box width={'100%'}>
          <TextareaItem
            multiLine={3}
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.brand_definition_detail}
            name='detail'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.brand_definition_detail_placeholder,
              rows: 1.84,
              multiline: true,
              inputProps: {
                maxLength: 250
              }
            }}
          />
        </Box>

        <Box>
          <InputLabel sx={{ mb: '10px', color: home.gray50, fontWeight: 600 }}>
            <span style={{ color: home.mint500 }}>* </span>
            {dict.brand_definition_imageUpload}
          </InputLabel>
          <Box sx={{ height: '133px', width: '200px' }} flexShrink={0} position={'relative'}>
            {!!getValues('imageUpload') && (
              <Image
                height={194}
                width={194}
                priority
                style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
                src={getValues('imageUpload')}
                alt='logo_team'
              />
            )}

            {!getValues('imageUpload') && (
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
                    {dict.company_info_imageUpload}
                  </Typography>
                </Box>
              </>
            )}
            <Upload disabled={currentFormState === 'completed'} onChange={(e: any) => onUploadImage(e[0])} />
          </Box>
        </Box>

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

export default BrandDefinition
