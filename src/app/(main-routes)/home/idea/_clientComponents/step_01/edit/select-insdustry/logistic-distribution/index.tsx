'use client'
import { Box, Divider, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'

import styles from './logistic-distribution.module.scss'
import { Chip } from '@/elements'
import { UploadAvatar } from '@/form/upload'
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import RelateCompany from './company-slider'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { getFourIdea } from '@/services/idea.service'
import { useRecoilValue } from 'recoil'
import { filterFourIdeaSelector } from '@/atoms/home/idea'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { ICompetitiveCompaniesIndustryResponse } from '@/types/competitor-analysis.type'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

function LogisticDistribution<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name
}: {
  name: TName
}) {
  const filterFourIdea = useRecoilValue(filterFourIdeaSelector)
  const { data: fourIdea, isLoading } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_FOUR_IDEA, filterFourIdea],
    queryFn: () => getFourIdea(filterFourIdea),
    enabled: !!filterFourIdea.industrialField
  })

  const { data: dataIndustry } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === filterFourIdea.industrialField)
  }, [filterFourIdea, dataIndustry])

  return (
    <>
      {isLoading ? (
        <DistributionSkeleton />
      ) : fourIdea?.data?.length! > 0 ? (
        <DistributionRender name={name} data={currentIndustrial} />
      ) : null}
    </>
  )
}

export default LogisticDistribution

function DistributionRender<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  data,
  name
}: {
  data?: ICompetitiveCompaniesIndustryResponse
  name: TName
}) {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<TFieldValues>()

  return (
    <Box component={'div'} className={styles.wrapper}>
      <Box component={'div'} id={styles.distribution}>
        <Box component={'div'} id={styles.distribution_content}>
          <Typography color={home.gray50} id={styles.distribution_content_title}>
            {getValueLanguage(data, 'name')}
          </Typography>
          <Stack flexWrap={'wrap'} direction={'row'} gap={'10px'} mt={'20px'} mb={'10px'}>
            {(lang === LANG.EN ? data?.hashTagEn : data?.hashTag)?.split(',').map((chip) => (
              <Chip
                key={chip}
                sx={{
                  borderColor: home.gray100,
                  color: home.gray100,
                  '& .MuiChip-label': {
                    paddingLeft: 0,
                    paddingRight: 0
                  }
                }}
                id={styles.distribution_content_chip}
                label={chip}
                variant='outlined'
              />
            ))}
          </Stack>
          <Typography color={home.gray50} id={styles.distribution_content_desc}>
            {getValueLanguage(data, 'description')}
          </Typography>
        </Box>
        <Box component={'div'} id={styles.distribution_img}>
          <UploadAvatar
            sxButtonChange={{
              top: '30px',
              left: '100%',
              transform: 'translate(calc(-100% - 16px),-50%)'
            }}
            formProps={form}
            name={name}
          />
        </Box>
      </Box>
      <Divider sx={{ width: 1, borderColor: home.gray200 }} />
      <Box component={'div'} id={styles.relate_company}>
        <Typography color={home.gray50}>{dict.related_companies}</Typography>
        <RelateCompany />
      </Box>
    </Box>
  )
}

export function DistributionSkeleton() {
  return (
    <Box component={'div'} className={styles.wrapper}>
      <Box component={'div'} id={styles.distribution}>
        <Box component={'div'} id={styles.distribution_content}>
          <Skeleton variant='text' sx={{ width: 100, height: 36 }} />
          <Stack direction={'row'} gap={'10px'} mt={'20px'} mb={'10px'}>
            <Skeleton variant='rounded' sx={{ width: 50, height: 30, borderRadius: 50 }} />
            <Skeleton variant='rounded' sx={{ width: 50, height: 30, borderRadius: 50 }} />
            <Skeleton variant='rounded' sx={{ width: 50, height: 30, borderRadius: 50 }} />
            <Skeleton variant='rounded' sx={{ width: 50, height: 30, borderRadius: 50 }} />
            <Skeleton variant='rounded' sx={{ width: 50, height: 30, borderRadius: 50 }} />
          </Stack>
          <Skeleton variant='text' sx={{ width: 200, height: 24 }} />
          <Skeleton variant='text' sx={{ width: 300, height: 24 }} />
          <Skeleton variant='text' sx={{ width: 540, height: 24 }} />
        </Box>
        <Box component={'div'} id={styles.distribution_img}>
          <Skeleton variant='rounded' width={320} height={150} sx={{ borderRadius: '10px' }} />
        </Box>
      </Box>
      <Box component={'div'} id={styles.relate_company}>
        <Skeleton variant='text' sx={{ width: 100, height: 36 }} />
        <Stack overflow={'scroll'} maxWidth={1} direction={'row'} gap={'10px'} mb={'10px'}>
          <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
          <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
          <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
          <Skeleton variant='rounded' sx={{ width: 316, height: 116 }} />
        </Stack>
      </Box>
    </Box>
  )
}
