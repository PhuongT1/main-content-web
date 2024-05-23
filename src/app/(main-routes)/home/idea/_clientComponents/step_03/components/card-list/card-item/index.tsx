import React from 'react'
import styles from './card-item.module.scss'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import CheckedIdeaIcon from '@/assets/icons/idea/checked'
import { TCreateIdea, TMethod } from '@/types/idea.type'
import { useIdeaData } from '../../../../use-idea'
import { STEP } from '@/constants/common.constant'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import PlusIdeaIcon from '@/assets/icons/idea/plus'
import MinusIdeaIcon from '@/assets/icons/idea/minus'
import MultiplicationIdeaIcon from '@/assets/icons/idea/multiplication'
import DivisionIdeaIcon from '@/assets/icons/idea/division'
import { ExpandItem } from '@/components/home/tip-item'
import { useLanguage } from '@/hooks/use-language'

type Props = {
  title: React.ReactNode
  description: React.ReactNode
  sectionTitle: React.ReactNode
  isSelected?: boolean
  method: TMethod | string
  onClickCard?: (method: TMethod | string, content: string) => void
  isEditView?: boolean
}

const CardItem = ({ sectionTitle, description, title, isSelected, method, onClickCard, isEditView = true }: Props) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  const currentIcon = () => {
    switch (method) {
      case Method.plus:
        return <PlusIdeaIcon pathProps={{ fill: home.gray50 }} />
      case Method.minus:
        return <MinusIdeaIcon pathProps={{ fill: home.gray50 }} />
      case Method.multiplication:
        return <MultiplicationIdeaIcon pathProps={{ fill: home.gray50 }} />
      case Method.division:
        return (
          <DivisionIdeaIcon
            lineProps={{ stroke: home.gray50 }}
            circleProps={{ fill: home.gray50, stroke: home.gray50 }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box
      component={'div'}
      onClick={() => onClickCard?.(method, data?.data?.[method as TMethod]?.content ?? '')}
      sx={{
        backgroundColor: isSelected ? home.opacity_blue_100 : home.gray300,
        border: isSelected ? `1px solid ${home.blue500}` : 'none'
      }}
      className={styles.preview_top}
    >
      <Box display={'flex'} alignItems={'center'} gap={'20px'}>
        {currentIcon()}
        <Typography component={'div'} className={styles.preview_top_left_text} color={home.gray50}>
          {sectionTitle}
        </Typography>
      </Box>
      <Divider
        sx={{ height: '60px', alignSelf: 'center', bgcolor: home.gray200, borderColor: home.gray200 }}
        orientation='vertical'
        flexItem
      />
      <Box flex={'1 0 0'} justifyContent={'space-between'} display={'flex'} alignItems={'center'} gap={'16px'}>
        <Box height={1} display={'flex'} flexDirection={'column'} flex={1} gap={'10px'}>
          {title}
          <ExpandItem line={2} content={<>{description}</>} />
        </Box>
        {isEditView && (
          <Button
            size='small'
            sx={{
              backgroundColor: isSelected ? home.blue500 : home.gray200,
              color: home.gray50,
              fontSize: '14px',
              lineHeight: 1.5,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: isSelected ? home.blue500 : home.gray200
              }
            }}
            className={styles.preview_edit_button}
          >
            <CheckedIdeaIcon pathProps={{ stroke: home.gray50 }} />
            {dict.common_select}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CardItem
