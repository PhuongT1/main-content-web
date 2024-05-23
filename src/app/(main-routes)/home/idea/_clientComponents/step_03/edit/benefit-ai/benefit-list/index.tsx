import { ModalChildren } from '@/components/dialog/modal-deck'
import { EditButton } from '@/components/home/button'
import CardItem from '@/components/home/card-item'
import { TooltipItem, TooltipTitle } from '@/components/home/tooltip-item'
import { Typography } from '@/elements'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import { useLanguage } from '@/hooks/use-language'
import useToggle from '@/hooks/use-toggle'
import { TWriteIdea } from '@/types/idea.type'
import { remConvert } from '@/utils/convert-to-rem'
import { requestIdleCallbackCustom } from '@/utils/events'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const BenefitList = () => {
  const { dict, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { control, setValue, getValues, resetField, clearErrors, setError, getFieldState } =
    useFormContext<TWriteIdea>()

  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const { update, fields } = useFieldArray<TWriteIdea>({
    control,
    name: 'benefit'
  })

  const [showModal, toggleShow, setShowModal] = useToggle()

  const onSubmit = () => {
    if (currentIndex < 0) return

    const titleValue = getValues('title')
    const contentValue = getValues('description')
    if (!titleValue) {
      setError('title', { type: 'required', message: '' })
      return
    }

    if (!contentValue) {
      setError('description', { type: 'required', message: '' })
      return
    }

    const { title, content, titleEn, contentEn, id } = fields[currentIndex]
    const newTitle = getFieldState('title').isDirty ? titleValue : null
    const newTitleEn = getFieldState('title').isDirty ? titleValue : null
    const newContent = getFieldState('description').isDirty ? contentValue : null
    const newContentEn = getFieldState('description').isDirty ? contentValue : null

    update(currentIndex, {
      id,
      title: newTitle || title,
      content: newContent || content,
      titleEn: newTitleEn || titleEn,
      contentEn: newContentEn || contentEn
    })
    resetField('title')
    resetField('description')
    requestIdleCallbackCustom(() => {
      clearErrors('title')
      clearErrors('description')
      toggleShow()
    })
  }

  const handleOnClick = (item: any) => {
    setValue('title', item.title)
    setValue('description', item.description)
    setCurrentIndex(item.index)
    toggleShow()
  }

  return (
    <Box
      component={'div'}
      sx={{
        padding: remConvert('20px'),
        backgroundColor: home.gray400,
        borderRadius: '10px'
      }}
    >
      <Grid container spacing={remConvert('20px')}>
        {fields.map((field, i) => (
          <Grid key={field.id} item xs={12} lg={4}>
            <BenefitItem
              key={field.id}
              onClick={handleOnClick}
              item={{
                index: i,
                title: (getValueLanguage(field, 'title') as string) || '',
                description: (getValueLanguage(field, 'content') as string) || ''
              }}
            />
          </Grid>
        ))}
      </Grid>
      <ModalChildren
        title={dict.idea_expectation_title}
        open={showModal}
        onCancel={toggleShow}
        onSubmit={onSubmit}
        submitTxt={dict.common_complete}
        cancelTxt={dict.common_cancel}
      >
        <Stack
          sx={{
            paddingTop: remConvert('20px'),
            paddingBottom: remConvert('20px')
          }}
          direction={'column'}
          gap={remConvert('20px')}
        >
          <InputItem
            maxLength={30}
            textFieldProps={{
              required: true
            }}
            name='title'
            label={dict.idea_expectation_title}
          />
          <TextareaItem
            label={dict.common_deck_detail}
            sxLabel={{ color: home.gray50 }}
            maxLength={100}
            control={control}
            name={'description'}
            textFieldProps={{
              required: true,
              spellCheck: false,
              placeholder: dict.common_deck_enter_required_msg,
              rows: 11.65,
              multiline: true
            }}
          />
        </Stack>
      </ModalChildren>
    </Box>
  )
}

export default BenefitList

type BenefitItemProps = {
  item: {
    index: number
    title: string
    description: string
  }
  onClick: (item: any) => void
}

const BenefitItem = ({ item, onClick }: BenefitItemProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <CardItem
      sxCard={{
        minHeight: remConvert('200px'),
        backgroundColor: home.gray300,
        borderRadius: '10px'
      }}
      sxCardAction={{
        minHeight: remConvert('200px'),
        height: '100%',
        backgroundColor: home.gray300,
        '&.MuiButtonBase-root:hover': {
          backgroundColor: 'inherit'
        }
      }}
      sxContent={{
        backgroundColor: home.gray300
      }}
      cardItem={{
        title: (
          <Box
            mb={'10px'}
            width={1}
            component={'div'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <TooltipTitle
              title={item.title}
              sxBox={{
                lineHeight: '120%',
                color: home.gray50,
                fontSize: remConvert('20px'),
                fontWeight: 600
              }}
            />
            <EditButton
              onClick={() => onClick(item)}
              sx={{
                borderRadius: remConvert('300px'),
                minWidth: remConvert('80px'),
                maxWidth: remConvert('80px'),
                padding: remConvert('10px 0'),
                backgroundColor: home.gray200
              }}
              title={dict.idea_edit}
            />
          </Box>
        ),
        subTitle: (
          <TooltipTitle
            sxBox={{
              color: home.gray100,
              WebkitLineClamp: 9,
              lineHeight: '150%',
              wordBreak: 'break-word',
              fontSize: remConvert('16px'),
              fontWeight: 600
            }}
            title={item.description}
          />
        )
      }}
    />
  )
}
