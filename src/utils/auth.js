import store from 'storejs'

export function getToken() {
  return store.get('access-token')
}

export function setToken(token) {
  return store.set('access-token', token)
}

export function removeToken() {
  return store.remove('access-token')
}
