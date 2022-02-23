import { ApiResponse, searchSuggestion } from '@/types/data'
import { RootThunkAction, searchAction, SearchResultType } from '@/types/store'
import request from '@/utils/request'
import { removeLocalSearchHistory, setLocalSearchHistory } from '@/utils/token'

export const getSuggestionList = (val: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ options: searchSuggestion }>>(
      `/suggestion`,
      { params: { q: val } }
    )
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
// 添加历史记录
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

// 清空历史记录
export const clearHistory = (): searchAction => {
  removeLocalSearchHistory()
  return { type: 'search/clearHistory' }
}

// 删除历史记录
export const delHistory = (val: string): RootThunkAction => {
  return async (dispatch, getState) => {
    let historyList = getState().search.historyList
    // 判断如果重复
    historyList = historyList.filter((item) => item !== val)

    setLocalSearchHistory(historyList)

    dispatch({ type: 'search/delHistory', payload: historyList })
  }
}
// 获取搜索结果
export const getSearch = (page: number, val: string): RootThunkAction => {
  return async (dispatch, getState) => {
    console.log(val, 888888)
    const res = await request.get<ApiResponse<SearchResultType>>(`/search`, {
      params: {
        q: val,
        page,
        per_page: 10,
      },
    })
    console.log(res.data.data, '发请求获取结果列表数据')

    dispatch({
      type: 'search/getSearchResults',
      payload: res.data.data,
    })
  }
}

// 重置搜索结果
export const clearSearchResult = (): searchAction => {
  return {
    type: 'search/clearSearchResults',
  }
}
