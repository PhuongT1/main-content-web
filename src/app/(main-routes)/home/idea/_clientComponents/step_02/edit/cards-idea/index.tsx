import { Box } from '@mui/material'
import React, { useEffect } from 'react'

import styles from './card-idea.module.scss'
import StepPLus from '../step/plus'
import StepMinus from '../step/minus'
import { useRecoilState } from 'recoil'
import { modeWriteIdeaSelector } from '@/atoms/home/idea'
import StepMultiplication from '../step/multiplication'
import StepDivision from '../step/division'
import { Method } from '@/constants/idea.constant'

function CardIdeaList() {
  const [activeMode, setActiveMode] = useRecoilState(modeWriteIdeaSelector)

  const renderContent = () => {
    switch (activeMode) {
      case Method.plus:
        return <StepPLus />
      case Method.minus:
        return <StepMinus />
      case Method.multiplication:
        return <StepMultiplication />
      case Method.division:
        return <StepDivision />
      default:
        return null
    }
  }
  return (
    <Box component={'div'} className={styles.container}>
      {renderContent()}
    </Box>
  )
}

export default CardIdeaList
