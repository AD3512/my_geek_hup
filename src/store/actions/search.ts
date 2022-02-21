import { ApiResponse, searchSuggestion } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'

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
