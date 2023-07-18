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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPayroll } from 'apiSdk/payrolls';
import { Error } from 'components/error';
import { payrollValidationSchema } from 'validationSchema/payrolls';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { StaffInterface } from 'interfaces/staff';
import { getStaff } from 'apiSdk/staff';
import { PayrollInterface } from 'interfaces/payroll';

function PayrollCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PayrollInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPayroll(values);
      resetForm();
      router.push('/payrolls');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PayrollInterface>({
    initialValues: {
      salary: 0,
      staff_id: (router.query.staff_id as string) ?? null,
    },
    validationSchema: payrollValidationSchema,
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
            Create Payroll
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="salary" mb="4" isInvalid={!!formik.errors?.salary}>
            <FormLabel>Salary</FormLabel>
            <NumberInput
              name="salary"
              value={formik.values?.salary}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('salary', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.salary && <FormErrorMessage>{formik.errors?.salary}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<StaffInterface>
            formik={formik}
            name={'staff_id'}
            label={'Select Staff'}
            placeholder={'Select Staff'}
            fetcher={getStaff}
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
    entity: 'payroll',
    operation: AccessOperationEnum.CREATE,
  }),
)(PayrollCreatePage);
