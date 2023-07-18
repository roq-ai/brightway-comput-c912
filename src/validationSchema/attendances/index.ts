import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  date: yup.date().required(),
  student_id: yup.string().nullable(),
  staff_id: yup.string().nullable(),
});
