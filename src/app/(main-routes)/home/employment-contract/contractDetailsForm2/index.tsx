import { ICardNewsInput } from '@/types/cardnews/index.type'
import { FormProps, UseFormProps, useForm } from 'react-hook-form'
import FormGroup from '../_clientComponents/formGroup'
import Form from '../_clientComponents/form'
import { FormStatus } from '../../card-news/utils/common'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { get } from 'http'
import { getHoursEvery30Minutes } from '../utils'
import RequireTag from '../_clientComponents/RequireTag'
import { EmploymentFormType, HOURS_REGEX, HOUR_FORMAT, WEEKLY_WORKING_REGEX, WEEK_DAYS } from '../utils/constants'
import { formGroup2 } from '@/atoms/home/employment-contract'
import { useRecoilState, useResetRecoilState } from 'recoil'
import FormGroupContainer from '../_clientComponents/formGroupContainer'
import moment from 'moment'
import { InputProps, SxProps } from '@mui/material'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { DATE_FORMAT } from '@/constants/common.constant'

export enum EmploymentType {
  employmentType = 'employmentType',
  fulltimeEmployee = '정규직',
  contractEmployee = '계약직',
  parttimeJob = '아르바이트'
}

export interface ICardNewsInputOverride extends ICardNewsInput {
  children?: ICardNewsInputOverride[]
  extends?: any
  slot?: string
  tip?: string
  extendLabel?: string
  condition?: any
  flowDirection?: 'row' | 'column'
  skipInCompleted?: boolean
  skipLabel?: boolean
  skipGroupTitle?: boolean
  InputProps?: InputProps
  customSx?: SxProps
  prefixEndAdornment?: (form: any) => string
  onChangeInput?: (value: string, form: any) => void
  render?: (data: { [key: string]: any }) => JSX.Element | null
}

const regularEmployees: ICardNewsInputOverride[] = [
  {
    type: 'date',
    label: '시작일',
    name: 'startDate',
    inputProps: {
      placeholder: '기업명을 입력하세요.',
      required: true,
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT
    },
    validations: {
      yup: yup.string().required()
    },
    skipInCompleted: true
  }
]

const contractEmployees: ICardNewsInputOverride[] = [
  {
    type: 'date',
    label: '시작일',
    name: 'startDate',
    inputProps: {
      placeholder: '예시) 2023년 12월 26일',
      required: true,
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT
    },
    skipInCompleted: true
  },
  {
    type: 'date',
    label: '종료일',
    name: 'endDate',
    inputProps: {
      placeholder: '예시) 2023년 12월 26일',
      required: true,
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT
    },
    extends: {
      type: 'checkboxGroup',
      label: '종료일을 정하지 않음',
      name: 'noEndDate'
    },
    skipInCompleted: true
  }
]

const parttimeJobs: ICardNewsInputOverride[] = [
  {
    type: 'date',
    label: '시작일',
    name: 'startDate',
    inputProps: {
      placeholder: '예시) 2023년 12월 26일',
      required: true,
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT
    },
    skipInCompleted: true
  },
  {
    type: 'date',
    label: '종료일',
    name: 'endDate',
    inputProps: {
      placeholder: '예시) 2023년 12월 26일',
      required: true,
      dateFormat: DATE_FORMAT.SPACE_WITH_TEXT
    },
    skipInCompleted: true
  }
]

export enum EFlexibleWorkSystem {
  option1 = '탄력적 근로시간제',
  option2 = '선택적 근로시간제',
  option3 = '사업장 밖 간주근로시간제',
  option4 = '재량근로시간제'
}

export enum EOperationPeriod {
  option1 = '2주 단위',
  option2 = '1개월 단위',
  option3 = '3개월 단위',
  option4 = '6개월 단위'
}

export enum EWorkingHourCalculation {
  option1 = '소정근로시간을 근로한 것으로 봄',
  option2 = '근로자대표와 서면 합의로 정한 시간을 근로한 것으로 봄'
}
const flexibleWorkSystemOption1: ICardNewsInputOverride[] = [
  {
    type: 'select',
    label: '운영기간',
    name: 'operationPeriod',
    inputProps: {
      placeholder: '예시) 2주 이내',
      required: true
    },
    data: [
      {
        label: EOperationPeriod.option1,
        value: EOperationPeriod.option1
      },
      {
        label: EOperationPeriod.option2,
        value: EOperationPeriod.option2
      },
      {
        label: EOperationPeriod.option3,
        value: EOperationPeriod.option3
      },
      {
        label: EOperationPeriod.option4,
        value: EOperationPeriod.option4
      }
    ],
    skipInCompleted: true
  }
]

const flexibleWorkSystemOption2: ICardNewsInputOverride[] = [
  {
    type: 'checkboxGroup',
    label: '',
    name: 'oneMonthUnit',
    data: [
      {
        label: '근로가능 시간대',
        value: '근로가능 시간대'
      },
      {
        label: '의무근로 시간대',
        value: '의무근로 시간대'
      }
    ],
    skipInCompleted: true
  },
  {
    type: 'input',
    label: '근로가능 시간대',
    name: 'availableWorkingHour',
    inputProps: {
      placeholder: '예시) 09:00 ~ 21:00',
      required: true
    },
    skipLabel: true,
    render: ({ availableWorkingHour }) => <>근로가능 시간대: {availableWorkingHour}</>
  },
  {
    type: 'input',
    label: '의무근로 시간대',
    name: 'manadatoryWorkingHour',
    inputProps: {
      placeholder: '예시) 화요일 10:00 ~ 12:00',
      required: true
    },
    skipLabel: true,
    render: ({ manadatoryWorkingHour }) => <>의무근로 시간대: {manadatoryWorkingHour}</>
  }
]

const flexibleWorkSystemOption3: ICardNewsInputOverride[] = [
  {
    type: 'select',
    label: '근로시간 산정',
    name: 'workingHourCalculation',
    inputProps: {
      placeholder: '예시) 소정근로시간으로 봄',
      required: true
    },
    data: [
      {
        label: EWorkingHourCalculation.option1,
        value: EWorkingHourCalculation.option1
      },
      {
        label: EWorkingHourCalculation.option2,
        value: EWorkingHourCalculation.option2
      }
    ],
    skipLabel: true
  }
]

const flexibleWorkSystem: ICardNewsInputOverride[] = [
  {
    type: 'select',
    label: '유연근무제',
    name: 'flexibleWorkSystem',
    inputProps: {
      placeholder: '예시) 탄력적 근로시간제',
      required: true
    },
    data: [
      {
        label: EFlexibleWorkSystem.option1,
        value: EFlexibleWorkSystem.option1
      },
      {
        label: EFlexibleWorkSystem.option2,
        value: EFlexibleWorkSystem.option2
      },
      {
        label: EFlexibleWorkSystem.option3,
        value: EFlexibleWorkSystem.option3
      },
      {
        label: EFlexibleWorkSystem.option4,
        value: EFlexibleWorkSystem.option4
      }
    ],
    skipLabel: true
  },
  {
    slot: 'flexibleWorkSystemOption1',
    name: '',
    label: '',
    children: flexibleWorkSystemOption1,
    condition: {
      key: 'flexibleWorkSystem',
      value: EFlexibleWorkSystem.option1
    }
  },
  {
    slot: 'flexibleWorkSystemOption2',
    name: '',
    label: '',
    children: flexibleWorkSystemOption2,
    condition: {
      key: 'flexibleWorkSystem',
      value: EFlexibleWorkSystem.option2
    }
  },
  {
    slot: 'flexibleWorkSystemOption3',
    name: '',
    label: '',
    children: flexibleWorkSystemOption3,
    condition: {
      key: 'flexibleWorkSystem',
      value: EFlexibleWorkSystem.option3
    }
  }
]

const customHoursEvery30Minutes = getHoursEvery30Minutes.map((hour: string) => ({ value: hour, label: hour }))
const calcualteBreakingTime = (dailyWorkingHours: number) => {
  if (dailyWorkingHours < 8) {
    return 0.5
  } else {
    return 1
  }
}
export enum EWorkingType {
  fixedWorkSystem = '고정근무제',
  flexibleWorkSystem = '유연근무제'
}

const commonFields: ICardNewsInputOverride[] = [
  {
    groupTitle: '근무형태',
    type: 'radio',
    label: '',
    name: 'workType',
    data: [
      {
        label: '고정근무제',
        value: EWorkingType.fixedWorkSystem
      },
      {
        label: '유연근무제',
        value: EWorkingType.flexibleWorkSystem
      }
    ],
    inputProps: {
      required: true
    },
    validations: {
      yup: yup.string().required()
    },
    render: ({ workType }) => (workType === EWorkingType.fixedWorkSystem ? <>고정근무제</> : null)
  },
  {
    slot: 'flexibleWorkSystemSlot',
    label: '',
    name: '',
    children: flexibleWorkSystem,
    condition: {
      key: 'workType',
      value: EWorkingType.flexibleWorkSystem
    }
  },
  {
    groupTitle: '근무조건',
    type: 'radio',
    label: '',
    name: 'workConditions',
    data: [
      {
        label: '일 8시간 / 주 5일 (월 209시간)',
        value: '8hours5days'
      },
      {
        label: '직접입력',
        value: 'directInput'
      }
    ],
    inputProps: {
      required: true
    },
    render: ({ workConditions, dailyWorkingHours, weeklyWorkingDays }) =>
      workConditions === '8hours5days' ? (
        <>일 8시간 / 주 5일 (월 209시간)</>
      ) : (
        <>
          일 {dailyWorkingHours}시간 / 주 {weeklyWorkingDays}일 (월 {dailyWorkingHours * weeklyWorkingDays * 4}시간)
        </>
      )
  },
  {
    groupTitle: '',
    label: '',
    name: '',
    slot: 'workConditionsSlot',
    children: [
      {
        type: 'input',
        label: '하루 근무시간',
        name: 'dailyWorkingHours',
        inputProps: {
          placeholder: '예시) 6시간',
          required: true,
          regex: HOURS_REGEX
        },
        InputProps: {
          endAdornment: (
            <Typography
              paddingRight={convertToRem(10)}
              fontSize={14}
              fontWeight={600}
              color={'home.gray100'}
              whiteSpace={'nowrap'}
              sx={{
                textWrap: 'nowrap'
              }}
            >
              시간
            </Typography>
          )
        },
        skipInCompleted: true
      },
      {
        type: 'input',
        label: '주간 근무일',
        name: 'weeklyWorkingDays',
        inputProps: {
          placeholder: '예시) 4일',
          required: true,
          regex: WEEKLY_WORKING_REGEX
        },
        InputProps: {
          endAdornment: (
            <Typography
              paddingRight={convertToRem(10)}
              fontSize={14}
              fontWeight={600}
              color={'home.gray100'}
              whiteSpace={'nowrap'}
              sx={{
                textWrap: 'nowrap'
              }}
            >
              일
            </Typography>
          )
        },
        extends: {
          type: 'custom',
          render: (form: any) => {
            const dailyWorkingHours = form.watch('dailyWorkingHours')
            const weeklyWorkingDays = form.watch('weeklyWorkingDays')

            if (!dailyWorkingHours || !weeklyWorkingDays) return null
            return (
              <Typography
                paddingRight={convertToRem(10)}
                fontSize={16}
                fontWeight={400}
                color={'home.blue300'}
                whiteSpace={'nowrap'}
                sx={{
                  textWrap: 'nowrap',
                  textAlign: 'right',
                  marginTop: convertToRem(8)
                }}
              >
                일 {dailyWorkingHours}시간 / 주 {weeklyWorkingDays}일 (월 {dailyWorkingHours * weeklyWorkingDays * 4}
                시간)
              </Typography>
            )
          }
        },
        skipInCompleted: true
      }
    ],
    condition: {
      key: 'workConditions',
      value: 'directInput'
    }
  },
  {
    groupTitle: '근무일',
    type: 'checkboxGroup',
    label: '',
    name: 'workDay',
    data: WEEK_DAYS,
    inputProps: {
      required: true
    },
    render: ({ workDay }) => workDay?.join(', '),

    validations: {
      yup: yup.array().when(['workConditions', 'weeklyWorkingDays'], ([workConditions, weeklyWorkingDays]) => {
        if (!workConditions || workConditions === '8hours5days') {
          return yup.array().of(yup.string().required()).max(5, '5개 요일을 선택해주세요.')
        }
        return yup
          .array()
          .of(yup.string().required())
          .max(weeklyWorkingDays, `${weeklyWorkingDays}개 요일을 선택해주세요.`)
      })
    }
  },
  {
    groupTitle: '유급휴일',
    type: 'radio',
    label: '',
    name: 'paidHoliday',
    data: WEEK_DAYS,
    inputProps: {
      required: true
    },
    validations: {
      yup: yup.string().required()
    },
    onChangeInput: (value: string, form: any) => {
      const workDay = form.watch('workDay')
      console.log(workDay, value)
      if (workDay.includes(value)) {
        return false
      }
      form.setValue('paidHoliday', value)
    }
  },
  {
    groupTitle: '근무시간',
    type: 'select',
    label: '시작',
    name: 'workingHourStart',
    column: 6,
    inputProps: {
      placeholder: '선택',
      required: true
    },
    data: customHoursEvery30Minutes,
    render: ({ workingHourStart, workingHourEnd }) => {
      const hours = moment(workingHourEnd, HOUR_FORMAT).diff(moment(workingHourStart, HOUR_FORMAT), 'hours')
      const minutes = moment(workingHourEnd, HOUR_FORMAT).diff(moment(workingHourStart, HOUR_FORMAT), 'minutes') % 60

      return (
        <>
          {workingHourStart} ~ {workingHourEnd} (일 {hours > 0 ? `${hours} 시간` : `${minutes}분`})
        </>
      )
    },
    onChangeInput: (value: string, form: any) => {
      const workConditions = form.getValues('workConditions')
      let endTime = 0
      if (workConditions === '8hours5days') {
        endTime = 8 + 1
      } else {
        const dailyWorkingHours = form.getValues('dailyWorkingHours')
        endTime = dailyWorkingHours + calcualteBreakingTime(dailyWorkingHours)
      }

      form.setValue('workingHourStart', value)
      form.setValue('workingHourEnd', moment(value, HOUR_FORMAT).add(endTime, 'hours').format(HOUR_FORMAT))
    },
    skipLabel: true
  },
  {
    groupTitle: ' ',
    type: 'select',
    label: '종료',
    name: 'workingHourEnd',
    column: 6,
    inputProps: {
      placeholder: '선택',
      required: true,
      readonly: true
    },
    InputProps: {
      readOnly: true
    },
    data: customHoursEvery30Minutes,
    skipInCompleted: true
  },
  {
    groupTitle: '휴게시간',
    type: 'select',
    label: '시작',
    name: 'recessTimeStart',
    column: 6,
    inputProps: {
      placeholder: '선택',
      required: true
    },

    data: customHoursEvery30Minutes,
    render: ({ recessTimeStart, recessTimeEnd }) => (
      <>
        {recessTimeStart} ~ {recessTimeEnd} (일{' '}
        {moment(recessTimeEnd, HOUR_FORMAT).diff(moment(recessTimeStart, HOUR_FORMAT), 'hours')}시간)
      </>
    ),
    skipLabel: true,
    onChangeInput: (value: string, form: any) => {
      const workConditions = form.getValues('workConditions')
      let newEnd = moment(value, HOUR_FORMAT)
      if (workConditions === '8hours5days') {
        newEnd = moment(value, HOUR_FORMAT).add(1, 'hours')
      } else {
        const dailyWorkingHours = form.getValues('dailyWorkingHours')
        const breakTime = calcualteBreakingTime(dailyWorkingHours)
        newEnd = moment(value, HOUR_FORMAT).add(breakTime, 'hours')
      }
      form.setValue('recessTimeStart', value)
      form.setValue('recessTimeEnd', newEnd.format(HOUR_FORMAT))
    }
  },
  {
    groupTitle: ' ',
    type: 'select',
    label: '종료',
    name: 'recessTimeEnd',
    column: 6,
    inputProps: {
      placeholder: '선택',
      required: true,
      readonly: true
    },
    InputProps: {
      readOnly: true
    },
    data: customHoursEvery30Minutes,
    skipInCompleted: true
  }
]

const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '고용조건',
    type: 'radio',
    label: '',
    name: EmploymentType.employmentType,
    data: [
      {
        value: EmploymentType.fulltimeEmployee,
        label: '정규직'
      },
      {
        value: EmploymentType.contractEmployee,
        label: '계약직'
      },
      {
        value: EmploymentType.parttimeJob,
        label: '아르바이트'
      }
    ],
    inputProps: {
      required: true
    }
  },
  {
    slot: 'regularEmployee',
    label: '',
    name: '',
    children: regularEmployees,
    condition: {
      key: EmploymentType.employmentType,
      value: EmploymentType.fulltimeEmployee
    }
  },
  {
    slot: 'contractEmployee',
    label: '',
    name: '',
    children: contractEmployees,
    condition: {
      key: EmploymentType.employmentType,
      value: EmploymentType.contractEmployee
    }
  },
  {
    slot: 'parttimeJob',
    label: '',
    name: '',
    children: parttimeJobs,
    condition: {
      key: EmploymentType.employmentType,
      value: EmploymentType.parttimeJob
    }
  },
  ...commonFields
]

const ContractDetailsForm2 = () => {
  const [formData, setFormData] = useRecoilState(formGroup2)
  const reset = useResetRecoilState(formGroup2)

  return (
    <FormGroupContainer
      type={EmploymentFormType.employmentType}
      title='고용형태'
      fields={fields}
      formData={formData}
      subTitle='근로자의 고용형태를 정해보세요.'
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

export default ContractDetailsForm2
