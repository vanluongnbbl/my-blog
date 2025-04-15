import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import type { RegisterDTO } from '@/validators/registerSchema'
import { useMutation } from '@tanstack/vue-query'

const createPost = (data: { username: string; email: string; password: string }) => {
  return http.post('/posts', {
    data,
  })
}

type UseCreatePostOptions = {
  config?: MutationConfig<typeof createPost>
}

export const useCreatePost = ({ config }: UseCreatePostOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: createPost,
  })
}
