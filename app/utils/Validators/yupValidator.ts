import * as yup from 'yup'

export const GovtIdValidator = yup
  .string()
  .required('Please Enter a Value')
  .length(10, 'Please Enter 10 characters')
  .matches(/^\d{10}$/, 'Please Enter Number only')
  .matches(/^[12]\d*$/, 'National id or Iqama Number Should Start with 1 or 2 ')

export const MobileNumberValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(/^(5)\d{8}$/, 'Please Enter Valid Mobile Number that starts with 5')

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
  .matches(
    /^(?=[a-zA-Z0-9._]{8,11}$)(?!.*[_.]{8})[^_.].*[^_.]$/,
    'Invalid Format',
  )

export const TermsCheckvalidator = yup
  .bool()
  .required('Please check terms and consitions')
  .oneOf([true], 'Please check terms and consitions')
