import React, { useEffect, useState } from 'react'

import styles from './tabs.module.scss'
import Tabs from '@/elements/tabs'
import Tab from '@/elements/tab'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from '@mui/material'
import { QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { useRecoilState } from 'recoil'
import { filterFourIdeaSelector, filterRelatedCompanySelector } from '@/atoms/home/idea'
import { getCompetitiveCompaniesIndustryForIdea } from '@/services/competitor-analysis.service'
import { ICompetitiveCompaniesIndustryResponse } from '@/types/competitor-analysis.type'
import { isEmpty } from '@/utils/object'
import { FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form'
import { useScrollTab } from '../../../use-idea'
import TabListItem from '@/components/home/tabs'
import { useLanguage } from '@/hooks/use-language'

type TTabListProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  namePath: TName
}

function TabList<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  namePath
}: TTabListProps<TFieldValues, TName>) {
  const { getValueLanguage } = useLanguage()
  const {
    palette: { home, main }
  } = useTheme()

  const { setValue, watch, clearErrors } = useFormContext<TFieldValues>()
  const { moveTabsScroll, getScrollSize } = useScrollTab()

  const industrialField = watch(name)

  const { data: dataIndustry, isLoading } = useQuery({
    queryKey: [QUERY_KEY_IDEA.GET_INSDUSTTRIAL],
    queryFn: () => getCompetitiveCompaniesIndustryForIdea(),
    meta: {
      offLoading: true
    }
  })

  const [filterFourIdea, setFilterFourIdea] = useRecoilState(filterFourIdeaSelector)
  const [filterRelatedCompany, setFilterRelateCompany] = useRecoilState(filterRelatedCompanySelector)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    const findInsdustrial = dataIndustry?.find((item: ICompetitiveCompaniesIndustryResponse) => item.id === newValue)
    if (!isEmpty(findInsdustrial!)) {
      setValue(name, findInsdustrial! as PathValue<TFieldValues, TName>)
      setFilterFourIdea((prev) => ({ ...prev, industrialField: findInsdustrial?.nameKr as string }))
      setFilterRelateCompany((prev) => ({ ...prev, industryId: newValue }))
      setValue(namePath, findInsdustrial?.url as PathValue<TFieldValues, TName>)
      clearErrors()
    }
  }

  useEffect(() => {
    if (industrialField?.id && !filterFourIdea.industrialField) {
      setFilterFourIdea({ industrialField: industrialField.nameKr })
      setFilterRelateCompany((prev) => ({ ...prev, industryId: industrialField.id }))
    }
  }, [industrialField])

  if (isLoading) {
    return (
      <Tabs
        className={styles.tabs}
        value={filterRelatedCompany.industryId}
        onChange={handleChangeTab}
        aria-label='scrollable force tabs example'
      >
        {Array.from(Array(9).keys()).map((i, index) => (
          <Tab
            style={{
              color: home.gray50
            }}
            sx={{
             
            }}
            className={styles.tab}
            key={i}
            value={i}
            label={' '}
          />
        ))}
      </Tabs>
    )
  }

  return (
    <TabListItem
      className={styles.tabs}
      value={filterRelatedCompany.industryId}
      onChange={handleChangeTab}
      aria-label='scrollable force tabs example'
      sx={{ backgroundColor: home.gray400}}
    >
      {dataIndustry?.map((item) => (
        <Tab
          className={styles.tab}
          key={item.id}
          value={item.id}
          label={getValueLanguage(item, 'name')}
          sx={{ backgroundColor: home.gray300, color: home.gray50, fontWeight: 600, opacity: 1 ,
            '&.Mui-selected' :{
              backgroundColor: home.blue500
            }
          }}
        />
      ))}
    </TabListItem>
  )
}

export default TabList
