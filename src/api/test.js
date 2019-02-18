import { request } from '@/utils/request'
export function TestGet(params = {}, config = {}) {
  return request({
    url: 'api/test',
    method: 'get',
    params,
    config
  })
}
export function TestPost(params = {}, config = {}) {
  return request({
    url: 'http://baidu.comapi/test',
    method: 'post',
    params,
    config
  })
}