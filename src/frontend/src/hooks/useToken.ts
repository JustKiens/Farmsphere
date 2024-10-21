import { useQuery } from "@tanstack/react-query"
import { serverClient } from "../constants/ServerConstant";


export const useToken = () => {
  return useQuery({
    queryKey: ['userToken'],
    queryFn: async () => {
      try {
        const response = await serverClient.get(`account/v1/verify-token`);
        return response.data.email as string
      } catch (error) {
        return null
      }
    },
  })
}