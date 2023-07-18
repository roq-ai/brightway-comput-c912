const mapping: Record<string, string> = {
  attendances: 'attendance',
  courses: 'course',
  'course-fees': 'course_fee',
  institutes: 'institute',
  payrolls: 'payroll',
  staff: 'staff',
  students: 'student',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
