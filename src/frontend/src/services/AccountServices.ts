import { serverClient } from "../constants/ServerConstant"
import { ChangePassword, Profile, VerifyEmail } from "../interfaces/AccountType";

export const login = async (email: string, password: string) => {
  try {
    const response = await serverClient.post('/account/v1/login', {email, password}) 
    if (response.status !== 200) throw new Error('Invalid credentials');
    return response.data
  } catch (error) {
    throw new Error('Invalid credentials'); 
  }
}


export const logout = async () => {
  try {
    const res = await serverClient.get('/account/v1/logout')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const editProfile = async (data: Profile) => {
  try {
    const response = await serverClient.put('/account/v1/edit-profile', data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const editEmail = async (_id: string, accountEmail: string) => {
  try {
    const response = await serverClient.put('/account/v1/edit-email', {_id, accountEmail})
    return response.data
  } catch (error) {
    throw new Error('Email already exists')
  }
}
export const changePassword = async (data: ChangePassword) => {
  try {
    const response = await serverClient.put('/account/v1/change-password', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const verifyEmail = async (otp: VerifyEmail) => {
  try {
    const response = await serverClient.post('/account/v1/verify-email', otp)
    return response.data.role
  } catch (error) {
    throw error
  }
}

export const resentOtp = async () => {
  try {
    const response = await serverClient.post('/account/v1/resend-otp')
    return response.data
  } catch (error) {
    throw error
  }
}