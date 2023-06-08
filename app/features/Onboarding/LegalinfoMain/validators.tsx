import * as yup from 'yup'

export const disability = yup.string().required('Please Enter a Value')
export const postalCodeValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')
export const cityValidator = yup
  .string()
  .required('Please Enter a Value')
  .min(2, 'min char')
