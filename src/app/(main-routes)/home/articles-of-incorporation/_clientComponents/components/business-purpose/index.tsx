import DefaultIcon from '@/assets/icons/articles-of-incorporation/default-icon'
import { BoxLayout } from '@/components/home/box/box-custom'
import SectionTitle from '@/components/home/section-title'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import { MultiCheckbox } from '@/form/checkbox'
import ErrorMessage from '@/form/ErrorMessage'
import useTabs from '@/hooks/use-tabs'
import { BaseReponseList, TCategoryItem, TOrganizationItem, TQueryOrganizations } from '@/types/teambuilding/index.type'
import { listenEvent, requestIdleCallbackCustom } from '@/utils/events'
import { isEmpty } from '@/utils/object'
import { Box, useTheme } from '@mui/material'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import ScrollBar from 'react-perfect-scrollbar'
import CardSelectedBox, { CardListSkeleton } from '../../../../teambuilding/_components/card-selected'
import { TFormValues } from '../../../../teambuilding/step-list/step_03/edit'
import { handleFieldArray } from '../../../../teambuilding/utils/handler'
import styles from './business-purpose.module.scss'
import { getCategories, getCorporation } from '@/services/corporation.service'
interface IIncorporationMembersForm<TFieldValues extends FieldValues> {
  formProps: UseFormReturn<TFieldValues>
}

const defaultFilter: TQueryOrganizations = {
  limit: 20,
  page: 1,
  order: 'ASC',
  categoryId: 0
}

const BusinessPurpose = ({ formProps }: IIncorporationMembersForm<TFormValues>) => {
  const {
    palette: { home }
  } = useTheme()
  const refContainer = useRef<HTMLElement>()
  const [message, setMessageError] = useState<string>('')

  const { control, resetField } = formProps
  const { list, onRemoveItem } = handleFieldArray(formProps, 'organization')
  const MAX_ITEM_ORGANIZATION = 19
  const { currentTab, setValueTab } = useTabs(0)

  const [filter, setFilter] = useState<TQueryOrganizations>(defaultFilter)
  const changeFilter = (name: keyof TQueryOrganizations, value: number) => {
    setFilter({ ...filter, [name]: value })
  }

  const { data: categoriesList } = useQuery({
    queryKey: ['corporation-categories'],
    queryFn: () => getCategories()
  })

  const { fetchNextPage, fetchPreviousPage, isFetchingNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ['corporations', filter],
    queryFn: ({ pageParam }) => getCorporation({ ...filter, page: (pageParam?.page ?? pageParam) as any }),
    initialPageParam: defaultFilter,
    enabled: !isEmpty(filter),
    getNextPageParam: (lastPage: any, _, lastPageParams) => {
      const totalPages = lastPage?.data?.metaData?.totalPages
      const currentPage = lastPage?.data?.metaData?.currentPage

      if (currentPage === totalPages) return null
      return currentPage + 1
    }
  })

  const onChangeChecked = (item: TOrganizationItem | undefined, checked: boolean) => {
    if (!item?.id || list.length >= MAX_ITEM_ORGANIZATION) {
      setMessageError(
        '사업목적은 최대 19개까지 추가 가능합니다. 참고로, 실제 법인 설립 시 20개를 초과해서 사업목적을 추가할 수 있으나 법인등기 시 추가 비용이 발생합니다.'
      )
      return
    }
  }

  const onRemove = (item: TOrganizationItem) => {
    onRemoveItem(item)
    if (message) {
      setMessageError('')
    }
  }

  useEffect(() => {
    listenEvent(EventNameTBuidlding.RESET_TBUIDLING_ST3, () => {
      resetField('organization')
    })
  }, [])

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageError('')
    })
  }, [])

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue)
    changeFilter('categoryId', newValue)
  }

  const data_pages: { totalRecords: number; list: TOrganizationItem[] | undefined } = React.useMemo(
    () =>
      data?.pages?.reduce((data_page: any, item: BaseReponseList<any>) => {
        if (data_page.hasOwnProperty('totalRecords')) {
          return { ...data_page, list: [...data_page?.list, ...(item.data?.result as TOrganizationItem[])] }
        }
        return {
          totalRecords: item?.data?.metaData?.totalRecords,
          list: [...(item?.data?.result as TOrganizationItem[])]
        }
      }, {}) ?? [],
    [data?.pages ?? []]
  )

  useEffect(() => {
    requestIdleCallbackCustom(() => {
      if (refContainer.current && !isFetchingNextPage) {
        refContainer.current.scrollTop = refContainer.current.scrollHeight - refContainer.current.clientHeight - 100
      }
    })
  }, [isFetchingNextPage])

  return (
    <Box
      flexDirection={'column'}
      display='flex'
      justifyContent='space-between'
      alignItems='space-between'
      gap={'20px'}
      width='100%'
      component={'form'}
    >
      <SectionTitle
        sx={{
          marginTop: 0,
          marginBottom: 0
        }}
        title='사업목적'
        subtitle='회사가 진행할 사업의 종류를 정해보세요.'
      />
      <BoxLayout
        sx={{
          padding: '20px 24px',
          backgroundColor: (theme) => theme.palette.home.gray400
        }}
      >
        <Box component={'div'} className={styles.organization}>
          <Tabs
            className={styles.organization_tabs}
            value={currentTab}
            onChange={handleChangeTab}
            variant='scrollable'
            aria-label='scrollable force tabs example'
            sx={{
              backgroundColor: home.gray300
            }}
          >
            <Tab
              className={styles.tab}
              value={0}
              label={currentTab === 0 ? `전체 ${data_pages?.totalRecords || 0}` : `전체`}
            />
            {categoriesList &&
              (categoriesList || [])?.map((item) => (
                <Tab
                  className={styles.tab}
                  key={item.id}
                  value={item.id}
                  label={currentTab === item.id ? `${item.nameKr} ${data_pages?.totalRecords || 0}` : item.nameKr}
                  sx={{
                    color: home.gray50
                  }}
                />
              ))}
          </Tabs>
          <ScrollBar
            component='div'
            style={{
              maxHeight: '328px'
            }}
            containerRef={(ref) => (refContainer.current = ref)}
            options={{}}
            onYReachEnd={() => {
              if (hasNextPage && !isFetching) {
                fetchNextPage()
              }
            }}
          >
            <Box component={'div'} className={styles.organization_checkbox_list}>
              {isFetching ? (
                <CardListSkeleton columns={15} />
              ) : (
                <MultiCheckbox
                  row
                  maxLength={MAX_ITEM_ORGANIZATION}
                  onChangeChecked={onChangeChecked}
                  render={(item: any) => {
                    return (
                      <Box
                        display='flex'
                        justifyContent='start'
                        alignItems='center'
                        gap={1}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <DefaultIcon />

                        {item.name}
                      </Box>
                    )
                  }}
                  name='organization'
                  list={{
                    options: data_pages?.list,
                    value: 'id',
                    label: 'name'
                  }}
                  control={control}
                />
              )}
            </Box>
          </ScrollBar>
        </Box>
      </BoxLayout>

      <CardSelectedBox
        onRemove={onRemove}
        sxBoxList={{}}
        list={{
          selectedList: list,
          key: 'id',
          label: 'name'
        }}
      />

      <ErrorMessage message={message} />
    </Box>
  )
}

export default BusinessPurpose
