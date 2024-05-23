import { Typography, Upload } from '@/elements'
import InputItem from '@/form/input'
import { Box, InputLabel, useTheme } from '@mui/material'
import { ValidationMode, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import TextareaItem from '@/form/textarea'
import { useLanguage } from '@/hooks/use-language'

const MarketSize = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.market_size) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    total_market_tam: cultureForms.market_size?.total_market_tam || '',
    market_size_tam: cultureForms.market_size?.market_size_tam || '',
    basis_tam: cultureForms.market_size?.basis_tam || '',
    total_market_sam: cultureForms.market_size?.total_market_sam || '',
    market_size_sam: cultureForms.market_size?.market_size_sam || '',
    basis_sam: cultureForms.market_size?.basis_sam || '',
    total_market_som: cultureForms.market_size?.total_market_som || '',
    market_size_som: cultureForms.market_size?.market_size_som || '',
    basis_som: cultureForms.market_size?.basis_som || ''
  }

  const schema = yup
    .object({
      total_market_tam: yup.string().required(),
      market_size_tam: yup.string().required(),
      basis_tam: yup.string().required(),
      total_market_sam: yup.string().required(),
      market_size_sam: yup.string().required(),
      basis_sam: yup.string().required(),
      total_market_som: yup.string().required(),
      market_size_som: yup.string().required(),
      basis_som: yup.string().required()
    })
    .required()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }

  const { handleSubmit, control, reset } = useForm<any>(formOptions)

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, market_size: data })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      total_market_tam: '',
      market_size_tam: '',
      basis_tam: '',
      total_market_sam: '',
      market_size_sam: '',
      basis_sam: '',
      total_market_som: '',
      market_size_som: '',
      basis_som: ''
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.market_size
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
        {dict.market_size_}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'24px'} component={'form'}>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Typography component='span' cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
            TAM
            <Typography component='span' cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
              {' '}
              ({dict.market_size_tam_label})
            </Typography>
          </Typography>
          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_total_market_tam}
            name='total_market_tam'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_total_market_tam_placeholder,
              inputProps: {
                maxLength: 20
              }
            }}
          />

          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_market_size_tam}
            name='market_size_tam'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              type: 'number',
              required: true,
              placeholder: dict.market_size_market_size_tam_placeholder,
              inputProps: {
                maxLength: 15
              }
            }}
          />

          <TextareaItem
            multiLine={2}
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_basis_tam}
            name={`basis_tam`}
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_basis_tam_placeholder,
              rows: 1.84,
              multiline: true,
              inputProps: {
                maxLength: 50
              }
            }}
          />
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Typography component='span' cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
            SAM
            <Typography component='span' cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
              {' '}
              ({dict.market_size_tam_label})
            </Typography>
          </Typography>
          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_total_market_sam}
            name='total_market_sam'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_total_market_sam_placeholder,
              inputProps: {
                maxLength: 20
              }
            }}
          />

          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_market_size_sam}
            name='market_size_sam'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              type: 'number',

              required: true,
              placeholder: dict.market_size_market_size_sam_placeholder,
              inputProps: {
                maxLength: 15
              }
            }}
          />

          <TextareaItem
            multiLine={2}
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_basis_sam}
            name={`basis_sam`}
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_basis_sam_placeholder,
              rows: 1.84,
              multiline: true,
              inputProps: {
                maxLength: 50
              }
            }}
          />
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Typography component='span' cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
            SOM
            <Typography component='span' cate='sub_title_30' sx={{ color: home.gray100, fontWeight: 600 }}>
              {' '}
              ({dict.market_size_som_label})
            </Typography>
          </Typography>
          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_total_market_som}
            name='total_market_som'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_total_market_som_placeholder,
              inputProps: {
                maxLength: 20
              }
            }}
          />

          <InputItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_market_size_som}
            name='market_size_som'
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              type: 'number',

              required: true,
              placeholder: dict.market_size_market_size_som_placeholder,
              inputProps: {
                maxLength: 15
              }
            }}
          />

          <TextareaItem
            multiLine={2}
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.market_size_basis_som}
            name={`basis_som`}
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.market_size_basis_som_placeholder,
              rows: 1.84,
              multiline: true,
              inputProps: {
                maxLength: 50
              }
            }}
          />
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

export default MarketSize
