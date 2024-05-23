import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { IItemMarketingGoal } from '@/types/advertisement-marketing.type'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import ImageUploadIcon from '@/assets/icons/team-building/image-upload'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import InventoryImages from '@/components/inventory-image'
import { Typography } from '@/elements'
import { MAX_LENGTH } from '@/constants/advertisement-marketing.constant'
import styles from './style.module.scss'

type CardItemDataAddProps = {
  onClickCardItemDataAdd?: (item: IItemMarketingGoal) => void
  isDisabled?: boolean
}
export const CardItemDataAdd = ({ onClickCardItemDataAdd, isDisabled }: CardItemDataAddProps) => {
  const { palette } = useTheme()
  const [showInventory, setToggleShowInventory] = useState(false)

  const schema = yup.object({
    name: yup.string().max(MAX_LENGTH.TITLE).required(),
    description: yup.string().max(MAX_LENGTH.IDEA).required(),
    url: yup.string().required()
  })
  const form = useForm<any>({ resolver: yupResolver(schema), mode: 'onBlur' })
  const { handleSubmit, control, setValue, getValues, watch, reset } = form
  const watchImageUrl = watch('url') ?? ''

  // =====
  useEffect(() => {
    isDisabled && reset({ name: '', description: '', url: '' })
  }, [isDisabled])

  const onUploadImage = (files: string[]) => {
    if (files?.length > 0) {
      setValue('url', files[0])
    }
  }

  const onClickSubmit = handleSubmit((values: IItemMarketingGoal) => {
    reset({ name: '', description: '', url: '' })
    return onClickCardItemDataAdd && onClickCardItemDataAdd(values)
  })

  // =====
  return (
    <FormProvider {...form}>
      <Box
        height={'100%'}
        display='flex'
        gap={convertToRem(12)}
        flexDirection={'column'}
        justifyContent={'space-between'}
        className={`${styles.box_wrapper} ${isDisabled ? styles.box_wrapper_disabled : ''}`}
        sx={{ backgroundColor: `${isDisabled ? palette.home.gray300 : palette.home.gray400}!important` }}
      >
        <Box>
          <Box display='flex' gap={convertToRem(8)} marginBottom={convertToRem(8)}>
            <Button
              type='submit'
              onClick={onClickSubmit}
              className={styles.btn_add}
              sx={{
                backgroundColor: 'unset !important',
                svg: { path: { stroke: isDisabled ? palette.home.gray200 : palette.home.gray50 } }
              }}
            >
              <PlusOutlineIcon
                svgProps={{ width: convertToRem(24), height: convertToRem(24) }}
                rectProps={{ fill: isDisabled ? palette.home.gray400 : palette.home.gray200 }}
              />
            </Button>
            <InputItem
              name='name'
              control={control}
              textFieldProps={{
                placeholder: '직접 입력',
                inputProps: {
                  maxLength: MAX_LENGTH.TITLE
                }
              }}
              sxInput={{
                '.MuiInputBase-root': { background: 'none', height: convertToRem(24), padding: 0 },
                '.MuiInputBase-input': {
                  padding: 0,
                  color: `${palette.home.gray50} !important`,
                  '&::placeholder': { color: palette.home.gray50, opacity: 1 },
                  opacity: isDisabled ? 0.5 : 1
                },
                '.MuiOutlinedInput-notchedOutline': { border: 'none', padding: 0 }
              }}
            />
          </Box>
          <Box marginBottom={convertToRem(12)}>
            <TextareaItem
              name='description'
              control={control}
              textFieldProps={{
                placeholder: '상세 내용을 입력해주세요.',
                multiline: true,
                inputProps: {
                  maxLength: MAX_LENGTH.IDEA,
                  onKeyPress: (e) => {
                    if (e.key === 'Enter') e.preventDefault()
                  }
                }
              }}
              sxInput={{
                '.MuiInputBase-root': {
                  alignItems: 'initial',
                  background: 'none',
                  padding: 0
                },
                '.MuiInputBase-input': {
                  padding: 0,
                  color: `${palette.home.gray100} !important`,
                  fontSize: `${convertToRem(14)} !important`,
                  '&::placeholder': { color: palette.home.gray100, opacity: 1 },
                  opacity: isDisabled ? 0.5 : 1
                },
                '.MuiOutlinedInput-notchedOutline': { border: 'none', padding: 0 }
              }}
            />
          </Box>
        </Box>

        {!watchImageUrl ? (
          <Box
            component={'label'}
            className={styles.add_item}
            onClick={() => setToggleShowInventory(true)}
            sx={{
              background: isDisabled ? palette.home.gray300 : palette.home.alpha_blue_10,
              border: `2px solid ${isDisabled ? palette.home.gray200 : palette.home.blue300}`,
              svg: {
                width: convertToRem(50),
                height: convertToRem(50),
                path: { fill: isDisabled ? palette.home.gray200 : palette.home.blue300 }
              }
            }}
          >
            <ImageUploadIcon />
            <Typography
              fontWeight={600}
              fontSize={convertToRem(18)}
              color={isDisabled ? palette.home.gray200 : palette.home.gray85}
            >
              이미지 선택
            </Typography>
          </Box>
        ) : (
          <Box
            component={'label'}
            className={styles.add_item}
            onClick={() => setToggleShowInventory(true)}
            sx={{
              '&::after': { backgroundImage: `url(${getValues('url')})`, borderRadius: convertToRem(8), opacity: 1 }
            }}
          >
            <Box height={convertToRem(50)} width={convertToRem(50)} />
            <Box
              px={convertToRem(20)}
              py={convertToRem(8)}
              sx={{
                backgroundColor: palette.home.alpha_darkpurple_60,
                border: `1px solid ${palette.home.gray85}`,
                borderRadius: convertToRem(8),
                zIndex: 1
              }}
            >
              <Typography fontSize={convertToRem(16)} color={palette.home.base_white}>
                이미지 변경
              </Typography>
            </Box>
          </Box>
        )}

        <InventoryImages
          multiple={false}
          open={showInventory}
          onClose={() => setToggleShowInventory(false)}
          setImages={(images: string[]) => {
            onUploadImage(images)
            setToggleShowInventory(false)
          }}
        />
      </Box>
    </FormProvider>
  )
}
