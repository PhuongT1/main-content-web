import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { Typography } from '@/elements'
import { TFormValuesType, TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import ChipSA from '../../../components/label'
import { useQuery } from '@tanstack/react-query'
import { getStrenghtList } from '@/services/sa.service'

const SelectedType = () => {
  const {
    palette: { home }
  } = useTheme()
  const { watch } = useFormContext<TFormValuesType>()
  const { data, isLoading } = useQuery({
    queryKey: ['GET_STRENGTH'],
    queryFn: () => getStrenghtList()
  })
  const selectedList = watch('strengthList')
  return (
    <BoxLayoutOulined
      style={{
        border: '1px',
        borderStyle: 'solid',
        borderColor: home.gray200,
        padding: remConvert('20px 24px')
      }}
      header={
        <Box display='flex' justifyContent='start' alignItems='center' gap={2} width='100%'>
          <Typography cate='title_50'>선택한 항목</Typography>
          <Typography
            cate='title_50'
            color={home.mint500}
            style={{ display: selectedList?.length === 0 ? 'none' : 'inline-block' }}
          >
            {selectedList?.length}개
          </Typography>
        </Box>
      }
    >
      <Box component={'div'} display={'flex'} flexWrap={'wrap'} gap={remConvert('16px')}>
        {data?.data?.map((item: TTypesSA) => (
          <ChipSA
            isActive={selectedList?.some((type: TTypesSA) => type.strengthType === item.strengthType)}
            item={item}
            key={item.strengthType}
          />
        ))}
      </Box>
    </BoxLayoutOulined>
  )
}

export default SelectedType
