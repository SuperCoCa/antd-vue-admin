import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(params) {
  return request({
    url: '/role/create',
    method: 'post',
    data: params
  })
}

export function editRole(params) {
  return request({
    url: '/role/edit',
    method: 'put',
    data: params
  })
}

export function deleteRole(params) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data: params
  })
}

export function changeStatus(params) {
  return request({
    url: '/role/change_status',
    method: 'post',
    data: params
  })
}

export function getRolePermission(params) {
  return request({
    url: '/role/get_permission',
    method: 'get',
    params: params
  })
}

export function setRolePermission(params) {
  return request({
    url: '/role/set_permission',
    method: 'post',
    data: params
  })
}

export function getRoleMenu(params) {
  return request({
    url: '/role/get_menu',
    method: 'get',
    params: params
  })
}

export function setRoleMenu(params) {
  return request({
    url: '/role/set_menu',
    method: 'post',
    data: params
  })
}
