import { useState } from 'react'
import { Box, Typography, useTheme, Stack } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { ModalChildren } from '@/components/dialog/modal-deck'
import TypeText from '@/assets/images/competitor-analysis/type-text'
import TypeOption from '@/assets/images/competitor-analysis/type-option'
import TypeSlide from '@/assets/images/competitor-analysis/type-slide'
import TypeSelectStructure from '@/assets/images/competitor-analysis/type-select-structure'
import TypeSelectPromotion from '@/assets/images/competitor-analysis/type-select-promotion'
import { FIELD_TYPE } from './../utils'

const TYPE_LIST = [
  {
    title: '텍스트 타입',
    subTitle: '비교항목을 직접 입력할 수 있어요.',
    image: <TypeText />,
    type: FIELD_TYPE.TEXT
  },
  {
    title: '2단계 타입',
    subTitle: '2가지의 선택지를 선택할 수 있어요.',
    image: <TypeOption />,
    type: FIELD_TYPE.OPTION
  },
  {
    title: '3단계 타입',
    subTitle: '낮음, 보통, 높음의 3개의 단계를 선택할 수 있어요.',
    image: <TypeSlide />,
    type: FIELD_TYPE.SLIDE
  },
  {
    title: '수익구조 선택 타입',
    subTitle: '다양한 수익구조 중에서 선택할 수 있어요.',
    image: <TypeSelectStructure />,
    type: FIELD_TYPE.SELECT_STRUCTURE
  },
  {
    title: '홍보마케팅 선택 타입',
    subTitle: '다양한 홍보마케팅 중에서 선택할 수 있어요.',
    image: <TypeSelectPromotion />,
    type: FIELD_TYPE.SELECT_PROMOTION
  }
]

interface IModalAddDifferent {
  isOpen: boolean
  setIsOpen: () => void
  onConfirm: (type: string) => void
}
function ModalAddDifferent({ isOpen, setIsOpen, onConfirm }: IModalAddDifferent) {
  const [active, setActive] = useState('')
  const { palette } = useTheme()

  const handleConfirm = () => {
    onConfirm?.(active)
  }

  return (
    <ModalChildren
      isFixedFooter={true}
      title={
        <>
          <Box component={'span'} display={'block'} marginBottom={convertToRem(6)}>
            비교 항목 추가
          </Box>
          <Box
            component={'span'}
            display={'block'}
            sx={{
              fontSize: convertToRem(14),
              lineHeight: convertToRem(21),
              fontWeight: 400,
              color: '#7E7E86'
            }}
          >
            추가할 비교항목 타입을 선택해주세요.
          </Box>
        </>
      }
      open={isOpen}
      onCancel={setIsOpen}
      onSubmit={handleConfirm}
      submitTxt='추가'
      sxButtonSubmit={{ opacity: active ? 1 : 0.25, pointerEvents: active ? '' : 'none' }}
    >
      <Stack gap={convertToRem(20)} margin={convertToRem('20px 0')}>
        {TYPE_LIST.map((type) => (
          <Box
            key={type.title}
            display='flex'
            alignItems='center'
            gap={convertToRem(20)}
            padding={`${convertToRem(12)} ${convertToRem(20)}`}
            sx={{
              background: active === type.type ? palette.home.alpha_blue_10 : palette.home.gray300,
              border: active === type.type ? `1px solid ${palette.home.blue500}` : '1px solid transparent',
              borderRadius: convertToRem(10),
              cursor: 'pointer'
            }}
            onClick={() => setActive(type.type)}
          >
            <Box component='div'>{type.image}</Box>

            <Box display='flex' gap={convertToRem(8)} flexDirection='column'>
              <Typography color={palette.home.gray50} fontWeight={600}>
                {type.title}
              </Typography>
              <Typography color={palette.home.gray100} fontSize={14}>
                {type.subTitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </ModalChildren>
  )
}

export default ModalAddDifferent
