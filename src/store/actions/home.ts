// -----------------------------请求channels列表----------------------------------

import { ApiResponse } from '@/types/data'
import { Article, Channel, RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/token'
import { Toast } from 'antd-mobile'

export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    if (hasToken()) {
      // console.log('已登录')
      const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
        '/user/channels'
      )
      dispatch({ type: 'home/getChannels', payload: res.data.data.channels })
    } else {
      // console.log('未登录')

      // 从本地拿
      if (getLocalChannels().length > 0) {
        // console.log('本地有本地拿')

        dispatch({ type: 'home/getChannels', payload: getLocalChannels() })
      } else {
        // 本地没有请求默认数据,且存本地
        console.log('本地没有,发请求拿,存本地')

        const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
          '/user/channels'
        )

        setLocalChannels(res.data.data.channels)

        dispatch({
          type: 'home/getChannels',
          payload: res.data.data.channels,
        })
      }
    }
  }
}
export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    // 如果登录有token,发请求拿数据

    const res = await request.get<ApiResponse<{ channels: Channel[] }>>(
      '/channels'
    )
    dispatch({ type: 'home/getAllChannels', payload: res.data.data.channels })
  }
}

export const changeActive = (active: number): RootThunkAction => {
  return (dispatch) =>
    dispatch({
      type: 'home/changeActive',
      payload: active,
    })
}

export const delChannel = (id: number): RootThunkAction => {
  return async (dispatch) => {
    if (hasToken()) {
      // console.log('发请求')
      const res = await request.delete('user/channels', {
        data: {
          channels: [id],
        },
      })
      console.log(res)
      // Toast.show('删除成功')
    } else {
      const res = getLocalChannels().filter((item) => item.id !== id)
      setLocalChannels(res)
    }
    Toast.show('删除成功')
    dispatch(getChannels())
  }
}
export const addChannel = (channel: Channel): RootThunkAction => {
  console.log(channel, 999999)

  return async (dispatch, getState) => {
    const { userChannels } = getState().home
    if (hasToken()) {
      const res = await request.patch('user/channels', {
        channels: [channel],
      })
      console.log(res)
    } else {
      setLocalChannels([...userChannels, channel])
    }
    Toast.show('添加成功')
    dispatch(getChannels())
  }
}

type article = {
  pre_timestamp: string
  results: Article[]
}

export const getArticles = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<article>>('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })

    console.log(res.data.data.results, 9999)
    dispatch({
      type: 'home/saveChangeActives',
      payload: {
        channel_id,
        timestamp: res.data.data.pre_timestamp,
        articles: res.data.data.results,
      },
    })
  }
}
