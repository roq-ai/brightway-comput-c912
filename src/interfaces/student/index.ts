import { AttendanceInterface } from 'interfaces/attendance';
import { InstituteInterface } from 'interfaces/institute';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StudentInterface {
  id?: string;
  name: string;
  institute_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  institute?: InstituteInterface;
  user?: UserInterface;
  _count?: {
    attendance?: number;
  };
}

export interface StudentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  institute_id?: string;
  user_id?: string;
}
