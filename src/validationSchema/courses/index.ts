import * as yup from 'yup';

export const courseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  institute_id: yup.string().nullable(),
});
