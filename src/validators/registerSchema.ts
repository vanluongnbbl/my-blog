// src/validators/registerSchema.ts
import * as yup from 'yup'
import { email, password, confirmPassword, required } from './rules'

export const registerSchema = yup.object({
  userName: required('User name is required'),
  email: email(),
  password: password(6),
  confirmPassword: confirmPassword('password'),
})

export type RegisterDTO = yup.InferType<typeof registerSchema>
