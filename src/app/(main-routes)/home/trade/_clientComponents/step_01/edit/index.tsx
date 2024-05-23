import IdeaIcon from '@/assets/icons/naming/idea-icon'
import LocalPlaceIcon from '@/assets/icons/naming/local-place'
import NamingKeywordIcon from '@/assets/icons/naming/naming-keyword'
import SearchIcon from '@/assets/icons/search'
import { dataNaming } from '@/atoms/home/naming'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import TipItem from '@/components/home/tip-item'
import { STEP } from '@/constants/common.constant'
import { PARENT_CATEGORY } from '@/constants/naming.constant'
import { Divider, SolidInput, Typography } from '@/elements'
import TabPanel from '@/elements/tab-panel'
import { RoundedButton } from '@/elements/v2/button'
import ErrorMessage from '@/form/ErrorMessage'
import { postSteps } from '@/services/deck.service'
import { blue_dark_home, color_teal, mint_dark_home } from '@/themes/system-palette'
import { StepActivity } from '@/types/deck.type'
import { Namingkeyword } from '@/types/naming.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Grid, Typography as MTypography, Stack, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useMutation, useQuery } from '@tanstack/react-query'
import { KeyboardEvent, KeyboardEventHandler, SyntheticEvent, useMemo, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { TagDescription, cardData } from '../../_components/card-data'
import styles from './edit.module.scss'
import { ITradeCompany, ITradeForm, TradeDeck } from '@/types/trade.type'
import CardItem from '../../_components/card-item'
import { dataTrade } from '@/atoms/home/trade'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import EmptyResultIcon from '@/assets/icons/trade/empty-result'
import UserCardIcon from '@/assets/icons/trade/user-card'
import Image from 'next/image'
import { getTradeCompanies } from '@/services/trade.service'
import { Metadata } from '@/types/types.type'
import moment from 'moment'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useInView } from 'react-intersection-observer'
import { ObserverBox } from '@/components'
import { formatCurrency } from '@/utils/format-currency'
import { ConfirmAlert, EditAlert, ExceedingAlert } from '@/components/dialog'
import { useDialog } from '@/hooks/use-dialog'

const TABS = [
  {
    id: 1,
    title: 'ON'
  },
  {
    id: 2,
    title: 'OFF'
  }
]

const Step1Edit = () => {
  const categoryAPI = useMemo(() => Object.keys(PARENT_CATEGORY), [])
  const xxxlUp = useMediaQuery('(min-width: 1800px)')
  const xxlUp = useMediaQuery('(min-width: 1450px)')
  const [toggle, setToggle] = useState(1)
  const [brandType, setBrandType] = useState('상표명')
  const {
    palette: { home }
  } = useTheme()
  const { open: dialogOpen, onClose: onCloseDialog, onOpen: onOpenDialog } = useDialog()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [{ tradeBrand }, setDataTrade] = useRecoilState(dataTrade)
  const [keyword, setKeyword] = useState<string>('')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [tradeCompaniesData, setTradeCompaniesData] = useState<ITradeCompany[]>([])
  const [totalRecords, setTotalRecords] = useState<number>(0)
  // const { data: tradeCompaniesData } = useQuery({
  //   queryKey: ['trade-companies', searchKeyword],
  //   queryFn: () =>
  //     getTradeCompanies({
  //       page: 1,
  //       limit: 16,
  //       keywords: searchKeyword
  //     }),
  //   enabled: !!searchKeyword
  // })

  const { refetch, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, isFetching } = useInfiniteScroll({
    key: 'trade-companies',
    depend: [searchKeyword],
    initialPageParam: {
      page: 1,
      keywords: !!searchKeyword ? searchKeyword : ''
    },
    fn: (pageParam: any) =>
      getTradeCompanies({
        page: pageParam.page,
        limit: 16,
        keywords: pageParam.keywords
      }),
    onSuccess: (data) => {
      const page = data.pages as any[]
      let startupTalkDataRes: ITradeCompany[] = []

      page.forEach((page: any) => {
        page?.data?.result?.item?.forEach((x: ITradeCompany) => {
          startupTalkDataRes.push(x)
        })
      })
      setTotalRecords(page[0]?.data?.metaData?.totalRecords || 0)
      setTradeCompaniesData(startupTalkDataRes as ITradeCompany[])
    },

    enabled: !!searchKeyword
  })

  const schema = yup
    .object({
      brandId: yup.mixed<number>().required()
    })
    .required()
  const form = useForm<any>({
    defaultValues: {
      brandId: undefined
    },
    resolver: yupResolver(schema)
  })
  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = form
  const brandId = watch('brandId')

  const handleCompleteStep = async (reqData: ITradeForm) => {
    // const {data} = await mutateAsync({
    //   projectId: 1,
    //   deckId: Number(namingKeyword?.deckId),
    //   stepId: Number(namingKeyword?.stepId),
    //   status: 'FINISHED',
    //   data: reqData,
    //   playTime: 0,
    //   deletedStepActivitiesIds: [Number(namingCandidates?.stepId), Number(namingAnalyzing?.stepId)]
    // })
    setCompleteStep((pre) => {
      if (!pre.includes(STEP.STEP_ONE)) {
        return [STEP.STEP_ONE]
      }
      return pre
    })
    setDataTrade((pre: any) => {
      const { tradeBrand, ...rest } = pre
      return { ...rest, tradeBrand: { ...tradeBrand, data: reqData.brandId } }
    })
    setActiveStep((pre) => pre + 1)
  }

  const onChange = (index: number) => {
    setToggle(index)
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchKeyword(keyword)
    }
  }
  const selectedData = tradeCompaniesData?.find((i) => i.indexNo === brandId) || null
  return (
    <Box component={'form'} sx={{ marginTop: convertToRem(52) }} onSubmit={handleSubmit(handleCompleteStep)}>
      <Box component={'div'} className={styles.layer_title}>
        <Box component={'h2'} sx={{ color: home.gray50 }}>
          상표 검색
        </Box>
      </Box>
      <MTypography sx={{ mb: remConvert('30px'), color: home.gray100 }}>
        지적재산권의 잠재적 위험을 최소화하고 브랜드의 가치와 포지션을 확인하기 위해 상표검색을 진행해보세요.
      </MTypography>
      <Stack mt={2.5} borderRadius={1.25} bgcolor={home.gray400}>
        <Stack
          px={3}
          py={3.75}
          borderBottom={'1px solid ' + home.gray200}
          bgcolor={home.gray400}
          gap={2.5}
          alignItems={'center'}
        >
          <Box display={'flex'} justifyContent={'center'} gap={2.5}>
            {/* {TAB_VALUE.map(({ name, value }, index) => (
              <RoundedButton
                btnSize='fit-no-padding'
                value={index}
                key={index}
                onClick={() => {
                  setBrandType(value)
                }}
                sx={{
                  padding: remConvert('8px 20px'),
                  bgcolor: brandType === value ? blue_dark_home.blue500 : gray_dark_home.gray300
                }}
              >
                <Box color={gray_dark_home.gray50} display={'flex'} alignItems='center' gap={1.25}>
                  {name}
                </Box>
              </RoundedButton>
            ))} */}
          </Box>
          <SolidInput
            startAdornment={<SearchIcon pathProps={{ stroke: home.gray100 }} />}
            sx={{
              px: 2,
              py: 1.5,
              maxHeight: 48,
              maxWidth: 600,
              color: home.gray50,
              backgroundColor: home.gray300,
              fieldset: {
                border: '1px solid ' + home.gray200
              }
            }}
            placeholder='검색어를 입력해 주세요.'
            value={keyword}
            inputProps={{
              maxLength: 30
            }}
            onChange={(event) => {
              setKeyword(event.target.value)
            }}
            onKeyPress={handleKeyPress}
          />
        </Stack>

        {searchKeyword && !!tradeCompaniesData ? (
          <>
            {' '}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} px={3} mt={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1.25}>
                <Typography cate='title_50'>검색된 상표</Typography>
                <Typography cate='sub_title_30' color={mint_dark_home.mint500}>
                  {formatCurrency(totalRecords)}개
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1.25}>
                <Typography cate='body_2' color={home.gray100}>
                  유효한 상표만 보기
                </Typography>
                <Box
                  component={'div'}
                  className={styles.switch_tabs}
                  sx={{
                    backgroundColor: home.gray300
                  }}
                >
                  {TABS.map((item, index) => (
                    <Box
                      onClick={() => onChange(index)}
                      component={'span'}
                      className={`${styles.tab} ${toggle === index ? styles.active : ''}`}
                      key={item.id}
                    >
                      {item.title}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Grid container spacing={1.5} flexWrap={'wrap'} my={2.5} px={3} maxHeight={700} sx={{ overflowY: 'auto' }}>
              {cardData(tradeCompaniesData).map((item) => {
                const { id } = item
                return (
                  <Grid item xs={12} xl={xxxlUp ? 3 : xxlUp ? 4 : 6} lg={6} key={id}>
                    <CardItem
                      key={id}
                      cardItem={item}
                      icon='checked'
                      isActive={brandId && brandId === id ? true : false}
                      sxContent={{
                        padding: remConvert('10px'),
                        textAlign: 'center',
                        flex: '1 0 21%'
                      }}
                      onClick={() => {
                        if (brandId === id) {
                          setDataTrade((pre: any) => {
                            const { tradeBrand, ...rest } = pre
                            return { ...rest, tradeBrand: { ...tradeBrand, data: null } }
                          })
                          setValue('brandId', -1)
                        } else {
                          setDataTrade((pre: any) => {
                            const { tradeBrand, ...rest } = pre
                            return { ...rest, tradeBrand: { ...tradeBrand, data: id } }
                          })
                          setValue('brandId', id)
                        }
                      }}
                    />
                  </Grid>
                )
              })}
              {hasNextPage && (
                <ObserverBox
                  haveNextPage={hasNextPage}
                  fetchNext={() => fetchNextPage()}
                  showLoading={isFetchingNextPage}
                />
              )}
            </Grid>
          </>
        ) : (
          <Stack alignItems={'center'} justifyContent={'center'} gap={3} height={413} px={3} py={2.5}>
            {searchKeyword ? (
              <EmptyResultIcon />
            ) : (
              <IdeaIcon pathProps={{ fill: home.gray200 }} rectProps={{ fill: home.gray200 }} />
            )}
            <Typography cate='subtitle_1' color={home.gray100}>
              {searchKeyword ? '검색 결과가 없습니다.' : '상표를 검색해보세요.'}
            </Typography>
          </Stack>
        )}
      </Stack>

      {!!selectedData && (
        <Stack sx={{ py: 2.5, px: 3, border: '1px solid ' + home.gray200, borderRadius: 1.25, mt: 2.5 }} gap={2.5}>
          <Typography cate='title_50'>상표 정보</Typography>
          <Box
            sx={{
              py: 2.5,
              px: 3,
              border: '1px solid ' + home.gray200,
              borderRadius: 1.25,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6.25
            }}
          >
            <Image src={selectedData?.drawing || ''} alt='' width={260} height={160} />
            {xxxlUp && (
              <Divider
                orientation='vertical'
                sx={{ borderWidth: 0.5, borderColor: home.gray200, height: convertToRem(130) }}
              />
            )}
            <Stack gap={2} maxWidth={350}>
              <Box display='flex' gap={1.875} alignItems={'center'}>
                <Typography cate='body_20' width={60} flexShrink={0} textAlign={'left'}>
                  진행상태
                </Typography>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.125,
                    bgcolor: mint_dark_home.mint500,

                    borderRadius: 1000
                  }}
                >
                  <Typography cate='sub_title_20' sx={{ color: home.gray500 }}>
                    {selectedData?.applicationStatus || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={60} flexShrink={0}>
                  상표구분
                </Typography>
                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {'Need to check'}
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={60} flexShrink={0}>
                  출원인
                </Typography>

                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {selectedData?.applicantName || '-'}
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={60} flexShrink={0}>
                  상표권자
                </Typography>

                <Typography cate='body_20' width={'100%'} textAlign={'left'} sx={{ wordBreak: 'break-all' }}>
                  {selectedData?.regPrivilegeName || '-'}
                </Typography>
              </Box>
            </Stack>
            {xxxlUp && (
              <Divider
                orientation='vertical'
                sx={{ borderWidth: 0.5, borderColor: home.gray200, height: convertToRem(130) }}
              />
            )}
            <Stack gap={2}>
              <Box display='flex' gap={1.875} alignItems={'center'}>
                <Typography cate='body_20' width={96} flexShrink={0} textAlign={'left'}>
                  상품분류
                </Typography>
                <Box display='flex' gap={1.25} flexWrap={'wrap'}>
                  {!!selectedData?.classificationCode && typeof selectedData?.classificationCode === 'string' ? (
                    selectedData?.classificationCode?.split('|').map((item: any) => {
                      return <TagDescription key={Number(item)} classificationCode={Number(item)} />
                    })
                  ) : (
                    <TagDescription
                      key={Number(selectedData.classificationCode)}
                      classificationCode={Number(selectedData.classificationCode)}
                    />
                  )}
                </Box>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={96} flexShrink={0}>
                  출원번호(출원일)
                </Typography>
                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {selectedData?.applicationNumber} (
                  {!!selectedData?.applicationDate
                    ? moment(selectedData?.applicationDate?.toString(), 'YYYYMMDD').format('YYYY.MM.DD')
                    : '-'}
                  )
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={96} flexShrink={0}>
                  공고번호(공고일)
                </Typography>

                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {selectedData?.publicationNumber} (
                  {!!selectedData?.publicationDate
                    ? moment(selectedData?.publicationDate?.toString(), 'YYYYMMDD').format('YYYY.MM.DD')
                    : '-'}
                  )
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={96} flexShrink={0}>
                  등록번호(등록일)
                </Typography>
                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {selectedData?.registrationNumber} (
                  {!!selectedData?.registrationDate
                    ? moment(selectedData?.registrationDate?.toString(), 'YYYYMMDD').format('YYYY.MM.DD')
                    : '-'}
                  )
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      )}

      <Box component={'div'} sx={{ margin: remConvert('20px 0 60px') }}>
        <TipItem
          content={
            <>
              {`상표 검색은 기업이나 개인이 특정 상표를 등록하거나 사용하기 전에 필요한 중요한 단계 중 하나입니다. 여러 이유로 인해 상표 검색이 중요합니다. 상표 검색은 브랜드의 법적 보호, 소비자 혼란 방지, 중복 방지, 투자 보호, 그리고 금융 가치 향상 등 다양한 측면에서 중요한 역할을 합니다. 이를 통해 기업은 경쟁에서 더 강력하게 나서고 안정적으로 성장할 수 있습니다.
1. 중복 방지 : 상표 검색을 통해 이미 등록된 상표나 유사한 상표를 찾을 수 있습니다. 중복된 상표를 사용하면 법적 문제가 발생할 수 있으며, 이로 인해 소송이 발생할 수 있습니다. 상표 검색은 중복을 방지하고 미리 문제를 예방하는데 도움을 줍니다.
2. 법적 보호 강화 : 상표 등록은 해당 상표에 대한 법적 보호를 제공합니다. 상표는 제품이나 서비스를 식별하고 구별하는 역할을 합니다. 등록된 상표는 기업이 해당 상표를 독점적으로 사용할 수 있도록 보장하며, 다른 사람들이 비슷한 상표를 남용하는 것을 방지합니다.
3. 소비자 혼란 방지 : 유사한 상표를 사용하면 소비자가 제품이나 서비스를 혼동할 수 있습니다. 상표 검색을 통해 유사한 상표를 찾아내고 미리 대응함으로써 소비자 혼란을 방지할 수 있습니다. 이는 기업의 브랜드 이미지와 신뢰성을 유지하는 데 중요합니다.
4. 투자 보호 : 기업이 상표에 투자한 비용은 상당히 큽니다. 이러한 투자를 보호하기 위해 상표 검색과 등록은 필수적입니다. 상표 등록은 기업이 시장에서의 경쟁에서 더 강력하게 나서고, 투자한 브랜드를 지속적으로 보호할 수 있도록 도와줍니다.
5. 금융 가치 향상 : 등록된 상표는 기업의 자산 가치를 높일 수 있습니다. 이는 잠재적인 투자자, 협력사, 또는 기업 인수 및 합병(M&A) 등과의 협상에서 긍정적인 영향을 미칠 수 있습니다.`}
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
        {/* <SubmitButton type='submit' disabled={!brandId} /> */}
      </Stack>
      <ExceedingAlert
        onSubmit={async () => {
          form.reset()
          setKeyword('')
          setSearchKeyword('')
          setDataTrade((pre) => ({
            ...pre,
            tradeBrand: { ...tradeBrand, data: null } as StepActivity<any>
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

export default Step1Edit
