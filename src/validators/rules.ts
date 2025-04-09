import * as yup from 'yup'
import { i18n } from '@/plugins/i18n'

const t = i18n.global.t

export const required = (message = t('message.error.fieldRequired')) => yup.string().required(message)

export const email = (message = 'Invalid email') => yup.string().email(message).required('Email is required')

export const minLength = (min: number, message?: string) =>
  yup.string().min(min, message || `Must be at least ${min} characters`)

export const maxLength = (max: number, message?: string) =>
  yup.string().max(max, message || `Must be at most ${max} characters`)

export const password = (min = 6, message?: string) =>
  yup
    .string()
    .required('Password is required')
    .min(min, message || `At least ${min} characters`)

export const confirmPassword = (fieldName: string, message = 'Passwords must match') =>
  yup
    .string()
    .oneOf([yup.ref(fieldName)], message)
    .required('Confirm password is required')
