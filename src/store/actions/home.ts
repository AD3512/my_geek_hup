// -----------------------------请求channels列表----------------------------------

import { ApiResponse } from '@/types/data'
import { Channel, RootThunkAction } from '@/types/store'
import request from '@/utils/request'

export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
      '/user/channels'
    )
    dispatch({ type: 'home/getChannels', payload: res.data.data.channels })
  }
}
export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
      '/channels'
    )
    dispatch({ type: 'home/getAllChannels', payload: res.data.data.channels })
  }
}
