export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  ERR_NETWORK: 'ERR_NETWORK',
}

export const LOGOUT_MESSAGE_CODE = ['WEB_E_MSG_007', 'WEB_E_MSG_PASSWORD_CHANGED']

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  CHANGE_PASSWORD: '/change-password',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
}

export const GUEST_ROUTES = ['login', 'register', 'forgot-password', 'reset-password']
