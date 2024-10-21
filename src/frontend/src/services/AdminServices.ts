import { serverClient } from "../constants/ServerConstant";
import { ChangeAssignedProvince, ChangeEmail, ProviderAccount } from "../interfaces/AccountType";
import { RequestData } from "../interfaces/ProviderTypes";


export const createProvider = async (data: ProviderAccount) => {
  try {
    const response = await serverClient.post('/admin/v1/create-provider', data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getProviders = async () => {
  try {
    const response = await serverClient.get('/admin/v1/providers')
    return response.data || [] as ProviderAccount[]
  } catch (error) {
    console.error(error)
  }
}

export const getDisabledProviders = async () => {
  try {
    const response = await serverClient.get('/admin/v1/disabled-providers')
    return response.data || [] as ProviderAccount[]
  } catch (error) {
    console.error(error)
  }
}

export const getRequests = async () => {
  try {
    const response = await serverClient.get('/admin/v1/requests')
    return response.data || [] as RequestData[]
  } catch (error) {
    console.error(error)
  }
}

export const deleteProvider = async (id: string) => {
  try {
    const response = await serverClient.put(`/admin/v1/delete-provider/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const disableProvider = async (id: string) => {
  try {
    const response = await serverClient.put(`/admin/v1/disable-provider/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const activateProvider = async (id: string) => {
  try {
    const response = await serverClient.put(`/admin/v1/activate-provider/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const declineRequest = async (id: string) => {
  try {
    const response = await serverClient.put(`/admin/v1/decline-request/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const approveRequest = async (id: string) => {
  try {
    const response = await serverClient.put(`/admin/v1/approve-request/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const changeEmail = async (data: ChangeEmail) => {
  try {
    const response = await serverClient.put('/admin/v1/change-email', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const changeAssignedProvince = async (data: ChangeAssignedProvince) => {
  try {
    const response = await serverClient.put('/admin/v1/change-assigned-province', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (id: string) => {
  try {
    const response = await serverClient.put("/admin/v1/reset-password",  {_id: id})
    return response.data
  } catch (error) {
    console.error(error)
  }
}