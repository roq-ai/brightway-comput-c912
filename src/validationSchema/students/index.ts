import * as yup from 'yup';

export const studentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  institute_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
