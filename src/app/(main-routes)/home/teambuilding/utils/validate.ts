import * as yup from 'yup'

const REGEX_DOMAIN_EMAIL = /[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/g

export const MESSAGE_REQUIRED = '필수정보 입력이 누락되었습니다'

export const MAXLENGTH_VALIDATE = {
  NAME: 15,
  ROLE: 12,
  CONTENT: 50,
  MANUALDOMAIN: 30,
  EMAIL: 30,
  DOMAIN: 30,
  DESCRIPTION: 50,
  INTRO_GROUP: 50
}

const ValidateSchemaTBuilding = {
  step01: yup.object().shape({
    // assert your field is an array of object with the shape you want
    data: yup
      .array()
      .of(
        yup.object({
          isEmailRequired: yup.boolean().required(),
          isManualDomain: yup.boolean().required(),
          path: yup.string().required(MESSAGE_REQUIRED),
          name: yup.string().max(MAXLENGTH_VALIDATE.NAME, 'Max').required(MESSAGE_REQUIRED),
          age: yup.number().typeError(MESSAGE_REQUIRED).required('required').min(1, MESSAGE_REQUIRED),
          role: yup.string().max(MAXLENGTH_VALIDATE.ROLE, 'max').required(MESSAGE_REQUIRED),
          content: yup.string().default(''),
          email: yup.string().when(['isEmailRequired'], {
            is: true,
            then: (schema) => schema.required('')
          }),
          manualDomain: yup
            .string()
            .when(['isManualDomain', 'email'], ([isManualDomain, email], schema: yup.Schema) => {
              if (isManualDomain && email) {
                return schema
                  .required(MESSAGE_REQUIRED)
                  .matches(REGEX_DOMAIN_EMAIL, { message: '이메일 형식이 올바르지 않습니다' })
                  .max(MAXLENGTH_VALIDATE.MANUALDOMAIN, 'max')
              }
            })
            .default(''),
          domain: yup
            .string()
            .when(['isManualDomain', 'email'], ([isManualDomain, email], schema: yup.Schema) => {
              if (!isManualDomain && email) {
                return schema
                  .required(MESSAGE_REQUIRED)
                  .matches(REGEX_DOMAIN_EMAIL, { message: '이메일 형식이 올바르지 않습니다' })
                  .max(MAXLENGTH_VALIDATE.DOMAIN, 'max')
              }
            })
            .default(''),
          description: yup.string().required(MESSAGE_REQUIRED),
          eduandexp: yup.mixed()
        })
      )
      .required('')
  }),
  step03: yup.object().shape({
    path: yup.mixed().required(MESSAGE_REQUIRED),
    name: yup.string().max(MAXLENGTH_VALIDATE.NAME, 'Max').required(MESSAGE_REQUIRED),
    date: yup.date().required(MESSAGE_REQUIRED),
    contents: yup.string(),
    content: yup.string().required(MESSAGE_REQUIRED),
    organization: yup.array().of(yup.object()).required(MESSAGE_REQUIRED),
    workingEnv: yup.array().of(yup.object()).required(MESSAGE_REQUIRED),
    welBenefits: yup.array().of(yup.object()).required(MESSAGE_REQUIRED)
  })
}
export default ValidateSchemaTBuilding
