export type AlertMessage = 'success' | 'warning' | 'info' | 'error'

type TError = {
  code: string
  message: string
  details: {
    property: string
  }[]
}

export type ResponseError = {
  error: TError
}

export type Response<T> = {
  success: boolean
  data?: T
  error?: TError
  meta?: Meta
}

export type Meta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
