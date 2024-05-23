'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useFieldArray, useForm } from 'react-hook-form'
import styles from './step_02.module.scss'
import React, { useEffect } from 'react'
import { MAX_ITEM_USER_SLOGAN, Slogan_Step1_Type, Slogan_Step2_Type, Slogan_Step2_Yup } from '@/types/slogan.type'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import CardSelectedBox from '../_component/card-selected'
import Alert from '@/elements/alert'
import { Form } from '@/elements'
import AddSlogan from './addSlogan'
import TipItem from '@/components/home/tip-item'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import DividerItem from '../_component/divider-item'
import HocStepSlogan, { propStepComponent } from '../_component/hoc-step-slogan'
import useToggle from '@/hooks/use-toggle'
import { ModalReset } from '@/components/dialog/modal-deck'

const Step_02_Slogan: React.FC<propStepComponent<Slogan_Step2_Type, Slogan_Step1_Type>> = ({
  isView,
  data,
  prewStep,
  onFinish,
  showEdit
}) => {
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useForm<Slogan_Step2_Type>({
    // resolver: yupResolver(Slogan_Step2_Yup),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      userSlogan: []
    }
  })

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    formState: { errors, isValid }
  } = form

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'userSlogan'
  })

  useEffect(() => {
    if (data) form.reset(data?.data, { keepDefaultValues: true })
  }, [data?.data])

  const addSlogan = () => {
    const data = getValues('addSlogan')
    if (fields.length < MAX_ITEM_USER_SLOGAN) {
      data && append({ value: data })
      setValue('addSlogan', '')
    } else {
      setError('userSlogan', { type: 'max' })
    }
  }

  function dragEndEvent(e: DragEndEvent) {
    const { over, active } = e
    move(active.data.current?.sortable.index, over?.data.current?.sortable.index)
  }

  return (
    <Form {...form}>
      <Box component='form' className={[styles.form_slogan].join(' ')} onSubmit={handleSubmit(onFinish)}>
        <DividerItem isView={isView} />
        <Box component={'div'} className={styles.part_area}>
          <Box component={'div'}>
            <Box component={'div'} className={`${styles.layer_title}`}>
              <Box component={'h2'}>슬로건 개발</Box>
              {!isView && (
                <Box component={'p'} className={styles.card_note}>
                  (최대 3개 작성)
                </Box>
              )}
            </Box>
            {!isView && (
              <Typography className={styles.sub_title}>
                레퍼런스 슬로건을 참고하여 슬로건을 직접 만들어 보세요.
              </Typography>
            )}
          </Box>
          {!isView && prewStep && <AddSlogan dataStep1={prewStep.data} addSlogan={() => addSlogan()} />}
          <Grid container className={styles.layer_card_item} display='flex' spacing={2} alignItems='stretch'>
            <DndContext onDragEnd={dragEndEvent}>
              <SortableContext items={fields}>
                {fields.map((item, index) => (
                  <Grid item xs={12} md={12} key={index} alignItems='stretch'>
                    <CardSelectedBox
                      idDnd={item.id}
                      key={item.id}
                      label={item.value}
                      isView={isView}
                      onRemove={() => remove(index)}
                      sx={{ backgroundColor: home.gray300 }}
                      sxIcon={{ fill: home.gray400 }}
                    />
                  </Grid>
                ))}
              </SortableContext>
            </DndContext>
          </Grid>
          {!isView && (
            <TipItem
              content={
                <div className={styles.tipContent}>
                  슬로건은 스타트업이 시장에 자리잡고 브랜드를 구축하는 데 있어 매우 중요한 부분이며, 회사의 가치와
                  목표를 강조하여 소비자들에게 브랜드를 인상적으로 소개하는 데 도움을 줍니다.
                  <ul>
                    <li>
                      브랜드 식별성 강화: 슬로건은 회사나 제품의 핵심 가치와 메시지를 강조하여 브랜드 식별성을 높입니다.
                      이는 소비자들이 회사를 쉽게 기억하고 인지할 수 있도록 도와줍니다.
                    </li>
                    <li>
                      목표 및 미션 강조: 슬로건은 스타트업의 목표와 미션을 강조하여 내부 및 외부 스테이크홀더에게 회사의
                      방향성을 분명히 전달합니다.
                    </li>
                    <li>
                      고객과의 연결: 강력한 슬로건은 고객과의 연결을 돕습니다. 간결하고 완벽하게 구성된 슬로건은 고객의
                      감정을 자극하고 회사에 대한 긍정적인 인상을 남깁니다
                    </li>
                    <li>
                      미디어 및 광고 캠페인에서 활용: 슬로건은 마케팅, 광고, PR 등 다양한 캠페인에서 활용될 수 있습니다.
                      이는 브랜드를 더욱 효과적으로 소개하고 홍보할 수 있게 돕습니다
                    </li>
                    <li>
                      차별화와 경쟁력 강화: 고유하고 기억에 남는 슬로건은 스타트업을 경쟁사와 차별화하여 브랜드의 독특한
                      가치를 강조합니다.
                    </li>
                    <li>
                      간결하고 기억에 남는 메시지: 간결하면서도 기억에 남는 슬로건은 소비자들에게 브랜드의 메시지를
                      신속하게 전달하여 기억에 남도록 합니다.
                    </li>
                  </ul>
                </div>
              }
            />
          )}
          <Alert
            key={errors.userSlogan?.type}
            isOpen={!!errors.userSlogan?.type}
            sx={{ backgroundColor: home.alpha_red_10 }}
            color='error'
            severity='error'
            variant='filled'
          >
            {errors.userSlogan?.type === 'min' && '슬로건을 1개 이상 작성해주세요.'}
            {errors.userSlogan?.type === 'max' && '슬로건은 최대 3개까지 작성 가능합니다.'}
          </Alert>
        </Box>
        <Stack flexDirection={'row'} className={styles.btn_active}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} />
              <SubmitButton disabled={!isValid} type='submit' />
              <ModalReset
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  form.reset(undefined, { keepDefaultValues: true })
                  setToggleShowDialog(false)
                }}
              />
            </>
          ) : (
            <EditButton onClick={() => showEdit()} />
          )}
        </Stack>
      </Box>
    </Form>
  )
}
export default HocStepSlogan<Slogan_Step2_Type, Slogan_Step1_Type>(Step_02_Slogan, {
  currentStep: 1
})
