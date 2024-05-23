'use client'
import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { DesignedSecondaryButton, IconButtonSizes, SecondaryActiveChip, Typography } from '@/elements'
import CustomInput, { AdditionalInputProps } from '@/elements/v2/input/custom-input'
import { Box, Stack, SxProps, TypographyProps, useMediaQuery, useTheme } from '@mui/material'
import { forwardRef, KeyboardEvent, useState } from 'react'

type InputTagsProps = {
  value?: string[]
  allowDup?: boolean
  showBtnInSmallRes?: boolean
  onChange?: (value: string[]) => void
  chipSx?: SxProps
  btnLabel?: string
  hideBtn?: boolean
  maxCapacity?: number
  labelTextStyle?: any
} & Omit<AdditionalInputProps, 'onChange'>

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  (
    {
      value: tags = [],
      onChange,
      allowDup = false,
      showBtnInSmallRes = false,
      hideBtn = false,
      chipSx,
      btnLabel,
      maxCapacity,
      labelTextStyle,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const [value, setValue] = useState('')

    const handleAddTag = () => {
      if (value === '' || tags.includes(value)) {
        setValue('')
        return
      }
      const newTags = [...tags]

      newTags.push(value)
      onChange?.(newTags as any)
      setValue('')
    }

    const keyDownAddTag = (event: KeyboardEvent) => {
      if ((event as any).isComposing || (event as any).keyCode === 229) return

      if (event.code === 'Enter') {
        handleAddTag()
      }
    }

    const handleRemoveTag = (index: number) => {
      const newTags = [...tags]

      newTags.splice(index, 1)
      onChange?.(newTags as any)
    }

    return (
      <Stack direction={'column'} justifyContent={'flex-start'} width={'100%'}>
        <Stack direction={{ md: 'row', sm: 'column' }} width={'100%'} gap={2}>
          <CustomInput
            value={value}
            maxLength={30}
            onChange={(e: any) => setValue(e)}
            {...rest}
            ref={ref}
            fullWidth
            disabled={!!maxCapacity && tags.length >= maxCapacity}
            onKeyDown={keyDownAddTag}
          />
          {(!mdDown || (mdDown && showBtnInSmallRes)) && !hideBtn ? (
            <DesignedSecondaryButton onClick={handleAddTag} btnSize='md' sx={{ width: { md: 160, xs: '100%' } }}>
              <Typography plainColor='main_primary.blue300' cate='button_30'>
                {btnLabel ? btnLabel : '추가'}
              </Typography>
            </DesignedSecondaryButton>
          ) : null}
        </Stack>
        <Stack direction={'row'} mt={2} gap={1} flexWrap={'wrap'}>
          {tags.map((i, index) => (
            <SecondaryActiveChip
              key={index}
              sx={{ px: 1.5, py: '13px', height: 44, ...chipSx }}
              label={
                <Box display={'flex'} gap={1} alignItems={'center'}>
                  <Typography cate='body_30' plainColor='main_primary.blue300' {...labelTextStyle}>
                    {i}
                  </Typography>
                  <IconButtonSizes sx={{ borderRadius: '9999px' }} onClick={() => handleRemoveTag(index)}>
                    <CloseCircleSmIcon
                      svgProps={{ width: 16, height: 16, viewBox: '0 0 20 21' }}
                      pathProps={{ stroke: '#fff' }}
                    />
                  </IconButtonSizes>
                </Box>
              }
            />
          ))}
        </Stack>
      </Stack>
    )
  }
)

export default InputTags
