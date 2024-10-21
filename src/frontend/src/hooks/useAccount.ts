import { useQuery } from "@tanstack/react-query"
import { serverClient } from "../constants/ServerConstant";
import { Account } from "../interfaces/AccountType";



export const useAccount = () => {
  return useQuery({
    queryKey: ['userAccount'],
    queryFn: async () => {
      try {
        const response = await serverClient.get(`account/v1/get-account`);
        return response.data || {} as Account
      } catch (error) {
        return null
      }
    },
  })
}