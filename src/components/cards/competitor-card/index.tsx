'use client'
import Image from 'next/image'
import moment from 'moment'
import { Box, Grid, Typography, Chip, Divider, useTheme, Tooltip, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import CardItem from '@/components/home/card-item'
import HomeIcon from '@/assets/icons/home-bold'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { optionsTruncate, optionTruncateOneLine, optionAutoFillItems } from '@/utils/styles'
import styles from './style.module.scss'

type CardItemDataAddProps = {
  onClickCardItemDataAdd?: () => void
  text?: string
}
export const CardItemDataAdd = ({ onClickCardItemDataAdd, text = '기업 직접입력' }: CardItemDataAddProps) => {
  const {
    palette: { home }
  } = useTheme()
  const cardData = {
    title: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: convertToRem(8),
          svg: { path: { stroke: home.gray100 } }
        }}
      >
        <PlusOutlineIcon
          svgProps={{ width: convertToRem(40), height: convertToRem(40) }}
          rectProps={{ fill: 'transparent' }}
        />
        <Typography color={home.gray100}>{text}</Typography>
      </Box>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      onClick={onClickCardItemDataAdd && onClickCardItemDataAdd}
      sxCard={{
        minHeight: convertToRem(180),
        backgroundColor: 'initial !important',
        '.MuiButtonBase-root': { alignItems: 'center', justifyContent: 'center', background: home.gray300 }
      }}
    />
  )
}

type CardItemDataProps = {
  onClickCardItemData?: (item: ICompetitiveCompaniesResponse) => void
  selectedCompetitors?: ICompetitiveCompaniesResponse[]
  item: ICompetitiveCompaniesResponse
  isView?: boolean
  icon?: 'checked' | 'radio' | 'delete' | undefined
  sxCard?: SxProps
}
export const CardItemData = ({
  onClickCardItemData,
  item,
  selectedCompetitors,
  isView = false,
  icon = 'checked',
  sxCard
}: CardItemDataProps) => {
  const {
    palette: { home }
  } = useTheme()

  const cardData = {
    title: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: convertToRem(10), maxWidth: '84%' }}>
        {item?.companyImageUrl && (
          <Image
            alt='logo'
            width={30}
            height={30}
            src={item.companyImageUrl as string}
            style={{ borderRadius: 30, objectFit: 'contain' }}
          />
        )}
        <Tooltip title={item?.name}>
          <Typography sx={{ ...optionTruncateOneLine(), flex: 1 }}>{item?.name}</Typography>
        </Tooltip>
        <HomeIcon />
      </Box>
    ),
    subTitle: (
      <Box component={'span'} sx={{ ...optionsTruncate(3), marginTop: convertToRem(20) }}>
        {item?.description}
      </Box>
    ),
    content: (
      <>
        <Box component={'div'} className={styles.chip_wrapper}>
          {item?.keywords?.map((tag: string, index) => (
            <Chip key={`${tag}_${index}`} label={tag} className={styles.chip} />
          ))}
        </Box>
        <Divider sx={{ my: convertToRem(10), bgcolor: 'main_grey.gray800' }} />
        <Box
          className={styles.box_wrapper}
          sx={{ ...optionAutoFillItems({ minWidth: 97, maxColumn: 2, mediaQuery: 1200 }), gap: convertToRem(8) }}
        >
          <Box display={'flex'} gap={convertToRem(4)}>
            <Box component={'p'} sx={{ color: '#9498a3', whiteSpace: 'nowrap' }}>
              설립
            </Box>
            <Box component={'span'}>
              {typeof item?.establishDate === 'string' ? moment(item?.establishDate).format('YYYY') : '-'}
            </Box>
          </Box>
          <Box display={'flex'} gap={convertToRem(4)}>
            <Box component={'p'} sx={{ color: '#9498a3', whiteSpace: 'nowrap' }}>
              인원
            </Box>
            <Box component={'span'}>{item?.numbEmployees}</Box>
          </Box>
          <Box display={'flex'} gap={convertToRem(4)}>
            <Box component={'p'} sx={{ color: '#9498a3', whiteSpace: 'nowrap' }}>
              투자
            </Box>
            <Box component={'span'}>{item?.cumulativeInvestmentAmount}</Box>
          </Box>
          <Box display={'flex'} gap={convertToRem(4)}>
            <Box component={'p'} sx={{ color: '#9498a3', whiteSpace: 'nowrap' }}>
              매출
            </Box>
            <Box component={'span'}>{item?.annualRevenue}</Box>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <CardItem
      cardItem={cardData}
      icon={isView ? undefined : icon}
      isActive={selectedCompetitors?.some((com) => com?.id === item?.id)}
      sxCard={{
        backgroundColor: home.gray300,
        backgroundImage: 'none',
        '.MuiButtonBase-root': {
          padding: convertToRem(16),
          backgroundColor: 'initial'
        },
        ...sxCard
      }}
      sxContent={{ backgroundColor: 'initial !important' }}
      onClick={isView ? undefined : () => onClickCardItemData?.(item)}
    />
  )
}
