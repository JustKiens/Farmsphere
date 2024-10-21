import { z } from "zod";

export const ChangePasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 12 characters." }),
  newPassword: z.string().min(12, { message: "New Password must be at least 12 characters." }),
  confirmPassword: z.string().min(12, { message: "Confirm Password must be at least 12 characters." }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Specify the field for the error message
}).refine(data => data.password !== data.newPassword, {
  message: "New Password must be different from the current password.",
  path: ["newPassword"], // Specify the field for the error message
});

export const VerifyEmailSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters long." }),
})