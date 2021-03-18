import request from '@/utils/request'

export function getInfo(params) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: params
  })
}

export function getList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(params) {
  return request({
    url: '/admin/create',
    method: 'post',
    data: params
  })
}

export function editAdmin(params) {
  return request({
    url: '/admin/edit',
    method: 'put',
    data: params
  })
}

export function deleteAdmin(params) {
  return request({
    url: '/admin/delete',
    method: 'delete',
    data: params
  })
}

export function changeStatus(params) {
  return request({
    url: '/admin/change_status',
    method: 'post',
    data: params
  })
}

export function getAdminPermission(params) {
  return request({
    url: '/admin/get_permission',
    method: 'get',
    params: params
  })
}

export function setAdminPermission(params) {
  return request({
    url: '/admin/set_permission',
    method: 'post',
    data: params
  })
}

export function getAdminMenu(params) {
  return request({
    url: '/admin/get_menu',
    method: 'get',
    params: params
  })
}

export function setAdminMenu(params) {
  return request({
    url: '/admin/set_menu',
    method: 'post',
    data: params
  })
}
