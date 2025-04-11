import { keepPreviousData, useQuery } from '@tanstack/vue-query'

import { http } from '@/libs/http'
import type { ExtractFnReturnType, QueryConfig } from '@/libs/vue-query'
export const getHealth = (): Promise<Response> => {
  return http.get<Response>('/health')
}

type QueryFnType = typeof getHealth

type UseCustomerOptions = {
  config?: QueryConfig<QueryFnType>
}

export const GET_HEALTH = 'GET_HEALTH'

export const useGetHealth = ({ config = {} }: UseCustomerOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [GET_HEALTH],
    queryFn: () => getHealth(),
    placeholderData: keepPreviousData,
    ...config,
  })
}
