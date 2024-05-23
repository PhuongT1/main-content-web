import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import LayoutBox from './layout-box'
import Image from 'next/image'
import { DataCustomerIR, LiftStyle } from '@/types/customer-service.type'
import React from 'react'

const BrandItemList = ({ data }: DataCustomerIR<LiftStyle[]>) => {
  const {} = useTheme()

  return (
    <LayoutBox title='선호 브랜드' sx={{ display: 'flex', gap: remConvert('12px') }}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: remConvert('6px')
        }}
      >
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            {item?.url && (
              <Image
                alt='user'
                src={item.url as string}
                quality={100}
                width={32}
                height={32}
                style={{
                  flexShrink: 0,
                  borderRadius: remConvert('5px'),
                  objectFit: 'cover',
                  overflow: 'hidden'
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </LayoutBox>
  )
}
export default BrandItemList
