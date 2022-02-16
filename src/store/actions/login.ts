import { ApiResponse } from '@/types/data'
import { RootThunkAction, Token } from '@/types/store'
import { setToken } from '@/utils/token'
import request from '../../utils/request'
/**
 * 获取验证码请求
 * @param mobile 手机号
 * @returns
 */
export const getCode = (mobile: string) => {
  return async () => {
    await request.get(`sms/codes/${mobile}`)
    // console.log(res, mobile, 4655)
  }
}

/**
 * 登录请求
 * @param values 手机号和验证码
 * @returns
 */
export const login = (values: {
  mobile: string
  code: string
}): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>(
      '/authorizations',
      values
    )
    if (res.status === 201) {
      dispatch({ type: 'login/getToken', payload: res.data.data })
      // 将token存到本地
      setToken(res.data.data)
    }
  }
}
