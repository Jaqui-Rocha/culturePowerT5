import * as yup from 'yup'

export const authBodyValidator = yup.object({
  email: yup.string().required('Email is required.').email('Invalid email format.'),
  password: yup.string().required('Password is required.')
})