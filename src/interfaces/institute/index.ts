import { CourseInterface } from 'interfaces/course';
import { StaffInterface } from 'interfaces/staff';
import { StudentInterface } from 'interfaces/student';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InstituteInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  course?: CourseInterface[];
  staff?: StaffInterface[];
  student?: StudentInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    staff?: number;
    student?: number;
  };
}

export interface InstituteGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
