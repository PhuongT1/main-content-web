import { convertToRem } from '@/utils/styles'
import React from 'react'
import TitleFactor from '../title-factor'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { useTheme } from '@mui/material'

type TTypeFactor = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat'
export type TFactorBoxProps = {
  titleOne: string
  subTitleOne: TTypeFactor
  titleTwo: string
  subTitleTwo: TTypeFactor
  direction?: 'row' | 'column'
}

const GroupTitle = ({ titleOne, subTitleOne, titleTwo, subTitleTwo, direction = 'row' }: TFactorBoxProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: convertToRem(5), flexDirection: direction }}>
      <TitleFactor title={titleOne} subTitle={subTitleOne} type={subTitleOne} />
      <SvgIcon>
        <svg xmlns='http://www.w3.org/2000/svg' width='19' height='18' viewBox='0 0 19 18' fill='none'>
          <path
            d='M15 8H10.5V3.5C10.5 3.36739 10.4473 3.24021 10.3536 3.14645C10.2598 3.05268 10.1326 3 10 3H9C8.86739 3 8.74021 3.05268 8.64645 3.14645C8.55268 3.24021 8.5 3.36739 8.5 3.5V8H4C3.86739 8 3.74021 8.05268 3.64645 8.14645C3.55268 8.24021 3.5 8.36739 3.5 8.5V9.5C3.5 9.63261 3.55268 9.75979 3.64645 9.85355C3.74021 9.94732 3.86739 10 4 10H8.5V14.5C8.5 14.6326 8.55268 14.7598 8.64645 14.8536C8.74021 14.9473 8.86739 15 9 15H10C10.1326 15 10.2598 14.9473 10.3536 14.8536C10.4473 14.7598 10.5 14.6326 10.5 14.5V10H15C15.1326 10 15.2598 9.94732 15.3536 9.85355C15.4473 9.75979 15.5 9.63261 15.5 9.5V8.5C15.5 8.36739 15.4473 8.24021 15.3536 8.14645C15.2598 8.05268 15.1326 8 15 8Z'
            fill={home.gray50}
          />
        </svg>
      </SvgIcon>
      <TitleFactor title={titleTwo} subTitle={subTitleTwo} type={subTitleTwo} />
    </Box>
  )
}

export default GroupTitle
