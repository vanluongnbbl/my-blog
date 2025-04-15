import * as yup from 'yup'
import { password, confirmPassword } from './rules'

export const changePasswordSchema = yup.object({
  password: password(6),
  confirmPassword: confirmPassword('password'),
})

export type ChangePasswordDTO = yup.InferType<typeof changePasswordSchema>
