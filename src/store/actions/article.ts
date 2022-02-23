import { ArticleDetail, RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { AxiosResponse } from 'axios'

// 获取文章信息
export const getArticleInfo = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<AxiosResponse<ArticleDetail>>(
      `/articles/${id}`
    )
    dispatch({
      type: 'article/getArticleInfo',
      payload: res.data.data,
    })
  }
}
