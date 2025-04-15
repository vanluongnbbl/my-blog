import axios, { type AxiosInstance, type AxiosRequestConfig, type Method, type CustomParamsSerializer } from 'axios'
import stringify from 'query-string'
import { includes, isUndefined } from 'lodash-es'

import { useAlertStore } from '@/stores/useAlertStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { API_STATUS, LOGOUT_MESSAGE_CODE, PATHS } from '@/utils/constants'
import { localStorageServices } from '@/utils/localStorageServices'

interface HttpClientRequestConfig extends AxiosRequestConfig {
  url: string
}

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>
type RequestCallback = (token: string) => void

const defaultConfig: AxiosRequestConfig = {
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: import.meta.env.VITE_API_URL + '/api',
  paramsSerializer: {
    serialize: stringify.stringify as unknown as CustomParamsSerializer,
  },
  withCredentials: true,
}

class HttpClient {
  private static requests: RequestCallback[] = []
  private static isRefreshing = false
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig)
  private static readonly whiteList: string[] = ['/login', '/logout']

  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private httpInterceptorsRequest(): void {
    HttpClient.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorageServices.getAccessToken()
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )
  }

  private getNewToken = () => {
    const refresh_token = localStorageServices.getRefreshToken() || 'invalid-token'
    return HttpClient.axiosInstance
      .post(`/refresh-token`, { refreshToken: refresh_token })
      .then((response) => {
        const data = response.data

        localStorageServices.setAccessToken(data.access_token)
        localStorageServices.setRefreshToken(data.refresh_token)
        return { access_token: data.access_token, refresh_token: data.refresh_token }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  private httpInterceptorsResponse(): void {
    HttpClient.axiosInstance.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const { config } = error
        const alertStore = useAlertStore()
        const authStore = useAuthStore()

        if (
          error?.response?.status === API_STATUS.UNAUTHORIZED &&
          !window.location.pathname.includes(PATHS.LOGIN) &&
          localStorageServices.getRefreshToken()
        ) {
          if (!HttpClient.whiteList.some((v) => (config?.url as string).includes(v))) {
            if (!HttpClient.isRefreshing) {
              HttpClient.isRefreshing = true
              this.getNewToken()
                .then((data) => {
                  this.onRefreshed(data.access_token)
                })
                .catch((error) => {
                  HttpClient.requests = []
                  authStore.clearAuth()
                  return Promise.reject(error)
                })
                .finally(() => {
                  HttpClient.isRefreshing = false
                })
            }

            return new Promise((resolve) => {
              this.subscribeTokenRefresh((token: string) => {
                config.headers['Authorization'] = 'Bearer ' + token
                resolve(HttpClient.axiosInstance.request(config))
              })
            })
          }
        }

        if (includes(LOGOUT_MESSAGE_CODE, error?.response?.data?.error?.code) && !isUndefined(authStore.auth)) {
          alertStore.openAlertConfig({
            type: 'error',
            message: error.response?.data.error.code,
          })
          authStore.clearAuth()
          throw Error('user inactive')
        }

        console.log('error 333', error)

        return Promise.reject(error)
      },
    )
  }

  private onRefreshed(token: string) {
    HttpClient.requests.forEach((cb) => cb(token))
    HttpClient.requests = []
  }

  private subscribeTokenRefresh(cb: RequestCallback) {
    HttpClient.requests.push(cb)
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpClientRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as HttpClientRequestConfig
    return HttpClient.axiosInstance.request(config)
  }

  public post<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('post', url, params, config)
  }

  public get<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('get', url, params, config)
  }

  public patch<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('patch', url, params, config)
  }

  public put<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('put', url, params, config)
  }

  public delete<T>(url: string, params?: AxiosRequestConfig, config?: HttpClientRequestConfig) {
    return this.request<T>('delete', url, params, config)
  }
}

export const http = new HttpClient()
