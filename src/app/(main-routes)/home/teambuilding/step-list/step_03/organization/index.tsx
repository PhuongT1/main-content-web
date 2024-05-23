'use client'

import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import { MultiCheckbox } from '@/form/checkbox'
import useTabs from '@/hooks/use-tabs'
import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { BoxLayout } from '@/components/home/box/box-custom'
import ErrorMessage from '@/form/ErrorMessage'
import styles from './organization.module.scss'
import SectionTitle from '@/components/home/section-title'
import { EventNameTBuidlding, MAX_ITEM_ORGANIZATION } from '@/constants/teambuilding/teambuilding.constant'
import { getCategories, getOrganizational } from '@/services/organization.service'
import { BaseReponseList, TCategoryItem, TOrganizationItem, TQueryOrganizations } from '@/types/teambuilding/index.type'
import { listenEvent, requestIdleCallbackCustom } from '@/utils/events'
import { isEmpty } from '@/utils/object'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import ScrollBar from 'react-perfect-scrollbar'
import CardSelectedBox, { CardListSkeleton } from '../../../_components/card-selected'
import { handleFieldArray } from '../../../utils/handler'
import { TFormValues } from '../edit'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'

interface OrganizationSectionProps<TFieldValues extends FieldValues> {
  formProps: UseFormReturn<TFieldValues>
}

const defaultFilter: TQueryOrganizations = {
  limit: 20,
  page: 1,
  order: 'ASC',
  categoryId: 0
}

function OrganizationSection({ formProps }: OrganizationSectionProps<TFormValues>) {
  const { dict, lang } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const refContainer = useRef<HTMLElement>()
  const [message, setMessageError] = useState<string>('')

  const { control, resetField } = formProps
  const { list, onRemoveItem } = handleFieldArray(formProps, 'organization')

  const { currentTab, setValueTab } = useTabs(0)

  const [filter, setFilter] = useState<TQueryOrganizations>(defaultFilter)
  const changeFilter = (name: keyof TQueryOrganizations, value: number) => {
    setFilter({ ...filter, [name]: value })
  }

  const { data: categoriesList = [] } = useQuery({
    queryKey: ['organzation-categories'],
    queryFn: () => getCategories()
  })

  const { fetchNextPage, fetchPreviousPage, isFetchingNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ['organizations', filter],
    queryFn: ({ pageParam }) => getOrganizational({ ...filter, page: (pageParam?.page ?? pageParam) as any }),
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
      setMessageError(dict.teambuilding_organization_maxlength_msg)
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
      data?.pages.reduce((data_page: any, item: BaseReponseList<TOrganizationItem>) => {
        if (data_page.hasOwnProperty('totalRecords')) {
          return { ...data_page, list: [...data_page.list, ...(item.data?.result as TOrganizationItem[])] }
        }
        return {
          totalRecords: item.data?.metaData?.totalRecords,
          list: [...(item.data?.result as TOrganizationItem[])]
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
    >
      <SectionTitle mb={0} title={dict.organizational_culture} subtitle={dict.organizational_culture_description} />
      <BoxLayout
        sx={{
          padding: '20px 0',
          backgroundColor: (theme) => theme.palette.home.gray400
        }}
      >
        <Box component={'div'} className={styles.organization} sx={{ px: convertToRem(24) }}>
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
              label={currentTab === 0 ? `${dict.common_total} ${data_pages?.totalRecords || 0}` : dict.common_total}
              sx={{
                color: home.gray50,
                fontWeight: 600
              }}
            />
            {categoriesList?.map((item: TCategoryItem) => (
              <Tab
                className={styles.tab}
                key={item.id}
                value={item.id}
                label={
                  currentTab === item.id
                    ? `${lang === LANG.EN ? item.nameEn : item.nameKr} ${data_pages?.totalRecords || 0}`
                    : lang === LANG.EN
                    ? item.nameEn
                    : item.nameKr
                }
                sx={{
                  color: home.gray50,
                  fontWeight: 600
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
                  name='organization'
                  list={{
                    options: data_pages?.list,
                    value: 'id',
                    label: lang === LANG.EN ? 'nameEn' : 'name'
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
          label: lang === LANG.EN ? 'nameEn' : 'name'
        }}
      />
      <ErrorMessage message={message} />
    </Box>
  )
}

export default OrganizationSection
