// ------------------------------------封装所有关于token的api-------------------------------

import { Channel, Token } from '@/types/store'

const TOKEN_KEY = 'hm-geek-token'
const Channel_KEY = 'hm-geek-channels'
const SEARCH_HISTORY_KEY = 'hm-geek-search-history'
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

/**
 * 获取本地channels
 */
export const getLocalChannels = (): Channel[] => {
  return JSON.parse(localStorage.getItem(Channel_KEY) || '[]')
}

/**
 * 设置本地channels
 * @param channel
 */
export const setLocalChannels = (channels: Channel[]) => {
  localStorage.setItem(Channel_KEY, JSON.stringify(channels))
}

/**
 * 获取本地搜索历史
 */
export const getLocalSearchHistory = (): string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
}

/**
 * 设置本地搜索历史
 * @param 数据
 */
export const setLocalSearchHistory = (arr: string[]) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([...arr]))
}
/**
 * 清除本地搜索历史
 * @param 数据
 */
export const removeLocalSearchHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY)
}
