import { useQuery } from '@tanstack/vue-query'
import { http } from '@/libs/http'
import type { AxiosResponse } from 'axios'
import type { ExtractFnReturnType, QueryConfig } from '@/libs/vue-query'

type UserProfile = {
  id: number
  email: string
  username: string
}
export const getUserProfile = (): Promise<AxiosResponse<UserProfile>> => {
  return http.get<AxiosResponse<UserProfile>>('/profile')
}

type QueryFnType = typeof getUserProfile

type UseCustomerOptions = {
  config?: QueryConfig<QueryFnType>
}

export const USER_PROFILE_KEY = 'USER_PROFILE_KEY'

export const useUserProfile = ({ config }: UseCustomerOptions = {}) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [USER_PROFILE_KEY],
    queryFn: () => getUserProfile(),
    ...config,
  })
