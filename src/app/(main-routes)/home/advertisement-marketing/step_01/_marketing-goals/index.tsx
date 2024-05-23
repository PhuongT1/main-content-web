import { useState, useMemo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { UseFormReturn } from 'react-hook-form'
import { Box, useTheme } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IFormValuesMarketingGoals, IItemMarketingGoal } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { BoxLayout } from '@/components/home/box/box-custom'
import ErrorMessage from '@/form/ErrorMessage'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { MAX_LENGTH } from '@/constants/advertisement-marketing.constant'
import { getMarketingGoals } from '@/services/advertisement-marketing.service'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import CardMarketingGoalWrapper from '../../_components/card_scroll_wrapper'
import CardSelected from '../../_components/card_selected'
import styles from './style.module.scss'

const defaultFilter = { page: 1, limit: 20, order: 'ASC' as 'ASC' | 'DESC' }
type AdvertisementMarketingGoalsProps = { form: UseFormReturn<IFormValuesMarketingGoals> }
function AdvertisementMarketingGoals({ form: { watch, setValue, getValues } }: AdvertisementMarketingGoalsProps) {
  const { palette } = useTheme()
  const [messageAlert, setMessageAlert] = useState('')
  const selectedGoals = watch('selectedGoals')

  const {
    hasNextPage,
    fetchNextPage,
    data: dataMarketingGoals,
    isFetching: isFetchingMarketingGoals,
    isLoading: isLoadingMarketingGoals
  } = useInfiniteQuery({
    queryKey: [`advertisement-marketing-goals`],
    queryFn: ({ pageParam }) =>
      getMarketingGoals({
        ...defaultFilter,
        page: pageParam?.page ?? pageParam
      }),
    initialPageParam: defaultFilter,
    getNextPageParam: (lastPage: any) => {
      const { totalPages, currentPage } = lastPage?.metaData || {}
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    meta: { offLoading: true }
  })

  // =====
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageAlert('')
    })
  }, [])

  const dataMarketingGoalList = useMemo(() => {
    return (dataMarketingGoals?.pages || []).reduce(
      (acc, page) => ({
        list: [...acc.list, ...(page?.result || page || [])]
      }),
      { list: [] }
    )
  }, [dataMarketingGoals?.pages])

  const handleClickCardItem = (item: IItemMarketingGoal) => {
    if (!item || !item?.id) return
    if (selectedGoals?.some((goal) => goal?.id === item?.id)) {
      setValue(
        'selectedGoals',
        [...(selectedGoals || [])].filter((goal) => goal?.id !== item?.id)
      )
      return
    }
    if (selectedGoals?.length >= MAX_LENGTH.GOALS) {
      setMessageAlert(`마케팅 목표는 최대 ${MAX_LENGTH.GOALS}개까지 선택 가능합니다.`)
      return
    }
    setValue('selectedGoals', [...(selectedGoals || []), item])
  }

  const handleClickCardItemAdd = (item: IItemMarketingGoal) => {
    const newItem = { ...item, id: uuidv4() }
    setValue('selectedGoals', [...(selectedGoals || []), newItem])
  }

  // =====
  return (
    <>
      <BoxLayout
        className={styles.boxLayoutWrapper}
        flexDirection={'column'}
        alignItems={'flex-start'}
        sx={{ backgroundColor: (theme) => theme.palette.home.gray400 }}
      >
        <CardMarketingGoalWrapper
          data={(dataMarketingGoalList?.list || []) as IItemMarketingGoal[]}
          handleClickCardItem={handleClickCardItem}
          selectedGoals={selectedGoals}
          fetchNextPage={!isFetchingMarketingGoals && hasNextPage ? fetchNextPage : undefined}
          isLoading={isLoadingMarketingGoals}
        />
      </BoxLayout>

      <CardSelected
        classNames={styles.boxCardSelectedWrapper}
        onClickCardItemDataAdd={handleClickCardItemAdd}
        list={{
          key: 'id',
          selectedList: getValues('selectedGoals') || [],
          render: (item: IItemMarketingGoal) => {
            return (
              <Box component={'div'} sx={{ position: 'relative', height: '100%' }}>
                <Box display={'flex'} sx={{ pointerEvents: 'none', height: '100%', width: '100%' }}>
                  <CardMarketingGoal isView={true} item={item} sxCard={{ background: palette.home.gray400 }} />
                </Box>
                <Box onClick={() => handleClickCardItem(item)} component={'span'} className={styles.remove_icon}>
                  <ClearBoxIcon svgProps={{ width: 30, height: 30 }} rectProps={{ fill: palette.home.gray400 }} />
                </Box>
              </Box>
            )
          }
        }}
      />

      {messageAlert && (
        <Box component={'div'} sx={{ mt: convertToRem(20) }}>
          <ErrorMessage message={messageAlert} />
        </Box>
      )}
    </>
  )
}

export default AdvertisementMarketingGoals
