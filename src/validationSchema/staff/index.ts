import * as yup from 'yup';

export const staffValidationSchema = yup.object().shape({
  name: yup.string().required(),
  institute_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
