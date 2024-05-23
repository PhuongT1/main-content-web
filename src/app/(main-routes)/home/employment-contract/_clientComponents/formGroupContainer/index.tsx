import React from 'react'
import FormGroup from '../formGroup'
import { FormStatus } from '../../../card-news/utils/common'
import { ICardNewsInputOverride } from '../../contractDetailsForm2'
import { EmploymentFormType, RESET_FORM_DATA } from '../../utils/constants'
import RequireTag from '../RequireTag'
import CompletedForm from '../completeForm'
import { sendEvent } from '@/utils/events'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  activeFormGroup,
  formGroup1,
  formGroup2,
  formGroup3,
  formGroup4,
  formGroup5,
  formGroup6
} from '@/atoms/home/employment-contract'

interface FormGroupContainerProps {
  type: EmploymentFormType
  title: string | React.ReactNode
  subTitle: string
  formData: any
  fields: ICardNewsInputOverride[]
  tip?: string
  required?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

const FormGroupContainer: React.FC<FormGroupContainerProps> = ({
  type,
  title,
  subTitle,
  formData,
  fields,
  tip,
  required,
  onEdit,
  onDelete
}) => {
  const [activeType, setActiveType] = useRecoilState(activeFormGroup)
  const resetActiveGroup = useResetRecoilState(activeFormGroup)
  const form1 = useRecoilValue(formGroup1)
  const form2 = useRecoilValue(formGroup2)
  const form3 = useRecoilValue(formGroup3)
  const form4 = useRecoilValue(formGroup4)
  const form5 = useRecoilValue(formGroup5)
  const form6 = useRecoilValue(formGroup6)

  const onCancel = () => {
    sendEvent(RESET_FORM_DATA, type)
  }

  const handleChangeCollapse = () => {
    const completedForms = [form1, form2, form3, form4, form5, form6].reduce(
      (item: { [key: string]: boolean }, form) => {
        if (form && form.status === FormStatus.completed) {
          item[form.type] = true
        }
        return item
      },
      {}
    )
    if (activeType && !completedForms[activeType]) {
      return
    }

    type === activeType ? resetActiveGroup() : setActiveType(type)
  }

  if (!formData) {
    return (
      <>
        <FormGroup
          status={FormStatus.inprogress}
          fields={fields}
          title={
            <>
              {required && <RequireTag />} {title}
            </>
          }
          subTitle={subTitle}
          type={type}
          tip={tip}
          onCancel={onCancel}
          onCollapse={handleChangeCollapse}
        />
      </>
    )
  }

  if (formData.status === FormStatus.completed) {
    return (
      <CompletedForm
        id={type}
        title={
          <>
            {required && <RequireTag />} {title}
          </>
        }
        subTitle={subTitle}
        formData={{
          formType: type,
          data: formData.data
        }}
        onEdit={onEdit}
        onDelete={onDelete}
        fields={fields}
        onCollapse={handleChangeCollapse}
      />
    )
  }

  return (
    <>
      <FormGroup
        status={FormStatus.inprogress}
        fields={fields}
        title={
          <>
            {required && <RequireTag />} {title}
          </>
        }
        subTitle={subTitle}
        type={type}
        initValues={formData.data}
        tip={tip}
        onCancel={onCancel}
        onCollapse={handleChangeCollapse}
      />
    </>
  )
}

export default FormGroupContainer
