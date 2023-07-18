interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Super Admin'],
  customerRoles: ['Student'],
  tenantRoles: ['Super Admin', 'Admin', 'Staff Member'],
  tenantName: 'Institute',
  applicationName: 'Brightway Computers ERP',
  addOns: ['notifications', 'file'],
};
