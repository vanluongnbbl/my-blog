const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const IS_FIRST = 'is_first'

// Access Token
const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
}

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}

// Refresh Token
const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}

const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN, token)
}

const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN)
}

// Is first system user
const getIsFirst = () => {
  return localStorage.getItem(IS_FIRST)
}

const setIsFirst = (isFirst: string) => {
  localStorage.setItem(IS_FIRST, isFirst)
}

const removeIsFirst = () => {
  localStorage.removeItem(IS_FIRST)
}

export const localStorageServices = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getIsFirst,
  setIsFirst,
  removeIsFirst,
}
