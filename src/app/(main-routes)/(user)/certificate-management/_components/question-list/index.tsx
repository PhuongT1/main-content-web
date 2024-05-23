'use client'
import { Button, Typography } from '@/elements'
import { TCourseQuestion, TQuestionResult } from '@/types/certificate.type'
import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type TQuestionListProps = {
  questions: TCourseQuestion[] | TQuestionResult[]
  currentIndex: number
  isStarted?: boolean
  onGoToSnapItem: (idx: number) => void
  selectedAnswers: { [k: number]: number[] }
  type: 'checking' | 'testing'
}

const BGCOLOR = {
  ['selected']: {
    bgcolor: 'main_primary.blue500'
  },
  ['answered']: {
    bgcolor: 'main_primary.blue800'
  },
  ['correct']: {
    bgcolor: 'main_primary.blue500'
  },
  ['wrong']: {
    bgcolor: 'sub.red500'
  }
}

type TQuestionProps = {
  sx: SxProps
  id: number
  idx: number
} & Pick<TQuestionListProps, 'onGoToSnapItem' | 'isStarted'>

const Question = ({ sx, id, idx, onGoToSnapItem, isStarted }: TQuestionProps) => {
  return (
    <Button onClick={() => (isStarted ? onGoToSnapItem(idx) : undefined)} key={id} sx={sx}>
      <Typography
        sx={{
          wordBreak: 'keep-all'
        }}
        cate='title_40'
        plainColor='main_grey.gray100'
        display={'flex'}
      >
        {idx + 1}
        <Box
          component={'span'}
          display={{
            md: 'inline',
            xs: 'none'
          }}
        >
          번
        </Box>
      </Typography>
    </Button>
  )
}

const FlexWrapList = ({ children }: { children: ReactNode }) => {
  return (
    <Box display={'flex'} gap={1} flexWrap={'wrap'}>
      {children}
    </Box>
  )
}

const ScrollList = ({ children }: { children: ReactNode }) => {
  return (
    <Box display={'flex'} gap={1} overflow={'auto'}>
      {children}
    </Box>
  )
}

const QuestionList = ({
  questions,
  onGoToSnapItem,
  currentIndex,
  selectedAnswers,
  type,
  isStarted
}: TQuestionListProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const isChecking = type === 'checking'
  const isTesting = type === 'testing'

  const QuestionListBindingData = () => {
    return (
      <>
        {questions.map((i, idx) => {
          const isSelected = idx === currentIndex
          const isAnswered = Object.hasOwn(selectedAnswers, i.id)
          let isCorrect: 'wrong' | 'correct' = 'wrong'
          if (isChecking) {
            isCorrect = (i as TQuestionResult).isCorrect ? 'correct' : 'wrong'
          }

          const sx = {
            p: 2.5,
            height: {
              md: 60,
              xs: 40
            },
            width: {
              md: 60,
              xs: 50
            },
            borderRadius: 2,
            bgcolor: 'main_grey.gray700',
            ...(isChecking && BGCOLOR[isCorrect]),
            ...(isTesting && { ...(isAnswered && BGCOLOR['answered']), ...(isSelected && BGCOLOR['selected']) })
          }

          return <Question key={i.id} id={i.id} {...{ sx, onGoToSnapItem, idx, isStarted }} />
        })}
      </>
    )
  }

  return (
    <>
      {mdMatches ? (
        <ScrollList>
          <QuestionListBindingData />
        </ScrollList>
      ) : (
        <FlexWrapList>
          <QuestionListBindingData />
        </FlexWrapList>
      )}
    </>
  )
}

export default QuestionList
