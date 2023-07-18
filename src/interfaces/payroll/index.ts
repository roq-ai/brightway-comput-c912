import { StaffInterface } from 'interfaces/staff';
import { GetQueryInterface } from 'interfaces';

export interface PayrollInterface {
  id?: string;
  salary: number;
  staff_id?: string;
  created_at?: any;
  updated_at?: any;

  staff?: StaffInterface;
  _count?: {};
}

export interface PayrollGetQueryInterface extends GetQueryInterface {
  id?: string;
  staff_id?: string;
}
