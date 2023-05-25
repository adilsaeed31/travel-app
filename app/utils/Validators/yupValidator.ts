import * as yup from 'yup'

export const GovtIdValidator = yup
  .string()
  .required('Please Enter a Value')
  .length(10, 'Please Enter 10 characters')
  .matches(/^\d{10}$/, 'Please Enter Number only')

export const MobileNumberValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/,
    'Please Enter Valid Mobile Number',
  )

export const passwordValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Invalid Format',
  )

export const UserNameValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
    'Invalid Format',
  )

export const TermsCheckvalidator = yup
  .bool()
  .required('Please check terms and consitions')
  .oneOf([true], 'Please check terms and consitions')
