// src/validators/registerSchema.ts
import * as yup from 'yup'
import { email, password, confirmPassword, requiredWithLength } from './rules'

export const createPostSchema = yup.object({
  title: requiredWithLength({ maxLength: 20 }),
  content: requiredWithLength({}),
})

export type PostDTO = yup.InferType<typeof createPostSchema>
