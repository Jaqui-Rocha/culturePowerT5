import * as yup from 'yup';

export const createProductValidator = yup.object({
  name: yup.string().required('Name is required'),
  value: yup.string().required('Value is required'),
  amount: yup.string().required('Amount is required'),
  description: yup.string().required('Description is required'),
  photo: yup.string().required('Photo is required') 
  
});
