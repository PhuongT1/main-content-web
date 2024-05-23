'use client'
import { KeyboardEvent, useState, useEffect, SyntheticEvent, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { UseFormReturn } from 'react-hook-form'
import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { Box, Divider, useTheme, Tabs, Tab, Chip } from '@mui/material'
import { useRecoilState } from 'recoil'
import { dataCompanyAnalyzingStep1, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import {
  IFormValuesStepOne,
  ICompetitiveCompaniesResponse,
  ICompetitiveCompaniesRequest
} from '@/types/competitor-analysis.type'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { BoxLayout } from '@/components/home/box/box-custom'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import Title from '@/components/title'
import { CardItemData } from '@/components/cards/competitor-card'
import ErrorMessage from '@/form/ErrorMessage'
import InputItem from '@/form/input'
import SearchIcon from '@/assets/icons/search'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import { getCompetitiveCompaniesIndustry, getCompetitiveCompanies } from '@/services/competitor-analysis.service'
import { postStep } from '@/services/step.service'
import { TStepPayload, StatusStep } from '@/types/step.type'
import { STEP } from '@/constants/common.constant'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { MAXLENGTH_INPUT, TAB_VALUE_TYPE } from '../../_components/utils'
import CardWrapper from '../../_components/card_wrapper'
import CardSelected from '../../_components/card_selected'
import ModalAddCompany from '../../_components/modal_add_company'
import styles from './style.module.scss'

const defaultFilter: ICompetitiveCompaniesRequest = {
  name: '',
  type: 'KOREAN',
  industryId: false,
  page: 1,
  limit: 20,
  order: 'ASC'
}

type CompetitorSelectionProps = {
  form: UseFormReturn<IFormValuesStepOne>
  data?: IFormValuesStepOne
}
function CompetitorSelection({ form: { watch, setValue, getValues }, data }: CompetitorSelectionProps) {
  const {
    palette: { home }
  } = useTheme()
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const [tabValueType, setTabValueType] = useState<string>(TAB_VALUE_TYPE[0]?.id)
  const [tabValueCate, setTabValueCate] = useState<number | string>('') // false > default bugs tag MUI
  const [messageAlert, setMessageAlert] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [newCompanies, setNewCompanies] = useState<ICompetitiveCompaniesResponse[]>([])
  const [, setDataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [deckActive] = useRecoilState(dataDeckActive)
  const selectedCompetitors = watch('selectedCompetitors')
  const searchTextInput = watch('search')

  const { data: dataCompetitiveCompaniesIndustry } = useQuery({
    queryKey: [`competitor-analysis-industry`],
    queryFn: () => getCompetitiveCompaniesIndustry(),
    meta: {
      offLoading: true
    }
  })

  const {
    hasNextPage,
    fetchNextPage,
    data: dataCompetitiveCompanies,
    isFetching: isFetchingCompetitiveCompanies
  } = useInfiniteQuery({
    queryKey: ['competitor-analysis', tabValueType, tabValueCate, searchText],
    queryFn: ({ pageParam }) =>
      getCompetitiveCompanies({
        ...defaultFilter,
        name: searchText || '',
        type: tabValueType as 'KOREAN' | 'GLOBAL',
        industryId: tabValueCate as number,
        page: pageParam?.page ?? pageParam
      }),
    initialPageParam: defaultFilter,
    getNextPageParam: (lastPage: any) => {
      const { totalPages, currentPage } = lastPage?.metaData || {}
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    meta: { offLoading: true },
  })

  // ==============
  useEffect(() => {
    if (data?.addedCompanies && data.addedCompanies?.length > 0) {
      setNewCompanies([...(data?.addedCompanies as ICompetitiveCompaniesResponse[])])
    }
  }, [data])

  // useEffect(() => {
  //   if (dataCompetitiveCompaniesIndustry && dataCompetitiveCompaniesIndustry?.length > 0) {
  //     setTabValueCate(dataCompetitiveCompaniesIndustry[0]?.id)
  //   }
  // }, [dataCompetitiveCompaniesIndustry])

  useEffect(() => {
    if (selectedCompetitors?.length === 0) {
      setMessageAlert('경쟁사는 최소 1개 이상 선택해야 합니다.')
    } else if (selectedCompetitors?.length <= MAXLENGTH_INPUT.SELECTED_COMPETITORS) {
      setMessageAlert('')
    }
  }, [selectedCompetitors])

  useEffect(() => {
    if (!searchTextInput) {
      setSearchText('')
    }
  }, [searchTextInput])

  const dataCompetitiveCompanyList = useMemo(() => {
    const filteredNewCompanies = newCompanies.filter(
      (company) => company?.competitiveCompanyIndustryId === tabValueCate && company?.type === tabValueType
    )

    return (dataCompetitiveCompanies?.pages || []).reduce((acc, page) => ({
      totalRecords: (filteredNewCompanies.length > 0 ? filteredNewCompanies.length : 0) + (page.metaData?.totalRecords || acc.totalRecords),
      list: [...acc.list, ...(page.result || [])]
    }), { totalRecords: 0, list: filteredNewCompanies })
  }, [dataCompetitiveCompanies?.pages, newCompanies, tabValueCate, tabValueType])

  const handleChangeTabType = (_: SyntheticEvent, newValue: string) => {
    setTabValueType(newValue)
  }

  const handleChangeTabCate = (_: SyntheticEvent, newValue: number) => {
    setTabValueCate(newValue)
  }

  const handleClickCardItem = (item: ICompetitiveCompaniesResponse | undefined) => {
    if (!item || !item?.id) return
    if (selectedCompetitors?.some((com) => com?.id === item?.id)) {
      setValue(
        'selectedCompetitors',
        [...(selectedCompetitors || [])].filter((com) => com?.id !== item?.id)
      )
      return
    }
    if (selectedCompetitors?.length >= MAXLENGTH_INPUT.SELECTED_COMPETITORS) {
      setMessageAlert(`경쟁사는 최대 ${MAXLENGTH_INPUT.SELECTED_COMPETITORS}개까지 선택 가능합니다.`)
      return
    }
    setValue('selectedCompetitors', [...(selectedCompetitors || []), item])
  }

  const handleKeyPressSearchCompetitors = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchCompetitors()
    }
  }
  const handleSearchCompetitors = () => {
    const newSearchText = getValues('search') || ''
    setSearchText(newSearchText)
  }

  const submitStep = useMutation({
    mutationFn: postStep<IFormValuesStepOne>,
    onSuccess: ({ data }) => {
      setDataStep1(data?.data)
      const addedCompanies = data?.data?.addedCompanies?.slice(-1)[0] || {}
      setTabValueCate((addedCompanies as ICompetitiveCompaniesResponse)?.competitiveCompanyIndustryId)
      setNewCompanies((prev) => [...prev, addedCompanies as ICompetitiveCompaniesResponse])
    }
  })
  const handleAddCompany = (value: ICompetitiveCompaniesResponse) => {
    const payload = {
      ...DEFAULT_STEP,
      projectId,
      stepId: Number(deckActive[STEP.STEP_ONE]?.id || 1),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_ONE,
      deletedStepActivitiesIds: [],
      data: {
        industry: data?.industry || '',
        idea: data?.idea || '',
        selectedCompetitors: data?.selectedCompetitors || [],
        myCompany: data?.myCompany || {},
        addedCompanies: [
          ...(data?.addedCompanies ?? []),
          {
            ...value,
            id: uuidv4(),
            type: tabValueType
          }
        ]
      }
    }
    submitStep.mutateAsync(payload as unknown as TStepPayload<IFormValuesStepOne>)
  }

  // ==============
  return (
    <>
      <Box sx={{ marginTop: convertToRem(60) }}>
        <Title
          label={
            <>
              <Box component={'h2'} sx={{ color: home.gray50 }}>
                경쟁사 선택
              </Box>
              <Box component={'h4'} sx={{ color: home.mint500, fontWeight: 600, marginLeft: 1 }}>
                (최대 {MAXLENGTH_INPUT.SELECTED_COMPETITORS}개 선택)
              </Box>
            </>
          }
          subLabel='국내외 다양한 산업/분야별 기업을 알아보고, 나의 기업과 비교분석을 진행할 경쟁기업을 선택해보세요.'
        />

        <BoxLayout
          className={styles.boxLayoutWrapper}
          flexDirection={'column'}
          alignItems={'flex-start'}
          sx={{
            backgroundColor: (theme) => theme.palette.home.gray400
          }}
        >
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Tabs
              value={tabValueType}
              className={styles.tabType}
              onChange={handleChangeTabType}
              sx={{
                '.MuiButtonBase-root': {
                  minHeight: convertToRem(40),
                  fontWeight: 600,
                  '&.Mui-selected': { borderBottom: `2px solid ${home.mint500}`, color: home.mint500 },
                  '&.Mui-selected .MuiChip-label': { background: home.mint500, color: '#252629' }
                },
                '.MuiTabs-flexContainer': { gap: convertToRem(20) },
                '.MuiTabs-indicator': { display: 'none' }
              }}
            >
              {TAB_VALUE_TYPE.map(({ name, id }) => (
                <Tab
                  disableRipple
                  label={
                    <Box component={'div'}>
                      {name}{' '}
                      {!!dataCompetitiveCompanyList?.totalRecords && tabValueType === id && (
                        <Chip label={dataCompetitiveCompanyList?.totalRecords} className={styles.chip} />
                      )}
                    </Box>
                  }
                  key={id}
                  value={id}
                  sx={{ padding: 0, minWidth: 'unset' }}
                />
              ))}
            </Tabs>
            <InputItem
              name={'search'}
              sxInput={{
                '.MuiInputBase-root': { maxHeight: convertToRem(40) },
                input: { padding: convertToRem(8) + ' !important' },
                svg: { path: { stroke: '#9498A3' } }
              }}
              textFieldProps={{
                placeholder: '검색어를 입력해주세요.',
                InputProps: {
                  startAdornment: (
                    <Box display='flex' sx={{ cursor: 'pointer' }} onClick={handleSearchCompetitors}>
                      <SearchIcon />
                    </Box>
                  )
                },
                inputProps: { maxLength: 10 },
                onKeyPress: handleKeyPressSearchCompetitors
              }}
            />
          </Box>
          <FilledTabStack
            value={tabValueCate}
            onChange={handleChangeTabCate}
            sx={{
              width: '100%',
              height: convertToRem(64) + '!important',
              backgroundColor: home.gray300,
              color: home.gray50,
              padding: `${convertToRem(12)} ${convertToRem(24)}`,
              marginTop: convertToRem(20),
              '.MuiButtonBase-root': {
                '&.Mui-selected': { backgroundColor: home.blue500 + '!important' },
                '&:not(.MuiIconButton-root)': { backgroundColor: home.gray200 },
                maxHeight: convertToRem(40)
              },
              '.MuiTabs-flexContainer': { gap: convertToRem(12) },
              '.MuiTabs-indicator': { backgroundColor: home.blue500 }
            }}
            variant='scrollable'
            aria-label='scrollable force tabs example'
          >
            {[{ nameKr: '전체', id: '' }, ...dataCompetitiveCompaniesIndustry || []].map(({ nameKr, id }) => (
              <FillTabItem label={nameKr} value={id ?? false} key={id} sx={{ padding: remConvert('6px 20px') }} />
            ))}
          </FilledTabStack>
          <Divider sx={{ my: convertToRem(20), width: '100%', bgcolor: 'main_grey.gray800' }} />

          <CardWrapper
            data={(dataCompetitiveCompanyList?.list || []) as ICompetitiveCompaniesResponse[]}
            handleClickCardItem={handleClickCardItem}
            handleClickCardItemAdd={() => setIsOpenModalAdd(true)}
            selectedCompetitors={selectedCompetitors}
            enableAddCardItem={true}
            fetchNextPage={!isFetchingCompetitiveCompanies && hasNextPage ? fetchNextPage : undefined}
          />
        </BoxLayout>
        <CardSelected
          classNames={styles.boxCardSelectedWrapper}
          list={{
            key: 'id',
            selectedList: getValues('selectedCompetitors') || [],
            render: (item: ICompetitiveCompaniesResponse) => {
              return (
                <Box component={'div'} sx={{ position: 'relative', height: '100%' }}>
                  <Box component={'div'} sx={{ height: '100%' }}>
                    <CardItemData isView={true} item={item} sxCard={{ backgroundColor: home.gray400 }} />
                  </Box>
                  <Box onClick={() => handleClickCardItem(item)} component={'span'} className={styles.remove_icon}>
                    <ClearBoxIcon svgProps={{ width: 30, height: 30 }} rectProps={{ fill: home.gray300 }} />
                  </Box>
                </Box>
              )
            }
          }}
        />

        {messageAlert && (
          <Box component={'div'} sx={{ mt: remConvert('20px') }}>
            <ErrorMessage message={messageAlert} />
          </Box>
        )}
      </Box>

      <ModalAddCompany
        isOpen={isOpenModalAdd}
        setIsOpen={() => setIsOpenModalAdd(false)}
        handleAddCompany={handleAddCompany}
      />
    </>
  )
}

export default CompetitorSelection
