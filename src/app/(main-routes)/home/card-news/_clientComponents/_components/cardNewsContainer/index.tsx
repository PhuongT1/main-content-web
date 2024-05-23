import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import { ICardData } from '@/types/cardnews/index.type'
import React, { useMemo } from 'react'
import CardNews from '../cardNews'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { ButtonItem, EditButton, SubmitButton } from '@/components/home/button'
import EmptyGenerateDisplay from '@/components/empty-generate-display'
import { allCardData, cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { useRecoilState } from 'recoil'
import { convertToRem } from '@/utils/styles'
import DownloadImage from '../../DownloadImage'
import CardNewsIcon from '@/assets/icons/card-news/card-news'
import { usePostData } from '../../../hooks/useCardNews'
import { FormStatus } from '../../../utils/common'

interface CardNewsContainerProps {
  data?: {
    type: CARD_NEWS_TYPES
    id: string
    data: ICardData[]
  }
  projectId: number
}

const CardNewsContainer: React.FC<CardNewsContainerProps> = ({ data, projectId }) => {
  const [isEdit, setIsEdit] = useRecoilState(editCardNews)
  const [cardNews, setCardNews] = useRecoilState(cardNewsData)
  const [allData, setAllData] = useRecoilState(allCardData)
  const { mutation: onSubmitCardNewsData } = usePostData<object>(projectId)

  const {
    palette: { home }
  } = useTheme()

  const onEditCardNews = () => {
    if (!data) return
    setIsEdit(true)
    setCardNews(data)
  }

  const dataToShow = useMemo(() => {
    if (isEdit) {
      return cardNews
    }
    return data
  }, [isEdit, cardNews, data])

  const onSaveCard = () => {
    setIsEdit(false)
    const newAllData = (allData ? [...allData] : []).map((item) => {
      if (item.id === data?.id) {
        return {
          ...item,
          status: FormStatus.completed,
          data: cardNews.data
        }
      }
      return item
    })

    setAllData(newAllData)
    onSubmitCardNewsData(newAllData)
  }

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        gap={2}
        width='100%'
        sx={{ marginBottom: convertToRem(20) }}
      >
        <ButtonItem
          startIcon={<CardNewsIcon />}
          onClick={isEdit ? onSaveCard : onEditCardNews}
          sx={{
            backgroundColor: home.blue500,
            height: remConvert('44px'),
            minWidth: remConvert('150px'),
            padding: remConvert('18px 20px'),
            borderRadius: remConvert('10px'),
            border: 'none',
            color: '#000000',
            '&.Mui-disabled': {
              color: '#000000',
              opacity: 0.5
            },
            '&:hover': {
              backgroundColor: 'home.blue300'
            }
          }}
          disabled={!cardNews}
        >
          {isEdit ? '카드뉴스 저장' : '카드뉴스 편집하기'}
        </ButtonItem>
        <DownloadImage />
      </Box>
      {dataToShow ? (
        <>
          <Box component={'div'} id='card-news-image-download'></Box>
          <Box component={'div'} id='card-news'>
            <CardNews type={dataToShow.type} data={dataToShow.data} />
          </Box>
        </>
      ) : (
        <EmptyGenerateDisplay
          title={
            allData?.length ? (
              '생성한 카드뉴스를 확인해보세요.'
            ) : (
              <>
                생성된 카드뉴스가 없습니다.
                <br />
                카드뉴스를 생성해보세요.
              </>
            )
          }
        />
      )}
    </>
  )
}

export default CardNewsContainer
