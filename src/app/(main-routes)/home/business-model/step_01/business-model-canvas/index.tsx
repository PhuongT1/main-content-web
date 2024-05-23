'use client'
import {
  BuildingIcon,
  CartIcon,
  ChecklistIcon,
  DonateIcon,
  LocationIcon,
  NoteIcon,
  ShareIcon,
  UserPlusIcon
} from '@/assets/icons'
import { Tip } from '@/components'
import { BoxLayout } from '@/components/home/box/box-custom'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import Title from '@/components/title'
import { getBusinessModelCharacteristics } from '@/services/business-model.service'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { TStepPayload } from '@/types/step.type'
import { removeDuplicate } from '@/utils/array'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { getEnumKey } from '@/utils/object'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import { SyntheticEvent, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import CardWrapper from '../../_components/card_wrapper'
import SelectionBusinessList from '../../_components/selection-busniness-list'
import { BUSINESS_MODEL_CHARACTERISTIC_ENUM } from '../../constants/business-model-canvas.constant'
import {
  TBusinessModelCavansForm,
  TModel,
  TRequiredCharacteristicError,
  TSelectionBusinessListProps
} from '../../types/business-model-canvas.type'
import { TBusinessModelCharacteristics } from '../../types/business-model-composition.type'

const MAX = 3

const generateNewCharacteristics = (uuid: string, name: string, type: BUSINESS_MODEL_CHARACTERISTIC_ENUM) => ({
  id: 0,
  uuid,
  createdAt: moment().format(),
  updatedAt: '',
  deletedAt: '',
  name,
  type,
  url: '',
  description: ''
})

type BusinessModelCanvasProps = {
  form: UseFormReturn<TBusinessModelCavansForm>
  data?: TStepPayload<IFormValuesStepOne>
  isViewing?: boolean
  requiredCharacteristicErr?: TRequiredCharacteristicError
}

function BusinessModelCanvas({
  form: { watch, setValue },
  isViewing = false,
  requiredCharacteristicErr
}: BusinessModelCanvasProps) {
  const {
    palette: { home }
  } = useTheme()
  const [selectedModel, setSelectedModel] = useState<TModel>()
  const [tipExpanded, setTipExpanded] = useState(false)
  const [tabValueCate, setTabValueCate] = useState<BUSINESS_MODEL_CHARACTERISTIC_ENUM>()

  const selectedCharacteristicByModel = watch('selectedCharacteristicByModel')

  const { data: characteristics } = useQuery({
    queryKey: [`business-model-characterictics`, tabValueCate],
    queryFn: () => (tabValueCate ? getBusinessModelCharacteristics(tabValueCate) : null)
  })

  const changeSelectedModel = (key: TModel) => {
    setSelectedModel(key)
  }

  const handleAddItemToModel = (item: TBusinessModelCharacteristics) => {
    if (selectedModel) {
      let arrClone = [...selectedCharacteristicByModel[selectedModel]]
      if (arrClone.find((i) => i.uuid === item.uuid)?.uuid) {
        arrClone = arrClone.filter((i) => i.uuid !== item.uuid)
      } else {
        selectedCharacteristicByModel[selectedModel].length < MAX
          ? arrClone.push(item)
          : enqueueSnackbar('최대 3개까지 선택할 수 있습니다.', { variant: 'error', autoHideDuration: 3000 })
      }
      const arr = removeDuplicate(arrClone)
      const clone = { ...selectedCharacteristicByModel, [selectedModel]: arr }
      setValue('selectedCharacteristicByModel', clone)
    }
  }

  const handleDeleteItems = (item: TBusinessModelCharacteristics, model: TModel) => {
    let arrClone = [...selectedCharacteristicByModel[model]]
    arrClone = arrClone.filter((i) => i.uuid !== item.uuid)
    const clone = { ...selectedCharacteristicByModel, [model]: arrClone }
    setValue('selectedCharacteristicByModel', clone)
  }

  const getSelected = (item?: TBusinessModelCharacteristics) => {
    if (item?.uuid && selectedModel) {
      return !!selectedCharacteristicByModel[selectedModel].find((i) => i.uuid === item.uuid)?.uuid
    }
    return false
  }

  const handleAddCustomCharacteristic = (name: string) => {
    if (tabValueCate) {
      const characteristic = generateNewCharacteristics(uuidv4(), name, tabValueCate)
      handleAddItemToModel(characteristic)
    }
  }

  const handleChangeTabCate = (_: SyntheticEvent, newValue: BUSINESS_MODEL_CHARACTERISTIC_ENUM) => {
    setTabValueCate(newValue)
  }

  const SelectionBusinessListByModel = ({
    model,
    ...rest
  }: Pick<TSelectionBusinessListProps, 'icon' | 'listHeight' | 'title' | 'selectionBgColor' | 'height'> & {
    model: TModel
  }) => {
    let isErr = false
    if (model === 'corePartnership') {
      isErr = !!requiredCharacteristicErr?.corePartnership
    }
    if (model === 'customerSegment') {
      isErr = !!requiredCharacteristicErr?.customerSegment
    }
    return (
      <SelectionBusinessList
        isViewing={!!isViewing}
        bgColor={isViewing ? 'home.gray300' : undefined}
        onDelete={(item) => handleDeleteItems(item, model)}
        isSelected={selectedModel === model}
        onClick={changeSelectedModel.bind(null, model)}
        selections={selectedCharacteristicByModel[model]}
        isErr={isErr}
        {...rest}
      />
    )
  }

  useEffect(() => {
    if (tabValueCate) {
      const enumKey = getEnumKey(BUSINESS_MODEL_CHARACTERISTIC_ENUM, tabValueCate)
      setSelectedModel(enumKey)
    }
  }, [tabValueCate])

  useEffect(() => {
    if (selectedModel) {
      setTabValueCate(BUSINESS_MODEL_CHARACTERISTIC_ENUM[selectedModel])
    }
  }, [selectedModel])

  // ==============
  return (
    <>
      <Box sx={{ marginTop: convertToRem(60) }}>
        <Title
          label={
            <>
              <Box component={'h2'} sx={{ color: home.gray50 }}>
                비즈니스 모델 캔버스
              </Box>
              {/* <Box component={'h4'} sx={{ color: home.mint500, fontWeight: 600, marginLeft: 1 }}>
                (최대 {MAXLENGTH_INPUT.SELECTED_COMPETITORS}개 선택)
              </Box> */}
            </>
          }
          subLabel='비즈니스의 이해, 전략 수립, 혁신, 커뮤니케이션, 경쟁력 강화 등 다양한 측면에서 생각해보고 완성시켜 보세요.'
        />

        <Box height={560} display={'flex'} gap={1.5}>
          <SelectionBusinessListByModel
            model='corePartnership'
            selectionBgColor='#3F3013'
            icon={<BuildingIcon />}
            title='핵심 파트너십'
          />
          <Box display={'flex'} width={'100%'} flexDirection={'column'} gap={1.5}>
            <SelectionBusinessListByModel
              model='coreActivity'
              listHeight={160}
              selectionBgColor='#13393F'
              icon={<ChecklistIcon />}
              title='핵심 활동'
            />
            <SelectionBusinessListByModel
              model='coreResource'
              listHeight={160}
              selectionBgColor='#2F1D55'
              icon={<BuildingIcon />}
              title='핵심 자원'
            />
          </Box>
          <SelectionBusinessListByModel
            model='valueProposition'
            selectionBgColor='#813E00'
            icon={<NoteIcon />}
            title='가치 제안'
          />
          <Box display={'flex'} width={'100%'} flexDirection={'column'} gap={1.5}>
            <SelectionBusinessListByModel
              model='customerRelationship'
              listHeight={160}
              selectionBgColor='#2854C5'
              icon={<ShareIcon />}
              title='고객 관계'
            />
            <SelectionBusinessListByModel
              model='distributionChannel'
              listHeight={160}
              selectionBgColor='#492A2E'
              icon={<LocationIcon />}
              title='유통 채널'
            />
          </Box>
          <SelectionBusinessListByModel
            model='customerSegment'
            selectionBgColor='#CCB700'
            icon={<UserPlusIcon />}
            title='고객 세그먼트'
          />
        </Box>

        <Box my={1.5} display={'flex'} gap={1.5}>
          <SelectionBusinessListByModel
            model='costStructure'
            selectionBgColor='#182D4C'
            icon={<CartIcon />}
            title='비용 구조'
            height={260}
            listHeight={180}
          />
          <SelectionBusinessListByModel
            model='revenueSource'
            selectionBgColor='#587244'
            icon={<DonateIcon />}
            title='수익원'
            height={260}
            listHeight={180}
          />
        </Box>

        {!isViewing && (
          <>
            {selectedModel && (
              <BoxLayout
                flexDirection={'column'}
                alignItems={'flex-start'}
                sx={{
                  backgroundColor: (theme) => theme.palette.home.gray400
                }}
              >
                <FilledTabStack
                  value={tabValueCate}
                  onChange={handleChangeTabCate}
                  sx={{
                    width: '100%',
                    height: convertToRem(64) + '!important',
                    backgroundColor: home.gray300,
                    color: home.gray50,
                    padding: `${convertToRem(12)} ${convertToRem(24)}`,
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
                  {(Object.values(BUSINESS_MODEL_CHARACTERISTIC_ENUM) || [])?.map((type) => (
                    <FillTabItem label={type} value={type} key={type} sx={{ padding: remConvert('6px 20px') }} />
                  ))}
                </FilledTabStack>
                <Box mt={2.5}>
                  <CardWrapper
                    {...{ handleAddCustomCharacteristic }}
                    data={characteristics || []}
                    handleClickCardItem={handleAddItemToModel}
                    getSelected={getSelected}
                  />
                </Box>
              </BoxLayout>
            )}
            <Tip
              endBtn={{
                props: { onClick: () => setTipExpanded((pre) => !pre) },
                content: tipExpanded ? '간략히 보기' : '자세히 보기'
              }}
              ellipsisTextProps={{
                ellipsisLine: tipExpanded ? 'unset' : 1,
                sx: { pb: tipExpanded ? 5 : 0, mr: tipExpanded ? '-125px' : 0 }
              }}
              containerSx={{ mt: 3 }}
              tipProps={{
                sx: {
                  alignSelf: tipExpanded ? 'flex-start' : 'center'
                }
              }}
            >
              비즈니스 모델 캔버스는 9개의 모듈로 구성되어 있으며, 각 모듈은 비즈니스를 설명하고 이해하는 데 도움을 주는
              중요한 구성 요소를 대표합니다. 아래는 비즈니스 모델 캔버스의 각 모듈에 대한 간략한 설명입니다: <br />
              1. 고객 세그먼트 (Customer Segments): 이 모듈은 비즈니스가 누구에게 가치를 제공하고자 하는지를 정의합니다.
              다양한 고객 그룹을 식별하고 각 그룹의 Bedrock 개요를 기술합니다.
              <br /> 2. 가치 제안 (Value Propositions): 비즈니스가 제공하는 제품 또는 서비스의 가치를 설명하는
              모듈입니다. 고객이 왜 제품이나 서비스를 선택해야 하는지에 대한 핵심 가치를 정의합니다.
              <br /> 3. 채널 (Channels): 비즈니스가 제품이나 서비스를 고객에게 전달하는 방법을 설명하는 모듈입니다.
              판매, 마케팅, 배송 등의 다양한 채널을 식별하고 최적의 전달 방법을 결정합니다.
              <br /> 4. 고객 관계 (Customer Relationships): 이 모듈은 고객과의 상호 작용 및 관계를 정의합니다. 개인화된
              서비스, 고객 지원, 소셜 미디어 참여 등과 같은 다양한 관계 유형을 고려합니다.
              <br /> 5. 수익원 (Revenue Streams): 비즈니스가 어떻게 수익을 창출하는지를 설명하는 모듈입니다. 제품 판매,
              구독 모델, 광고 수익 등 다양한 수익원을 고려합니다.
              <br />
              6. 핵심 자원 (Key Resources): 비즈니스가 성공적으로 운영되기 위해 필요한 핵심 자원을 정의하는 모듈입니다.
              기술, 인프라, 인력 등이 여기에 해당합니다.
              <br /> 7. 핵심 활동 (Key Activities): 핵심 자원을 활용하여 비즈니스가 수행하는 주요 활동을 설명하는
              모듈입니다. 생산, 마케팅, 기술 개발 등이 이에 해당합니다.
              <br /> 8. 핵심 파트너십 (Key Partnerships): 외부 파트너와의 협력을 강조하는 모듈입니다. 생산 파트너, 기술
              파트너, 유통 파트너 등 다양한 협력 관계를 고려합니다.
              <br /> 9. 비용 구조 (Cost Structure): 비즈니스가 운영되고 수익을 창출하기 위해 발생하는 비용을 설명하는
              모듈입니다. 고정 및 가변 비용, 운영 비용 등을 고려합니다.
              <br />
            </Tip>
          </>
        )}
      </Box>
    </>
  )
}

export default BusinessModelCanvas
