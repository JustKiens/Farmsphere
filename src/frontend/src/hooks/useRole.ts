import { useQuery } from "@tanstack/react-query"
import { serverClient } from "../constants/ServerConstant";


export const useRole = () => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      try {
        const response = await serverClient.get(`account/v1/verify-role`);
        return response.data.accountRole as string
      } catch (error) {
        return null
      }
    },
  })
}