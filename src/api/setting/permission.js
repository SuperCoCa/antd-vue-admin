import request from '@/utils/request'

export function getPermissionList(params) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: params
  })
}

export function createPermission(params) {
  return request({
    url: '/permission/create',
    method: 'post',
    data: params
  })
}

export function editPermission(params) {
  return request({
    url: '/permission/edit',
    method: 'put',
    data: params
  })
}

export function deletePermission(params) {
  return request({
    url: '/permission/delete',
    method: 'delete',
    data: params
  })
}
