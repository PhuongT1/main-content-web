import { Box, BoxProps, Skeleton, Stack, SxProps, alpha, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import styles from './card-idea-item.module.scss'
import { Typography } from '@/elements'
import Image from 'next/image'
import { useIdeaData } from '../../../../use-idea'
import { TCreateIdea, TIdiaFormValues } from '@/types/idea.type'
import { LANG, STEP } from '@/constants/common.constant'
import ChipIdea from '../../../../_components/chip'
import { UploadAvatar } from '@/form/upload'
import { FieldPath, useFormContext } from 'react-hook-form'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { useRecoilValue } from 'recoil'
import { filterFourIdeaSelector } from '@/atoms/home/idea'
import { useQuery } from '@tanstack/react-query'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { remConvert } from '@/utils/convert-to-rem'
import { TooltipItem, TooltipTitle } from '@/components/home/tooltip-item'
import { useLanguage } from '@/hooks/use-language'

type TCardIdeaItemProps = {
  positionButton?: 'left' | 'right' | 'none'
  sxBox?: BoxProps
  data?: {
    url: any
    keywords: string[]
    description: string
  }
}

function CardIdeaItem({ positionButton = 'left', data, sxBox }: TCardIdeaItemProps) {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { data: idea } = useIdeaData<TIdiaFormValues>(STEP.STEP_ONE, QUERY_KEY_IDEA.IDEA)

  const { data: dataIndustry } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })
  
  const currentIndustrial = useMemo(() => {
    return dataIndustry?.find((industry) => industry.nameKr === idea?.data?.industrial?.nameKr)
  }, [idea?.data?.industrial?.nameKr, dataIndustry])

  const renderButton = () => {
    switch (positionButton) {
      case 'left':
        return (
          <Box component={'span'} className={[styles.card_img_btn, styles.card_img_btn_left].join(' ')} sx={{ color: home.gray50}}>
            {dict.my_idea}
          </Box>
        )
      case 'right':
        return (
          <Box
            component={'span'}
            sx={{
              borderColor: home.gray100,
              backgroundColor: home.gray400,
              opacity: 0.5
            }}
            className={[styles.card_img_btn, styles.card_img_btn_right].join(' ')}
          >
            {dict.change_image}
          </Box>
        )
      default:
        return null
    }
  }

  if (data) {
    const imgUrl = data.url instanceof Blob ? URL.createObjectURL(data.url as Blob) : (data.url as string)
    return (
      <Box
        component={'div'}
        sx={{
          ...sxBox,
          backgroundColor: home.gray300
        }}
        className={[styles.card, styles.card_main].join(' ')}
      >
        <Box
          component={'div'}
          className={styles.card_img}
          sx={{
            backgroundColor: alpha(home.gray400, 0.4)
          }}
        >
          <Image
            alt='idea'
            width={300}
            height={166}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
              overflow: 'hidden',
              backgroundColor: home.gray400,
              opacity: 0.4
            }}
            src={imgUrl ?? ''}
          />
          {renderButton()}
          <Typography cate='subtitle_1_semibold' color={home.gray50} className={styles.card_img_text}>
            {getValueLanguage(currentIndustrial)}
          </Typography>
        </Box>
        <Box component={'div'} className={styles.card_tags}>
          <Stack flexWrap={'wrap'} direction={'row'} gap={'10px'}>
            {data?.keywords?.map((chip: string) => (
              <ChipIdea key={chip} label={chip} />
            ))}
          </Stack>
        </Box>
        <Box component={'span'}>
          <TooltipTitle title={data?.description}>
            <Typography cate='body_20' fontWeight={600} color={home.gray50}>
              {data?.description}
            </Typography>
          </TooltipTitle>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      component={'div'}
      sx={{
        ...sxBox,
        backgroundColor: home.gray300
      }}
      className={[styles.card, styles.card_main].join(' ')}
    >
      <Box component={'div'} className={styles.card_img}>
        {idea?.data?.path ? (
          <Image
            alt='idea'
            width={300}
            height={166}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
              overflow: 'hidden',
              backgroundColor: home.gray400,
              opacity: 0.4
            }}
            src={idea?.data?.path ?? ''}
          />
        ) : (
          <Skeleton variant='rounded' width={300} height={166} />
        )}

        {renderButton()}
        <Typography cate='subtitle_1_semibold' color={home.gray50} className={styles.card_img_text}>
          {getValueLanguage(currentIndustrial)}
        </Typography>
      </Box>
      <Box component={'div'} className={styles.card_tags}>
        <Stack flexWrap={'wrap'} direction={'row'} gap={'10px'}>
          {(lang === LANG.EN ? currentIndustrial?.hashTagEn : currentIndustrial?.hashTag)?.split(',').map((chip: string) => (
            <ChipIdea key={chip} label={chip} />
          ))}
        </Stack>
      </Box>
      <Box component={'span'}>
        <TooltipTitle title={getValueLanguage(currentIndustrial, 'description')}>
          <Typography cate='body_20' fontWeight={600} color={home.gray50}>
            {getValueLanguage(currentIndustrial, 'description')}
          </Typography>
        </TooltipTitle>
      </Box>
    </Box>
  )
}

export default CardIdeaItem

export const EmptyCardIdea = ({
  content,
  title = '',
  subTitle = '',
  sxBox
}: {
  content?: React.ReactNode
  title?: React.ReactNode
  subTitle?: React.ReactNode
  sxBox?: SxProps
}) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: home.opacity_blue_100,
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: home.blue500,
        ...sxBox
      }}
      component={'div'}
      className={[styles.card, styles.card_empty].join(' ')}
    >
      <Typography component={'div'} cate='subtitle_1_semibold' color={home.gray50}>
        {title || dict.idea_empty_industry_card_title}
      </Typography>
      <Typography component={'div'} cate='body_20' color={home.gray100}>
        {subTitle || dict.idea_empty_industry_card_sub_title}
      </Typography>
      <Box width={1} mt={'12px'}>
        {content}
      </Box>
    </Box>
  )
}

export function CardIdeaItemClone({ name }: TCardIdeaItemProps & { name: FieldPath<TCreateIdea> }) {
  const { lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<TCreateIdea>()

  const urlImg = form.watch(name)

  const filterFourIdea = useRecoilValue(filterFourIdeaSelector)

  const { data: dataIndustry, isLoading } = useQuery({
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
    <Box
      component={'div'}
      sx={{
        backgroundColor: home.gray300,
        outline: 'none',
        border: 'none',
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%233C82F9FF' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        borderRadius: remConvert('10px')
      }}
      className={[styles.card, styles.card_main].join(' ')}
    >
      <Box component={'div'} className={styles.card_img}>
        <UploadAvatar
          sxButtonChange={{
            top: '34px',
            left: '100%',
            transform: 'translate(calc(-100% - 16px),-50%)'
          }}
          formProps={form}
          name={name}
          styleImage={{
            backgroundColor: home.gray400,
            opacity: 0.4
          }}
        />
        {urlImg ? (
          <Typography cate='subtitle_1_semibold' fontWeight={600} color={home.gray50} className={styles.card_img_text}>
            {getValueLanguage(currentIndustrial)}
          </Typography>
        ) : null}
      </Box>
      <Box component={'div'} className={styles.card_tags}>
        <Stack flexWrap={'wrap'} direction={'row'} gap={'10px'}>
          {(lang === LANG.EN ? currentIndustrial?.hashTagEn : currentIndustrial?.hashTag)?.split(',').map((chip: string) => (
            <ChipIdea key={chip} label={chip} />
          ))}
        </Stack>
      </Box>
      <Box component={'span'}>
        <TooltipTitle title={getValueLanguage(currentIndustrial, 'description')}>
          <Typography cate='body_20' fontWeight={600} color={home.gray50}>
            {getValueLanguage(currentIndustrial, 'description')}
          </Typography>
        </TooltipTitle>
      </Box>
    </Box>
  )
}
