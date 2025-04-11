import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import type { Response } from '@/types/common'
import type { LoginDTO } from '@/validators/loginSchema'
import { useMutation } from '@tanstack/vue-query'

type LoginResponse = {
  refreshToken: string
  accessToken: string
}

const login = (data: LoginDTO) => {
  return http.post<Response<LoginResponse>>('/login', {
    data,
  })
}

type UseLoginOptions = {
  config?: MutationConfig<typeof login>
}

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: login,
  })
}
