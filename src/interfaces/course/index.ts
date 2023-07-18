import { CourseFeeInterface } from 'interfaces/course-fee';
import { InstituteInterface } from 'interfaces/institute';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  name: string;
  institute_id?: string;
  created_at?: any;
  updated_at?: any;
  course_fee?: CourseFeeInterface[];
  institute?: InstituteInterface;
  _count?: {
    course_fee?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  institute_id?: string;
}
