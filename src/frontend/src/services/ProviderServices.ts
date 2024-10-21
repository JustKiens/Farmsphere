import { serverClient } from "../constants/ServerConstant"
import { RequestData } from "../interfaces/ProviderTypes";

export const requestData = async (data: RequestData) => {
  try {
    const response = await serverClient.post('/provider/v1/request-data', data) 
    return response.data || null
  } catch (error) {
    throw new Error('Invalid credentials'); 
  }
}

export const getStocks= async () => {
  try {
    const response = await serverClient.get('/provider/v1/stocks')
    return response.data || [] as RequestData[]
  } catch (error) {
    console.error(error)
  }
}

export const updateStocks= async (data: RequestData) => {
  try {
    const response = await serverClient.put('/provider/v1/stocks', data)
    return response.data 
  } catch (error) {
    console.error(error)
  }
}

export const deleteStocks= async (_id: string) => {
  try {
    const response = await serverClient.delete(`/provider/v1/stocks/${_id}`)
    return response.data 
  } catch (error) {
    console.error(error)
  }
}