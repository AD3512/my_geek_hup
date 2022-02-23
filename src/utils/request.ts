// 封装axios
import store from '@/store'
import { logout, saveToken } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import history from './history'
import { getToken } from './token'

// 域名地址
// export const realName = 'http://geek.itheima.net'
export const realName = 'http://toutiao.itheima.net'
export const baseURL = realName + '/v1_0/'
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    const token = getToken().token
    if (token) {
      // !非空断言
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error: AxiosError<{ message: string }>) {
    // 对响应错误做点什么
    // console.dir(error)
    //-------------------- 如果服务器繁忙-------------------------------
    if (!error.response) {
      Toast.show({
        content: '服务器繁忙',
      })
      return Promise.reject(error)
    }

    //  ----------------------- 401情况--------------------------------
    if (error.response.status === 401) {
      const token = getToken()
      // ----------------有token-------------------------
      if (token.token) {
        try {
          const res = await axios.put(baseURL + 'authorizations', '', {
            headers: { Authorization: 'Bearer ' + token.refresh_token },
          })
          // ----------------调用仓库的action从新设置仓库的token-----------------
          store.dispatch(
            saveToken({
              token: res.data.data.token,
              refresh_token: token.refresh_token,
            })
          )
          // console.dir(error, 1111111111111111111)
          // --------------------根据新token重新发送请求获取数据--------------------
          return request(error.config)
        } catch (e) {
          // --------------------------token刷新失败-------------------------------
          // 携带现在的地址跳回登录页
          history.replace('/login', {
            from: history.location.pathname,
          })
          Toast.show('登录过期,请重新登录')
          // 清空token
          store.dispatch(logout())
          // console.log(e)
          return Promise.reject(error)
        }
      } else {
        // ------------------------------没有token---------------------------------
        history.replace('/login', {
          from: history.location.pathname,
        })
        Toast.show('未登录,请先登录')
        return Promise.reject(error)
      }
    }
    // ------------------------普通错误提示-------------------------
    Toast.show(error.response.data.message)
    return Promise.reject(error)
  }
)

export default request
