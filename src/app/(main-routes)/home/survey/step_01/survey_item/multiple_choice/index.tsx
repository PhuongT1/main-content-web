'use client'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MAX_ITEM_SURVEY_MULTI_CHOICE, SurveyMultiChoice } from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { UploadAvatar } from '@/form/upload'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import CardSelectedBox from '../../../_component/card-selected'
import { PlusButton } from '@/components/home/button'
import InputElement from '@/form/input/inputElement'
import Alert from '@/elements/alert'
import SurveyCheckbox from '../../../_component/survey-checkbox'
import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import styles from '../../step_01.module.scss'
import Image from 'next/image'

interface Props {
  status: FormStatus
}

const MultiChoice: FC<Props> = ({ status }) => {
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<SurveyMultiChoice>()
  const [structure, setStructure] = useState<string>('')
  const {
    control,
    setError,
    formState: { errors },
    watch
  } = form
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'options'
  })

  function dragEndEvent(e: DragEndEvent) {
    const { over, active } = e
    move(active.data.current?.sortable.index, over?.data.current?.sortable.index)
  }

  const addSlogan = () => {
    if (fields.length < MAX_ITEM_SURVEY_MULTI_CHOICE) {
      structure && append({ title: structure, imageUrl: '' })
      setStructure('')
    } else {
      setError('options', { type: 'max' })
    }
  }

  const formEdit = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <InputItem
          name='title'
          control={control}
          showErrorMessage
          label='설문제목'
          maxLength={100}
          textFieldProps={{
            required: true,
            placeholder: '입력'
          }}
        />
        <InputItem
          name='imageUrl'
          control={control}
          label='이미지 첨부'
          renderInput={() => (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='start'
              gap={2}
              flexShrink={0}
              height={120}
              width={240}
            >
              <UploadAvatar formProps={form} name={'imageUrl'} />
            </Box>
          )}
        />
        <Box display={'flex'} flexDirection={'column'} gap={remConvert('8px')}>
          <InputItem
            name='options'
            control={control}
            label={'설문항목 (2개 이상)'}
            textFieldProps={{ required: true }}
            renderInput={() => (
              <Grid container gap={'20px'}>
                <Grid item flex={'1 0 0'}>
                  <InputElement value={structure} onChange={(e) => setStructure(e.target.value)} />
                </Grid>
                <Grid item>
                  <PlusButton
                    sx={{
                      padding: remConvert('16px 18px'),
                      minWidth: remConvert('120px'),
                      border: `1px solid ${home.gray200}`,
                      background: home.gray300
                    }}
                    onClick={() => addSlogan()}
                  />
                </Grid>
              </Grid>
            )}
          />
          <DndContext onDragEnd={dragEndEvent}>
            <SortableContext items={fields}>
              {fields.map((item, index) => (
                <CardSelectedBox
                  idDnd={item.id}
                  key={item.id}
                  label={item.title}
                  imageUrl={item.imageUrl}
                  onRemove={() => remove(index)}
                  sx={{ backgroundColor: home.gray300 }}
                  sxIcon={{ fill: home.gray400 }}
                  data={item}
                  onUpdate={(data) => update(index, data)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Box>
        <Alert
          key={errors.options?.type}
          isOpen={!!errors.options?.type}
          sx={{ backgroundColor: home.alpha_red_10 }}
          isHide
          color='error'
          severity='error'
          variant='filled'
        >
          {errors.options?.type && (
            <>
              {['min', 'nullable'].includes(errors.options.type) && '설문항목은 2개 이상 필수로 작성하셔야 합니다.'}
              {errors.options.type === 'max' && '설문항목은 7개까지 추가 가능합니다.'}
            </>
          )}
        </Alert>
        <Box display='flex' alignItems='start' gap={remConvert('12px')} sx={{ flexFlow: 'row wrap' }}>
          <InputItem
            name='configs.allowMultiSelection'
            control={control}
            renderInput={({ field: { value, onChange, name } }) => (
              <SurveyCheckbox
                key={`${name}${value}`}
                label='복수응답 가능여부'
                checkboxProps={{
                  checked: value,
                  onChange: onChange
                }}
              />
            )}
          />
          <InputItem
            name='configs.isRequired'
            control={control}
            renderInput={({ field: { value, onChange, name } }) => (
              <SurveyCheckbox
                key={`${name}${value}`}
                label='필수응답 여부'
                checkboxProps={{
                  checked: value,
                  onChange: onChange
                }}
              />
            )}
          />
          <InputItem
            name='configs.allowAddOption'
            control={control}
            renderInput={({ field: { value, onChange, name } }) => (
              <SurveyCheckbox
                key={`${name}${value}`}
                label='기타항목 추가'
                checkboxProps={{
                  checked: value,
                  onChange: onChange
                }}
              />
            )}
          />
        </Box>
      </Box>
    )
  }

  const formView = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <InputItem
          name='title'
          control={control}
          showErrorMessage
          label='제목'
          maxLength={20}
          renderInput={({ field }) => <Typography className={styles.viewInput}>{field.value}</Typography>}
        />
        {watch('imageUrl') && (
          <InputItem
            name='imageUrl'
            control={control}
            label='이미지'
            renderInput={({ field }) => (
              <Image
                width={320}
                height={160}
                alt='avatar'
                src={field.value}
                style={{ objectFit: 'cover', borderRadius: remConvert('10px') }}
              />
            )}
          />
        )}
        <InputItem
          name='options'
          control={control}
          label={'설문항목'}
          renderInput={() => (
            <Box display={'flex'} flexDirection={'column'} gap={remConvert('8px')}>
              <ul className={styles.viewUl}>
                {fields.map((item, index) => (
                  <Box
                    key={item.id}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={remConvert('16px')}
                    sx={{ padding: remConvert('5px 16px') }}
                  >
                    <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                      {item.title}
                    </Box>
                    {item.imageUrl && (
                      <Image
                        width={200}
                        height={100}
                        alt='avatar'
                        src={item.imageUrl}
                        style={{ borderRadius: remConvert('6px'), objectFit: 'cover' }}
                      />
                    )}
                  </Box>
                ))}
                {watch('configs.allowAddOption') && (
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={remConvert('16px')}
                    sx={{ padding: remConvert('5px 16px') }}
                  >
                    <Box component={'li'} sx={{ '::before': { content: `'${fields.length + 1}'` } }}>
                      기타
                    </Box>
                  </Box>
                )}
              </ul>
            </Box>
          )}
        />
      </Box>
    )
  }

  return <Box>{status === FormStatus.inprogress ? formEdit() : formView()}</Box>
}
export default MultiChoice
