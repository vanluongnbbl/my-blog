import * as yup from 'yup'
import { i18n } from '@/plugins/i18n'

const t = i18n.global.t

export const requiredWithLength = ({ message = t('message.error.fieldRequired'), minLength = 1, maxLength = 10 }) =>
  yup.string().trim().min(minLength, message).max(maxLength, `Max length is ${maxLength} character.`).required(message)
export const email = (message = 'Invalid email') => yup.string().trim().email(message).required('Email is required')

export const minLength = (min: number, message?: string) =>
  yup
    .string()
    .trim()
    .min(min, message || `Must be at least ${min} characters`)

export const maxLength = (max: number, message?: string) =>
  yup
    .string()
    .trim()
    .max(max, message || `Must be at most ${max} characters`)

export const password = (min = 6, message?: string) =>
  yup
    .string()
    .trim()
    .required('Password is required')
    .min(min, message || `At least ${min} characters`)

export const confirmPassword = (fieldName: string, message = 'Passwords must match') =>
  yup
    .string()
    .trim()
    .oneOf([yup.ref(fieldName)], message)
    .required('Confirm password is required')
