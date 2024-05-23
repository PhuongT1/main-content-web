import DropDownIcon from '@/assets/icons/partnership-agreement/drop-down-icon'
import EllipseIcon from '@/assets/icons/partnership-agreement/ellipse-icon'
import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import { memo } from 'react'
import { convertToRem } from '@/utils/convert-to-rem'
import AccordionView from '@/components/accordion-view'
import TypeOneOption from './type-one/index'
import TypeTwoOption from './type-two'
import TypeFourOption from './type-four'
import TypeFiveOption from './type-five'
import TypeSixOption from './type-six'
import TypeSevenOption from './type-seven'
import TypeEightOption from './type-eight'
import TypeNineOption from './type-nine'
import TypeTenOption from './type-ten'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { IDataStep02 } from '@/types/articies-of-incorporation.type'
import TypeThreeOption from './type-three'
import { useRecoilState } from 'recoil'
import { tabId } from '@/atoms/home/partnership-agreement'
import { successValue } from '@/atoms/home/articles-of-incorporation'
import { sendEvent } from '@/utils/events'
import useToggle from '@/hooks/use-toggle'
import { IIdTab } from '@/app/(main-routes)/home/partnership-agreement/components/step-list/step-02/additional-contract-terms-edit/accordion-form-view'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { handleGetStatusForm } from '@/utils/status-form'

interface IAccordionFormViewArticlesOfIncorporationProps {
  dataAddtionalContractTerms: TStepPayload<TStepApi>
}

const AccordionFormViewArticlesOfIncorporation = ({
  dataAddtionalContractTerms
}: IAccordionFormViewArticlesOfIncorporationProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [idTab, setIdTab] = useRecoilState(tabId)


  const VALUE_ACCORDION = [
    {
      children: (
        <TypeOneOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeOne,home)}
            stroke={handleGetStatusForm(successValueData.typeOne,home)}
          />
          <Typography>소셜벤처기업 또는 사회적기업 인증 판별규정</Typography>
        </Box>
      ),
      id: 'additional-1',
      ariaControls: 'additional-1'
    },
    {
      children: (
        <TypeTwoOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeTwo,home)}
            stroke={handleGetStatusForm(successValueData.typeTwo,home)}
          />
          <Typography>투자유치를 위한 주식발행규정</Typography>
        </Box>
      ),
      id: 'additional-2',
      ariaControls: 'additional-2'
    },
    {
      children: (
        <TypeThreeOption
          dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02}
        />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeThree,home)}
            stroke={handleGetStatusForm(successValueData.typeThree,home)}
          />
          <Typography>주식매수선택권(스톱옵션) 발행규정</Typography>
        </Box>
      ),
      id: 'additional-3',
      ariaControls: 'additional-3'
    },
    {
      children: (
        <TypeFourOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeFour,home)}
            stroke={handleGetStatusForm(successValueData.typeFour,home)}
          />
          <Typography>제3자 주식양도 제한규정</Typography>
        </Box>
      ),
      id: 'additional-4',
      ariaControls: 'additional-4'
    },
    {
      children: (
        <TypeFiveOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeFive,home)}
            stroke={handleGetStatusForm(successValueData.typeFive,home)}
          />
          <Typography>스타트업 특례규정</Typography>
        </Box>
      ),
      id: 'additional-5',
      ariaControls: 'additional-5'
    },
    {
      children: (
        <TypeSixOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeSix,home)}
            stroke={handleGetStatusForm(successValueData.typeSix,home)}
          />
          <Typography>배당규정</Typography>
        </Box>
      ),
      id: 'additional-6',
      ariaControls: 'additional-6'
    },
    {
      children: (
        <TypeSevenOption
          dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02}
        />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeSeven,home)}
            stroke={handleGetStatusForm(successValueData.typeSeven,home)}
          />
          <Typography>단독 대표이사 규정</Typography>
        </Box>
      ),
      id: 'additional-7',
      ariaControls: 'additional-7'
    },
    {
      children: (
        <TypeEightOption
          dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02}
        />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeEight,home)}
            stroke={handleGetStatusForm(successValueData.typeEight,home)}
          />
          <Typography>임원의 보수와 퇴직금, 유족보상금 규정</Typography>
        </Box>
      ),
      id: 'additional-8',
      ariaControls: 'additional-8'
    },
    {
      children: (
        <TypeNineOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeNine,home)}
            stroke={handleGetStatusForm(successValueData.typeNine,home)}
          />
          <Typography>직무발명보상 규정</Typography>
        </Box>
      ),
      id: 'additional-9',
      ariaControls: 'additional-9'
    },
    {
      children: (
        <TypeTenOption dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeTen,home)}
            stroke={handleGetStatusForm(successValueData.typeTen,home)}
          />
          <Typography>복수의결권 규정</Typography>
        </Box>
      ),
      id: 'additional-10',
      ariaControls: 'additional-10'
    }
  ]

  const handleChangeDefaultStatus = (value: string) => {
    switch (value) {
      case EventArticlesOfIncorporation.TAB_1:
        return setSuccessValueData((value) => ({
          ...value,
          typeOne: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_2:
        return setSuccessValueData((value) => ({
          ...value,
          typeTwo: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_3:
        return setSuccessValueData((value) => ({
          ...value,
          typeThree: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_4:
        return setSuccessValueData((value) => ({
          ...value,
          typeFour: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_5:
        return setSuccessValueData((value) => ({
          ...value,
          typeFive: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_6:
        return setSuccessValueData((value) => ({
          ...value,
          typeSix: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_7:
        return setSuccessValueData((value) => ({
          ...value,
          typeSeven: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_8:
        return setSuccessValueData((value) => ({
          ...value,
          typeEight: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_9:
        return setSuccessValueData((value) => ({
          ...value,
          typeNine: articlesOfIncorporation.PROCESS
        }))
      case EventArticlesOfIncorporation.TAB_10:
        return setSuccessValueData((value) => ({
          ...value,
          typeTen: articlesOfIncorporation.PROCESS
        }))
      default:
        return
    }
  }

  const handleGetStatus = (value: string) => {
    switch (value) {
      case EventArticlesOfIncorporation.TAB_1:
        return successValueData.typeOne
      case EventArticlesOfIncorporation.TAB_2:
        return successValueData.typeTwo
      case EventArticlesOfIncorporation.TAB_3:
        return successValueData.typeThree
      case EventArticlesOfIncorporation.TAB_4:
        return successValueData.typeFour
      case EventArticlesOfIncorporation.TAB_5:
        return successValueData.typeFive
      case EventArticlesOfIncorporation.TAB_6:
        return successValueData.typeSix
      case EventArticlesOfIncorporation.TAB_7:
        return successValueData.typeSeven
      case EventArticlesOfIncorporation.TAB_8:
        return successValueData.typeEight
      case EventArticlesOfIncorporation.TAB_9:
        return successValueData.typeNine
      case EventArticlesOfIncorporation.TAB_10:
        return successValueData.typeTen
      default:
        return
    }
  }

  const onExpand = (id: string) => {
    const STATUS_VALUE = handleGetStatus(id)

    if (idTab.status === articlesOfIncorporation.PROCESS) {
      return
    } else if (idTab.status === articlesOfIncorporation.DONE && idTab?.id === id) {
      return setIdTab({
        id: id,
        status: articlesOfIncorporation.RESULT
      })
    } else if (idTab.status === articlesOfIncorporation.RESULT && idTab?.id === id) {
      return setIdTab({
        id: id,
        status: articlesOfIncorporation.DONE
      })
    } else if (idTab.id !== id && STATUS_VALUE === articlesOfIncorporation.DONE) {
      setIdTab({
        id: id,
        status: articlesOfIncorporation.RESULT
      })
    } else {
      setIdTab({
        id: id,
        status: articlesOfIncorporation.PROCESS
      })
      handleChangeDefaultStatus(id)
    }
  }

  const handleShowModal = () => {
    setToggleShowDialog(true)
  }

  const handleSubmitModal = () => {
    sendEvent(`${idTab.id}`, { status: articlesOfIncorporation.REMOVE })
    setToggleShowDialog(false)
    setIdTab({} as IIdTab)
  }
  
  return (
    <Box
      display={'flex'}
      justifyContent={'start'}
      padding={convertToRem(20)}
      flexDirection={'column'}
      gap={convertToRem(20)}
      borderRadius={convertToRem(10)}
      sx={{
        backgroundColor: home.gray400
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={convertToRem(5)} alignItems={'center'}>
        <Typography cate='sub_title_30' color={home.gray50}>
          정관 내용 추가
        </Typography>
        <Typography cate='sub_title_30' color={home.gray100}>
          정관에 넣고 싶은 조항을 추가해보세요.
        </Typography>
      </Box>
      <Box
        component={'div'}
        sx={{
          height: convertToRem(1),
          width: '100%',
          backgroundColor: home.gray200
        }}
      />
      {VALUE_ACCORDION.map((item, index) => {
        return (
          <Box key={`accordion_${index}`} sx={{ width: convertToRem(320) }}>
            <AccordionView
              expandIcon={item.expandIcon}
              ariaControls={item.ariaControls}
              onExpand={() => onExpand(item.id)}
              expanded={
                Boolean(
                  idTab?.status === articlesOfIncorporation.PROCESS || idTab?.status === articlesOfIncorporation.RESULT
                ) && idTab?.id === item.id
              }
              id={item.id}
              tab={idTab as IIdTab}
              titleAccordion={item.titleAccordion}
              onCancel={handleShowModal}
            >
              {item?.children}
            </AccordionView>
          </Box>
        )
      })}
      <ModalNotification
        onSubmit={handleSubmitModal}
        description={'삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'}
        title={'작성한 데이터가 삭제됩니다.'}
        open={showDialog}
        onCancel={toggleShowDialog}
        cancelTxt='닫기'
        submitTxt='삭제하기'
      />
    </Box>
  )
}

export default memo(AccordionFormViewArticlesOfIncorporation)
