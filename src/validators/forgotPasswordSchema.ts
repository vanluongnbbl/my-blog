import * as yup from 'yup'
import { email } from './rules'

export const forgotPasswordSchema = yup.object({
  email: email(),
})

export type ForgotPasswordDTO = yup.InferType<typeof forgotPasswordSchema>
