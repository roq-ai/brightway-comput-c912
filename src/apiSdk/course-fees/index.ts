import axios from 'axios';
import queryString from 'query-string';
import { CourseFeeInterface, CourseFeeGetQueryInterface } from 'interfaces/course-fee';
import { GetQueryInterface } from '../../interfaces';

export const getCourseFees = async (query?: CourseFeeGetQueryInterface) => {
  const response = await axios.get(`/api/course-fees${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCourseFee = async (courseFee: CourseFeeInterface) => {
  const response = await axios.post('/api/course-fees', courseFee);
  return response.data;
};

export const updateCourseFeeById = async (id: string, courseFee: CourseFeeInterface) => {
  const response = await axios.put(`/api/course-fees/${id}`, courseFee);
  return response.data;
};

export const getCourseFeeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/course-fees/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCourseFeeById = async (id: string) => {
  const response = await axios.delete(`/api/course-fees/${id}`);
  return response.data;
};
