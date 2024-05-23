import React from 'react'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { Box, Grid, IconButton, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import styles from './card-select.module.scss'
import { ClearBoxIconV2 } from '@/assets/icons/team-building/clear-box'
import { handleFieldArray } from '@/app/(main-routes)/home/teambuilding/utils/handler'
import { useFormContext } from 'react-hook-form'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import { useIndustrialField } from '../../../../use-idea'
import { getFourIdeaByIndustrial } from '@/services/idea.service'
import { useQuery } from '@tanstack/react-query'
import { QueryIndustrial } from '@/types/idea.type'

function CardSelectFindIdea() {
  const { dict } = useLanguage()
  const {
    palette: { home },
    breakpoints
  } = useTheme()

  
  const { filterFourIdea } = useIndustrialField()
  const { getValueLanguage } = useLanguage()
  
  const form = useFormContext()

  const { list, onRemoveItem } = handleFieldArray(form, 'findIdeas.groupIdeas')

  const { data } = useQuery({
    queryKey: [`find-idea`, filterFourIdea],
    enabled: !!filterFourIdea.industrialField,
    queryFn: ({ queryKey: [, filterFourIdea] }: { queryKey: [string, QueryIndustrial] }) =>
      getFourIdeaByIndustrial(filterFourIdea),
    meta: {
      offLoading: true
    }
  })

  const renderItem = (title: string) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          [breakpoints.up(1600)]: {
            maxWidth: 'calc(100% / 4)',
            flexBasis: 'calc(100% / 4)'
          },
          [breakpoints.down(1599)]: {
            maxWidth: 'calc(100% / 3)',
            flexBasis: 'calc(100% / 3)'
          },
          [breakpoints.down(1200)]: {
            maxWidth: 'calc(100%)',
            flexBasis: 'calc(100%)'
          }
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: home.gray200
          }}
          className={styles.box_idea}
        >
          <Box maxWidth={1}>
            <TooltipTitle
              sxBox={{
                display: '-webkit-box',
                color: home.gray50,
                fontSize: remConvert('16px'),
                fontWeight: 600
              }}
              title={title}
            />
          </Box>
        </Box>
      </Grid>
    )
  }

  return (
    <BoxLayoutOulined
      style={{ marginTop: 20 }}
      header={
        <Box display='flex' justifyContent='start' alignItems='center' gap={2} width='100%'>
          <Typography cate='title_50'>{dict.uncomfortable_situation}</Typography>
        </Box>
      }
    >
      <Box component={'div'} className={styles.cards}>
        {list?.map((card: any, index: number) => {
          const currentSituation = data?.data.situation.find(situation => situation.id === card.situation)
          const currentTargetCustomer = data?.data.targetCustomer.find(targetCustomer => targetCustomer.id === card.target_customer)
          const currentKeyword = data?.data.keyword.find(keyword => keyword.id === card.keyword)
          const currentInconvenienceFactor = data?.data.inconvenienceFactor.find(inconvenience_factor => inconvenience_factor.id === card.inconvenience_factor)
          return (
            <Box key={index} sx={{ backgroundColor: home.gray400 }} component={'div'} className={styles.card}>
              <Typography component={'span'} color={home.gray50}>{index + 1}</Typography>
              <Box flex={1} component={'div'} display={'flex'} gap={remConvert('56px')}>
                <Grid container spacing={remConvert('10px')}>
                  {renderItem(currentSituation ? getValueLanguage(currentSituation,'data') : card.situation)}
                  {renderItem(currentTargetCustomer? getValueLanguage(currentTargetCustomer,'data') : card.target_customer)}
                  {renderItem(currentInconvenienceFactor ? getValueLanguage(currentInconvenienceFactor,'data') : card.inconvenience_factor)}
                  {renderItem(currentKeyword ? getValueLanguage(currentKeyword,'data') : card.keyword)}
                </Grid>
  
                <IconButton sx={{ width: 44, height: 44, flexShrink: 0 }} onClick={() => onRemoveItem({ id: card.id })}>
                  <ClearBoxIconV2 rectProps={{ fill: home.gray400, width: 24, height: 24 }} pathProps={{ stroke: home.gray50}} />
                </IconButton>
              </Box>
            </Box>
          )
        })}
      </Box>
    </BoxLayoutOulined>
  )
}

export default CardSelectFindIdea
