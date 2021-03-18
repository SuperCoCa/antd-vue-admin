import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: params
  })
}

export function createMenu(params) {
  return request({
    url: '/menu/create',
    method: 'post',
    data: params
  })
}

export function editMenu(params) {
  return request({
    url: '/menu/edit',
    method: 'put',
    data: params
  })
}

export function deleteMenu(params) {
  return request({
    url: '/menu/delete',
    method: 'delete',
    data: params
  })
}
