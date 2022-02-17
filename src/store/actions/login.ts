import { ApiResponse } from '@/types/data'
import { LoginAction, RootThunkAction, Token } from '@/types/store'
import { removeToken, setToken } from '@/utils/token'
import request from '../../utils/request'

export const saveToken = (token: Token): LoginAction => {
  // 将token存到本地
  setToken(token)

  return { type: 'login/getToken', payload: token }
}

// -----------------------获取验证码请求-------------------------------
export const getCode = (mobile: string) => {
  return async () => {
    await request.get(`sms/codes/${mobile}`)
    // console.log(res, mobile, 4655)
  }
}

// -----------------------------登录请求----------------------------------

export const login = (values: {
  mobile: string
  code: string
}): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>(
      '/authorizations',
      values
    )
    dispatch(saveToken(res.data.data))
  }
}

// --------------------------退出的action-------------------------
export const logout = (): LoginAction => {
  removeToken()
  return { type: 'login/logout' }
}
