import { Typography } from '@/elements'
import InputItem from '@/form/input'
import { Box, useTheme } from '@mui/material'
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

const Slogan = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.slogan) ? 'wip' : 'completed')
  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    slogan: cultureForms.slogan || ''
  }

  const schema = yup
    .object({
      slogan: yup.string().required()
    })
    .required()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }

  const { handleSubmit, control, reset, getValues } = useForm<any>(formOptions)

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, slogan: data.slogan })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.slogan
    setCultureForms(data)
    reset({ slogan: '' })
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
        {dict.slogan}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'16px'} component={'form'}>
        <Box width={'100%'}>
          <TextareaItem
            disabled={currentFormState === 'completed'}
            control={control}
            label={dict.slogan_slogan}
            name={`slogan`}
            sxInput={{
              '.MuiOutlinedInput-input': {
                '&.MuiInputBase-input': {
                  padding: '16px 0 16px 16px'
                }
              }
            }}
            textFieldProps={{
              required: true,
              placeholder: dict.slogan_slogan_placeholder,
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

export default Slogan
