import * as yup from 'yup'

export const GovtIdValidator = yup
  .string()
  .required('common:emptyValue')
  .matches(/^[12]\d*$/, 'onboarding:iqamaInvalid')
  .length(10, 'onboarding:iqamaIncomplete')
  .matches(/^\d{10}$/, 'onboarding:numbersOnly')

export const MobileNumberValidator = yup
  .string()
  .required('common:emptyValue')
  .matches(/^[5]\d*$/, 'onboarding:mobileInvalid')
  .length(9, 'onboarding:incompleteNumber')
  .matches(/^\d{9}$/, 'onboarding:numbersOnly')

export const passwordValidator = yup
  .string()
  .required('common:emptyValue')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'common:invalidFormat',
  )

export const UserNameValidator = yup
  .string()
  .required('common:emptyValue')
  .min(8, 'onboarding:min8')
  .max(10, 'onboarding:max10')
  .matches(/^(?!.*?(.)\1{2})/, 'onboarding:consecutyiveNumbers')
  .matches(
    /^(?=[a-zA-Z0-9._]{8,11}$)(?!.*[_.]{8})[^_.].*[^_.]$/,
    'common:invalidFormat',
  )

export const TermsCheckvalidator = yup
  .bool()
  .required('onboarding:iqamaInvalid')
  .oneOf([true], 'onboarding:iqamaInvalid')
