import DotIcon from '@/assets/icons/strength-analysis/dot'
import { remConvert } from '@/utils/convert-to-rem'
import { Stack } from '@mui/material'
import React from 'react'

type Props = {
  number: number
  color?: string
}

const DotList = ({ number, color }: Props) => {
  return (
    <Stack mx={remConvert('5px')} direction={'row'} gap={remConvert('10px')}>
      {Array(Number(number))
        .fill('')
        .map((i, index) => (
          <DotIcon
            circleProps={{
              ...(color && { fill: color })
            }}
            key={index}
          />
        ))}
    </Stack>
  )
}

export default DotList
