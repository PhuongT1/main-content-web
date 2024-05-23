import DropDownIcon from '@/assets/icons/partnership-agreement/drop-down-icon'
import EllipseIcon from '@/assets/icons/partnership-agreement/ellipse-icon'
import { dataDeckActive } from '@/atoms/home/naming'
import { successValue, tabId } from '@/atoms/home/partnership-agreement'
import AccordionView from '@/components/accordion-view'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { EventPartnershipAgreement, StatusPartnershipAgreemen } from '@/constants/partnership-agreement'
import { Typography } from '@/elements'
import useToggle from '@/hooks/use-toggle'
import { IDataStep02 } from '@/types/partnership-agreement'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { sendEvent } from '@/utils/events'
import { handleGetStatusForm } from '@/utils/status-form'
import { Box, useTheme } from '@mui/material'
import { memo } from 'react'
import { useRecoilState } from 'recoil'
import TypeFive from './type-five'
import TypeFour from './type-four'
import TypeOne from './type-one'
import TypeSix from './type-six'
import TypeThree from './type-three'
import TypeTwo from './type-two'

interface IAccordionFormViewProps {
  dataAddtionalContractTerms: TStepPayload<TStepApi>
}
export interface IIdTab {
  id: string
  status: string
}

const AccordionFormView = ({ dataAddtionalContractTerms }: IAccordionFormViewProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [deckActive] = useRecoilState(dataDeckActive)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [idTab, setIdTab] = useRecoilState(tabId)

  const handleShowModal = () => {
    setToggleShowDialog(true)
  }

  const handleGetStatus = (value: string) => {
    switch (value) {
      case EventPartnershipAgreement.TAB_1:
        return successValueData.typeOne
      case EventPartnershipAgreement.TAB_2:
        return successValueData.typeTwo
      case EventPartnershipAgreement.TAB_3:
        return successValueData.typeThree
      case EventPartnershipAgreement.TAB_4:
        return successValueData.typeFour
      case EventPartnershipAgreement.TAB_5:
        return successValueData.typeFive
      case EventPartnershipAgreement.TAB_6:
        return successValueData.typeSix
      default:
        return
    }
  }

  const handleChangeDefaultStatus = (value: string) => {
    switch (value) {
      case EventPartnershipAgreement.TAB_1:
        return setSuccessValueData((value) => ({
          ...value,
          typeOne: StatusPartnershipAgreemen.PROCESS
        }))
      case EventPartnershipAgreement.TAB_2:
        return setSuccessValueData((value) => ({
          ...value,
          typeTwo: StatusPartnershipAgreemen.PROCESS
        }))
      case EventPartnershipAgreement.TAB_3:
        return setSuccessValueData((value) => ({
          ...value,
          typeThree: StatusPartnershipAgreemen.PROCESS
        }))
      case EventPartnershipAgreement.TAB_4:
        return setSuccessValueData((value) => ({
          ...value,
          typeFour: StatusPartnershipAgreemen.PROCESS
        }))
      case EventPartnershipAgreement.TAB_5:
        return setSuccessValueData((value) => ({
          ...value,
          typeFive: StatusPartnershipAgreemen.PROCESS
        }))
      case EventPartnershipAgreement.TAB_6:
        return setSuccessValueData((value) => ({
          ...value,
          typeSix: StatusPartnershipAgreemen.PROCESS
        }))
      default:
        return
    }
  }

  const handleSubmitModal = () => {
    sendEvent(`${idTab.id}`, { status: StatusPartnershipAgreemen.REMOVE })
    setToggleShowDialog(false)
    setIdTab({} as IIdTab)
  }

  const onExpand = (id: string) => {
    const STATUS_VALUE = handleGetStatus(id)

    if (idTab.status === StatusPartnershipAgreemen.PROCESS) {
      return
    } else if (idTab.status === StatusPartnershipAgreemen.DONE && idTab?.id === id) {
      return setIdTab({
        id: id,
        status: StatusPartnershipAgreemen.RESULT
      })
    } else if (idTab.status === StatusPartnershipAgreemen.RESULT && idTab?.id === id) {
      return setIdTab({
        id: id,
        status: StatusPartnershipAgreemen.DONE
      })
    } else if (idTab.id !== id && STATUS_VALUE === StatusPartnershipAgreemen.DONE) {
      setIdTab({
        id: id,
        status: StatusPartnershipAgreemen.RESULT
      })
    } else {
      setIdTab({
        id: id,
        status: StatusPartnershipAgreemen.PROCESS
      })
      handleChangeDefaultStatus(id)
    }
  }

  const VALUE_ACCORDION = [
    {
      children: (
        <TypeOne dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeOne, home)}
            stroke={handleGetStatusForm(successValueData.typeOne, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            출자 내용 및 출자에 따른 지분 비율 조항
          </Typography>
        </Box>
      ),
      id: 'additional-1',
      ariaControls: 'additional-1'
    },
    {
      children: (
        <TypeTwo dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeTwo, home)}
            stroke={handleGetStatusForm(successValueData.typeTwo, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            근속 의무 조항
          </Typography>
        </Box>
      ),
      id: 'additional-2',
      ariaControls: 'additional-2'
    },
    {
      children: (
        <TypeThree dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeThree, home)}
            stroke={handleGetStatusForm(successValueData.typeThree, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            경업의 금지 조항
          </Typography>
        </Box>
      ),
      id: 'additional-3',
      ariaControls: 'additional-3'
    },
    {
      children: (
        <TypeFour dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeFour, home)}
            stroke={handleGetStatusForm(successValueData.typeFour, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            주식의 처분 제한 조항
          </Typography>
        </Box>
      ),
      id: 'additional-4',
      ariaControls: 'additional-4'
    },
    {
      children: (
        <TypeFive dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeFive, home)}
            stroke={handleGetStatusForm(successValueData.typeFive, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            비밀 유지 의무 조항
          </Typography>
        </Box>
      ),
      id: 'additional-5',
      ariaControls: 'additional-5'
    },
    {
      children: (
        <TypeSix dataAddtionalContractTerms={dataAddtionalContractTerms?.data?.data as unknown as IDataStep02} />
      ),
      expandIcon: <DropDownIcon stroke={home.gray85} />,
      titleAccordion: (
        <Box display={'flex'} gap={convertToRem(10)}>
          <EllipseIcon
            fill={handleGetStatusForm(successValueData.typeSix, home)}
            stroke={handleGetStatusForm(successValueData.typeSix, home)}
          />
          <Typography cate='sub_title_30' color={home.gray50}>
            이익분배의무 조항
          </Typography>
        </Box>
      ),
      id: 'additional-6',
      ariaControls: 'additional-6'
    }
  ]

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
          계약 내용 추가
        </Typography>
        <Typography cate='sub_title_30' color={home.gray100}>
          계약서에 넣고 싶은 조항을 추가해보세요.
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
                  idTab?.status === StatusPartnershipAgreemen.PROCESS ||
                    idTab?.status === StatusPartnershipAgreemen.RESULT
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

export default memo(AccordionFormView)
