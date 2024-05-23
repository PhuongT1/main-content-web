import yup from '@/services/yup.service'
import { FormStatus } from '../../card-news/utils/common'
import RequireTag from '../_clientComponents/RequireTag'
import FormGroup from '../_clientComponents/formGroup'
import { ICardNewsInputOverride } from '../contractDetailsForm2'
import { EmploymentFormType } from '../utils/constants'
import { formGroup3 } from '@/atoms/home/employment-contract'
import { useRecoilState, useResetRecoilState } from 'recoil'
import FormGroupContainer from '../_clientComponents/formGroupContainer'

const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '수습기간',
    type: 'radio',
    label: '',
    name: 'probationPeriod',
    data: [
      {
        label: '1주일',
        value: '1주일'
      },
      {
        label: '1개월',
        value: '1개월'
      },
      {
        label: '2개월',
        value: '2개월'
      },
      {
        label: '3개월',
        value: '3개월'
      }
    ],
    validations: {
      yup: yup.string().required()
    }
  },
  {
    groupTitle: '수습기간 월지금액 조정',
    type: 'radio',
    label: '',
    name: 'adjustmentMonthlyAmount',
    data: [
      {
        label: '100%',
        value: '100%'
      },
      {
        label: '95%',
        value: '95%'
      },
      {
        label: '90%',
        value: '90%'
      }
    ],
    validations: {
      yup: yup.string().required()
    }
  }
]

const ContractDetailsForm3 = () => {
  const [formData, setFormData] = useRecoilState(formGroup3)
  const reset = useResetRecoilState(formGroup3)

  return (
    <FormGroupContainer
      type={EmploymentFormType.probationPeriod}
      title='수습기간'
      fields={fields}
      formData={formData}
      subTitle='보통 3개월 이내에 수습기간을 두고 있으며 이 기간에 문제가 발생하면 즉시 해고가 가능하다.'
      tip='1년 이상의 기간을 정하여 근로계약을 체결한 경우 수습 기간에는 최저임금의 90%까지 조정해서 급여를 지급할 수 있다. 다만, 아래 해당하는 직종은 최저임금보다 낮게 지급할 수 없다. 건설 및 광업 단순 종사자, 택배원, 음식이나 기타 배달원, 하역 및 적재 단순 종사자나 이삿짐 운반원, 수작업 포장직원, 제조업 노무 종사자나 제품 단순 선별원, 청소원, 환경미화원, 재활용 수거원, 건물관리원, 검표원, 아파트 경비원, 가사도우미, 육아도우미, 주방보조원, 패스트푸드 준비원, 주유원 등의 판매관련 종사자, 주차관리원, 세탁원'
      onEdit={() => {
        setFormData({ ...formData, status: FormStatus.inprogress })
      }}
      onDelete={() => {
        reset()
      }}
    />
  )
}

export default ContractDetailsForm3
