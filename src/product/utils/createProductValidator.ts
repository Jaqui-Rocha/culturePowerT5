import * as yup from 'yup';

export const createProductValidator = yup.object({
  prodId: yup.string(),
  name: yup.string().required('Name is required'),
  value: yup.string().required('Value is required'),
  jewelsAmount: yup.number().required('jewelsAmount is required'),
  description: yup.string().required('Description is required'),
  photo: yup.string()
  
});
