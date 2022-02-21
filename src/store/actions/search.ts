import { ApiResponse, searchSuggestion } from '@/types/data'
import { RootThunkAction, searchAction } from '@/types/store'
import request from '@/utils/request'
import { removeLocalSearchHistory, setLocalSearchHistory } from '@/utils/token'

export const getSuggestionList = (val: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ options: searchSuggestion }>>(
      `/suggestion`,
      { params: { q: val } }
    )
    console.log(res, 4655)
    let newRes: searchSuggestion
    if (res.data.data.options[0] === null) {
      newRes = []
    } else {
      newRes = res.data.data.options
    }

    dispatch({
      type: 'search/getSuggestionList',
      payload: newRes,
    })
  }
}
export const addHistory = (val: string): RootThunkAction => {
  return async (dispatch, getState) => {
    let historyList = getState().search.historyList
    // 判断如果重复
    historyList = historyList.filter((item) => item !== val)
    // 判断如果大于十
    if (historyList.length >= 10) {
      console.log('减')

      historyList.pop()
    }

    historyList = [val, ...historyList]

    setLocalSearchHistory(historyList)

    dispatch({ type: 'search/setHistory', payload: historyList })
  }
}
export const clearHistory = (): searchAction => {
  removeLocalSearchHistory()
  return { type: 'search/clearHistory' }
}
export const delHistory = (val: string): RootThunkAction => {
  return async (dispatch, getState) => {
    let historyList = getState().search.historyList
    // 判断如果重复
    historyList = historyList.filter((item) => item !== val)

    setLocalSearchHistory(historyList)

    dispatch({ type: 'search/delHistory', payload: historyList })
  }
}
