import { ICardNewsInput } from '@/types/cardnews/index.type'
import { Box, Grid, useTheme } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Form from '../form'
import { ButtonItem } from '@/components/home/button'
import PlusIcon from '@/assets/icons/plus'
import { remConvert } from '@/utils/convert-to-rem'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import { FormStatus } from '../../../card-news/utils/common'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { ICardNewsInputOverride } from '../../contractDetailsForm2'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  FromGroupData,
  activeFormGroup,
  formGroup1,
  formGroup2,
  formGroup3,
  formGroup4,
  formGroup5,
  formGroup6
} from '@/atoms/home/employment-contract'
import { EmploymentFormType, RESET_FORM_DATA, SUBMIT_FORM_DATA } from '../../utils/constants'
import useToggle from '@/hooks/use-toggle'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { useLanguage } from '@/hooks/use-language'
import { listenEvent, sendEvent } from '@/utils/events'

type FormGroupProps = {
  type: EmploymentFormType
  fields: ICardNewsInput[] | any[]
  title: any
  subTitle: string
  status: FormStatus
  tip?: string
  initValues?: object
  onCancel?: () => void
  onCollapse?: () => void
}

const createSchemaRecursive = (fields: ICardNewsInput[] | any[]) => {
  let schema: {
    [key: string]: any
  } = {}
  fields.forEach((field) => {
    if (field.validations?.yup) {
      schema[field.name] = field.validations.yup
    }

    // If the field has children, recursively generate schema for them
    if (field.children) {
      schema = { ...schema, ...createSchemaRecursive(field.children) }
    }
  })
  return schema
}

const FormChildren = ({ form, field }: { form: any; field: ICardNewsInputOverride }) => {
  const { control } = form
  const renderChildren = (childField: ICardNewsInputOverride) => {
    if (!childField.condition) return null
    const valueCondition = form.watch(childField.condition.key)
    return (
      <React.Fragment>
        {valueCondition === childField.condition.value
          ? childField.children?.map((cField) => {
              return cField.slot ? (
                <React.Fragment key={childField.slot}>{renderChildren(cField)}</React.Fragment>
              ) : (
                <Form field={cField} control={control} form={form} />
              )
            })
          : null}
      </React.Fragment>
    )
  }

  return renderChildren(field)
}
const getForm = (type: EmploymentFormType) => {
  switch (type) {
    case EmploymentFormType.partiesToEmploymentContract:
      return formGroup1
    case EmploymentFormType.employmentType:
      return formGroup2
    case EmploymentFormType.probationPeriod:
      return formGroup3
    case EmploymentFormType.dutiesAndWorkLocation:
      return formGroup4
    case EmploymentFormType.vacation:
      return formGroup5
    case EmploymentFormType.wage:
      return formGroup6
    default:
      return formGroup1
  }
}

enum EmploymentFormTypeCount {
  partiesToEmploymentContract = 'form1',
  employmentType = 'form2',
  probationPeriod = 'form3',
  dutiesAndWorkLocation = 'form4',
  vacation = 'form5',
  wage = 'form6'
}
const FormGroup: React.FC<FormGroupProps> = ({
  type,
  fields,
  title,
  status,
  subTitle,
  tip,
  initValues,
  onCancel,
  onCollapse
}) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [formData, setFormGroupData] = useRecoilState(getForm(type))
  const [activeType] = useRecoilState(activeFormGroup)
  const resetActiveGroup = useResetRecoilState(activeFormGroup)
  const form1 = useRecoilValue(formGroup1)
  const form2 = useRecoilValue(formGroup2)
  const form3 = useRecoilValue(formGroup3)
  const form4 = useRecoilValue(formGroup4)
  const form5 = useRecoilValue(formGroup5)
  const form6 = useRecoilValue(formGroup6)

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: initValues,
    resolver: yupResolver(yup.object().shape(createSchemaRecursive(fields)))
  })

  useEffect(() => {
    form.reset(initValues)
  }, [JSON.stringify(initValues)])

  const { control, formState } = form

  const handleSubmit = () => {
    const newData = {
      status: FormStatus.completed,
      type,
      data: form.getValues()
    }
    setFormGroupData(newData)

    onAfterSubmit(newData)
  }

  const onAfterSubmit = (newData: FromGroupData) => {
    sendEvent(SUBMIT_FORM_DATA, {
      form1,
      form2,
      form3,
      form4,
      form5,
      form6,
      [EmploymentFormTypeCount[type]]: newData
    })
  }

  useEffect(() => {
    listenEvent(RESET_FORM_DATA, (event: any) => {
      if (!event) return
      if (event.detail === type) {
        form.reset()

        if (initValues) {
          setFormGroupData({
            ...formData,
            status: FormStatus.completed
          })
        } else {
          resetActiveGroup()
        }
      }
    })
  }, [initValues, formData])

  const customStatus = useMemo(() => {
    if (status === FormStatus.completed || activeType === type) {
      return status
    }

    return FormStatus.inActive
  }, [status, activeType, type])

  return (
    <CompleteFormAccordion
      status={customStatus}
      sxStatus={{
        backgroundColor: home.gray50,
        borderColor: home.gray85
      }}
      title={title}
      subTitle={subTitle}
      expanded={activeType === type}
      allowCancel={activeType === type && status !== FormStatus.completed}
      onCancel={() => {
        setToggleShowDialog(true)
      }}
      onChange={() => {
        onCollapse && onCollapse()
      }}
    >
      <Grid container rowSpacing={'24px'} columnSpacing={'20px'}>
        {tip ? <TipItemHorizontal content={tip} customSX={{ padding: remConvert('20px') }} /> : null}
        {fields.map((field) =>
          !field.slot ? (
            <Form key={field.name} field={field as ICardNewsInput} control={control} form={form} />
          ) : (
            <React.Fragment key={field.slot}>
              <FormChildren form={form} field={field} />
            </React.Fragment>
          )
        )}
      </Grid>
      <ButtonItem
        startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
        sx={{
          lineHeight: remConvert('20px'),
          display: 'flex',
          height: remConvert('48px'),
          padding: remConvert('20px'),
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          borderColor: home.blue500,
          backgroundColor: home.blue500,
          color: home.gray500,
          minWidth: '0',
          borderRadius: remConvert('10px'),
          '&:hover': {
            backgroundColor: 'main_primary.blue300'
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            borderColor: home.blue500,
            color: home.gray500,
            backgroundColor: home.blue500
          }
        }}
        fullWidth
        onClick={handleSubmit}
        disabled={!formState.isValid}
      >
        계약서에 추가하기
      </ButtonItem>
      <ModalNotification
        onSubmit={() => {
          setToggleShowDialog(false)
          onCancel && onCancel()
        }}
        description={dict.deck_delete_description}
        title={dict.deck_delete_title}
        open={showDialog}
        onCancel={toggleShowDialog}
        cancelTxt='닫기'
        submitTxt='삭제하기'
      />
    </CompleteFormAccordion>
  )
}

export default memo(FormGroup)
