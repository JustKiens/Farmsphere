import { serverClient } from "../constants/ServerConstant"

export const uploadAvatar = async (data: FormData) => {
  try {
    const response = await serverClient.post('/file/v1/upload-avatar', data) 
    return response.data.url as string
  } catch (error) {
    throw new Error('Invalid credentials'); 
  }
}
