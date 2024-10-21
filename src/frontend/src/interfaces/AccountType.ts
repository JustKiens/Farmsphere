export type AccountFullName = {
  firstName: string;
  middleName: string;
  lastName: string;
  suffixName?: string;
};

export type AccountAddress = {
  street: string;
  barangay: string;
  city: string;
  province: string;
};

export type Account = {
  _id: string;
  accountAvatarFile:File | string | null;
  accountAvatar: string;
  accountClientID: string;
  accountFullName: AccountFullName;
  accountAddress: AccountAddress;
  accountGender: string;
  accountBirthDate: Date;
  accountNationality: string;
  accountCivilStatus: string;
  accountEmail: string;
  accountPhoneNumber: string;
  accountRole: string;
  accountAssignedProvince: string;
  accountStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProviderAccount = Account & {
  accountAssignedProvince: string;
};


export type ChangeEmail = {
  _id: string;
  accountEmail: string;
}

export type ChangeAssignedProvince = {
  _id: string;
  accountAssignedProvince: string;
}

export type Profile = {
  _id: string;
  accountAvatarFile:File | string | null;
  accountAvatar: string;
  accountClientID: string;
  accountFullName: AccountFullName;
  accountAddress: AccountAddress;
  accountGender: string;
  accountBirthDate: Date;
  accountNationality: string;
  accountCivilStatus: string;
  accountPhoneNumber: string;
}

export type ChangePassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export type VerifyEmail = {
  otp: string;
}