// src/validators/registerSchema.ts
import * as yup from 'yup'
import { email, password, confirmPassword, required } from './rules'

export const registerSchema = yup.object({
  name: required('Name is required'),
  email: email(),
  password: password(8), // custom min length
  confirmPassword: confirmPassword('password'),
})
