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
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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

export function strongPasswordMethod() {
  return this.test('strongPasswordTest', _, function (value: string) {
    const {path, createError} = this
    switch (Boolean(value)) {
      case !/^(?=.*[a-z])/.test(value):
        return createError({
          path,
          message: 'password must include lowercase letter',
        })
      case !/^(?=.*[A-Z])/.test(value):
        return createError({
          path,
          message: 'password must include uppercase letter',
        })
      case !/^(?=.*[0-9])/.test(value):
        return createError({path, message: 'password must include digit'})
      case !/^(?=.*[!@#\$%\^&\*])/.test(value):
        return createError({
          path,
          message: 'password must include special character',
        })
      default:
        return true
    }
  })
}
