'use client'
import { PrimaryCheckedIcon, PrimaryUncheckIcon } from '@/assets/icons'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import { Typography } from '@/elements'
import { Box, Radio as MRadio, RadioProps as MRadioProps } from '@mui/material'
import { ReactNode } from 'react'

type RadioProps = { ariaLabel?: string; label?: ReactNode } & MRadioProps

const Radio = ({ ariaLabel = '', label, ...rest }: RadioProps) => {
  const key = Math.random().toString()
  return (
    <Box display={'flex'} alignItems={'center'}>
      <MRadio inputProps={{ 'aria-label': ariaLabel, id: key }} {...rest} />
      {label && (
        <Typography cate='body_40' plainColor='color.radio.label' component={'label'} htmlFor={key}>
          {label}
        </Typography>
      )}
    </Box>
  )
}
const PrimaryRadio = ({ ...rest }: RadioProps) => {
  return <Radio checkedIcon={<PrimaryCheckedIcon />} icon={<PrimaryUncheckIcon />} {...rest} />
}

const PrimaryPillRadio = ({ ...rest }: RadioProps) => {
  return <Radio checkedIcon={<RadioOutlineFilledIcon />} icon={<RadioOutlineIcon />} {...rest} />
}
export { PrimaryPillRadio, PrimaryRadio, Radio }
