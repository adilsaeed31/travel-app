import * as yup from 'yup'

export const GovtIdValidator = yup
  .string()
  .required('Please enter a value')
  .matches(/^[12]\d*$/, 'National id or Iqama Number Should Start with 1 or 2 ')
  .length(10, 'Please Enter 10 characters')
  .matches(/^\d{10}$/, 'Please Enter Number only')

export const MobileNumberValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(/^[5]\d*$/, 'Mobile number should start with 5')
  .length(9, 'Please Enter 9 characters')
  .matches(/^\d{9}$/, 'Please Enter Number only')

export const passwordValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Invalid Format',
  )

export const UserNameValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(8, 'Please enter minimum 8 character')
  .max(10, 'Please enter maximum 10 character')
  .matches(
    /^(?!.*?(.)\1{2})/,
    'Please dont enter three or more consecutive and identical characters',
  )
  .matches(
    /^(?=[a-zA-Z0-9._]{8,11}$)(?!.*[_.]{8})[^_.].*[^_.]$/,
    'Invalid Format',
  )

export const TermsCheckvalidator = yup
  .bool()
  .required('Please check terms and consitions')
  .oneOf([true], 'Please check terms and consitions')
