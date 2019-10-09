import { isPlainObject } from './util'

/**
 * 处理body请求参数
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * 将返回数据转换为JSON对象
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {}
  }
  return data
}
