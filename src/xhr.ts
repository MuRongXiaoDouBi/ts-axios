import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createdError } from './helpers/error'
/**
 * 请求功能
 *
 * @export
 * @param {AxiosRequestConfig} config
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(createdError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    request.open(method.toUpperCase(), url, true)
    // 正常情况
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      // 非200状态码
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    // 网络错误
    request.onerror = function handleError() {
      reject(createdError('Network Error', config, null, request))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    /**
     * 处理非200状态码辅助函数
     *
     * @param {AxiosResponse} response
     */
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createdError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
