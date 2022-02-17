// ------------------------------------封装所有关于token的api-------------------------------

import { Token } from '@/types/store'

const TOKEN_KEY = 'hm-geek-token'
/**
 * 获取token
 */
export const getToken = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

/**
 * 设置token
 * @param value token值
 */
export const setToken = (value: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(value))
}
/**
 * 清除token
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断token是否存在
 */
export const hasToken = (): boolean => {
  return !!getToken().token
}
