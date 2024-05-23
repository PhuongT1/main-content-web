import React from 'react'
import { useHandlePreview } from '../../../use-idea'
import { Box, Button, useTheme } from '@mui/material'
import TextareaItem from '@/form/textarea'
import { remConvert } from '@/utils/convert-to-rem'
import { TCreateIdea, TMethod } from '@/types/idea.type'
import { FieldPath, useFormContext } from 'react-hook-form'
import CheckedIdeaIcon from '@/assets/icons/idea/checked'
import { useLanguage } from '@/hooks/use-language'

type Props = {
  method: TMethod
  name: FieldPath<TCreateIdea>
}

const TextAreaIdea = ({ method, name }: Props) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { control } = useFormContext<TCreateIdea>()
  const { handlePreview } = useHandlePreview(method)

  return (
    <Box component={'div'} position={'relative'}>
      <TextareaItem
        maxLength={500}
        control={control}
        name={name}
        textFieldProps={{
          required: true,
          spellCheck: false,
          placeholder: dict.common_deck_enter_required_msg,
          rows: 8.65,
          inputProps: {
            style: {
              lineHeight: '150%'
            }
          },
          multiline: true
        }}
      />
      <Button
        onClick={handlePreview}
        type='button'
        sx={{
          position: 'absolute',
          bottom: remConvert('16px'),
          right: remConvert('16px'),
          width: 'fit-content',
          borderRadius: remConvert('100px'),
          padding: '12px 28px',
          gap: '8px',
          backgroundColor: home.gray200,
          fontSize: '16px',
          fontWeight: 600,
          color: home.gray50
        }}
      >
        <CheckedIdeaIcon pathProps={{ stroke: home.gray50 }} />
        {dict.common_completed}
      </Button>
    </Box>
  )
}

export default TextAreaIdea
