import { type } from '@/pages/Profile/User'
import { ApiResponse } from '@/types/data'
import { RootThunkAction, User, UserProfile } from '@/types/store'
import request from '../../utils/request'

export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<User>>('user')
    // console.log(res, 4655)
    dispatch({ type: 'profile/getUser', payload: res.data.data })
  }
}

export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<UserProfile>>('user/profile')
    // console.log(res, 4655)
    dispatch({ type: 'profile/getUserProfile', payload: res.data.data })
  }
}

export const quitLogin = (): RootThunkAction => {
  return (dispatch) => {
    dispatch({ type: 'profile/clearUserProfile', payload: '' })
    dispatch({ type: 'login/clearToken', payload: '' })
  }
}
export const editInfo = (type: type, value: string): RootThunkAction => {
  // console.log(type, value)
  return async (dispatch) => {
    await request.patch('/user/profile', { [type]: value })
    // 重新渲染
    dispatch(getUserProfile())
  }
}
