import { ModalReset } from '@/components/dialog/modal-deck'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { KeyStrengthType, TFormValuesRangeType, TFormValuesType, TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { FieldPath, useFormContext } from 'react-hook-form'
import { commonListSAType, defaultValuesTypes } from '..'
import { checkItemSelectedIndex, useSAData, useSAPostData } from '../../use-sa'
import StrenghtList from './strength-list'

import { Typography } from '@/elements'
import TopArrowIcon from '@/assets/icons/strength-analysis/top-arrow'
import RangeSection from './components/range-section'
import WeaknessList from './weakness-list'
import { useRecoilState } from 'recoil'
import { selectedRange } from '@/atoms/home/strength-analysis'
import { cloneDeep, isEmpty } from '@/utils/object'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'
import ErrorMessage from '@/form/ErrorMessage'

const SA_Step_02_Edit = () => {
  const {
    palette: { home, sub }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { data } = useSAData<TFormValuesType>(STEP.STEP_ONE, 'query-key-sa')

  const { mutation } = useSAPostData(STEP.STEP_TWO)
  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid }
  } = useFormContext<TFormValuesRangeType>()

  const [ranges, setRanges] = useRecoilState(selectedRange)

  const strengthList = watch('strength')
  const weaknessList = watch('weakness')

  const updatedValues = ({
    parentIndex,
    childIndex,
    key,
    dataNeedUpdated,
    item
  }: {
    parentIndex: number
    childIndex: number
    dataNeedUpdated: TTypesSA[][]
    key: FieldPath<TFormValuesRangeType>
    item: TTypesSA
  }) => {
    if (parentIndex < -1 || childIndex < -1 || !dataNeedUpdated || !key || !item) {
      return
    }
    const newValues = cloneDeep(dataNeedUpdated)
    newValues[parentIndex][childIndex] = item
    setValue(key, newValues)
  }

  const mappingDto = (values: TFormValuesRangeType): TFormValuesRangeType => {
    if (!values || !data?.data)
      return {
        strength: [],
        weakness: []
      }

    const newStrengthList = cloneDeep(values.strength)
    const newWeaknessList = cloneDeep(values.weakness)

    // If Only have 3 ranges already in list we will update

    const otherStrengthList = data?.data?.strengthList.filter((strength) => {
      if (newStrengthList.length < 4) {
        const index = checkItemSelectedIndex(strength, newStrengthList)
        return index === -1
      } else {
        newStrengthList.pop()
        const index = checkItemSelectedIndex(strength, newStrengthList)
        return index === -1
      }
    })
    newStrengthList.push(otherStrengthList)

    const otherWeaknesshList = data?.data?.weaknessList.filter((weakness) => {
      if (newWeaknessList.length < 4) {
        const index = checkItemSelectedIndex(weakness, newWeaknessList)
        return index === -1
      } else {
        newWeaknessList.pop()
        const index = checkItemSelectedIndex(weakness, newWeaknessList)
        return index === -1
      }
    })
    newWeaknessList.push(otherWeaknesshList)

    return {
      strength: newStrengthList,
      weakness: newWeaknessList
    }
  }

  const onSubmit = (values: TFormValuesRangeType) => {
    const newValues = mappingDto(values)
    mutation(newValues)
  }

  const handleReset = () => {
    toggleShowDialog()
    reset(defaultValuesTypes)
  }

  const handleClick = (rangeIndex: number, indexBox: number, key: string) => {
    setRanges((prev) => ({ ...prev, [key]: [rangeIndex, indexBox] }))

    if (!isEmpty(errors)) {
      clearErrors()
    }
  }

  const handleAddRangeItem = (item: TTypesSA, type: KeyStrengthType) => {
    if (!type || ranges[type].length < 2 || !data) return
    let hasCanUpdate = true

    // prevent case select range in weakness but click selecte item in strength

    if (type === STRENGTH_TYPE.strength) {
      const index = data?.data.strengthList.findIndex((x) => x.id === item.id)
      if (index === -1) {
        hasCanUpdate = false
      }
    }
    if (type === STRENGTH_TYPE.weakness) {
      const index = data?.data.weaknessList.findIndex((x) => x.id === item.id)
      if (index === -1) {
        hasCanUpdate = false
      }
    }
    if (!hasCanUpdate) return

    const rangeIndex = ranges[type][0]
    const indexUpdate = ranges[type][1]
    const currentList = type === STRENGTH_TYPE.strength ? strengthList : weaknessList

    const selectedIndex = checkItemSelectedIndex(item, currentList)

    if (selectedIndex >= 0) return
    updatedValues({
      parentIndex: rangeIndex,
      childIndex: indexUpdate,
      key: type,
      dataNeedUpdated: currentList,
      item
    })
    setRanges((prev) => ({ ...prev, [type]: [] }))
  }

  const handleRemoveRangeItem = (rangeIndex: number, indexUpdate: number, type: KeyStrengthType) => {
    if (!type || rangeIndex < 0 || indexUpdate < 0) return
    const currentList = type === STRENGTH_TYPE.strength ? strengthList : weaknessList
    updatedValues({
      parentIndex: rangeIndex,
      childIndex: indexUpdate,
      key: type,
      dataNeedUpdated: currentList,
      item: commonListSAType[0]
    })

    // setRanges((prev) => ({ ...prev, [type]: [rangeIndex, indexUpdate] }))
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
        <SectionTitle
          mt={remConvert('52px')}
          title='어울리는 유형 분류'
          subtitle='어울리는 유형 10개를 우선순위에 따라 분류해주세요'
        />
        <StrenghtList
          onClickSelect={(item) => handleAddRangeItem(item, STRENGTH_TYPE.strength)}
          list={data?.data.strengthList ?? []}
          selectActiveList={strengthList}
        />
        <RangeSection
          isHover
          onRemove={handleRemoveRangeItem}
          type={STRENGTH_TYPE.strength}
          selectActiveList={strengthList}
          currentActive={ranges.strength}
          handleClick={(range, idx) => handleClick(range, idx, STRENGTH_TYPE.strength)}
          description={
            <Box
              alignItems={'center'}
              mt={remConvert('20px')}
              justifyContent={'start'}
              component={'div'}
              display={'flex'}
              height={remConvert('110px')}
              flexDirection={'column'}
              gap={remConvert('20px')}
            >
              <TopArrowIcon />
              <Typography cate='title_50' textAlign={'center'} lineHeight={'normal'}>
                가장
                <span style={{ color: home.mint500, marginLeft: '4px' }}>어울리는</span>
                <br></br>유형을 선택해주세요.
              </Typography>
            </Box>
          }
        />
      </Box>
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
        <SectionTitle
          mt={remConvert('52px')}
          title='어울리는 않는 유형 분류'
          subtitle='어울리지 않는 유형 10개를 우선순위에 따라 분류해주세요'
        />
        <WeaknessList
          onClickSelect={(item) => handleAddRangeItem(item, STRENGTH_TYPE.weakness)}
          list={data?.data.weaknessList ?? []}
          selectActiveList={weaknessList}
        />
        <RangeSection
          isHover
          onRemove={handleRemoveRangeItem}
          type={STRENGTH_TYPE.weakness}
          selectActiveList={weaknessList}
          handleClick={(range, idx) => handleClick(range, idx, STRENGTH_TYPE.weakness)}
          currentActive={ranges.weakness}
          description={
            <Box
              alignItems={'center'}
              mt={remConvert('20px')}
              justifyContent={'start'}
              component={'div'}
              display={'flex'}
              height={remConvert('110px')}
              flexDirection={'column'}
              gap={remConvert('20px')}
            >
              <TopArrowIcon />
              <Typography cate='title_50' textAlign={'center'} lineHeight={'normal'}>
                가장
                <span style={{ color: sub.orange500, marginLeft: '4px' }}>어울리지 않는 </span>
                <br></br>유형을 선택해주세요.
              </Typography>
            </Box>
          }
        />
      </Box>
      {!isEmpty(errors) && (
        <Stack direction={'row'} mt={remConvert('20px')}>
          <ErrorMessage message='장점유형 분류가 완료되지 않았습니다' />
        </Stack>
      )}
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleReset} />

      <Box mt={'60px'} display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
        <RefreshButton onClick={toggleShowDialog} />
        <SubmitButton
          type='submit'
          // disabled={!isValid}
          sx={{
            backgroundColor: (theme) => theme.palette.home.blue500
          }}
        />
      </Box>
    </Box>
  )
}

export default SA_Step_02_Edit
