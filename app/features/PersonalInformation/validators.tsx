import * as yup from 'yup'
export const MobileNumberValidator = yup
  .string()
  .required('Please Enter a Value')
  .matches(
    /^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/,
    'Please Enter Valid Mobile Number',
  )
export const BuildingNumberValidator = yup
  .string()
  .required('Please Enter a Value')
export const StreetNameValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(3, 'min char')
export const districtValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(3, 'min char')
export const PostalCodeValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')
export const CityValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')

export const ContactName = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')

export const relationValidaor = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')
