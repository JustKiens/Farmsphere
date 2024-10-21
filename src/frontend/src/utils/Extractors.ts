import { AccountAddress, AccountFullName } from "../interfaces/AccountType";



export const extractFullName = (provider: AccountFullName) => {
  return (
    (provider?.firstName || '') + ' ' +
    (provider?.middleName.charAt(0) + '.' || '') + ' ' + 
    (provider?.lastName || '') + ' ' +
    (provider?.suffixName || '')
  ).trim(); // Trim to remove any extra spaces
};

export const extractFullAddress = (address: AccountAddress) => {
  return (address.street + " " + address.barangay + " " + address.city + " " + address.province).trim();
};