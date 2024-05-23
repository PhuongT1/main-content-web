import { Typography } from '@/elements'
import { FormStatus } from '../../card-news/utils/common'
import RequireTag from '../_clientComponents/RequireTag'
import Form from '../_clientComponents/form'
import FormGroup from '../_clientComponents/formGroup'
import { ICardNewsInputOverride } from '../contractDetailsForm2'
import yup from '@/services/yup.service'
import { ACCOUNT_NUMBER_REGEX, EmploymentFormType, WEEKLY_WORKING_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { formGroup6 } from '@/atoms/home/employment-contract'
import FormGroupContainer from '../_clientComponents/formGroupContainer'
import { Grid } from '@mui/material'
import { formatCurrency, formatCurrencyKorean } from '@/utils/format-currency'
import { parseNumber } from '@/utils/string'
import { calculatePaymentNumber } from '../utils'

export enum EWageCalculationMethod {
  name = 'wageCalculationMethod',
  option1 = '연봉제',
  option2 = '월급제',
  option3 = '시급제'
}

export enum MonthlySalaryStructure {
  option1 = '기본금',
  option2 = '식대',
  option3 = '교통비',
  option4 = '차량유지비',
  option5 = '연구활동비',
  option6 = '상여금',
  option7 = '근속수당',
  option8 = '기타수당 1',
  option9 = '기타수당 2',
  option10 = '기타수당 3'
}

export enum Incentives {
  option1 = '업무성과급',
  option2 = '장기근속 인센티브',
  option3 = '기타 인센티브 1',
  option4 = '기타 인센티브 2'
}

export const PAYMENT_TYPE = [
  {
    label: '월간',
    value: '월간'
  },
  {
    label: '연간',
    value: '연간'
  }
]

const wageCalculationMethodOption1Fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '',
    type: 'inputNumberWithText',
    label: '지급총액',
    name: 'totalAmountPaid',
    inputProps: {
      placeholder: '37,200,000원',
      placeholderEndAdornment: '연 3,720만원'
    },
    extends: {
      type: '',
      label: '월 급여 구성을 채우면 자동으로 계산됩니다.'
    },
    validations: {
      yup: yup
        .string()
        .when(EWageCalculationMethod.name, (value: any) =>
          value && value[0] === EWageCalculationMethod.option1 ? yup.string().required() : yup.string()
        )
    },
    prefixEndAdornment: (_) => {
      return PAYMENT_TYPE[0].value
    }
  }
]
const wageCalculationMethodOption2Fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '',
    type: 'inputNumberWithText',
    label: '월 지급액',
    name: 'monthlyPaymentAmount',
    inputProps: {
      placeholder: '예시) 2,500,000 원',
      placeholderEndAdornment: '연 3,000만원'
    },
    extends: {
      type: '',
      label: '월 급여 구성을 채우면 자동으로 계산됩니다.'
    },
    validations: {
      yup: yup
        .string()
        .when(EWageCalculationMethod.name, (value: any) =>
          value && value[0] === EWageCalculationMethod.option2 ? yup.string().required() : yup.string()
        )
    },
    prefixEndAdornment: (_) => {
      return PAYMENT_TYPE[0].value
    }
  }
]
const wageCalculationMethodOption3Fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '',
    type: 'inputNumberWithText',
    label: '월 지급액',
    name: 'hourlyPaymentAmount',
    inputProps: {
      placeholder: '예시) 12,000 원',
      placeholderEndAdornment: '연 2,000만원'
    },
    extends: {
      type: '',
      label: '월 급여 구성을 채우면 자동으로 계산됩니다.'
    },
    validations: {
      yup: yup
        .string()
        .when(EWageCalculationMethod.name, (value: any) =>
          value && value[0] === EWageCalculationMethod.option3 ? yup.string().required() : yup.string()
        )
    },
    prefixEndAdornment: (_) => {
      return PAYMENT_TYPE[0].value
    }
  }
]

const fields: ICardNewsInputOverride[] = [
  {
    groupTitle: '임금 산정방식',
    type: 'radio',
    label: '',
    name: EWageCalculationMethod.name,
    data: [
      {
        label: EWageCalculationMethod.option1,
        value: EWageCalculationMethod.option1
      },
      {
        label: EWageCalculationMethod.option2,
        value: EWageCalculationMethod.option2
      },
      {
        label: EWageCalculationMethod.option3,
        value: EWageCalculationMethod.option3
      }
    ],
    validations: {
      yup: yup.string().required()
    }
  },
  {
    slot: 'wageCalculationMethodOption1',
    label: '',
    name: '',
    children: wageCalculationMethodOption1Fields,
    condition: {
      key: EWageCalculationMethod.name,
      value: EWageCalculationMethod.option1
    }
  },
  {
    slot: 'wageCalculationMethodOption2',
    label: '',
    name: '',
    children: wageCalculationMethodOption2Fields,
    condition: {
      key: EWageCalculationMethod.name,
      value: EWageCalculationMethod.option2
    }
  },
  {
    slot: 'wageCalculationMethodOption3',
    label: '',
    name: '',
    children: wageCalculationMethodOption3Fields,
    condition: {
      key: EWageCalculationMethod.name,
      value: EWageCalculationMethod.option3
    }
  },
  {
    groupTitle: '월 급여 구성',
    type: 'checkbox',
    label: (
      <>
        {MonthlySalaryStructure.option1}{' '}
        <Typography component={'span'} color='home.mint500'>
          (월)
        </Typography>
      </>
    ),
    name: 'monthlySalaryStructureOption1',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption1Slot',
    label: '',
    name: '',
    condition: {
      key: 'monthlySalaryStructureOption1',
      value: true
    },
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption1_basicSalary',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        render: ({ monthlySalaryStructureOption1, monthlySalaryStructureOption1_basicSalary }) =>
          monthlySalaryStructureOption1 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option1}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption1_basicSalary)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(monthlySalaryStructureOption1_basicSalary, PAYMENT_TYPE[0].value)
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption1', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ]
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: (
      <>
        {MonthlySalaryStructure.option2}{' '}
        <Typography component={'span'} color='home.mint500'>
          (월 20만원까지 비과세)
        </Typography>
      </>
    ),
    name: 'monthlySalaryStructureOption2',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption2Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption2_mealAllowance',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption2', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({ monthlySalaryStructureOption2, monthlySalaryStructureOption2_mealAllowance }) =>
          monthlySalaryStructureOption2 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option2}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption2_mealAllowance)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(monthlySalaryStructureOption2_mealAllowance, PAYMENT_TYPE[0].value)
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption2',
      value: true
    }
  },

  {
    groupTitle: '',
    type: 'checkbox',
    label: (
      <>
        {MonthlySalaryStructure.option3}{' '}
        <Typography component={'span'} color='home.mint500'>
          (월)
        </Typography>
      </>
    ),
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption3',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption3Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption3_transportFee',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption3', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({ monthlySalaryStructureOption3, monthlySalaryStructureOption3_transportFee }) =>
          monthlySalaryStructureOption3 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option3}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption3_transportFee)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(monthlySalaryStructureOption3_transportFee, PAYMENT_TYPE[0].value)
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption3',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: (
      <>
        {MonthlySalaryStructure.option4}{' '}
        <Typography component={'span'} color='home.mint500'>
          (월 20만원까지 비과세, 차량 소지자)
        </Typography>
      </>
    ),
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption4',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption4Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption4_vehicleMaintenanceCost',
        inputProps: {
          placeholder: '예시) 200,000 원',
          placeholderEndAdornment: '연 240만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption4', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({ monthlySalaryStructureOption4, monthlySalaryStructureOption4_vehicleMaintenanceCost }) =>
          monthlySalaryStructureOption4 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option4}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption4_vehicleMaintenanceCost)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(
                        monthlySalaryStructureOption4_vehicleMaintenanceCost,
                        PAYMENT_TYPE[0].value
                      )
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption4',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: (
      <>
        {MonthlySalaryStructure.option5}{' '}
        <Typography component={'span'} color='home.mint500'>
          (월 20만원까지 비과세, 연구원만 가능)
        </Typography>
      </>
    ),
    name: 'monthlySalaryStructureOption5',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption5Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption5_researchActivityCost',
        inputProps: {
          placeholder: '예시) 200,000 원',
          placeholderEndAdornment: '연 240만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption5', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({ monthlySalaryStructureOption5, monthlySalaryStructureOption5_researchActivityCost }) =>
          monthlySalaryStructureOption5 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option5}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption5_researchActivityCost)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    {formatCurrencyKorean(
                      calculatePaymentNumber(monthlySalaryStructureOption5_researchActivityCost, PAYMENT_TYPE[0].value)
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption5',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: MonthlySalaryStructure.option6,
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption6',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption6Slot',
    label: '',
    name: '',
    children: [
      {
        column: 6,
        type: 'select',
        label: '',
        name: 'monthlySalaryStructureOption6_monthly',
        inputProps: {
          placeholder: '월간'
        },
        data: PAYMENT_TYPE,
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption6', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption6_annual',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption6', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({
          monthlySalaryStructureOption6,
          monthlySalaryStructureOption6_annual,
          monthlySalaryStructureOption6_monthly
        }) =>
          monthlySalaryStructureOption6 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option6}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption6_annual)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(
                        monthlySalaryStructureOption6_annual,
                        monthlySalaryStructureOption6_monthly
                      )
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (form) => {
          const type = form.watch('monthlySalaryStructureOption6_monthly')
          return type
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption6',
      value: true
    }
  },

  {
    groupTitle: '',
    type: 'checkbox',
    label: MonthlySalaryStructure.option7,
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption7',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption7Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption7_longevityPay',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption7', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        render: ({ monthlySalaryStructureOption7, monthlySalaryStructureOption7_longevityPay }) =>
          monthlySalaryStructureOption7 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option7}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption7_longevityPay)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(monthlySalaryStructureOption7_longevityPay, PAYMENT_TYPE[0].value)
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (_) => {
          return PAYMENT_TYPE[0].value
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption7',
      value: true
    }
  },

  {
    groupTitle: '',
    type: 'checkbox',
    label: MonthlySalaryStructure.option8,
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption8',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption8Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'input',
        label: '수당명',
        name: 'monthlySalaryStructureOption8_name',
        inputProps: {
          placeholder: '예시) 자기계발수당'
        }
      },
      {
        column: 6,
        type: 'select',
        label: '지급금액',
        name: 'monthlySalaryStructureOption8_monthly',
        inputProps: {
          placeholder: '월간'
        },
        data: PAYMENT_TYPE,
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption8', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption8_annual',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption8', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        customSx: {
          marginTop: '-12px'
        },
        render: ({
          monthlySalaryStructureOption8,
          monthlySalaryStructureOption8_annual,
          monthlySalaryStructureOption8_monthly
        }) =>
          monthlySalaryStructureOption8 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option8}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption8_annual)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(
                        monthlySalaryStructureOption8_annual,
                        monthlySalaryStructureOption8_monthly
                      )
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (form) => {
          const type = form.watch('monthlySalaryStructureOption8_monthly')
          return type
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption8',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: MonthlySalaryStructure.option9,
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption9',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption9Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'input',
        label: '수당명',
        name: 'monthlySalaryStructureOption9_name',
        inputProps: {
          placeholder: '예시) 자기계발수당'
        }
      },
      {
        column: 6,
        type: 'select',
        label: '지급금액',
        name: 'monthlySalaryStructureOption9_monthly',
        inputProps: {
          placeholder: '월간'
        },
        data: PAYMENT_TYPE,
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption9', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption9_allowance',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption9', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        customSx: {
          marginTop: '-12px'
        },
        render: ({
          monthlySalaryStructureOption9,
          monthlySalaryStructureOption9_allowance,
          monthlySalaryStructureOption9_monthly
        }) =>
          monthlySalaryStructureOption9 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option9}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption9_allowance)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(
                        monthlySalaryStructureOption9_allowance,
                        monthlySalaryStructureOption9_monthly
                      )
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (form) => {
          const type = form.watch('monthlySalaryStructureOption9_monthly')
          return type
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption9',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: MonthlySalaryStructure.option10,
    extendLabel: '(월)',
    name: 'monthlySalaryStructureOption10',
    skipInCompleted: true
  },
  {
    slot: 'monthlySalaryStructureOption10Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'input',
        label: '수당명',
        name: 'monthlySalaryStructureOption10_name',
        inputProps: {
          placeholder: '예시) 자기계발수당'
        }
      },
      {
        column: 6,
        type: 'select',
        label: '지급금액',
        name: 'monthlySalaryStructureOption10_monthly',
        inputProps: {
          placeholder: '월간'
        },
        data: PAYMENT_TYPE,
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption10', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'inputNumberWithText',
        label: '',
        name: 'monthlySalaryStructureOption10_allowance',
        inputProps: {
          placeholder: '예시) 2,500,000 원',
          placeholderEndAdornment: '연 3,000만원'
        },
        validations: {
          yup: yup
            .string()
            .when('monthlySalaryStructureOption10', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        },
        customSx: {
          marginTop: '-12px'
        },
        render: ({
          monthlySalaryStructureOption10,
          monthlySalaryStructureOption10_allowance,
          monthlySalaryStructureOption10_monthly
        }) =>
          monthlySalaryStructureOption10 ? (
            <>
              <Typography
                cate='sub_title_30'
                component={'div'}
                color='white'
                sx={{ marginBottom: '8px', marginLeft: '-14px;' }}
              >
                {MonthlySalaryStructure.option10}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <span>{formatCurrencyKorean(monthlySalaryStructureOption10_allowance)}</span>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    연{' '}
                    {formatCurrencyKorean(
                      calculatePaymentNumber(
                        monthlySalaryStructureOption10_allowance,
                        monthlySalaryStructureOption10_monthly
                      )
                    )}
                  </span>
                </Grid>
              </Grid>
            </>
          ) : null,
        prefixEndAdornment: (form) => {
          const type = form.watch('monthlySalaryStructureOption10_monthly')
          return type
        }
      }
    ],
    condition: {
      key: 'monthlySalaryStructureOption10',
      value: true
    }
  },
  {
    groupTitle: '인센티브(연봉 불포함)',
    type: 'checkbox',
    label: Incentives.option1,
    name: 'incentiveOption1',
    skipInCompleted: true
  },
  {
    slot: 'incentiveOption1Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'textarea',
        label: '',
        name: 'incentiveOption1_input',
        inputProps: {
          placeholder: '예시) 매출 20% 상승 시 연봉의 10% 지급당',
          multiline: true,
          minRows: 2
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption1', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      }
    ],
    condition: {
      key: 'incentiveOption1',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: Incentives.option2,
    name: 'incentiveOption2',
    skipInCompleted: true
  },
  {
    slot: 'incentiveOption2Slot',
    label: '',
    name: '',
    children: [
      {
        type: 'textarea',
        label: '',
        name: 'incentiveOption2_input',
        inputProps: {
          placeholder: '예시) 2년 근속 시 100만원 지급',
          multiline: true,
          minRows: 2
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption2', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      }
    ],
    condition: {
      key: 'incentiveOption2',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: Incentives.option3,
    name: 'incentiveOption3',
    skipInCompleted: true
  },
  {
    slot: 'incentiveOption3Slot',
    label: '',
    name: '',
    children: [
      {
        groupTitle: '',
        type: 'input',
        label: '인센티브명',
        name: 'incentiveOption3_name',
        inputProps: {
          placeholder: '예시) 친구추천'
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption3', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'textarea',
        label: '내용',
        name: 'incentiveOption3_input',
        inputProps: {
          placeholder: '예시) 친구를 직원으로 초대하면 1명 당 200만원 지급',
          multiline: true,
          minRows: 2
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption3', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      }
    ],
    condition: {
      key: 'incentiveOption3',
      value: true
    }
  },
  {
    groupTitle: '',
    type: 'checkbox',
    label: Incentives.option4,
    name: 'incentiveOption4',
    skipInCompleted: true
  },
  {
    slot: 'incentiveOption4Slot',
    label: '',
    name: '',
    children: [
      {
        groupTitle: '',
        type: 'input',
        label: '인센티브명',
        name: 'incentiveOption4_name',
        inputProps: {
          placeholder: '예시) 친구추천'
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption4', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      },
      {
        type: 'textarea',
        label: '내용',
        name: 'incentiveOption4_input',
        inputProps: {
          placeholder: '예시) 친구를 직원으로 초대하면 1명 당 200만원 지급',
          multiline: true,
          minRows: 2
        },
        validations: {
          yup: yup
            .string()
            .when('incentiveOption4', (value: any) =>
              value && value[0] === true ? yup.string().required() : yup.string()
            )
        }
      }
    ],
    condition: {
      key: 'incentiveOption4',
      value: true
    }
  },
  {
    groupTitle: '지급시기 및 방법',
    type: 'input',
    label: '매월',
    name: 'monthly',
    inputProps: {
      placeholder: '예시) 5일',
      required: true,
      regex: /^[0-9]{1,2}$/
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    type: 'input',
    label: '은행명',
    name: 'bankName',
    inputProps: {
      placeholder: '예시) 카카오뱅크',
      required: true,
      maxLength: 30
    },
    validations: {
      yup: yup.string().required()
    }
  },
  {
    type: 'input',
    label: '계좌번호',
    name: 'accountNumber',
    inputProps: {
      placeholder: '예시) 3333-07-555995',
      required: true,
      regex: ACCOUNT_NUMBER_REGEX
    },
    validations: {
      yup: yup.string().required()
    }
  }
]

const ContractDetailsForm6 = () => {
  const [formData, setFormData] = useRecoilState(formGroup6)
  const reset = useResetRecoilState(formGroup6)

  return (
    <>
      <FormGroupContainer
        type={EmploymentFormType.wage}
        fields={fields}
        title={'임금'}
        subTitle='최저임금법을 고려해서 임금을 정해보세요.'
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

export default ContractDetailsForm6
