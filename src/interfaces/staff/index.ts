import { AttendanceInterface } from 'interfaces/attendance';
import { PayrollInterface } from 'interfaces/payroll';
import { InstituteInterface } from 'interfaces/institute';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StaffInterface {
  id?: string;
  name: string;
  institute_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  payroll?: PayrollInterface[];
  institute?: InstituteInterface;
  user?: UserInterface;
  _count?: {
    attendance?: number;
    payroll?: number;
  };
}

export interface StaffGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  institute_id?: string;
  user_id?: string;
}
