import { AxiosRequestConfig, AxiosResponse } from '../types'

/**
 * 错误处理
 *
 * @export
 * @class AxiosError
 * @extends {Error}
 */
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * 错误工厂函数
 *
 * @export
 * @param {string} message
 * @param {AxiosRequestConfig} config
 * @param {(string | null)} [code]
 * @param {*} [request]
 * @param {AxiosResponse} [response]
 * @returns
 */
export function createdError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
