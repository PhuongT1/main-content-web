'use client'
import Box from '@mui/material/Box'
import styles from './connect-box.module.scss'
import React, { useEffect, useState } from 'react'
import TableItem from './table-item'
import ParentBox from './parent-box'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LinesAtom } from '../../../swot-atom'
import { loadingAtom } from '@/atoms/loading'
import { useIsFetching } from '@tanstack/react-query'
import { useLanguage } from '@/hooks/use-language'
import { useTheme } from '@mui/material'

function getElementPosition(id: any) {
  const element = document.getElementById(id) as any
  var rect = element?.getBoundingClientRect()
  return [rect?.left + window.scrollX, rect?.top + window.scrollY]
}

function transformArray(inputArray: any, startingId: any, type: any) {
  return inputArray?.map((text: any, index: any) => ({
    text: text,
    id: startingId + index,
    type
  }))
}

export const arrright = [
  {
    text: '시장 점유율 확대',
    textEn: 'Expanding market share',
    sub: '특정 산업이나 시장에서의 점유율을 명확한 비율로 늘리기',
    subEn: 'Share in a particular industry or market Increase by definite rate',
    id: 1,
    color: '#3C82F9'
  },
  {
    text: '고객 만족도 향상',
    textEn: 'Improve customer satisfaction',
    sub: '고객 만족도 조사를 통해 특정 수준 이상의 만족도 달성하기',
    subEn: 'Above a certain level through customer satisfaction surveys Achieving satisfaction',
    id: 2,
    color: '#EA3939'
  },
  {
    text: '지속 가능한 성장',
    textEn: 'Sustainable growth',
    sub: '환경, 사회, 거버넌스(ESG) 목표를 설정하고 이행하기',
    subEn: 'Setting and implementing environmental, social and governance (ESG) goals',
    id: 3,
    color: '#44BDBD'
  }
]

type TConnectBoxProps = {
  strengthAndOpportunity: any
  strengthAndThreat: any
  weaknessAndOpportunity: any
  weaknessAndThreat: any
  expansionOfMarketShare: any
  improveCustomerSatisfaction: any
  sustainableGrowth: any
  form: any
  isLoading?: boolean
  // lines: any
  // setLines: any
}

const ConnectBox = ({
  strengthAndOpportunity,
  strengthAndThreat,
  weaknessAndOpportunity,
  weaknessAndThreat,
  expansionOfMarketShare,
  improveCustomerSatisfaction,
  sustainableGrowth,
  form: { watch },
  // lines,
  // setLines,
  isLoading
}: TConnectBoxProps) => {
  const [newLineSource, setNewLineSource] = useState<any>(null)
  const [line, setLine] = useState<any>()
  const [lines, setLines] = useRecoilState(LinesAtom)

  const { dict, getValueLanguage, lang } = useLanguage()

  const expansionOfMarketShareArray = watch('expansionOfMarketShare') || []
  const improveCustomerSatisfactionArray = watch('improveCustomerSatisfaction') || []
  const sustainableGrowthArray = watch('sustainableGrowth') || []

  // const arrright = [
  //   {
  //     text: dict.swot_increase,
  //     sub: dict.swot_increase_des,
  //     id: 1,
  //     color: '#3C82F9'
  //   },
  //   {
  //     text: dict.swot_improved,
  //     sub: dict.swot_improved_des,
  //     id: 2,
  //     color: '#EA3939'
  //   },
  //   { text: dict.swot_sustainable, sub: dict.swot_sustainable_des, id: 3, color: '#44BDBD' }
  // ]

  const handleCircleClick = (value: any) => {
    ;``
    const line = { from: newLineSource, to: value }
    setLine(line)
    //check if value exist in lines
    const isElementExist = lines?.some((item: any) => item.from.id === value.id || item.to.id === value.id)
    if (isElementExist && ![1, 2, 3].includes(value.id)) {
      const a = expansionOfMarketShareArray.findIndex((data: any) => data.id === value.id)
      const b = improveCustomerSatisfactionArray.findIndex((data: any) => data.id === value.id)
      const c = sustainableGrowthArray.findIndex((data: any) => data.id === value.id)
      if (a !== -1) {
        expansionOfMarketShare.remove(a)
      } else if (b !== -1) {
        improveCustomerSatisfaction.remove(b)
      } else {
        sustainableGrowth.remove(c)
      }
    }

    //remove line when click
    if (isElementExist && !value.sub) {
      setLines((prevLines: any) =>
        prevLines.filter((item: any) => item.from.id !== value.id && item.to.id !== value.id)
      )
      setNewLineSource(null)
    }

    // do nothing when choose the same right column
    if (value?.sub && newLineSource?.sub) {
      setNewLineSource(value)
      return
    }

    // do nothing when choose the same left column
    if (!value?.sub && !newLineSource?.sub) {
      setNewLineSource(value)
      return
    }

    if (newLineSource && value?.id !== newLineSource?.id) {
      setLines((prevLines: any) => [...prevLines, line] as any)
      if (line.from.id === 1 || line.to.id === 1) {
        if (line.from.sub) {
          expansionOfMarketShare.append(line.to)
        } else {
          expansionOfMarketShare.append(line.from)
        }
      }

      if (line.from.id === 2 || line.to.id === 2) {
        if (line.from.sub) {
          improveCustomerSatisfaction.append(line.to)
        } else {
          improveCustomerSatisfaction.append(line.from)
        }
      }

      if (line.from.id === 3 || line.to.id === 3) {
        if (line.from.sub) {
          sustainableGrowth.append(line.to)
        } else {
          sustainableGrowth.append(line.from)
        }
      }

      setNewLineSource(null)
    } else if (!newLineSource) {
      setNewLineSource(value)
    } else {
      setNewLineSource(null)
    }
  }

  const handleDeleteLine = (value: any) => {
    const newArr = lines.filter((x: any) => x?.from?.id !== value?.from?.id || x?.to?.id !== value?.to?.id)
    setLines(newArr)
  }

  useEffect(() => {
    const arrOne = expansionOfMarketShareArray?.map((item: any) => ({
      from: item,
      to: arrright[0]
    }))
    const arrTwo = improveCustomerSatisfactionArray?.map((item: any) => ({
      from: item,
      to: arrright[1]
    }))
    const arrThree = sustainableGrowthArray?.map((item: any) => ({
      from: item,
      to: arrright[2]
    }))
    setLines([...arrOne, ...arrTwo, ...arrThree] as any)
  }, [])

  const isFetching = useIsFetching({
    predicate: (mutation: any) => {
      return !mutation.meta?.offLoading
    }
  })

  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component='div' className={styles['wrapper']}>
      <Box className={styles['table']} border={`1px solid ${home.gray200}`}>
        <TableItem
          line={line}
          handleCircleClick={handleCircleClick}
          data={transformArray(strengthAndOpportunity, 4, 'SO')}
          titleOne={dict.swot_strength}
          titleTwo={dict.swot_opportunity}
          subTitleOne='Strength'
          subTitleTwo='Opportunity'
        />
        <TableItem
          line={line}
          handleCircleClick={handleCircleClick}
          data={transformArray(strengthAndThreat, 9, 'ST')}
          titleOne={dict.swot_strength}
          titleTwo={dict.swot_threat}
          subTitleOne='Strength'
          subTitleTwo='Threat'
        />
        <TableItem
          line={line}
          handleCircleClick={handleCircleClick}
          data={transformArray(weaknessAndOpportunity, 14, 'WO')}
          titleOne={dict.swot_weakness}
          titleTwo={dict.swot_opportunity}
          subTitleOne='Weakness'
          subTitleTwo='Opportunity'
        />
        <TableItem
          line={line}
          handleCircleClick={handleCircleClick}
          data={transformArray(weaknessAndThreat, 19, 'WT')}
          titleOne={dict.swot_weakness}
          titleTwo={dict.swot_threat}
          subTitleOne='Weakness'
          subTitleTwo='Threat'
        />
      </Box>
      {Array.isArray(lines) &&
        lines?.map((line: any, idx: any) => {
          const sourcePos = getElementPosition(line.from.id)
          const targetPos = getElementPosition(line.to.id)
          if (!sourcePos || !targetPos) {
            console.error('Invalid source line, probably:', {
              line,
              sourcePos,
              targetPos
            })
            return null
          }

          const number = 5
          const x1 = targetPos[0] + number
          const x2 = sourcePos[0] + number
          const y1 = targetPos[1] + number
          const y2 = sourcePos[1] + number

          const length = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
          const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

          const xMid = (x1 + x2) / 2
          const yMid = (y1 + y2) / 2

          return (
            <Box
              key={idx}
              style={{
                position: 'absolute',
                background: line.from?.color ?? line.to?.color,
                width: length + 'px',
                height: '2px',
                transform: `rotate(${angle}deg)`,
                left: xMid - length / 2 + 'px',
                top: yMid + 'px',
                display: isFetching ? 'none' : 'inherit',
                cursor: 'pointer'
              }}
              onClick={() => handleDeleteLine(line)}
            ></Box>
          )
        })}
      <Box className={styles['wrapper-right']}>
        {arrright?.map((x, index) => (
          <>
            <ParentBox
              id={x.id}
              handleCircleClick={() => handleCircleClick(x)}
              text={getValueLanguage(x, 'text') as any}
              sub={getValueLanguage(x, 'sub')}
              color={x.color}
              isActive={x.id === line?.from?.id || x.id === line?.to?.id}
              isResponsive
            />
          </>
        ))}
      </Box>
    </Box>
  )
}

export default ConnectBox
