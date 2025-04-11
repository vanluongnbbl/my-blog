import * as yup from 'yup'
import { email, password } from './rules'

export const loginSchema = yup.object({
  email: email(),
  password: password(),
})

export type LoginDTO = yup.InferType<typeof loginSchema>
