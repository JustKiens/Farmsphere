import { z } from 'zod';

export const AccountSchema = z.object({
  accountAvatarFile: z.instanceof(File).optional(),
  accountAvatar: z.string().optional(),
  accountFullName: z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    suffixName: z.string().transform((val) => val === "N/A" ? null : val).optional(),
  }),
  accountGender: z.string().min(1, { message: "Gender is required." }),
  accountBirthDate: z.date({ message: "Please enter a valid birth date." }),
  accountCivilStatus: z.string().min(1, { message: "Civil status is required." }),
  accountNationality: z.string().min(1, { message: "Nationality is required." }),
  accountAddress: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    barangay: z.string().min(1, { message: "Barangay is required." }),
    city: z.string().min(1, { message: "City is required." }),
    province: z.string().min(1, { message: "Province is required." }),
  }),
  accountEmail: z.string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required." }),
  accountPhoneNumber: z.string().min(1, { message: "Phone number is required." }),
  accountAssignedProvince: z.string().min(1, { message: "Assigned province is required." }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const ChangeAssignedProvinceSchema = z.object({
  _id: z.string(),
  accountAssignedProvince: z.string().min(1, { message: "Assigned province is required." }),
})


export const ProfileSchema = z.object({
  accountAvatarFile: z.any(),
  accountAvatar: z.string().optional(),
  accountFullName: z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    suffixName: z.string().transform((val) => val === "N/A" ? null : val).optional(),
  }),
  accountGender: z.string().min(1, { message: "Gender is required." }),
  accountBirthDate: z.date({ message: "Please enter a valid birth date." }),
  accountCivilStatus: z.string().min(1, { message: "Civil status is required." }),
  accountNationality: z.string().min(1, { message: "Nationality is required." }),
  accountAddress: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    barangay: z.string().min(1, { message: "Barangay is required." }),
    city: z.string().min(1, { message: "City is required." }),
    province: z.string().min(1, { message: "Province is required." }),
  }),
  accountPhoneNumber: z.string().min(1, { message: "Phone number is required." }),
});
