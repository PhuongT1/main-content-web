import yup from '@/services/yup.service'
import { DATE_FORMAT } from '@/constants/common.constant'
import { EmploymentFormType, PHONE_NUMBER_REGEX, UserTypes } from '../utils/constants'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { formGroup1 } from '@/atoms/home/employment-contract'
import { ICardNewsInputOverride } from '../contractDetailsForm2'
import FormGroupContainer from '../_clientComponents/formGroupContainer'
import { FormStatus } from '../../card-news/utils/common'

const cooporationData: ICardNewsInputOverride[] = [
  {
    type: 'input',
    label: '주식회사',
    name: 'cooporation_name',
    inputProps: {
      placeholder: '예시) 메인콘텐츠',
      maxLength: 20,
      required: true
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    type: 'input',
    label: '고유번호',
    name: 'cooporation_uniqueNumber',
    inputProps: {
      placeholder: '예시) 874-86-00628',
      maxLength: 15,
      regex: PHONE_NUMBER_REGEX,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.corporation ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '대표이사',
    name: 'cooporation_companyCEO',
    inputProps: {
      placeholder: '예시) 임한규',
      maxLength: 20,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.corporation ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '회사주소',
    name: 'cooporation_companyAddress',
    inputProps: {
      placeholder: '예시) 서울특별시 동작구 상도로 65 대방동빌딩(금성빌딩) 6층',
      maxLength: 80,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.corporation ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '전화번호',
    name: 'cooporation_companyPhoneNumber',
    inputProps: {
      placeholder: '예시) 1566-9178',
      maxLength: 15,
      regex: PHONE_NUMBER_REGEX,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.corporation ? yup.string().required() : yup.string()
        )
    }
  }
]

const individualBusinessOwner: ICardNewsInputOverride[] = [
  {
    type: 'input',
    label: '회사명',
    name: 'individualBusinessOwner_name',
    inputProps: {
      placeholder: '예시) 메인콘텐츠',
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individualBusinessOwner ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '고유번호',
    name: 'individualBusinessOwner_uniqueNumber',
    inputProps: {
      placeholder: '예시) 874-86-00628',
      maxLength: 15,
      regex: PHONE_NUMBER_REGEX,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individualBusinessOwner ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '대표이사',
    name: 'individualBusinessOwner_companyCEO',
    inputProps: {
      placeholder: '예시) 임한규',
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individualBusinessOwner ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'textarea',
    label: '회사주소',
    name: 'individualBusinessOwner_companyAddress',
    inputProps: {
      placeholder: '예시) 서울특별시 동작구 상도로 65 대방동빌딩(금성빌딩) 6층',
      minRows: 2,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individualBusinessOwner ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'input',
    label: '전화번호',
    name: 'individualBusinessOwner_companyPhoneNumber',
    inputProps: {
      placeholder: '예시) 1566-9178',
      required: true,
      regex: PHONE_NUMBER_REGEX
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individualBusinessOwner ? yup.string().required() : yup.string()
        )
    }
  }
]

const individual: ICardNewsInputOverride[] = [
  {
    type: 'input',
    label: '성명',
    name: 'individual_name',
    inputProps: {
      placeholder: '예시) 배근길',
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individual ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'inputHidden',
    label: '주민등록번호',
    name: 'individual_residentRegistrationNumber',
    inputProps: {
      placeholder: '예시) 050502-1******',
      maxLength: 13,
      regex: /^([0-9]*[\\*]*)*$/,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individual ? yup.string().required() : yup.string()
        )
    }
  },
  {
    type: 'textarea',
    label: '주소',
    name: 'individual_companyAddress',
    inputProps: {
      placeholder: '예시) 경기도 수원시 행복동 225-21 수원행복아파트 106동 2101호',
      multiline: true,
      minRows: 2,
      required: true,
      maxLength: 80
    },
    validations: {
      yup: yup.string().when('user', (value: any) => {
        return value && value[0] === UserTypes.individual ? yup.string().required() : yup.string()
      })
    }
  },
  {
    type: 'input',
    label: '전화번호',
    name: 'individual_companyPhoneNumber',
    inputProps: {
      placeholder: '예시) 010-5555-8789',
      maxLength: 15,
      regex: PHONE_NUMBER_REGEX,
      required: true
    },
    validations: {
      yup: yup
        .string()
        .when('user', (value: any) =>
          value && value[0] === UserTypes.individual ? yup.string().required() : yup.string()
        )
    }
  }
]

const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '계약일',
    type: 'date',
    label: '날짜',
    name: 'contractDate',
    inputProps: {
      placeholder: '예시) 2023년 12월 26일',
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT,
      required: true
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    groupTitle: '사용자 (갑)',
    type: 'radio',
    label: '',
    name: 'user',
    data: [
      {
        value: 'corporation',
        label: '법인'
      },
      {
        value: 'individualBusinessOwner',
        label: '개인사업자'
      },
      {
        value: 'individual',
        label: '개인'
      }
    ],
    validations: {
      yup: yup.string().required()
    },
    skipInCompleted: true
  },
  {
    slot: 'cooporationData',
    label: '',
    name: '',
    children: cooporationData,
    condition: { key: 'user', value: 'corporation' }
  },
  {
    slot: 'individualBusinessOwner',
    label: '',
    name: '',
    children: individualBusinessOwner,
    condition: { key: 'user', value: 'individualBusinessOwner' }
  },
  {
    slot: 'individual',
    label: '',
    name: '',
    children: individual,
    condition: { key: 'user', value: 'individual' }
  },
  {
    groupTitle: '근로자 (을)',
    type: 'input',
    label: '성명',
    name: 'worker',
    inputProps: {
      placeholder: '예시) 배근길',
      maxLength: 15,
      required: true
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    type: 'inputHidden',
    label: '주민등록번호',
    name: 'residentRegistrationNumber',
    inputProps: {
      placeholder: '예시) 050502-1******',
      regex: /^([0-9]*[\\*]*)*$/,
      maxLength: 13,
      required: true
    },
    validations: {
      yup: yup.string().required('residentRegistrationNumber is required')
    }
  },
  {
    type: 'textarea',
    label: '주소',
    name: 'address',
    inputProps: {
      placeholder: '예시) 경기도 수원시 행복동 225-21 수원행복아파트 106동 2101호',
      multiline: true,
      maxLength: 80,
      required: true,
      minRows: 2
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    type: 'input',
    label: '전화번호',
    name: 'phoneNumber',
    inputProps: {
      placeholder: '예시) 010-5555-8789',
      maxLength: 15,
      regex: PHONE_NUMBER_REGEX,
      minRows: 2,
      required: true
    },
    validations: {
      yup: yup.string().required()
    }
  }
]

const ContractDetailsForm1 = () => {
  const [formData, setFormData] = useRecoilState(formGroup1)
  const reset = useResetRecoilState(formGroup1)

  return (
    <FormGroupContainer
      type={EmploymentFormType.partiesToEmploymentContract}
      title='근로계약 당사자'
      subTitle='계약 당사자가 명확해야 계약이 법적 구속력을 가지게 됩니다.'
      fields={fields}
      formData={formData}
      required={true}
      onEdit={() => {
        setFormData({ ...formData, status: FormStatus.inprogress })
      }}
      onDelete={() => {
        reset()
      }}
    />
  )
}

export default ContractDetailsForm1
