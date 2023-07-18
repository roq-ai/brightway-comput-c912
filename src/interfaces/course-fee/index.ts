import { CourseInterface } from 'interfaces/course';
import { GetQueryInterface } from 'interfaces';

export interface CourseFeeInterface {
  id?: string;
  fee: number;
  course_id?: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  _count?: {};
}

export interface CourseFeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  course_id?: string;
}
