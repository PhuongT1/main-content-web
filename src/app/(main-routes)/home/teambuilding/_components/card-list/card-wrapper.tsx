import { PlusButton } from '@/components/home/button'
import PlusIcon from '@/assets/icons/plus'
import InputItem from '@/form/input'
import { TFields } from '@/types/form.type'
import { TEducationAndExp, TFormValuesStepOnceAndSecond } from '@/types/teambuilding/index.type'
import { remConvert } from '@/utils/convert-to-rem'
import { e4 } from '@/utils/uuid'
import { Box, useTheme } from '@mui/material'
import { Dispatch, SetStateAction, useRef } from 'react'
import { FieldValues, UseFormReturn, useFieldArray } from 'react-hook-form'
import CardList from '.'
import { MAXLENGTH_VALIDATE } from '../../utils/validate'
import { requestIdleCallbackCustom } from '@/utils/events'
import { Dictionary } from '@/types/types.type'

const MAX_ITEM_CARD = 4

export type TCardWrapperProps<TFieldValues extends FieldValues> = {
  index: number
  message: string
  setMessageError: Dispatch<SetStateAction<string>>
  formProps: UseFormReturn<TFieldValues>,
  dict: Dictionary
}
function CardWrapper({ message, setMessageError, formProps, index, dict }: TCardWrapperProps<TFormValuesStepOnceAndSecond>) {
  const {
    palette: { home }
  } = useTheme()
  const { control, getValues, setValue } = formProps

  const inputContentRef = useRef<HTMLInputElement>()

  const { fields, remove, swap, append } = useFieldArray({
    control,
    name: `data.${index}.eduandexp`,
    keyName: '_id',
    rules: { maxLength: MAX_ITEM_CARD }
  })

  const handleAddItem = () => {
    const contentVal = getValues(`data.${index}.content`)
    const countItem = fields.length

    if (!contentVal) {
      // setMessageError('대표자 1명은 필수로 추가해야 합니다')
      requestIdleCallbackCustom(() => {
        if (inputContentRef.current) {
          inputContentRef.current.focus()
        }
      })
      return
    }
    if (message) {
      setMessageError('')
    }

    if (contentVal.length > MAXLENGTH_VALIDATE.CONTENT) {
      setMessageError(dict.teambuilding_education_experience_maxlength_msg)
      return
    }
    if (countItem < MAX_ITEM_CARD) {
      append({ id: e4(), content: contentVal })
      setValue(`data.${index}.content`, '')

      // if (MAX_ITEM_CARD - 1 <= countItem) {
      //   setMessageError('학력 및 경력은 최대 4개까지만 입력 가능합니다.')
      // }
    }
  }

  return (
    <Box component={'div'}>
      <Box display='flex' justifyContent='space-between' alignItems='end' gap={2} width='100%'>
        <Box flex={1}>
          <InputItem
            control={control}
            maxLength={MAXLENGTH_VALIDATE.CONTENT}
            disabled={fields.length === MAX_ITEM_CARD}
            label={dict.teambuilding_education_experience_title}
            name={`data.${index}.content`}
            textFieldProps={{
              inputProps: { maxLength: MAXLENGTH_VALIDATE.CONTENT },
              inputRef: inputContentRef,
              placeholder: dict.teambuilding_education_experience_placeholder
            }}
          />
        </Box>

        <PlusButton
          style={{
            flexShrink: 0,
            padding: remConvert('18px 16px'),
            lineHeight: remConvert('20px'),
            minWidth: remConvert('120px'),
            width: remConvert('120px')
          }}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50,
            border: `1px solid ${home.gray200}`
          }}
          startIcon={<PlusIcon svgProps={{ width: 20, height: 20 }} pathProps={{ stroke: home.gray50 }} />}
          disabled={fields.length === MAX_ITEM_CARD}
          onClick={handleAddItem}
        />
      </Box>
      <CardList
        fields={fields as unknown as TFields<TEducationAndExp>}
        remove={remove}
        swap={swap}
        setMessageError={setMessageError}
        message={message}
      />
    </Box>
  )
}

export default CardWrapper
