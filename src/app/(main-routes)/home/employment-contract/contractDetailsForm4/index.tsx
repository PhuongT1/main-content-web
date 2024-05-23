import yup from '@/services/yup.service'
import { FormStatus } from '../../card-news/utils/common'
import { ICardNewsInputOverride } from '../contractDetailsForm2'
import { EmploymentFormType } from '../utils/constants'
import { formGroup4 } from '@/atoms/home/employment-contract'
import { useRecoilState, useResetRecoilState } from 'recoil'
import FormGroupContainer from '../_clientComponents/formGroupContainer'

const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '담당업무',
    type: 'input',
    label: '',
    name: 'probationPeriod',
    inputProps: { placeholder: '예시) 교육기획 및 운영, 행정지원 등', required: true, maxLength: 20 },
    extends: {
      type: 'checkbox',
      label: '‘사용자가 지정하는 업무’ 추가',
      name: 'probationPeriodExtend'
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    groupTitle: '직위',
    type: 'input',
    label: '',
    name: 'spot',
    inputProps: {
      placeholder: '예시) 사원',
      required: true,
      maxLength: 10
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    groupTitle: '근무장소',
    type: 'input',
    label: '',
    name: 'workingPlace',
    inputProps: {
      placeholder: '예시) 회사',
      required: true,
      maxLength: 10
    },
    extends: {
      type: 'checkbox',
      label: '‘사용자가 지정하는 장소’ 추가',
      name: 'workingPlaceExtend'
    },
    validations: {
      yup: yup.string().required()
    }
  }
]

const ContractDetailsForm4 = () => {
  const [formData, setFormData] = useRecoilState(formGroup4)
  const reset = useResetRecoilState(formGroup4)

  return (
    <>
      <FormGroupContainer
        type={EmploymentFormType.dutiesAndWorkLocation}
        fields={fields}
        title={'담당업무 및 근무장소'}
        subTitle='보통 3개월 이내에 수습기간을 두고 있으며 이 기간에 문제가 발생하면 즉시 해고가 가능하다.'
        formData={formData}
        required={true}
        onEdit={() => {
          setFormData({ ...formData, status: FormStatus.inprogress })
        }}
        onDelete={() => {
          reset()
        }}
      />
    </>
  )
}

export default ContractDetailsForm4
