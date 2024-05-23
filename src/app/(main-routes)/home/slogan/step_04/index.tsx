'use client'

import ImageIcon from '@/assets/icons/image'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { Form } from '@/elements'
import { ButtonBase } from '@/elements/v2/button'
import useToggle from '@/hooks/use-toggle'
import { Slogan_Step3_Type, Slogan_Step4_Type, Slogan_Step4_Yup } from '@/types/slogan.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import DividerItem from '../_component/divider-item'
import HocStepSlogan, { propStepComponent } from '../_component/hoc-step-slogan'
import styles from './step_04.module.scss'
import { nanum_pen } from '@/utils/font'
import InventoryImages from '@/components/inventory-image'
import { ModalReset } from '@/components/dialog/modal-deck'

const Step_04_Slogan: React.FC<propStepComponent<Slogan_Step4_Type, Slogan_Step3_Type>> = ({
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
  const [showInventory, , setToggleShowInventory] = useToggle()
  const ref = useRef<HTMLDivElement>(null)
  const defaultDataSlogan = useMemo(
    () => ({
      slogan: prewStep?.data?.checkPointSlogan?.find((item) => item.isActive)?.value
    }),
    [prewStep?.data]
  )
  const form = useForm<any>({
    resolver: yupResolver(Slogan_Step4_Yup),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      ...defaultDataSlogan
    }
  })

  const {
    handleSubmit,
    watch,
    formState: { isValid },
    setValue
  } = form

  useEffect(() => {
    if (data?.data?.imageURL) {
      form.reset(data.data)
    } else if (prewStep?.data) {
      form.reset(defaultDataSlogan)
    }
  }, [data?.data, defaultDataSlogan])

  return (
    <Form {...form}>
      <Box component='form' className={[styles.form_slogan].join(' ')} onSubmit={handleSubmit(onFinish)}>
        <DividerItem isView={isView} />
        <Box component={'div'} className={styles.part_area}>
          <Box component={'div'}>
            <Box component={'h2'}>슬로건 이미지</Box>
            {!isView && (
              <Typography className={`${styles.sub_title}`}>슬로건과 어울리는 이미지를 선택해 보세요.</Typography>
            )}
          </Box>
          <Box
            component={'div'}
            ref={ref}
            className={styles.area_image}
            sx={{
              height: convertToRem((ref?.current?.clientWidth || 1) * 0.58),
              position: 'relative',
              borderRadius: convertToRem(10),
              backgroundColor: home.gray400,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          >
            {!isView && (
              <ButtonBase
                sx={{
                  position: 'absolute',
                  top: convertToRem(24),
                  left: convertToRem(21.5),
                  zIndex: 11,
                  color: (theme) => home.blue500,
                  borderColor: home.blue500,
                  width: 'auto',
                  border: '2px solid home.blue500',
                  backgroundColor: (theme) => `${home.alpha_darkpurple_60}`,
                  borderRadius: '8px',
                  padding: convertToRem(13)
                }}
                variant='outlined'
                size='medium'
                onClick={() => setToggleShowInventory(true)}
              >
                <ImageIcon svgProps={{ width: convertToRem(15), height: convertToRem(15) }} />
                {watch('imageURL') ? '이미지 변경' : '이미지 선택'}
              </ButtonBase>
            )}
            {watch('imageURL') && (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: convertToRem(10)
                }}
                width={100}
                height={100}
                src={watch('imageURL')}
                alt='complete profile image'
              />
            )}
            <Box component={'div'} display={'flex'} className={[styles.final_slogan, nanum_pen.variable].join(' ')}>
              <Box component={'div'} color={'#FFFFFF'} className={[styles.slogan, nanum_pen.variable].join(' ')}>
                {watch('slogan')}
              </Box>
            </Box>
          </Box>
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
                  form.setValue('imageURL', '', { shouldValidate: true })
                  setToggleShowDialog(false)
                }}
              />
            </>
          ) : (
            <EditButton onClick={() => showEdit()} />
          )}
        </Stack>
        <InventoryImages
          open={showInventory}
          onClose={() => setToggleShowInventory(false)}
          setImages={(newImage: string[]) => {
            newImage[0] && setValue('imageURL', newImage[0], { shouldValidate: true })
            setToggleShowInventory(false)
          }}
        />
      </Box>
    </Form>
  )
}
export default HocStepSlogan<Slogan_Step4_Type, Slogan_Step3_Type>(Step_04_Slogan, {
  currentStep: 3
})
