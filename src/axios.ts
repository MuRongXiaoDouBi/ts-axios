import { AxiosInstance } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
/**
 * Axios实例工厂函数
 *
 * @returns {AxiosInstance}
 */
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()
export default axios
