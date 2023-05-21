import * as yup from 'yup'

export const GovtIdValidator = yup
  .string()
  .required('Please Enter a Value')
  .length(10, 'Please Enter 10 characters')

export const MobileNumberValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/,
    'Please Enter Valid Mobile Number',
  )

export const passwordValidator = yup
  .string()
  .min(8, 'Please Enter minimum 3 character')
  .min(32, 'Please Enter minimum 32 character')
