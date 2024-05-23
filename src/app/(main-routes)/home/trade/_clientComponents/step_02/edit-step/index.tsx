'use client'
import SearchIcon from '@/assets/icons/search'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { dataTrade } from '@/atoms/home/trade'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import CardItem from '@/components/home/card-item'
import TipItem from '@/components/home/tip-item'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { STEP } from '@/constants/common.constant'
import { PARENT_CATEGORY } from '@/constants/naming.constant'
import { Divider, SolidInput, Typography } from '@/elements'
import InputItem from '@/form/input'
import { postSteps } from '@/services/deck.service'
import yup from '@/services/yup.service'
import { blue_dark_home, color_orange, color_teal, gray_dark_home } from '@/themes/system-palette'
import { StepActivity } from '@/types/deck.type'
import { ITradeCategory, ITradeCopyBrandForm, ITradeClassification } from '@/types/trade.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import CardProductType from '../card-product-type'
import { ITradeConceptType, cardData } from '../card_data'
import styles from './step_02.module.scss'
import { DEFAULT_STEP_TRADE, conceptData } from '@/constants/trade.constant'
import { getClasifications, getTradeCategory, postTradeSteps } from '@/services/trade.service'
import { postStep } from '@/services/step.service'
import { ExceedingAlert } from '@/components'
import { useDialog } from '@/hooks/use-dialog'

export const classificationFormat = ({ item, home }: { item: ITradeClassification[]; home: any }) => {
  return (
    item
      ?.filter((i) => !!i)
      .map((i: ITradeClassification) => ({
        id: i?.id,
        classificationCode: i?.classificationCode,
        tag: (
          <Box
            sx={{
              px: 1.25,
              py: 0.25,
              bgcolor: i?.type === '상표' ? blue_dark_home.blue500 : color_orange.home_500,
              height: 25,
              width: 'fit-content',
              borderRadius: 1000,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 'fit-content',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                textAlign: 'center',
                lineHeight: '150%'
              }}
              cate='button_20'
              color={home.gray500}
            >
              {i.type}
            </Typography>
          </Box>
        ),
        content: i.contents
      })) || []
  )
}

const Step2Edit = ({ projectId }: { projectId: string }) => {
  const categoryAPI = useMemo(() => Object.keys(PARENT_CATEGORY), [])
  const xxxlUp = useMediaQuery('(min-width: 1800px)')
  const xxlUp = useMediaQuery('(min-width: 1450px)')
  const [category, setCategory] = useState(0)
  const {
    palette: { home }
  } = useTheme()
  const [searchValue, setSearchValue] = useState<string>('')
  const [keywordValue, setKeywordValue] = useState<string>('')
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [{ tradeCopyBrand }, setDataTrade] = useRecoilState(dataTrade)
  const schema = yup
    .object({
      title: yup.string().trim().required(''),
      idea: yup.string().trim().required(''),
      productClassifications: yup.array().min(1).required(),
      concept: yup.mixed<ITradeConceptType>()
    })
    .required()

  const form = useForm<any>({
    defaultValues: {
      title: '',
      idea: '',
      productClassifications: [],
      concept: undefined
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }
  } = form

  const concept = watch('concept')
  const productClassifications = watch('productClassifications')
  const title = watch('title')
  const idea = watch('idea')
  const { open: dialogOpen, onClose: onCloseDialog, onOpen: onOpenDialog } = useDialog()
  const { data: classificationCategories } = useQuery({
    queryKey: ['classification-categories'],
    queryFn: async () => await getTradeCategory()
  })

  const { data: tradeClassifications } = useQuery({
    queryKey: ['trade-classifications', category, keywordValue],
    queryFn: async () =>
      await getClasifications({
        categoryId: category === 0 ? undefined : category,
        keywords: !!keywordValue ? keywordValue : undefined
      })
  })

  const categories =
    !!classificationCategories && Array.isArray(classificationCategories)
      ? [{ id: 0, nameKr: '전체' }].concat(classificationCategories)
      : [{ id: 0, nameKr: '전체' }]

  const tradeUpdateDataMutate = useMutation({
    mutationFn: postTradeSteps
  })

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setCategory(newValue)
  }

  const handleCompleteStep = async (reqData: ITradeCopyBrandForm) => {
    const { data: dataStep1 } = await tradeUpdateDataMutate.mutateAsync({
      projectId: projectId,
      deckId: DEFAULT_STEP_TRADE.deckId,
      stepId: 1,
      status: 'FINISHED',
      data: {},
      playTime: 0
    })
    if (dataStep1) {
      const { data } = await tradeUpdateDataMutate.mutateAsync({
        projectId: projectId,
        deckId: DEFAULT_STEP_TRADE.deckId,
        stepId: 2,
        status: 'FINISHED',
        data: {
          ...reqData,
          productClassifications: reqData.productClassifications,
          concept: { title: reqData?.concept?.title || '' }
        },
        playTime: 0
      })

      if (data) {
        setCompleteStep((pre) => {
          if (!pre.includes(STEP.STEP_TWO)) {
            return [...pre, STEP.STEP_TWO]
          }
          return pre
        })
        setDataTrade((pre: any) => {
          const { tradeCopyBrand, ...rest } = pre
          return { ...rest, tradeCopyBrand: { ...tradeCopyBrand, ...data.data } }
        })
      }
    }
  }

  useEffect(() => {
    if (!!tradeCopyBrand?.data) {
      reset({
        ...tradeCopyBrand?.data,
        productClassifications: !!tradeCopyBrand?.data.productClassifications
          ? tradeCopyBrand?.data.productClassifications
          : []
      })
    }
  }, [tradeCopyBrand?.data])

  return (
    <Box sx={{ marginTop: convertToRem(52) }}>
      <Box component={'div'} className={styles.layer_title}>
        <Box component={'h2'} sx={{ color: home.gray50 }}>
          사업 아이디어
        </Box>
      </Box>
      <Typography sx={{ mb: remConvert('30px'), color: home.gray100 }}>
        사업 아이디어를 간략하게 정리해보세요.
      </Typography>
      <Grid container className={styles.business_idea} gap={'20px'} sx={{ marginBottom: convertToRem(50) }}>
        <Grid item flex={'300px 0 0'}>
          <InputItem
            control={control}
            label='타이틀'
            name={'title'}
            textFieldProps={{
              required: true,
              placeholder: '브랜드명 입력',
              inputProps: {
                maxLength: 20
              }
            }}
          />
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            control={control}
            label='아이디어'
            name={'idea'}
            textFieldProps={{
              required: true,
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
              inputProps: {
                maxLength: 50
              }
            }}
          />
        </Grid>
      </Grid>
      <Box component={'div'} className={`${styles.layer_title}`}>
        <Box component={'h2'} sx={{ color: home.gray50 }}>
          상표유형{' '}
        </Box>
      </Box>
      <Typography sx={{ mb: remConvert('30px'), color: home.gray100 }}>
        문자, 이미지, 로고 등 단독 사용 또는 복합 사용에 따라 상표의 유형을 선택해보세요.{' '}
      </Typography>
      <Grid
        container
        className={styles.layer_card_item}
        mb={6.25}
        spacing={2}
        sx={{ p: '8px 24px 24px 8px', bgcolor: home.gray400, borderRadius: 2.5 }}
      >
        {cardData(conceptData).map((item, index) => {
          const { title } = item
          return (
            <Grid item key={index} xs={12} xl={xxxlUp ? 4 : xxlUp ? 6 : 12} lg={12}>
              <CardItem
                key={index}
                cardItem={item}
                icon='checked'
                isActive={concept && concept.title === title ? true : false}
                sxContent={{
                  padding: 0,
                  textAlign: 'center',
                  bgcolor: 'transparent !important'
                }}
                sxCard={{
                  minWidth: convertToRem(373),
                  backgroundImage: 'none',
                  backgroundColor: home.gray300,
                  maxWidth: '100%'
                }}
                onClick={() => {
                  if (concept?.title === title) {
                    setValue('concept', undefined)
                  } else {
                    setValue(
                      'concept',
                      conceptData.find((item) => item.title === title)
                    )
                  }
                }}
              />
            </Grid>
          )
        })}
      </Grid>

      <Box component={'div'} className={`${styles.layer_title}`}>
        <Box component={'h2'} sx={{ color: home.gray50 }}>
          상품분류
        </Box>
        <Box component={'p'} className={styles.card_note} sx={{ color: home.mint500 }}>
          (복수선택 가능)
        </Box>
      </Box>
      <Typography sx={{ mb: remConvert('30px'), color: home.gray100 }}>
        니스(NICE) 국제상품분류를 살펴보고 상표가 사용될 상품분류를 선택해보세요.
      </Typography>
      <Stack gap={2.5} py={2.5} px={3} bgcolor={home.gray400} borderRadius={2.5}>
        <Box display={'flex'} justifyContent='space-between'>
          <Box display={'flex'} gap={1.25}>
            <Typography cate='subtitle_1_semibold' sx={{ color: home.gray0 }}>
              니스(NICE) 국제상품분류
            </Typography>
            <Typography cate='body_3_semibold' sx={{ color: home.mint500 }}>
              45개
            </Typography>
          </Box>
          <SolidInput
            startAdornment={<SearchIcon pathProps={{ stroke: home.gray100 }} />}
            sx={{
              px: 2,
              py: 1,
              maxHeight: 40,
              maxWidth: 311,
              color: home.gray50,
              backgroundColor: home.gray300,
              fieldset: {
                border: 0
              }
            }}
            placeholder='검색어를 입력해 주세요.'
            value={searchValue}
            inputProps={{
              maxLength: 20
            }}
            onChange={(event) => {
              setSearchValue(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                setKeywordValue(searchValue)
              }
            }}
          />
        </Box>
        <FilledTabStack
          value={category ?? false}
          onChange={handleChangeTab}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50,
            height: 'auto !important',
            padding: remConvert('12px 24px'),
            '.MuiTabs-scroller': { height: convertToRem(40) },
            '.MuiButtonBase-root': { '&.Mui-selected': { backgroundColor: home.blue500 } },
            '.MuiTabs-flexContainer': { gap: convertToRem(12) },
            '.MuiTabs-indicator': { backgroundColor: home.blue500 }
          }}
          variant='scrollable'
          aria-label='tab for keyword naming'
        >
          {categories?.map((item: ITradeCategory) => (
            <FillTabItem
              label={
                <Box
                  component={'span'}
                  className={styles.tab_title}
                  color={category === item?.id ? home.base_gray50 : home.gray50}
                >
                  {item?.nameKr || ''}
                </Box>
              }
              value={item?.id || 0}
              key={item?.id || 0}
              sx={{
                padding: remConvert('6px 20px'),
                minWidth: remConvert('110px'),
                bgcolor: home.gray200
              }}
            />
          ))}
        </FilledTabStack>
        <Divider sx={{ borderColor: home.gray200, width: '100%' }} />
        <Grid container spacing={2.5} maxHeight={475} sx={{ overflowY: 'auto' }}>
          {classificationFormat({ item: tradeClassifications, home: home }).map((item) => (
            <Grid item xs={12} xl={5.99} key={item.id}>
              <CardProductType
                onClick={() => {
                  if (!productClassifications?.find((i) => i.id === item.id)) {
                    setValue('productClassifications', [
                      ...productClassifications,
                      tradeClassifications.find((i: ITradeClassification) => i.id === item.id)
                    ])
                  } else {
                    setValue(
                      'productClassifications',
                      productClassifications?.filter((i) => i.id !== item.id)
                    )
                  }
                }}
                icon='checked'
                isActive={productClassifications?.find((i) => i.id === item.id)}
                cardItem={item}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack px={3} py={2.5} border={'1px solid ' + home.gray200} borderRadius={2.5} my={3} gap={2.5}>
        <Typography cate='subtitle_1_semibold' color={home.gray0}>
          선택한 항목
          <Box component={'span'} color={color_teal[500]}>
            {productClassifications.length || 0}개
          </Box>
        </Typography>
        <Grid container spacing={2.5}>
          {classificationFormat({ item: productClassifications || [], home: home })?.map((item) => (
            <Grid item xs={12} xl={6} key={item.id}>
              <CardProductType
                onClick={() => {
                  setValue(
                    'productClassifications',
                    productClassifications?.filter((i) => i.id !== item.id)
                  )
                }}
                icon='delete'
                cardItem={item}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {/* {activeTab === undefined ? (
        <NonSelect />
      ) : (
        <Box component={'div'} className={styles.layer_translate} sx={{ backgroundColor: home.gray400 }}>
          <TabPanel index={0} value={Number(activeTab)}>
            <SecondLanguageTab fieldArray={fieldArray} />
          </TabPanel>
          {categoryAPI.map((key, index) => {
            return (
              <TabPanel key={index} index={index + 1} value={Number(activeTab)}>
                <LocationTab fieldArray={fieldArray} type={key as keyof typeof PARENT_CATEGORY} index={index} />
              </TabPanel>
            )
          })}
          <TabPanel index={5} value={Number(activeTab)}>
            <SchumpeterAI fieldArray={fieldArray} />
          </TabPanel>
        </Box>
      )}
      <CandidateList fieldArray={fieldArray} /> */}
      <Box component={'div'} sx={{ margin: remConvert('0 0 60px') }}>
        <TipItem
          content={
            <>
              NICE 국제상품분류(NICE International Classification of Goods and Services for the Purposes of the
              Registration of Marks)는 상표 등록을 위한 상품 및 서비스를 분류하는 국제 표준 분류 체계입니다. 이 분류
              체계는 세계 각국에서 상표 등록을 위해 사용되며, 특히 상표 등록 출원 시 어떤 상품이나 서비스에 대한 등록을
              희망하는지 명확하게 지정하는 데 사용됩니다. NICE 국제상품분류는 세계 지적재산기구(WIPO)에서 관리하고
              있습니다. 이 분류는 주로 상표 등록 출원서에서 상표 소유자가 어떤 상품이나 서비스를 제공하거나 판매하는지를
              기술하는 데 사용됩니다. 상표 등록 출원은 특정 상품 및 서비스에 대한 등록을 요구하며, NICE 국제상품분류는
              이를 체계적으로 분류하여 표준화된 언어로 표현합니다. 분류는 상표 등록이나 출원에서 사용되는 단어와 용어를
              통일시키고, 상품 및 서비스의 범위를 명확히 정의하여 혼동을 방지하고자 합니다. 이러한 표준 분류는 국제적인
              통일성을 제공하여 다양한 국가에서 특허 및 상표 등록 절차를 보다 효과적으로 관리할 수 있도록 도와줍니다.
            </>
          }
        />
      </Box>
      {/* {errors && errors.industry && (
        <Box component={'div'} sx={{ mb: remConvert('30px') }}>
          <ErrorMessage errors={errors} name='selectedItem' />
        </Box>
      )} */}
      <Stack flexDirection={'row'} className={styles.btn_active}>
        <RefreshButton
          onClick={() => {
            onOpenDialog()
          }}
        />
        <SubmitButton
          onClick={() => {
            handleCompleteStep(getValues())
          }}
          disabled={!title || !idea || productClassifications.length === 0 || !concept}
        />
      </Stack>
      <ExceedingAlert
        onSubmit={async () => {
          reset()
          setDataTrade((pre) => ({
            ...pre,
            tradeCopyBrand: { ...tradeCopyBrand, data: {} } as StepActivity<ITradeCopyBrandForm>
          }))
          onCloseDialog()
        }}
        onCancel={() => {
          onCloseDialog()
        }}
        submitTxt={'초기화'}
        cancelTxt={'취소'}
        title={'입력된 데이터가 삭제됩니다.'}
        description={`삭제된 데이터는 복구되지 않습니다, 초기화 하시겠습니까?`}
        open={dialogOpen}
      />
    </Box>
  )
}

export default Step2Edit
