import { useState, useEffect } from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalChildren } from '@/components/dialog/modal-deck'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import { optionAutoFillItems } from '@/utils/styles'

interface ICustomButtonAddMonth {
  defaultValue?: number
  handleSelectMonth: (month: number) => void
}
function CustomButtonAddMonth({ defaultValue, handleSelectMonth }: ICustomButtonAddMonth) {
  const { palette } = useTheme()
  const [showModalStartMonth, setShowModalStartMonth] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const sxActiveMonth = { backgroundColor: palette.home.alpha_blue_10, border: `2px solid ${palette.home.blue500}` }

  // =====
  useEffect(() => {
    // reset value
    if (defaultValue === 1 && !showModalStartMonth) {
      setSelectedMonth(null)
    } else {
      setSelectedMonth(defaultValue ?? null)
    }
  }, [defaultValue])

  const handleCancel = () => setShowModalStartMonth(false)
  const handleSubmit = () => {
    if (selectedMonth) {
      handleSelectMonth?.(selectedMonth)
      handleCancel()
    }
  }

  // =====
  return (
    <>
      <Button
        type='button'
        cate={'outlined'}
        sx={{
          minWidth: remConvert('150px'),
          maxHeight: remConvert('44px'),
          padding: remConvert('10px 20px'),
          borderColor: palette.home.blue500
        }}
        customTitle={
          <Typography color={palette.home.blue500} cate='button_30'>
            시작 월 설정하기
          </Typography>
        }
        onClick={() => setShowModalStartMonth(true)}
      />

      <ModalChildren
        title={
          <>
            <Box marginBottom={remConvert('6px')}>{'시작 월 설정하기'}</Box>
            <Box
              sx={{
                fontSize: remConvert('14px'),
                lineHeight: remConvert('21px'),
                fontWeight: 400,
                color: palette.home.gray100
              }}
            >
              {'사업을 시작하는 월을 선택해주세요.'}
            </Box>
          </>
        }
        isFixedFooter={true}
        open={showModalStartMonth}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        sxButtonSubmit={{ opacity: selectedMonth ? 1 : 0.25, pointerEvents: selectedMonth ? '' : 'none' }}
      >
        <Stack
          margin={remConvert('20px 0')}
          sx={{ ...optionAutoFillItems({ minWidth: 75, maxColumn: 6, mediaQuery: 1140 }), gap: remConvert('10px') }}
        >
          {Array(12)
            .fill('month')
            .map((_, index) => (
              <Box
                key={_ + index}
                height={remConvert('54px')}
                padding={remConvert('15px')}
                borderRadius={remConvert('10px')}
                bgcolor={palette.home.gray300}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(selectedMonth === index + 1 ? sxActiveMonth : {})
                }}
                onClick={() => setSelectedMonth(index + 1)}
              >
                {index + 1}월
              </Box>
            ))}
        </Stack>
      </ModalChildren>
    </>
  )
}

export default CustomButtonAddMonth
