import { NumberIcon } from '@/assets/icons'
import { CorrectImg, WrongImg } from '@/assets/images'
import { SanitizationHtml } from '@/components'
import { BaseImage, Typography } from '@/elements'
import { ColorPalette } from '@/themes/get-design-tokens'
import { TQuestionResult } from '@/types/certificate.type'
import { Box, Button, Theme, useTheme } from '@mui/material'
import { MutableRefObject } from 'react'
import { SnapItem, SnapList } from 'react-snaplist-carousel'

enum COLOR_BY_CASE {
  CORRECT_BUT_NOT_SELECT = 'correctButNotSelect',
  SELECTED_BUT_WRONG = 'selectedButWrong',
  CORRECT = 'correct',
  DEFAULT = 'default'
}

type TQuestionProps = {
  question: TQuestionResult
  idx: number
}

const getColorKit = (theme: Theme, key: keyof typeof COLOR_KIT) => {
  const COLOR_KIT = {
    [COLOR_BY_CASE.CORRECT_BUT_NOT_SELECT]: {
      borderColor: theme.palette.sub.orange20,
      textColor: theme.palette.sub.orange20,
      bgColor: undefined,
      svgColor: {
        pathProps: { fill: theme.palette.sub.orange20 },
        rectProps: { stroke: theme.palette.sub.orange20 }
      }
    },
    [COLOR_BY_CASE.SELECTED_BUT_WRONG]: {
      borderColor: theme.palette.main_primary.blue500,
      textColor: theme.palette.main_grey.gray100,
      bgColor: theme.palette.main_primary.blue500,
      svgColor: {
        pathProps: { fill: theme.palette.main_grey.gray100 },
        rectProps: { stroke: theme.palette.main_grey.gray100 }
      }
    },
    [COLOR_BY_CASE.CORRECT]: {
      borderColor: theme.palette.main_primary.blue500,
      textColor: theme.palette.main_primary.blue500,
      bgColor: undefined,
      svgColor: {
        pathProps: { fill: theme.palette.main_primary.blue500 },
        rectProps: { stroke: theme.palette.main_primary.blue500 }
      }
    },
    [COLOR_BY_CASE.DEFAULT]: {
      borderColor: theme.palette.main_grey.gray200,
      textColor: theme.palette.main_grey.gray600,
      bgColor: undefined,
      svgColor: undefined
    }
  }
  return COLOR_KIT[key]
}

const Question = ({ question, idx }: TQuestionProps) => {
  const theme = useTheme()
  const questionMark = question.isCorrect ? CorrectImg : WrongImg
  return (
    <Typography
      component={'div'}
      width={'100%'}
      mt={4}
      position={'relative'}
      maxWidth={704}
      cate='sub_title_40'
      plainColor='main_grey.gray700'
    >
      {idx + 1}. {question.question}
      <Box component={'ul'} mt={1.25} display={'flex'} gap={0.5} flexDirection={'column'}>
        {question.answers.map((i, idx) => {
          let key: COLOR_BY_CASE = COLOR_BY_CASE.DEFAULT
          if (i.isAnswer && !i.hasSelect) {
            key = COLOR_BY_CASE.CORRECT_BUT_NOT_SELECT
          } else if (i.hasSelect && !i.isAnswer) {
            key = COLOR_BY_CASE.SELECTED_BUT_WRONG
          } else if (i.hasSelect && i.isAnswer) {
            key = COLOR_BY_CASE.CORRECT
          }
          const colorKit = getColorKit(theme, key)
          return (
            <Button
              key={idx}
              sx={{
                borderRadius: 2,
                p: 1.25,
                border: '1px solid',
                borderColor: colorKit.borderColor,
                bgcolor: colorKit.bgColor,
                display: 'flex',
                gap: 1.25,
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%'
              }}
              component={'li'}
            >
              {<NumberIcon number={idx + 1} {...colorKit.svgColor} />}
              <Typography cate='body_3' plainColor={colorKit.textColor as ColorPalette}>
                <SanitizationHtml>{i.content}</SanitizationHtml>
              </Typography>
            </Button>
          )
        })}
      </Box>
      <Box position={'absolute'} top={-17} left={-17} height={50} width={60} flexShrink={0}>
        <BaseImage
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 10
          }}
          src={questionMark}
          alt={`image-${0}`}
        />
      </Box>
    </Typography>
  )
}

type TTestAreaProps = {
  questions?: TQuestionResult[]
  snapList: MutableRefObject<null>
}

const TestPaperCheckArea = ({ questions = [], snapList }: TTestAreaProps) => {
  return (
    <>
      <Box
        height={{
          md: 590,
          xs: '70vh'
        }}
        width={'100%'}
        bgcolor={'white'}
        borderRadius={{
          md: 2.5,
          xs: 0
        }}
        position={'relative'}
        sx={{
          '& .snaplist': {
            pt: 5,
            px: {
              xl: 40,
              lg: 20,
              md: 10,
              xs: 5.5
            }
          }
        }}
      >
        <SnapList
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
          direction='vertical'
          ref={snapList}
        >
          {questions.map((i, idx) => (
            <SnapItem snapAlign='start' key={i.id}>
              <Question question={i} idx={idx} />
            </SnapItem>
          ))}
          <Box id='hidden_box' minHeight={450}></Box>
        </SnapList>
      </Box>
    </>
  )
}

export default TestPaperCheckArea
