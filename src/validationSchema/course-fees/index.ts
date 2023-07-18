import * as yup from 'yup';

export const courseFeeValidationSchema = yup.object().shape({
  fee: yup.number().integer().required(),
  course_id: yup.string().nullable(),
});
