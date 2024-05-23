import yup from '@/services/yup.service'
import { FormStatus } from '../../card-news/utils/common'
import RequireTag from '../_clientComponents/RequireTag'
import FormGroup from '../_clientComponents/formGroup'
import { ICardNewsInputOverride } from '../contractDetailsForm2'
import { EmploymentFormType } from '../utils/constants'
import { formGroup5 } from '@/atoms/home/employment-contract'
import { useRecoilState, useResetRecoilState } from 'recoil'
import FormGroupContainer from '../_clientComponents/formGroupContainer'

export enum EVacationPolicy {
  option1 = '근로기준법 기준',
  option2 = '무제한 연차'
}
const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '휴가규정',
    type: 'radio',
    label: '',
    name: 'vacationPolicy',
    data: [
      {
        label: EVacationPolicy.option1,
        value: EVacationPolicy.option1
      },
      {
        label: EVacationPolicy.option2,
        value: EVacationPolicy.option2
      }
    ],
    validations: {
      yup: yup.string().required()
    }
  }
]

const ContractDetailsForm5 = () => {
  const [formData, setFormData] = useRecoilState(formGroup5)
  const reset = useResetRecoilState(formGroup5)

  return (
    <>
      <FormGroupContainer
        type={EmploymentFormType.vacation}
        fields={fields}
        title={'휴가'}
        subTitle='휴가규정을 선택보세요.'
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

export default ContractDetailsForm5
