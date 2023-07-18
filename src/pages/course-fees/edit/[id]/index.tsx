import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCourseFeeById, updateCourseFeeById } from 'apiSdk/course-fees';
import { Error } from 'components/error';
import { courseFeeValidationSchema } from 'validationSchema/course-fees';
import { CourseFeeInterface } from 'interfaces/course-fee';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CourseInterface } from 'interfaces/course';
import { getCourses } from 'apiSdk/courses';

function CourseFeeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CourseFeeInterface>(
    () => (id ? `/course-fees/${id}` : null),
    () => getCourseFeeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CourseFeeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCourseFeeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/course-fees');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CourseFeeInterface>({
    initialValues: data,
    validationSchema: courseFeeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Course Fee
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="fee" mb="4" isInvalid={!!formik.errors?.fee}>
              <FormLabel>Fee</FormLabel>
              <NumberInput
                name="fee"
                value={formik.values?.fee}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('fee', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.fee && <FormErrorMessage>{formik.errors?.fee}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<CourseInterface>
              formik={formik}
              name={'course_id'}
              label={'Select Course'}
              placeholder={'Select Course'}
              fetcher={getCourses}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'course_fee',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CourseFeeEditPage);
