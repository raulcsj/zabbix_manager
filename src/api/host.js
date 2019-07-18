import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/host/list',
    method: 'get',
    params: query
  })
}

export function fetchHost(id) {
  return request({
    url: '/host/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/host/pv',
    method: 'get',
    params: { pv }
  })
}

export function createHost(data) {
  return request({
    url: '/host/create',
    method: 'post',
    data
  })
}

export function updateHost(data) {
  return request({
    url: '/host/update',
    method: 'post',
    data
  })
}
