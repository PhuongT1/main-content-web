'use client'
import { getCategories } from '@/actions/apis/category.action'
import { DialogTitle } from '@/components'
import { CATEGORY } from '@/constants/common.constant'
import { BaseChip, Divider, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ProfessionalSelectionDialogProps = {
  onClose: () => void
}

const ProfessionalSelectionDialog = ({ onClose }: ProfessionalSelectionDialogProps) => {
  const [professionalSelected, setProfessionalSelected] = useState<Set<number>>(new Set())
  const router = useRouter()
  const theme = useTheme()

  const { data: mentorCategories } = useQuery({
    queryKey: ['mentor-categories'],
    queryFn: () => getCategories({ type: CATEGORY.MENTORING })
  })

  const { data = [] } = mentorCategories || {}

  const onSelectProfessional = (value: number) => {
    const clone = new Set(professionalSelected)
    clone.has(value) ? clone.delete(value) : clone.size < 3 && clone.add(value)
    setProfessionalSelected(clone)
  }

  const onNavigate = () => {
    const categoriesId = Array.from(professionalSelected).join(',')
    router.push(`expert-mentoring/mentor-register?categoryIds=${categoriesId}`)
  }

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={5} mt={3.5}>
      <DialogTitle textAlign={'center'}>
        <Typography cate='title_70' plainColor='popup.general.title'>
          전문 멘토가 되어 활동해 보세요!
        </Typography>
        <Typography mt={1} cate='body_30' plainColor='popup.general.subtitle'>
          아래 정보를 입력하고 도움이 필요한 멘티를 만나보세요.
        </Typography>
      </DialogTitle>
      <Box display={'flex'} flexDirection={'column'} gap={3} alignItems={'center'}>
        <Typography cate='body_30' plainColor='popup.general.body'>
          전문분야를 최소 1개 이상 최대 3개 선택을 해주세요.
        </Typography>
        <Box display={'flex'} gap={1} flexWrap={'wrap'} justifyContent={'center'}>
          {data.map((i, idx) => {
            return (
              <BaseChip
                clickable
                sx={{
                  px: 3,
                  height: 44,
                  border: '1px solid',
                  borderColor: 'main_primary.blue300',
                  bgcolor: 'main_primary.blue10'
                }}
                active={professionalSelected.has(i.id)}
                activeStyle={{
                  borderColor: `${theme.palette.main_primary.blue500} !important`,
                  bgcolor: `${theme.palette.main_primary.blue500} !important`
                }}
                key={idx}
                onClick={onSelectProfessional.bind(null, i.id)}
                label={
                  <Typography cate='button_20' plainColor='color.chip.label'>
                    {i.name}
                  </Typography>
                }
              />
            )
          })}
        </Box>
      </Box>
      <Box
        mt={{
          md: 'unset',
          xs: 'auto'
        }}
        mb={{
          md: 'unset',
          xs: 0
        }}
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={3}
      >
        <Divider
          sx={{
            display: {
              md: 'none',
              xs: 'block',
              borderColor: 'main_grey.gray700'
            }
          }}
        />
        <Box display={'flex'} gap={1} justifyContent={'center'}>
          <SecondaryGrayButton
            onClick={onClose}
            btnSize={'designed-sm'}
            sx={{
              bgcolor: 'popup.button_neutral_bg',
              width: {
                md: 120,
                xs: '100%'
              }
            }}
          >
            <Typography cate='button_30' plainColor='main_grey.gray400'>
              취소
            </Typography>
          </SecondaryGrayButton>
          <DesignedPrimaryButton
            disabled={professionalSelected.size === 0}
            onClick={onNavigate}
            sx={{
              width: {
                md: 120,
                xs: '100%'
              }
            }}
            btnSize={'designed-sm'}
          >
            다음
          </DesignedPrimaryButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfessionalSelectionDialog
