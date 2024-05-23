import { Typography } from '@/elements'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import styles from './schumpeterAI.module.scss'
import { CreateButton, MoreButton } from '@/components/home/button'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { remConvert } from '@/utils/convert-to-rem'
import CardItem from '@/components/home/card-item'
import { ChatGPTCustomer, Customer, VirtualTargetCustomer } from '@/types/customer-service.type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import ModifyIcon from '@/assets/icons/modify'
import { ModalChildren } from '@/components/dialog/modal-deck'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import useToggle from '@/hooks/use-toggle'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getInformationChatGpt } from '@/services/customer.service'
import LoadingAI from '@/elements/loadingAI'
import ScrollBar from 'react-perfect-scrollbar'
import { TipContentSecond } from '../tip-content'

export interface SchumpeterAIProps {
  onClick?: () => void
  title?: string
}

const PersonIntroductionAI = () => {
  const {
    palette: { home }
  } = useTheme()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { watch, setValue, control } = useFormContext<VirtualTargetCustomer>()

  const introductionCustomer = watch('introductionCustomer')
  const modalCard = watch('modalCard')
  const customer = watch('customer')
  const dataAI = watch('selectList')
  const countAI = watch('countAI')

  const { fields, update, append } = useFieldArray({
    control,
    name: 'selectList'
  })

  const [param, setParam] = useState<Customer>()

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['virtual-target-customer-AI', param],
    queryFn: ({ queryKey: [, param] }) => getInformationChatGpt(param as Customer),
    meta: {
      offLoading: true
    },
    gcTime: 1000,
    enabled: false
  })

  useEffect(() => {
    customer && setParam(customer)
  }, [customer])

  useEffect(() => {
    if (data) {
      setValue('countAI', Number(countAI ?? 0) + 1)
      data.map((item) => {
        const isExist = dataAI?.findIndex((itemAI) => compareItem(item, itemAI))
        isExist && isExist === -1 && append(item)
      })
    }
  }, [data])

  const convertItem = ({ title, content }: ChatGPTCustomer, index: number) => ({
    title: (
      <Box
        component={'a'}
        sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', paddingLeft: remConvert('30px') }}
      >
        “ {title?.kr} “
        <Box
          component={'div'}
          sx={{
            color: home.blue500,
            display: 'flex',
            alignItems: 'center',
            gap: remConvert('4px'),
            minWidth: remConvert('70px')
          }}
          onClick={(e) => {
            e.stopPropagation()
            setToggleShowDialog(true)
            setValue('modalCard', { title: title, content, index }, { shouldValidate: true })
          }}
        >
          <ModifyIcon
            lineProps={{
              stroke: home.blue500
            }}
            pathProps={{
              stroke: home.blue500
            }}
          />
          수정
        </Box>
      </Box>
    ),
    subTitle: (
      <Typography color={home.gray50} cate='sub_title_30'>
        {content?.kr}
      </Typography>
    )
  })

  const onSubmit = () => {
    if (!modalCard) return
    const { index, ...rest } = modalCard
    update(index, rest)
    setToggleShowDialog(false)
  }

  const isEnable = (obj: any, isButton?: boolean) => {
    const { path, ...rest } = obj
    isButton = isButton && Number(countAI) > 2
    return Object.values(rest || {}).some((value) => value === null || value === undefined || value === '') || isButton
  }

  const compareItem = (item: ChatGPTCustomer, itemCompare: ChatGPTCustomer) =>
    item.title?.kr === itemCompare.title?.kr && item.content?.kr === itemCompare.content?.kr ? true : false

  return (
    <Box component={'div'}>
      <LoadingAI isLoading={isFetching}>
        {Number(dataAI?.length) === 0 && (
          <Box component={'div'} className={styles.layer_box} bgcolor={home.gray400}>
            <Typography className={styles.title} fontWeight={600}>
              타깃인물 소개글
            </Typography>
            <Typography color={home.gray100} className={styles.sub_title}>
              기본정보를 바탕으로 소개글을 추천합니다.
            </Typography>
            <CreateButton disabled={isEnable(customer || {})} onClick={() => refetch()} />
          </Box>
        )}
        {Number(dataAI?.length) > 0 && (
          <BoxLayoutOulined
            header={
              <Box display='flex' alignItems='center' gap={remConvert('10px')} width='100%'>
                <Typography cate='title_50'>추천 소개글</Typography>
                <Typography color={home.mint500} cate='body_3_semibold'>
                  {fields?.length}개
                </Typography>
              </Box>
            }
            style={{ marginBottom: '20px', padding: remConvert('24px 20px') }}
          >
            <ScrollBar
              style={{
                height: 610
              }}
            >
              <Grid
                container
                display='flex'
                wrap='wrap'
                alignItems='stretch'
                spacing={remConvert('20px')}
                padding={remConvert('2px')}
              >
                {fields?.map((item, index) => (
                  <Grid item xs={6} md={6} key={item.id}>
                    <CardItem
                      cardItem={convertItem(item, index)}
                      icon='checked'
                      isActive={introductionCustomer && compareItem(introductionCustomer, item) ? true : false}
                      sxCard={{
                        backgroundColor: home.gray400
                      }}
                      sxIcon={{
                        position: 'absolute'
                      }}
                      onClick={() => {
                        setValue('introductionCustomer', item, { shouldValidate: true })
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </ScrollBar>
            <Stack width={'100%'} textAlign={'center'} display={'inline-block'} paddingTop={remConvert('20px')}>
              <MoreButton
                disabled={isEnable(customer, true)}
                svgComponentProps={{
                  pathProps: {
                    stroke: isEnable(customer, true) ? home.gray200 : home.gray50
                  }
                }}
                sx={{
                  padding: remConvert('6px 20px')
                }}
                onClick={() => refetch()}
              >
                추가 생성하기 {Number(countAI ?? 0)}/3
              </MoreButton>
            </Stack>
          </BoxLayoutOulined>
        )}
      </LoadingAI>
      {Number(dataAI?.length) > 0 && <TipContentSecond />}
      <ModalChildren title='가상의 타깃고객 소개글' open={showDialog} onCancel={toggleShowDialog} onSubmit={onSubmit}>
        <Stack gap={'20px'} margin={remConvert('20px 0')}>
          <InputItem
            showErrorMessage
            maxLength={50}
            control={control}
            label='아이디어'
            name={'modalCard.title.kr'}
            textFieldProps={{
              required: true
            }}
          />
          <TextareaItem
            control={control}
            label='아이디어'
            name={'modalCard.content.kr'}
            textFieldProps={{
              required: true,
              rows: 17.2,
              multiline: true
            }}
          />
        </Stack>
      </ModalChildren>
    </Box>
  )
}

export default PersonIntroductionAI
