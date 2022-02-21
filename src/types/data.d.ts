// 用来存放跟数据接口相关类型
export type LoginFormType = {
  mobile: string
  code: string
}

// axios返回值的类型
export type ApiResponse<T> = {
  message: string
  data: T
}

export type searchSuggestion = string[]
