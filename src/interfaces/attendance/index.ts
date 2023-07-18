import { StudentInterface } from 'interfaces/student';
import { StaffInterface } from 'interfaces/staff';
import { GetQueryInterface } from 'interfaces';

export interface AttendanceInterface {
  id?: string;
  date: any;
  student_id?: string;
  staff_id?: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  staff?: StaffInterface;
  _count?: {};
}

export interface AttendanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
  staff_id?: string;
}
