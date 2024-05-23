'use client'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import styles from './step1.module.scss'
import { ButtonItem } from '@/components/home/button'
import { ChevronRightIcon } from '@/assets/icons'
import {
  FormStatus,
  IMAGE_PAGE_LIMIT,
  cardNewsFormTypes,
  convertDataToCard
} from '@/app/(main-routes)/home/card-news/utils/common'
import CardNewsForm from '../_components/form'
import { useContext, useEffect, useState } from 'react'
import { ICardNewsGroups, ICardNewsResponeData } from '@/types/cardnews/index.type'
import CompletedForm from '../_components/completeForm'
import SelectCardNewsType from '../SelectCardNewsType'
import { useMutation } from '@tanstack/react-query'
import { createCardNews } from '@/services/card-news.service'
import useRandomImage from '../../hooks/useRandomImage'
import CardNewsContainer from '../_components/cardNewsContainer'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { allCardData, cardNewsData } from '@/atoms/home/card-news'
import { usePostData } from '../../hooks/useCardNews'
import FormDivider from '@/components/form-divider'
import { CardNewsContext } from '..'
import moment from 'moment'
import { DATE_FORMAT } from '@/constants/common.constant'
import { enqueueSnackbar } from 'notistack'
import { Typography } from '@/elements'
import { ModalNotification } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { DeckProjectId } from '@/types/deck.type'

const CardNewsStep1 = ({ projectId }: DeckProjectId) => {
  const {
    palette: { home, main }
  } = useTheme()

  const [formGroups, setFormGroups] = useState<ICardNewsGroups>()
  const { randomImagePage, createRandomImage } = useRandomImage({ page: 1, limit: IMAGE_PAGE_LIMIT })
  const [cardNews, setCardNews] = useRecoilState(cardNewsData)
  const resetCardNews = useResetRecoilState(cardNewsData)
  const [allData, setAllData] = useRecoilState(allCardData)
  const { expandKey, setExpandKey } = useContext(CardNewsContext)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { mutation: onSubmitCardNewsData } = usePostData<object>(projectId as number)

  useEffect(() => {
    if (expandKey && allData) {
      const data = allData.find((item: any) => item.id === expandKey)
      if (data) {
        setCardNews({ data: data.data, type: data.type, id: data.id })
      }
    }
  }, [expandKey])

  const displayError = () => {
    enqueueSnackbar('ChatGPT로 새 카드를 생성하지 못했습니다.', { variant: 'error' })
  }

  const submitForm = useMutation({
    mutationKey: ['card-news-chatGPT'],
    mutationFn: async ({ data, _info }: any) => createCardNews(data),
    onSuccess(response, variables) {
      if (!response || !response.data || !response.data.length) {
        displayError()
        return
      }
      const info = variables._info
      const dataCustom = convertData(response.data)
      setCardNews({ data: dataCustom, type: info.type, id: info.id })
      const isEdit = !!allData?.find((item) => item.id === info.id)
      const newData = isEdit
        ? allData.map((item) =>
            item.id === info.id
              ? {
                  ...item,
                  status: FormStatus.completed,
                  form: {
                    ...item.form,
                    ...info
                  },
                  data: dataCustom
                }
              : item
          )
        : [
            ...(allData || []),
            {
              type: info.type,
              status: FormStatus.completed,
              id: info.id,
              form: info,
              data: dataCustom
            }
          ]
      setAllData(newData)
      onSubmitCardNewsData(newData)
      setFormGroups(undefined)
      randomImagePage()
    },
    onError() {
      displayError()
    }
  })

  const onAddCardNews = async (info: any, submitData: any) => {
    submitForm.mutateAsync({ data: submitData, _info: info })
  }

  const onEditCardNewsForm = (id: string) => {
    setAllData(allData.map((item) => (item.id === id ? { ...item, status: FormStatus.inprogress } : item)))
  }

  const onDeleteCardNewsForm = (id: string) => {
    setAllData(allData.filter((item) => item.id !== id))
    if (cardNews.id === id) {
      resetCardNews()
    }
  }

  const convertData = (data: ICardNewsResponeData[]) => {
    const images = createRandomImage()
    return convertDataToCard(data, images)
  }

  return (
    <Box
      component={'form'}
      sx={{
        marginTop: convertToRem(52)
      }}
      onSubmit={() => {}}
      className='card-news-step1'
    >
      <Stack gap={'20px'} direction={'column'}>
        <Box component='div'>
          <Box component={'div'} className={styles.layer_title}>
            <Typography cate='title_4_semibold' sx={{ color: home.gray50 }}>
              카드뉴스 작성
            </Typography>
          </Box>
        </Box>
        <Stack gap={'40px'} direction={'row'} width={'100%'}>
          <Box component={'div'} flexGrow={1}>
            <CardNewsContainer data={cardNews} projectId={projectId as number} />
          </Box>

          <Grid flex={'0 0 360px'}>
            <Box component={'div'} className={styles.background} sx={{ backgroundColor: home.gray400 }}>
              <SelectCardNewsType
                isAddNew={!!formGroups}
                onAddCardNews={(d) => {
                  setFormGroups(d), setExpandKey('')
                }}
              />
              <Stack gap={2.5} direction={'column'}>
                {formGroups || (allData && allData.length) ? <FormDivider sx={{ marginTop: '20px' }} /> : null}
                {formGroups && (
                  <CardNewsForm
                    formGroup={formGroups}
                    type={formGroups.type}
                    formStatus={FormStatus.inprogress}
                    onSubmit={onAddCardNews}
                    initValues={{ prodDate: moment(new Date()).format(DATE_FORMAT.DASH_REV) }}
                    onCancel={() => setToggleShowDialog(true)}
                  />
                )}
                {allData?.map((item) =>
                  item.status === FormStatus.completed ? (
                    <CompletedForm
                      key={item.id}
                      formData={{
                        formType: item.type,
                        data: item.form
                      }}
                      onEdit={() => onEditCardNewsForm(item.id)}
                      onDelete={() => onDeleteCardNewsForm(item.id)}
                      id={item.id}
                    />
                  ) : (
                    <CardNewsForm
                      key={item.id}
                      onSubmit={onAddCardNews}
                      id={item.id}
                      formGroup={cardNewsFormTypes.find(({ type }) => type === item.type)}
                      type={item.type}
                      formStatus={FormStatus.inprogress}
                      initValues={item.form}
                      canOpenCollapse={false}
                      onCancel={() => setToggleShowDialog(true)}
                    />
                  )
                )}
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </Stack>
      <Grid container>
        <Grid item xs={12}>
          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            width='100%'
            sx={{ marginTop: convertToRem(60) }}
          >
            <ButtonItem
              endIcon={<ChevronRightIcon pathProps={{ stroke: 'currentColor' }} />}
              sx={{
                color: main.gray90,
                backgroundColor: main.blue,
                lineHeight: remConvert('20px'),
                '&:hover': {
                  bgcolor: 'main_primary.blue300'
                }
              }}
              variant='contained'
            >
              다음 Deck으로 이동
            </ButtonItem>
          </Box>
        </Grid>
      </Grid>
      <ModalNotification
        onSubmit={() => {
          setFormGroups(undefined)
          setAllData(allData.map((item) => ({ ...item, status: FormStatus.completed })) || [])
          setToggleShowDialog(false)
        }}
        description={'삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'}
        title={'작성한 데이터가 삭제됩니다.'}
        open={showDialog}
        onCancel={toggleShowDialog}
        cancelTxt='닫기'
        submitTxt='삭제하기'
      />
    </Box>
  )
}

export default CardNewsStep1
