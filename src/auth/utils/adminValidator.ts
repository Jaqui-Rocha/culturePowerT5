import * as yup from 'yup';


export const adminValidator  = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    
  })